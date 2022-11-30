import express, { Express, Request, Response } from "express"
import fs from "fs"
import path from "path"
import http from "http"
import https from "https"
import config from "config"
import * as api from "./api"
import { mainApp } from "./logic"

const app: Express = express()
const port = config.get("port")

const useSsl: boolean = config.get("useSsl")

// Публикуем клиент.
app.use(express.static(path.resolve("/home", "planning-client", "build")));

// Добавляем маршруты api
api.addApiRoutes(app)

if (useSsl === true) {

    // Читаем настройки SSL.
    const sslOptions = {
        key: fs.readFileSync(config.get("sslOptions.key")),
        cert: fs.readFileSync(config.get("sslOptions.cert")),
        ca: fs.readFileSync(config.get("sslOptions.ca")),
    }

    // Перенаправляю на защищенный протокол, это нужно, чтобы работал телеграм бот.
    app.use((req: Request, res: Response, next) => {
        req.secure ? next() : res.redirect("https://" + req.headers.host + req.url)
    })

    // Отдаем клиент.
    app.get("*", (req: Request, res: Response) => {
        const rootpath = path.resolve("/home", "planning-client", "build")
        const options = { root: rootpath }
        // const clientPath: string = path.resolve(rootpath, "index.html")
        res.sendFile("index.html", options)
    })

    https.createServer(sslOptions, app).listen(port)

} else {

    http.createServer(app).listen(port)

}





app.get("/", (req: Request, res: Response) => {
    res.send("OK")
})



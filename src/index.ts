import express, { Express, Request, Response } from "express"
import fs from "fs"
import path from "path"
import http from "http"
import https from "https"
import config from "config"

const app: Express = express()
const port = config.get("port")

const useSsl: boolean = config.get("useSsl")

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

    https.createServer(sslOptions, app).listen(port)

} else {

    http.createServer(app).listen(port)

}

// Отдаем клиент.
app.get("*", (req: Request, res: Response) => {
    res.sendFile(
        path.resolve(__dirname, "planning-client", "build", "index.html")
    )
})

app.get("/", (req: Request, res: Response) => {
    res.send("OK")
})



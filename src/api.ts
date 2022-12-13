import { Express, Request, Response } from "express"
import {mainApp} from "./logic"

export function addApiRoutes(app: Express) {

    // Периодический запрос от клиента.
    app.post("/api/tick", (req, res) => {
        mainApp.handleClientTick(req, res)
        res.send("tick")
    })

    app.post("/api/updateUser", (req, res) => {
        mainApp.handleUpdateUser(req, res)
        res.send("tick")
    })


}
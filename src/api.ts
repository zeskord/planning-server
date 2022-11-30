import { Express, Request, Response } from "express"
import * as logic from "./logic"

export function addApiRoutes(app: Express) {

    // Периодический запрос от клиента.
    app.post("/api/tick", (req, res) => {
        
        logic.handleClientTick(req, res)
        res.send("tick")
    })





}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addApiRoutes = void 0;
const logic_1 = require("./logic");
function addApiRoutes(app) {
    // Периодический запрос от клиента.
    app.post("/api/tick", (req, res) => {
        logic_1.mainApp.handleClientTick(req, res);
        res.send("tick");
    });
    app.post("/api/updateUser", (req, res) => {
        logic_1.mainApp.handleUpdateUser(req, res);
        res.send("tick");
    });
}
exports.addApiRoutes = addApiRoutes;

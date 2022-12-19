"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addApiRoutes = void 0;
const MainApp_1 = require("./MainApp");
function addApiRoutes(app) {
    // Периодический запрос от клиента.
    app.post("/api/tick", (req, res) => {
        const reqBody = req.body;
        const response = MainApp_1.mainApp.handleClientTick(reqBody);
        res.status(200).json(response);
    });
    app.post("/api/sendMark", (req, res) => {
        const userId = req.body.userId;
        const mark = req.body.mark;
        MainApp_1.mainApp.setUserMark(userId, mark);
        res.status(200);
    });
    app.post("/api/clearMarks", (req, res) => {
        const room = req.body.room;
        MainApp_1.mainApp.clearMarks(room);
        res.status(200);
    });
    app.post("/api/changeRole", (req, res) => {
        const userId = req.body.userId;
        const role = req.body.role;
        MainApp_1.mainApp.changeRole(userId, role);
        res.status(200);
    });
    app.post("/api/reset", (req, res) => {
        MainApp_1.mainApp.reset();
        res.status(200);
    });
    app.post("/api/showMarks", (req, res) => {
        const room = req.body.room;
        MainApp_1.mainApp.showMarks(room);
        res.status(200);
    });
    app.post("/api/changeRoom", (req, res) => {
        const userId = req.body.userId;
        const room = req.body.room;
        MainApp_1.mainApp.changeRoom(userId, room);
        res.status(200);
    });
}
exports.addApiRoutes = addApiRoutes;

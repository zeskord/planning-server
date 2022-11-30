"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = exports.handleClientTick = exports.MainApp = void 0;
const db_1 = require("./db");
class MainApp {
    // public getRoomsCallback: (err: any, result: any) => void
    constructor() {
        MainApp.db = new db_1.DatabaseClass();
        this.rooms = [];
        setInterval(this.getRooms, 5000);
    }
    static getRoomsCallback(err, result) {
        console.log(result);
    }
    getRooms() {
        MainApp.db.getRoomList(MainApp.getRoomsCallback);
    }
}
exports.MainApp = MainApp;
function handleClientTick(req, res) {
}
exports.handleClientTick = handleClientTick;
// function getRoomsCallback(err: any, result: any)  {
//     console.log(result)
// }
exports.mainApp = new MainApp();

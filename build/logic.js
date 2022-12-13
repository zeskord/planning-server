"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = exports.MainApp = void 0;
const db_1 = require("./db");
class MainApp {
    // public getRoomsCallback: (err: any, result: any) => void
    constructor() {
        MainApp.db = db_1.DatabaseManager.Instance;
        this.rooms = [];
        setInterval(this.getRooms, 5000);
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    static getRoomsCallback(err, result) {
        console.log(result);
    }
    getRooms() {
        MainApp.db.getRoomList(MainApp.getRoomsCallback);
    }
    handleUpdateUser(req, res) {
        MainApp.db.getRoomList(MainApp.getRoomsCallback);
    }
    handleClientTick(req, res) {
    }
}
exports.MainApp = MainApp;
exports.mainApp = MainApp.Instance;

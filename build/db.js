"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManager = void 0;
class DatabaseManager {
    constructor() {
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(':memory:');
        this.dbInit();
    }
    static get Instance() {
        return this._instance || (this._instance = new this());
    }
    dbInit() {
        const db = this.db;
        db.serialize(function () {
            db.run("CREATE TABLE rooms (id INT, name TEXT);");
            db.run("CREATE TABLE users (id INT, name TEXT, mark_is_set BOOLEAN, mark TEXT);");
            db.run("CREATE TABLE spectators (id INT, name TEXT);");
            db.run("INSERT INTO rooms VALUES ($id, $name);", { $id: 0, $name: "Светлая" });
            db.run("INSERT INTO rooms VALUES ($id, $name);", { $id: 1, $name: "Темная" });
            db.run("INSERT INTO users VALUES ($id, $name, $mark_is_set, $mark);", { $id: 1, $name: "Темная", $mark_is_set: true, $mark: 0 });
        });
        console.log("db initialazed");
    }
    getRoomList(callback) {
        const db = this.db;
        db.all("SELECT * FROM rooms", {}, callback);
    }
    getUsers(callback, roomId) {
        const db = this.db;
        db.all("SELECT * FROM users WHERE id = $id", { $id: roomId }, callback);
    }
    updateUser(callback, userId, data) {
        const db = this.db;
        db.run("UPDATE users SET id = $userId", { $id: userId }, callback);
    }
    deleteUsers(callback, userId) {
        const db = this.db;
        db.run("DELETE FROM users WHERE id = $id", { $id: userId }, callback);
    }
}
exports.DatabaseManager = DatabaseManager;

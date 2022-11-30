import { Database } from "sqlite3"

export class DatabaseClass {
    
    db: Database

    constructor() {
        const sqlite3 = require('sqlite3').verbose()
        this.db = new sqlite3.Database(':memory:')
        this.dbInit()
    }

    private dbInit() {
        const db = this.db
    
        db.serialize(function () {
            db.run("CREATE TABLE rooms (id INT, name TEXT);")
            db.run("CREATE TABLE users (id INT, name TEXT, mark_is_set BOOLEAN, mark TEXT);")
            db.run("CREATE TABLE spectators (id INT, name TEXT);")
            db.run("INSERT INTO rooms VALUES ($id, $name);", { $id: 0, $name: "Светлая" })
            db.run("INSERT INTO rooms VALUES ($id, $name);", { $id: 1, $name: "Темная" })
            db.run("INSERT INTO users VALUES ($id, $name, $mark_is_set, $mark);", { $id: 1, $name: "Темная", $mark_is_set: true, $mark: 0 })
        })
        console.log("db initialazed")
    }

    public getRoomList(callback: Function) {
        const db = this.db
        db.all("SELECT * from rooms", {}, callback)
    }
    
}

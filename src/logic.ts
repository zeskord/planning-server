import { application, Request, Response } from "express"
import { DatabaseManager } from "./db"
import { Room } from "./types"

export class MainApp {
    
    private static _instance: MainApp
    static db: DatabaseManager // база данных. https://github.com/TryGhost/node-sqlite3/wiki/API#database
    rooms: Room[] // комнаты.
    // public getRoomsCallback: (err: any, result: any) => void

    constructor() {
        MainApp.db = DatabaseManager.Instance 
        this.rooms = []
        
        setInterval(this.getRooms, 5000)
    }

    public static get Instance() {
        return this._instance || (this._instance = new this())
    }

    static getRoomsCallback(err: any, result: any) {
        console.log(result)
    }
    
    getRooms(): void {
        MainApp.db.getRoomList(MainApp.getRoomsCallback)
    }

    handleUpdateUser(req: Request, res: Response): void {
        MainApp.db.getRoomList(MainApp.getRoomsCallback)
    }

    handleClientTick(req: Request, res: Response) {
        
    }

}

export let mainApp = MainApp.Instance
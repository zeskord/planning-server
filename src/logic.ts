import { application, Request, Response } from "express"
import { DatabaseClass } from "./db"
import { Room } from "./types"

export class MainApp {
    
    static db: DatabaseClass // база данных. https://github.com/TryGhost/node-sqlite3/wiki/API#database
    rooms: Room[] // комнаты.
    // public getRoomsCallback: (err: any, result: any) => void

    constructor() {
        MainApp.db = new DatabaseClass() 
        this.rooms = []
        
        setInterval(this.getRooms, 5000)
    }

    static getRoomsCallback(err: any, result: any) {
        console.log(result)
    }
    
    getRooms(): void {
        MainApp.db.getRoomList(MainApp.getRoomsCallback)
    }

    

    // public acceptInitDataFromDb(db: Database, roomsFromDb: any[]) {
    //     this.db = db
    //     this.rooms = []
    //     roomsFromDb.forEach(item => {
    //         var room: Room = {id: item.id, name: item.name}
    //         this.rooms.push(room) 
    //     });
    //     console.log(this.rooms) 
    // }

}

export function handleClientTick(req: Request, res: Response) {

}

export let mainApp = new MainApp()
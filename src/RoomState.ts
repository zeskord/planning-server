import { throws } from "assert";
import { Room } from "./types";

export class RoomState {

    public room: Room
    public marksVisible: boolean

    constructor (room: Room) {
        
        this.room = room
        this.marksVisible = false

    }

    reset() {
        this.marksVisible = false
    }

}
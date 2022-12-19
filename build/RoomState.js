"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomState = void 0;
class RoomState {
    constructor(room) {
        this.room = room;
        this.marksVisible = false;
    }
    reset() {
        this.marksVisible = false;
    }
}
exports.RoomState = RoomState;

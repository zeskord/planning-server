"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const types_1 = require("./types");
class User {
    constructor(id, name, role, room, mark) {
        this.id = id;
        this.name = name;
        if (role) {
            this.role = role;
        }
        else {
            this.role = types_1.UserRole.Estimator;
        }
        if (room) {
            this.room = room;
        }
        else {
            this.room = types_1.Room.Light;
        }
        if (this.mark) {
            this.mark = this.mark;
        }
        else {
            this.mark = undefined;
        }
    }
}
exports.User = User;

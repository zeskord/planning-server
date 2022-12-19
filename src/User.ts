import { Mark, Room, UserId, UserRole } from "./types"

export class User {

    public id: UserId
    public name: string
    public role: UserRole
    public room: Room
    public mark: Mark

    constructor(id: UserId, name: string, role?: UserRole, room?: Room , mark?: Mark) {
        this.id = id
        this.name = name
        if(role){
            this.role = role
            
        } else {
            this.role = UserRole.Estimator
        }
        if(room){
            this.room = room
            
        } else {
            this.room = Room.Light
        }
        if (this.mark) {
            this.mark = this.mark
        } else {
            this.mark = undefined
        }
    }

}
import { Mark, Room, RoomStateResponseData, RoomStateUserEntry, UserId, UserRole, UserStateUpdateData, UserTickResponse } from "./types"
import { User } from "./User"
import { RoomState } from "./RoomState"

export class MainApp {

    // private static _instance: MainApp
    users: User[] // Состояния пользователей  
    rooms: Map<Room, RoomState>

    constructor() {
        // Коллекция пользователей онлайн.
        this.users = []
        // Здесь хранятся состояния комнат.
        this.rooms = new Map<Room, RoomState>()
        this.rooms.set(Room.Light, new RoomState(Room.Light))
        this.rooms.set(Room.Dark, new RoomState(Room.Dark))
    }

    isUserOnline(id: UserId): boolean {
        return this.findUsersById(id).length !== 0
    }

    findUsersById(id: UserId): User[] {
        return this.users.filter(item => item.id === id)
    }

    findUsersByRoom(room: Room): User[] {
        return this.users.filter(item => item.room === room)
    }

    // Зарегистрировать юзера онлайн.
    setUserOnline(userData: UserStateUpdateData) {

        let user = new User(userData.id, userData.name)
        this.users.push(user)
    }

    updateUserState(userData: UserStateUpdateData) {
        if (this.isUserOnline(userData.id)) {
            // var users: UserState[]
            var users: any = this.findUsersById(userData.id)
            var user: User = (users as User[])[0]
            if (typeof (userData.role) === undefined) {
                user.role = UserRole.Estimator
            } else {
                user.role = userData.role as UserRole
            }
        } else {
            var newItem = new User(userData.id, userData.name, userData.role, userData.room)
            this.users.push(newItem)
        }
    }

    setUserMark(userId: UserId, newMark: Mark): void {
        var tempUsers = this.findUsersById(userId)
        if (tempUsers.length !== 0) {
            tempUsers[0].mark = newMark
        }
    }

    clearMarks(room: Room) {
        var roomState = this.rooms.get(room)
        if (roomState instanceof RoomState) {
            roomState.marksVisible = false
        }
        // Очищаем оценку людям в этой комнате
        var tempUsers = this.findUsersByRoom(room)
        tempUsers.forEach((element) => {
            element.mark = undefined
        })
    }

    handleClientTick(reqBody: any): UserTickResponse {
        
        var userId: UserId = reqBody.userId
        var userName: string = reqBody.userName
        var role: UserRole = reqBody.userRole
        var room: Room = reqBody.room
        
        if (!this.isUserOnline(userId)) {
            var userData: UserStateUpdateData = {
                id: userId,
                name: userName,
                role: role,
                room: room
            }
            this.setUserOnline(userData)
        }

        var users: RoomStateUserEntry[] = []
        var userIds: UserId[] = []

        function roomFilter(element: User, index: number, array: User[]) {
            return (element.room === Room.Light)
        }
        var users1 = this.users.filter(roomFilter)
        console.log(users1)
        users1.forEach((element) => {
            var tempUser: RoomStateUserEntry = {
                user: element.id as UserId,
                currentMark: element.mark,
                role: UserRole.Estimator
            }
            users.push(tempUser)
            userIds.push(element.id as UserId)
        })

        var currentRoomState = this.rooms.get(room)
        var marksVisible: boolean = currentRoomState?.marksVisible === undefined ? false : true

        var roomState: RoomStateResponseData = {
            room: room,
            users: users,
            userIds: userIds,
            marksVisible: marksVisible,
        }

        var result: UserTickResponse = {
            time: new Date(),
            roomState: roomState
        }

        return result

    }

    changeRole(userId: UserId, role: UserRole) {
        var tempUsers = this.findUsersById(userId)
        if (tempUsers.length !== 0) {
            var user: User = tempUsers[0]
            // Меняем пользователю роль.
            user.role = role
        }
    }

    reset() {
        this.users.splice(0)
        // Сбрасываем состояния комнат.
        for (let entry of this.rooms.entries()) {
            entry[1].reset()
        }
        
    }

    showMarks(room: Room) {
        var roomState = this.rooms.get(room)
        if (roomState instanceof RoomState) {
            roomState.marksVisible = true
        }
    }

    changeRoom(userId: UserId, room: Room) {

        var tempUsers = this.findUsersById(userId)
        if (tempUsers.length !== 0) {
            var user: User = tempUsers[0]
            // Меняем пользователю комнату.
            user.room = room
        }
        
    }

}

export let mainApp = new MainApp

// setInterval(mainApp.getUsers, 5000)
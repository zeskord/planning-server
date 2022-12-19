import { TelegramWebApps } from "telegram-webapps-types"

export enum Room {
    Light = 0,
    Dark = 1
}

export enum UserRole {
    Estimator = 0,
    Spectator = 1,
    Admin = 2
}

export type UserId = number

export type Mark = number | undefined

// Данные, которые будут взяты из local storage (или из моей базы на сервере).
export type UserStateUpdateData = {
    id: UserId,
    name: string,
    role: UserRole | undefined,
    room: Room | undefined
}

export type UserTickRequest = {
    time: Date,
    room : Room,
    userId : UserId
}

// Элемент состояния комнаты, связанный с пользователями и зрителями.
export type RoomStateUserEntry = {
    user: UserId,
    currentMark: Mark,
    role: UserRole | undefined
}

// Состояние комнаты.
export type RoomStateResponseData = {
    room: Room,
    users: RoomStateUserEntry[],
    userIds: UserId[],
    marksVisible: boolean
}

export type UserTickResponse = {
    time: Date,
    roomState: RoomStateResponseData
}


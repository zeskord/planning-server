import { TelegramWebApps } from "telegram-webapps-types"

export interface IClientTickRequestData {
    // user: WebAppUser
    userId: number,
    roomId: number
}

export interface IClientTickResponseData {
    // user: WebAppUser
    userId: number,
    roomId: number,
    roomState : RoomState
    users: TelegramWebApps.WebAppUser[]
}

// Состояние комнаты.
export type RoomState = {
    resultCode: number,
    room: Room,
    users: RoomStateUserEntry[],
    spectators: RoomStateUserEntry[],
    marksVisible: boolean,
    userIds: number[],
    spectatorIds: number[]
}

// Элемент состояния комнаты, связанный с пользователями и зрителями.
export type RoomStateUserEntry = {
    user: TelegramWebApps.WebAppUser,
    currentMark: number
    isSpectator: boolean
}

// Описание комнаты.
export type Room = {
    id: number,
    name: string
}

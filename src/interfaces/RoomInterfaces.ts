import { IPlayerState } from "./PlayerInterfaces";

export interface IRoom {
    name: string
}

export interface IRoomEvent extends IRoom {
    state?: IPlayerState[],
    client?: {
        id: string,
    }
}
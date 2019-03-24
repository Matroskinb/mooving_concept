import { PlayerPosition } from "../model/PlayerPosition";
import { ICurrentPlayerPosition } from "./ClientInterfaces";

export interface IPlayerPosition {
    x: number,
    y: number,
}

export interface IPlayer {
    id: string,
    position: AbstractPlayerPosition
}

export interface IPlayerState {
    id: string,
    position: IPlayerPosition
}

export interface IPlayers {
    [s: string]: IPlayer,
}

export abstract class AbstractPlayerPosition {
    public abstract setFromSocket(position: ICurrentPlayerPosition): PlayerPosition;

    public abstract getState();
}
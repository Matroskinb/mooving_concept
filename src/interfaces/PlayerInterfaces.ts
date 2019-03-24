import { PositionState } from "../model/PlayerPosition";
import { ICurrentPlayerPosition } from "./ClientInterfaces";
import { PlayerModel } from "../model/PlayerModel";

export interface IPositionState {
    x: number,
    y: number,
}

export interface IPlayer {
    id: string,
    position: AbstractPlayerPosition
}

export interface IPlayerState {
    id: string,
    position: IPositionState
}

export interface IPlayers {
    [s: string]: PlayerModel,
}

export abstract class AbstractPlayerPosition {
    public abstract setFromSocket(position: ICurrentPlayerPosition): PositionState;

    public abstract getState();
}
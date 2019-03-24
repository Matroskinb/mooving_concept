import { PositionState } from "../model/PlayerPosition";
import { ICurrentPlayerPosition } from "./ClientInterfaces";
import { PlayerModel } from "../model/PlayerModel";
import { PositionAbstract } from "../abstract/PositionAbstract";

export interface IPositionState {
    x: number,
    y: number,
}

export interface IPlayer {
    id: string,
    position: PositionAbstract
}

export interface IPlayerState {
    id: string,
    position: IPositionState
}

export interface IPlayers {
    [s: string]: PlayerModel,
}


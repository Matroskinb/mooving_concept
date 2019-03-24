import { PlayerPosition } from "./PlayerPosition";
import { IPlayerState } from "../interfaces/PlayerInterfaces";

export class PlayerModel {
    public position: PlayerPosition;
    protected id: string;

    constructor(id: string){
        this.id = id;
        this.position = new PlayerPosition();
    }

    public getState(): IPlayerState{
        return {
            id: this.id,
            position: this.position.getState(),
        };
    }
}
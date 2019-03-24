import { PositionState } from "./PlayerPosition";
import { IPlayerState } from "../interfaces/PlayerInterfaces";
import { PositionableAbstract } from "../abstract/PositionableAbstract";

export class PlayerModel extends PositionableAbstract {
    protected id: string;

    constructor(id: string){
        super();
        this.id = id;
        this.position = new PositionState();
    }

    public getState(): IPlayerState{
        return {
            id: this.id,
            position: this.position.getState(),
        };
    }
}
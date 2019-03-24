import { PositionState } from "./PlayerPosition";
import { IPlayerState, IPositionState } from "../interfaces/PlayerInterfaces";
import { PositionableAbstract } from "../abstract/PositionableAbstract";
import { HealthableAbstract } from "../abstract/HealthableAbstract";

export class PlayerModel extends PositionableAbstract {
    public position: PositionState;
    protected health: number;
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
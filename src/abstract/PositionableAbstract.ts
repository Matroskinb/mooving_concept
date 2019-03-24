import { PositionState } from "../model/PlayerPosition";
import { IPositionState } from "../interfaces/PlayerInterfaces";

export abstract class PositionableAbstract {
    protected position: PositionState;

    public setPosition(x: number, y:number): void {
        this.position.setState(x, y);
    }

    public getPosition(): IPositionState {
        return this.position.getState();
    }
}

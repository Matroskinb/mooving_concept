import { IPositionState, AbstractPlayerPosition as AbstractPositionState } from "../interfaces/PlayerInterfaces";
import { ICurrentPlayerPosition } from "../interfaces/ClientInterfaces";

export class PositionState implements AbstractPositionState {

    protected x: number;
    protected y: number;

    public setFromSocket(position: ICurrentPlayerPosition): PositionState {
        this.x = position.x_pos;
        this.y = position.y_pos;

        return this;
    }

    public setState(x: number, y:number): void {
        this.x = x;
        this.y = y;
    }

    public getState(){
        return {
            x: this.x,
            y: this.y,
        };
    }
}
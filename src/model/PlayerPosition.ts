import { PositionAbstract as AbstractPositionState } from "../abstract/PositionAbstract";

export class PositionState implements AbstractPositionState {

    protected x: number = 0;
    protected y: number = 0;

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
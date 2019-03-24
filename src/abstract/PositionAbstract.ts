import { IPositionState } from "../interfaces/PlayerInterfaces";
export abstract class PositionAbstract {
    public abstract getState(): IPositionState;
    public abstract setState(x: number, y: number): void;
}

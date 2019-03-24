import { IPlayerPosition, AbstractPlayerPosition } from "../interfaces/PlayerInterfaces";
import { ICurrentPlayerPosition } from "../interfaces/ClientInterfaces";

export class PlayerPosition implements AbstractPlayerPosition {

    protected position: IPlayerPosition = {
        x: 0,
        y: 0,
    };

    public setFromSocket(position: ICurrentPlayerPosition): PlayerPosition {
        this.position.x = position.x_pos;
        this.position.y = position.y_pos;

        return this;
    }

    public getState(){
        return this.position;
    }
}
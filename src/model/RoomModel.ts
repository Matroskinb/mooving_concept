import { IPlayers, IPlayerState } from "../interfaces/PlayerInterfaces";

import { ICurrentPlayerPosition } from "../interfaces/ClientInterfaces";
import { PlayerModel } from "./PlayerModel";


export class RoomModel {
    protected players: IPlayers = {};

    public attachPlayer(id: string): PlayerModel {
        const player = new PlayerModel(id);
        this.players[id] = player;

        return player;
    }

    public updatePlayerPositionFromSocket(id: string, position: ICurrentPlayerPosition) {
        this.players[id].setPosition(position.x_pos, position.y_pos);
    }

    public removePlayer(id: string){
        if(this.players[id]){
            delete this.players[id];
        }
    }

    public getState(): IPlayerState[] {
        return Object.values(this.players).map((player: PlayerModel) => player.getState());
    }
}
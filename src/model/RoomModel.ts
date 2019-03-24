import { IPlayer, IPlayerPosition, IPlayers, IPlayerState } from "../interfaces/PlayerInterfaces";
import { PlayerPosition } from "./PlayerPosition";
import { ICurrentPlayerPosition } from "../interfaces/ClientInterfaces";
import { PlayerModel } from "./PlayerModel";


export class RoomModel {
    protected players: IPlayers = {};

    public attachPlayer(id: string): PlayerModel {
        const player = new PlayerModel(id);
        this.players[id] = player;

        return player;
    }

    public updateUserPositionFromSocket(id: string, position: ICurrentPlayerPosition) {
        this.players[id].position.setFromSocket(position);
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
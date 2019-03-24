import { IPlayer, IPlayerPosition, IPlayers, IPlayerState } from "../interfaces/PlayerInterfaces";
import { PlayerPosition } from "./PlayerPosition";
import { ICurrentPlayerPosition } from "../interfaces/ClientInterfaces";


export class RoomModel {
    protected players: IPlayers = {};

    public attachPlayer(id: string){
        this.players[id] = {
            id,
            position: new PlayerPosition()
        }
    }

    public updateUserPositionFromSocket(id: string, position: ICurrentPlayerPosition){
        this.players[id].position.setFromSocket(position);
    }

    public getState(): IPlayerState[] {
        return Object.values(this.players).map((player: IPlayer) => ({
            id: player.id,
            position: player.position.getState(),
        }));
    }
}
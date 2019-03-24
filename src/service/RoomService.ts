import { FailedFunctionResult } from "../type/CommonTypes";
import { RoomModel } from "../model/RoomModel";
import { SocketModel } from "../model/SocketModel";
import { EventEmitter } from "events";
import { ICurrentPlayerPosition } from "../interfaces/ClientInterfaces";
import { PlayerModel } from "../model/PlayerModel";

export class RoomService {
    private name: string;
    private roomModel : RoomModel;
    private bus: EventEmitter;
    private interval: NodeJS.Timeout;

    public constructor() {
        this.name = this.getRoomName();
        this.roomModel = new RoomModel();
        this.interval = setInterval(() => {
            this.tick();
        }, 100);
        this.bus = new EventEmitter();
    }

    public attachClient(client: SocketModel){
        const player: PlayerModel = this.roomModel.attachPlayer(client.id);
        const playerPayload = {name: this.name, client: {id: client.id}, player: player.getState() };
      
        this.dispatch('clientConnected', playerPayload);
      
        client.connectedInRoom(playerPayload);
        
        client.attachListener('client_position', this.getPositionListener(client.id));

        client.attachListener('disconnect', (): void => {
            this.removePlayer(client);
        });
    }

    public removePlayer(client: SocketModel){
        const id: string = client.id;

        this.roomModel.removePlayer(id);
        client.removeListener('client_position', this.getPositionListener(id));
        
        this.bus.emit('playerRemoved', {client: {id}});
    }

    public tick(){
        this.bus.emit('tick', {
            name: this.name,
            state: this.roomModel.getState(),
        })
    }

    public on(eName: string, callback: (...args:any[]) => any): RoomService {
        this.bus.addListener(eName, callback);

        return this;
    }

    private dispatch(eName: string, payload: {}){
        this.bus.emit(eName, payload);
    }

    private getPositionListener = (clientId: string) => (position: ICurrentPlayerPosition): void => {
        this.roomModel.updateUserPositionFromSocket(clientId, position);
    };

    private getRoomName(): string {
        return 'ROOM';
    }
}
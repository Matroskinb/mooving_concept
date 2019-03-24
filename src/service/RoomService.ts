import { FailedFunctionResult } from "../type/CommonTypes";
import { RoomModel } from "../model/RoomModel";
import { SocketModel } from "../model/SocketModel";
import { EventEmitter } from "events";
import { ICurrentPlayerPosition } from "../interfaces/ClientInterfaces";

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
        client.invitedInRoom(this.name);
        this.roomModel.attachPlayer(client.id);
        this.dispatch('clientConnected', {name: this.name, client: {id: client.id}});
        client.attachListener('client_position', (position: ICurrentPlayerPosition): void => {
            this.roomModel.updateUserPositionFromSocket(client.id, position);
        });
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

    private getRoomName(): string {
        return 'ROOM';
    }
}
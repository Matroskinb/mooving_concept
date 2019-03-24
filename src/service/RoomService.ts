import { FailedFunctionResult } from "../type/CommonTypes";
import { RoomModel } from "../model/RoomModel";
import { SocketModel } from "../model/SocketModel";
import { EventEmitter } from "events";

export class RoomService {
    private room: string;
    private roomModel : RoomModel;
    private bus: EventEmitter;
    private interval: NodeJS.Timeout;

    public constructor() {
        this.room = this.getRoomName();
        this.roomModel = new RoomModel();
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
        this.bus = new EventEmitter();
    }

    public attachClient(client: SocketModel){
        client.invitedInRoom(this.room);
        this.roomModel.attachPlayer(client.id);
        this.dispatch('clientAttached', {room: this.room, client});
    }

    public tick(){
        this.bus.emit('tick', {
            name: this.room,
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
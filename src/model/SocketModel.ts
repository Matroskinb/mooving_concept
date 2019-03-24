export class SocketModel {

    get id(){
        return this.socket.id;
    }
    private socket: SocketIO.Socket;

    public constructor(socket: SocketIO.Socket){
        this.socket = socket;
    }

    public invitedInRoom(name: string){
        this.socket.join(name, () => {
            this.notifyRoomConnection(name);
        });
    }

    public attachListener(eName: string, callback: (...args: any[]) => void){
        this.socket.on(eName, callback);
    }

    private notifyRoomConnection(name: string){
        this.socket.emit('room_connected', {
            room: {
                name,
            }
        });
    }
}
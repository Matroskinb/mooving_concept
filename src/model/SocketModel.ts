export class SocketModel {

    get id(){
        return this.socket.id;
    }
    private socket: SocketIO.Socket;

    public constructor(socket: SocketIO.Socket){
        this.socket = socket;
    }
    
    public connectedInRoom(payload: {}){
        this.socket.emit('room_connected', payload);
    }

    public attachListener(eName: string, callback: (...args: any[]) => void){
        this.socket.on(eName, callback);
    }
}
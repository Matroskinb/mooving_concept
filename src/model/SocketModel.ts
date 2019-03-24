export class SocketModel {
    private socket: SocketIO.Socket;

    public constructor(socket: SocketIO.Socket){
        this.socket = socket;
    }

    get id(){
        return this.socket.id;
    }

    public invitedInRoom(name: string){
        this.socket.join(name, () => {
            // callback
        })
    }
}
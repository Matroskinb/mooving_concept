import * as SocketIO from 'socket.io';
import { RoomService } from './src/service/RoomService';
import { SocketModel } from './src/model/SocketModel';
import { IRoomTickInterface } from './src/interfaces/RoomInterfaces';

const serverSocket = SocketIO(3000);
const roomService = new RoomService();

roomService.on('tick', (room: IRoomTickInterface): void => {
    serverSocket.to(room.name).emit('room_state_changed', {
        state: room.state,
    })
})

serverSocket.on('connect', function(socket: SocketIO.Socket){
    console.log('New connection: ' + socket.id);
    const socketModel = new SocketModel(socket);
    //подключаем юзера в команту
    roomService.attachClient(socketModel);
});

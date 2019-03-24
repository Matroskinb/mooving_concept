import * as SocketIO from 'socket.io';
import { RoomService } from './src/service/RoomService';
import { SocketModel } from './src/model/SocketModel';
import { IRoomEvent } from './src/interfaces/RoomInterfaces';

const serverSocket = SocketIO(3000);
const roomService = new RoomService();

roomService.on('tick', (e: IRoomEvent): void => {
    serverSocket.to(e.name).emit('room_state_changed', {
        state: e.state,
    })
})

roomService.on('clientConnected', (e: IRoomEvent): void => {
    serverSocket.to(e.name).emit('room_client_connected', {
        player: e.player,
    });
});

serverSocket.on('connect', function(socket: SocketIO.Socket){
    console.log('New connection: ' + socket.id);
    const socketModel = new SocketModel(socket);
    // подключаем юзера в команту
    roomService.attachClient(socketModel);
});

import * as SocketIO from 'socket.io';
import { RoomService } from './src/service/RoomService';
import { SocketModel } from './src/model/SocketModel';
import { IRoomEvent } from './src/interfaces/RoomInterfaces';

const serverSocket = SocketIO(3000);
const roomService = new RoomService();
// tslint:disable-next-line:no-console
console.log('server started');

roomService.on('tick', (e: IRoomEvent): void => {
    serverSocket.to(e.name).emit('room_state_changed', {
        state: e.state,
    })
})

roomService.on('clientConnected', (e: IRoomEvent): void => {
    
    serverSocket.to(e.name).emit('room_client_connected', {
        player: e.player,
        state: e.state,
    });
});

serverSocket.on('connect', function(socket: SocketIO.Socket){
    console.log('New connection: ' + socket.id);
    const socketModel = new SocketModel(socket);
    // подключаем юзера в команту
    try {
        roomService.attachClient(socketModel);
    } catch(e){
        console.log('server has error', e);
    }
});

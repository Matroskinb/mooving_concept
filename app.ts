import * as SocketIO from 'socket.io';

const serverSocket = SocketIO();

const roomMessageCallback: Function = (socket: SocketIO.Socket) => (...args: any[]) => {
    socket.to('__default_room').emit('socket message', {
        socket_id: socket.id,
        type: 'client_message',
        payload: args
    });
};

serverSocket.on('connect', function(socket: SocketIO.Socket){
    console.log('New connection: ' + socket.id);
    //подключаем юзера в команту
    socket.join('__default_room', () => {
        serverSocket.to('__default_room').emit('user connected', {
            socket_id: socket.id,
            type: 'server_message'
        });
    });
    //принимаем сообщение
    socket.on('room_message', roomMessageCallback(socket));
});
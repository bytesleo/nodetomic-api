export let socket = null;
export let io = null;

// Constructor
export default (_socket, _io) => {
    socket = _socket;
    io = _io;
    on();
}

// Here should be all events 'on'
export function on() {
    socket.on('example:add', data => emit('add', data));
    socket.on('example:delete', data => emit('delete', data));
}

// Emit events
export function emit(event, data) {
    io.emit(event, data);
}
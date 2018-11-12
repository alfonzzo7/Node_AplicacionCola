// Estableciendo conexión
var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Se perdio la conexión con el servidor');
});

socket.on('estadoActual', function(ticket) {
    label.text(ticket.actual);
});

$('#nuevoTicket').on('click', function() {
    socket.emit('siguienteTicket', null, function(resp) {
        label.text(resp);
    });
});
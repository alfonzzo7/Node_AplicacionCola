// Estableciendo conexión
var socket = io();

var atendiendo = $('#atendiendo');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
$('#escritorio').text(escritorio);

$('#atenderTicket').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets pendientes') {
            alert(resp);
            atendiendo.text(resp);
            return;
        }

        atendiendo.text('Ticket ' + resp.numero);
    });
});
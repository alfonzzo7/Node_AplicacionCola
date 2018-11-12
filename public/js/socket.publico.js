// Estableciendo conexión
var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(ticket) {
    // console.log(ticket);
    actualizaHTML(ticket.ultimos4);
});

socket.on('actualizarEstado', function(ticket) {
    // console.log(ticket);
    var audio = new Audio('../audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(ticket.ultimos4);
});

function actualizaHTML(ultimos4) {
    for (var index = 0; index < ultimos4.length; index++) {
        lblTickets[index].text('Ticket ' + ultimos4[index].numero);
        lblEscritorios[index].text('Escritorio ' + ultimos4[index].escritorio);

    }
}
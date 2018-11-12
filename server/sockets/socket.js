const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('siguienteTicket', (data, callback) => {

        let ticket = ticketControl.siguienteTicket();
        callback(ticket);

    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            callback({
                error: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        // Emitir evento para actualizar pantalla de status de tickets
        client.broadcast.emit('actualizarEstado', {
            ultimos4: ticketControl.getUltimos4()
        });
    });

});
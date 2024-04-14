import { ColecciondeCartas } from "./ColecciondeCartas.js";
import { Carta, Color, Tipo, Rareza } from "./Carta.js";
import { EventEmitter } from "events";
import net from 'net';

/**
 * Clase que extiende EventEmitter para manejar eventos relacionados con la comunicación de cartas.
 */
export class EventEmitterServer extends EventEmitter {
  /**
   * Crea una nueva instancia de EventEmitterServer.
   * @param connection - Objeto EventEmitter que representa la conexión del cliente.
   */
  constructor(connection: EventEmitter) {
    super();

    let wholeData = '';

    // Escucha el evento 'data' para recibir datos del cliente.
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      // Parsea los datos recibidos como JSON.
      const message = JSON.parse(wholeData);

      // Emite el evento 'cartason' si el mensaje contiene una clave.
      if (message.key) {
        this.emit('cartason', JSON.parse(wholeData), connection);
      }
    });

    // Escucha el evento 'close' para la conexión del cliente.
    connection.on('close', () => {
      this.emit('close');
    });
  }
}

// Crea una nueva colección de cartas.
const NuevaColeccion = new ColecciondeCartas();

// Crea un servidor TCP para gestionar las solicitudes de los clientes.
const server = net.createServer((connection) => {
  console.log('Cliente conectado');

  // Crea una instancia de EventEmitterServer para manejar eventos de la conexión del cliente.
  const serverSocket = new EventEmitterServer(connection);

  // Maneja el evento 'cartason' emitido por serverSocket.
  serverSocket.on('cartason', (message, connection) => {
    switch (message.key) {
      case 'add':
        // Agrega una carta a la colección.
        let carta_add: Carta | undefined = undefined;
        if (message.key === 'add') {
          const nuevaCarta: Carta = {
            // Crea un objeto Carta con los datos recibidos.
            id: message.carta.id,
            nombre: message.carta.nombre,
            mana: message.carta.mana,
            color: message.carta.color as Color,
            tipo: message.carta.tipo as Tipo,
            rareza: message.carta.rareza as Rareza,
            reglas: message.carta.reglas,
            fuerza: message.carta.fuerza,
            resistencia: message.carta.resistencia,
            lealtad: message.carta.lealtad,
            valor_mercado: message.carta.valor_mercado
          };
          carta_add = nuevaCarta;
        }
        console.log("Solicitud recibida", message.key);

        // Agrega la carta a la colección y envía la respuesta al cliente.
        if (carta_add !== undefined) {
          NuevaColeccion.agregarcarta(message.usuario, carta_add, (error, result) => {
            if (error) {
              connection.write(JSON.stringify({ type: 'Error', value: error }));
            } else {
              connection.write(JSON.stringify({ type: 'OK', value: result }));
            }
          });
        } else {
          console.error("No se encontró una carta para agregar.");
        }
        connection.end();
        break;

      case 'update':
        // Actualiza una carta en la colección.
        let carta_up: Carta | undefined = undefined;
        if (message.key === 'update') {
          const nuevaCarta: Carta = {
            // Crea un objeto Carta con los datos recibidos.
            id: message.carta.id,
            nombre: message.carta.nombre,
            mana: message.carta.mana,
            color: message.carta.color as Color,
            tipo: message.carta.tipo as Tipo,
            rareza: message.carta.rareza as Rareza,
            reglas: message.carta.reglas,
            fuerza: message.carta.fuerza,
            resistencia: message.carta.resistencia,
            lealtad: message.carta.lealtad,
            valor_mercado: message.carta.valor_mercado
          };
          carta_up = nuevaCarta;
        }
        console.log("Solicitud recibida", message.key);

        // Modifica la carta en la colección y envía la respuesta al cliente.
        if (carta_up !== undefined) {
          NuevaColeccion.modificarcarta(message.usuario, carta_up, (error, result) => {
            if (error) {
              connection.write(JSON.stringify({ type: 'Error', value: error }));
            } else {
              connection.write(JSON.stringify({ type: 'OK', value: result }));
            }
          });
        } else {
          console.error("No se encontró una carta para modificar.");
        }
        connection.end();
        break;

      case 'list':
        // Lista las cartas en la colección.
        console.log("Solicitud recibida", message.key);

        // Envía la lista de cartas al cliente.
        NuevaColeccion.listarcartas(message.usuario, (error, result) => {
          if (error) {
            connection.write(JSON.stringify({ type: 'Error', value: error }));
          } else {
            connection.write(JSON.stringify({ type: 'LIST', value: result }));
          }
        });
        connection.end();
        break;

      case 'remove':
        // Elimina una carta de la colección.
        console.log("Solicitud recibida", message.key);

        // Elimina la carta de la colección y envía la respuesta al cliente.
        NuevaColeccion.eliminarcarta(message.usuario, message.cartaid, (error, result) => {
          if (error) {
            connection.write(JSON.stringify({ type: 'Error', value: error }));
          } else {
            connection.write(JSON.stringify({ type: 'OK', value: result }));
          }
        });
        connection.end();
        break;

      case 'read':
        // Muestra los detalles de una carta de la colección.
        console.log("Solicitud recibida", message.key);

        // Obtiene los detalles de la carta y los envía al cliente.
        NuevaColeccion.mostrarcarta(message.usuario, message.cartaid, (error, result) => {
          if (error) {
            connection.write(JSON.stringify({ type: 'Error', value: error }));
          } else {
            connection.write(JSON.stringify({ type: 'READ', value: result }));
          }
        });
        connection.end();
        break;
    }
  });
});

// Escucha conexiones en el puerto 60300.
server.listen(60300, () => {
  console.log('Esperando usuarios');
});

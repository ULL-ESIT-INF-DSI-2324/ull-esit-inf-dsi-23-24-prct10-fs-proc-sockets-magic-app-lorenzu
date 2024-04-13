import { ColecciondeCartas } from "./ColecciondeCartas.js";
import { Carta, Color, Tipo, Rareza } from "./Carta.js";
import { EventEmitter } from "events";
import net from 'net';
import { json } from "stream/consumers";
import { error } from "console";

export class EventEmitterServer extends EventEmitter {
  constructor(connection: EventEmitter){
    super();
    let wholeData = '';
    connection.on('data', (dataChunk) => {
      wholeData += dataChunk;

      const message = JSON.parse(wholeData)
      if(message.key){
        this.emit('cartason', JSON.parse(wholeData), connection);
      }

    });
    
    connection.on('close', () => {
      this.emit('close')
    });

  }
}

const NuevaColeccion = new ColecciondeCartas();

const server = net.createServer((connection) => {
  console.log('Cliente conectado');

  const serverSocket = new EventEmitterServer(connection);
  serverSocket.on('cartason', (message, connection) => {
    switch (message.key){
      case 'add': 
      let carta_add: Carta | undefined = undefined;
      if(message.key === 'add'){
        const nuevaCarta: Carta = {
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
        }
        carta_add = nuevaCarta;
      }
      console.log("Solicitud recibida", message.key);
      if (carta_add !== undefined) {
        NuevaColeccion.agregarcarta(message.usuario, carta_add, (error, result) => {
          if(error){
            connection.write(JSON.stringify({type: 'Error', value: error}))
          } else {
            connection.write(JSON.stringify({type: 'OK', value: result}))
          }
        }) //añadir callbacks
      } else {
        console.error("No se encontró una carta para agregar.");
      }
      connection.end();
    break;

    case 'update':
      let carta_up: Carta | undefined = undefined;
      if(message.key === 'update'){
        const nuevaCarta: Carta = {
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
        }
        carta_up = nuevaCarta;
      }
      console.log("Solicitud recibida", message.key);
      if (carta_up !== undefined) {
        NuevaColeccion.modificarcarta(message.usuario, carta_up, (error, result) => {
          if(error){
            connection.write(JSON.stringify({type: 'Error', value: error}))
          } else {
            connection.write(JSON.stringify({type: 'OK', value: result}))
          }
        }) //añadir callbacks
      } else {
        console.error("No se encontró una carta para modificar.");
      }
      connection.end();
      break;
    
    case 'list':
    console.log("Solicitud recibida", message.key);
    NuevaColeccion.listarcartas(message.usuario, (error, result) => {
      if (error){
        connection.write(JSON.stringify({type: 'Error', value: error}))
      } else {
        connection.write(JSON.stringify({type: 'LIST', value: result}))
      }
    })
    connection.end();
    break;

    case 'remove':
      console.log("Solicitud recibida", message.key);
      NuevaColeccion.eliminarcarta(message.usuario, message.cartaid, (error, result) => {
        if(error){
          connection.write(JSON.stringify({type: 'Error', value: error}))
        } else {
          connection.write(JSON.stringify({type: 'OK', value: result}))
        }
      })
      connection.end();
      break;

      case 'read':
      console.log("Solicitud recibida", message.key);
        NuevaColeccion.mostrarcarta(message.usuario, message.cartaid, (error, result) => {
          if (error){
            connection.write(JSON.stringify({type: 'Error', value: error}))
          } else {
            connection.write(JSON.stringify({type: 'READ', value: result}))
          }
        })
        connection.end();
        break; 
   }
   
  })

})

server.listen(60300, () => {
  console.log('esperando magos');
})
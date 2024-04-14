## Introducción
El desarrollo de aplicaciones cliente-servidor utilizando sockets en TypeScript proporciona una poderosa herramienta para la comunicación entre diferentes dispositivos o programas a través de una red. Los sockets permiten la transferencia de datos en tiempo real de manera eficiente y confiable, lo que los convierte en una opción popular para una amplia gama de aplicaciones, desde juegos en línea y aplicaciones de chat hasta sistemas de intercambio de archivos y servicios de transmisión de video.

Para desarrollar aplicaciones cliente-servidor con sockets en TypeScript, es común utilizar bibliotecas como net para la creación de servidores TCP/IP. Estas bibliotecas proporcionan interfaces simples pero potentes para trabajar con sockets, permitiendo a los desarrolladores crear aplicaciones escalables y de alto rendimiento.


# `Carta.ts`

## Enumeraciones
```
/**
 * Enumeración que define los posibles tipos de carta.
 */
export enum Tipo {
  Tierra = "Tierra",
  Criatura = "Criatura",
  Encantamiento = "Encantamiento",
  Conjuro = "Conjuro",
  Instantaneo = "Instantaneo",
  Artefacto = "Artefacto",
  Planeswalker = "Planeswalker"
}

/**
 * Enumeración que define los posibles colores de una carta.
 */
export enum Color {
  Blanco = "Blanco",
  Azul = "Azul",
  Negro = "Negro",
  Rojo = "Rojo",
  Verde = "Verde",
  Incoloro = "Incoloro",
  Multicolor = "Multicolor"
}

/**
 * Enumeración que define las posibles rarezas de una carta.
 */
export enum Rareza {
  Comun = "Común",
  Infrecuente = "Infrecuente",
  Rara = "Rara",
  Mitica = "Mítica"
}
```
- Se definen tres enumeraciones: Tipo, Color y Rareza.
- Cada una contiene un conjunto de valores que representan los tipos, colores y rarezas respectivamente de las cartas del juego.

## Interfaz de Carta
```
/**
 * Interfaz que define la estructura de una carta.
 */
export interface Carta {
  id: number;
  nombre: string;
  mana: number;
  color: Color;
  tipo: Tipo;
  rareza: Rareza;
  reglas: string;
  fuerza?: number;
  resistencia?: number;
  lealtad?: number;
  valor_mercado: number;
}
```
- Se define una interfaz Carta que describe la estructura de una carta del juego.
- Esta interfaz especifica los atributos que puede tener una carta, como el `ID, nombre, mana, color, tipo, rareza, reglas,` entre otros.

## Función `checkUserDirectory`
```
/**
 * Función que verifica si existe el directorio de usuario y lo devuelve.
 * @param usuario Nombre del usuario.
 * @returns Ruta del directorio del usuario.
 */
export function checkUserDirectory(usuario: string): string {
  const userDirectory = `./cartas/${usuario}/`;
  if(!fs.existsSync(userDirectory)){
    fs.mkdirSync(userDirectory, {recursive: true});
  }
  return userDirectory;
}
```
- Esta función verifica si existe el directorio del usuario en el sistema de archivos.
- Si el directorio no existe, lo crea utilizando fs.mkdirSync.
- Devuelve la ruta del directorio del usuario.

## Función `Mostrarporpantalla`
```
/**
 * Función que muestra por pantalla la información de una carta.
 * @param data Datos de la carta en formato JSON.
 */
export function Mostrarporpantalla(data: string): void {
  const carta = JSON.parse(data);
  console.log('-------------------------------------------------------');
  console.log('Contenido de la carta:');
  console.log('ID:', carta.id);
  console.log('Nombre:', carta.nombre);
  console.log('Mana:', carta.mana);
  switch (carta.color){
    case "Blanco": 
    console.log('Color:', chalk.bgWhite(carta.color));
    break;
    case "Negro": 
    console.log('Color:', chalk.bgBlack(carta.color));
    break;
    case "Incoloro": 
    console.log('Color:', chalk.bgGray(carta.color));
    break;
    case "Rojo": 
    console.log('Color:', chalk.bgRed(carta.color));
    break;
    case "Verde": 
    console.log('Color:', chalk.bgGreen(carta.color));
    break;
    case "Azul": 
    console.log('Color:', chalk.bgBlue(carta.color));
    break;
    case "Multicolor": 
    console.log('Color:', chalk.bgYellow(carta.color));
    break;
  }
  console.log('Tipo:', carta.tipo);
  console.log('Rareza:', carta.rareza);
  console.log('Reglas:', carta.reglas);
  if(carta.tipo === "Criatura"){
  console.log('Fuerza:', carta.fuerza);
  console.log('Resistencia:', carta.resistencia);
  }
  if(carta.tipo === "Planeswalker") {
    console.log('Lealtad:', carta.lealtad);
  }
  console.log('Valor de mercado:', carta.valor_mercado);
}

```

- Esta función recibe un string con datos de una carta en formato JSON.
- Parsea estos datos y muestra la información de la carta en la consola.
- Aplica colores en la consola dependiendo del color de la carta utilizando la librería 'chalk'.
- Muestra información adicional como la fuerza, resistencia o lealtad de la carta según su tipo.
Estos fragmentos de código conforman una utilidad para manipular cartas de un juego, desde la definición de sus atributos hasta la visualización de la información en la consola.


# `Client.ts`

## Conexión
```
const client = net.connect({port: 60300});
```
- Se establece una conexión con el servidor en el puerto 60300 utilizando el módulo 'net'.

## Comandos con yargs
```
// elimina cartas por linea de comandos
 yargs(hideBin(process.argv))
  .command('remove', 'elimina una carta de la coleccion', {

  usuario: {
   description: 'Usuario de la coleccion',
   type: 'string',
   demandOption: true
  },

  id: {
    description: 'Card ID',
    type: 'number',
    demandOption: true
  }
 }, (argv) => {

  const message = JSON.stringify({usuario: argv.usuario, cartaid: argv.id, key: 'remove'})
  client.write(message);
  
 })
 .help()
 .argv;
```

- Se definen varios comandos de línea de comandos (CLI) utilizando el módulo 'yargs'. Estos comandos incluyen 'add', 'remove', 'list', 'read' y 'update', cada uno con sus propios argumentos y funciones de manejo de comandos.
- Cada comando definido anteriormente tiene asociada una función de manejo de comandos, que se ejecuta cuando se invoca el comando correspondiente desde la línea de comandos.
- Estas funciones de manejo de comandos realizan operaciones como agregar, eliminar, listar, leer o actualizar cartas en la colección del usuario.

## Interacción con el servidor
```
const message = JSON.stringify({usuario: argv.usuario, carta: nuevaCarta, key: 'update'})
client.write(message);
```
- Después de procesar los comandos, se envían mensajes al servidor a través del cliente TCP creado anteriormente (client.write(message)).
- Se espera una respuesta del servidor y se maneja según el tipo de respuesta recibida. Dependiendo de la respuesta, se puede imprimir información en la consola o mostrar cartas.

## Manejo de datos recibidos desde el servidor
```
let wholeData = '';
 client.on('data', (dataChunk) => {
 wholeData += dataChunk;
});

// Cuando se acabe la conexión dependiendo del tipo de respuesta hará una cosa u otra
 client.on('end', () => {
  const respuesta = JSON.parse(wholeData)
  switch(respuesta.type){
    case 'OK':
      console.log(respuesta.value)
      break;
    case 'LIST':
      respuesta.value.forEach((carta: string) => {
        Mostrarporpantalla(carta)
      });
      break;
    case 'READ':
      Mostrarporpantalla(respuesta.value)
      break;
    case 'Error':
      console.log(respuesta.value)
      break;
  }
 })
```
- Se escuchan los datos recibidos del servidor (client.on('data', ...)) y se almacenan en una variable wholeData.
- Cuando la conexión con el servidor termina (client.on('end', ...)), se analizan los datos recibidos y se ejecuta una acción correspondiente según el tipo de respuesta recibida.

# `Server.ts` 

## Clase `EventEmitterServer`
```
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
```
- Esta clase extiende EventEmitter para manejar eventos relacionados con la comunicación de cartas.
- En el constructor, se establece un manejador de eventos para el evento 'data' en la conexión del cliente.
- Cuando se recibe un fragmento de datos del cliente, se acumula en una variable wholeData, y si contiene una clave, se emite un evento 'cartason' con los datos acumulados y la conexión.
- También se establece un manejador de eventos para el evento 'close' en la conexión del cliente, que emite un evento 'close'.

## Creación del servidor y manejos
```
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

```
- Se crea un servidor TCP utilizando net.createServer(), que escucha las conexiones de los clientes en el puerto 60300.
- Cuando se establece una conexión con un cliente, se muestra un mensaje indicando que el cliente está conectado.
- Se crea una instancia de EventEmitterServer para manejar eventos relacionados con la conexión del cliente.
  
- Cuando se emite el evento 'cartason', se realiza un procesamiento basado en la clave del mensaje recibido.
- Dependiendo de la clave, se ejecutan diferentes acciones, como agregar, actualizar, listar, eliminar o mostrar cartas en la colección.
- Se envían respuestas al cliente después de realizar cada acción.

## Inicio del servidor
```
server.listen(60300, () => {
  console.log('Esperando usuarios');
});
```
- Se inicia el servidor TCP, que comienza a escuchar conexiones en el puerto 60300.

En resumen, este código establece un servidor TCP que maneja solicitudes de clientes relacionadas con la gestión de una colección de cartas. Utiliza eventos para gestionar la comunicación con los clientes y realiza operaciones como agregar, actualizar, listar, eliminar o mostrar cartas en la colección.


# `ColecciondeCartas.ts`
```
import * as fs from 'fs';
import chalk from 'chalk';
import { Carta, checkUserDirectory, Mostrarporpantalla, Tipo, Color, Rareza } from './Carta.js';
import { json } from 'stream/consumers';

/**
 * Clase que representa una colección de cartas mágicas.
 */
export class ColecciondeCartas {
  public coleccion: Carta[]; // Una colección de cartas para los usuarios

  /**
   * Constructor de la clase ColecciondeCartas.
   * Inicializa la colección de cartas vacía.
   */
  constructor(){
    this.coleccion = [];
  }

  /**
   * Método para agregar una carta a la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param nuevaCarta Carta que se desea agregar.
   */
  public agregarcarta(usuario: string , nuevaCarta: Carta, callback :(error: string | undefined, mensaje?: string) => void ): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + nuevaCarta.id + '.json';

    if(fs.existsSync(filePath)){
      callback(chalk.red(`Error: ya existe una carta con ese ID en la colección de ${usuario}`))
    } else {
      fs.writeFileSync(filePath, JSON.stringify(nuevaCarta));
      callback(undefined, chalk.green(`Carta agregada a la colección de ${usuario}`))
    }
  }

  /**
   * Método para eliminar una carta de la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param id ID de la carta que se desea eliminar.
   */
  public eliminarcarta(usuario: string, id: number, callback :(error: string | undefined, mensaje?: string) => void): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + id + '.json';
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
      callback(undefined, chalk.green(`Carta eliminada de la colección de ${usuario}`))
    } else {
      callback(chalk.red(`La carta no existe en la colección de ${usuario}no existe la dir ${filePath}`))
    }
  }

  /**
   * Método para modificar una carta de la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param carta Carta modificada que se desea guardar.
   */
  public modificarcarta(usuario: string, carta: Carta, callback :(error: string | undefined, mensaje?: string) => void): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + carta.id + '.json';
    if(fs.existsSync(filePath)){
      fs.writeFileSync(filePath, JSON.stringify(carta));
      callback(undefined, chalk.green(`Carta modificada en la colección de ${usuario}`))
      return;
    } else {
      callback(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  /**
   * Método para mostrar por pantalla la información de una carta de un usuario.
   * @param usuario Nombre del usuario.
   * @param id ID de la carta que se desea mostrar.
   */
  public mostrarcarta(usuario: string, id: number, callback :(error: string | undefined, mensaje?: string) => void): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + id + '.json';
    if(fs.existsSync(filePath)){
      const data = fs.readFileSync(filePath).toString();
      //Mostrarporpantalla(data);
      callback(undefined, data)
      return;
    } else {
      callback(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  /**
   * Método para listar todas las cartas de un usuario por pantalla.
   * @param usuario Nombre del usuario.
   */
  public listarcartas(usuario: string,  callback :(error: string | undefined, mensaje?: string[]) => void): void {
    const userDirectory = checkUserDirectory(usuario);
    let cartasListadas : string[] = [];
    if(!fs.existsSync(userDirectory)){
      callback(chalk.red(`${usuario} no dispone de cartas`))
    } else {
      const cartas = fs.readdirSync(userDirectory);
      cartas.forEach((archivo) => {
        let filePath: string  = userDirectory + `${archivo}`;
        const carta = fs.readFileSync(filePath).toString();
        //Mostrarporpantalla(carta);
        cartasListadas.push(carta);

      });
      callback(undefined, cartasListadas)

    }
  }
}

// Ejemplos de cartas
const NuevaColeccion = new ColecciondeCartas;

const nuevaCarta1: Carta = {
  id: 1,
  nombre: "Black Lotus",
  mana: 0,
  color: "Incoloro" as Color,
  tipo: "Artefacto" as Tipo,
  rareza: "Mítica" as Rareza,
  reglas: "Puedes sacrificar el Black Lotus para añadir tres manás de cualquier color.",
  valor_mercado: 100000
};

const nuevaCarta2: Carta = {
  id: 2,
  nombre: "Lightning Bolt",
  mana: 1,
  color: "Rojo" as Color,
  tipo: "Conjuro" as Tipo,
  rareza: "Común" as Rareza,
  reglas: "Lightning Bolt hace 3 puntos de daño a cualquier objetivo.",
  valor_mercado: 1
};

const nuevaCarta3: Carta = {
  id: 3,
  nombre: "Jace, the Mind Sculptor",
  mana: 4,
  color: "Azul" as Color,
  tipo: "Planeswalker" as Tipo,
  rareza: "Mítica" as Rareza,
  reglas: "+2: Miras las tres primeras cartas de la biblioteca de un oponente, y las pones en cualquier orden.\n-1: Regresas la carta objetivo a la mano de su propietario.\n-12: Exilias todas las cartas en la mano y en la biblioteca de un oponente, y ganas 7 vidas por cada carta exiliada de esta manera.",
  lealtad: 3,
  valor_mercado: 80
};


```

Esta clase representa una colección de cartas mágicas.
Contiene métodos para agregar, eliminar, modificar, mostrar y listar cartas en la colección de un usuario.
  - Método agregarcarta:
    - Agrega una nueva carta a la colección de un usuario.
    - Verifica si ya existe una carta con el mismo ID en la colección.
    - Escribe la carta en un archivo JSON en el directorio del usuario.
  
  - Método eliminarcarta:
    - Elimina una carta de la colección de un usuario.
    - Verifica si la carta existe en la colección y la elimina del directorio del usuario.

  - Método modificarcarta:
    - Modifica una carta existente en la colección de un usuario.
    - Verifica si la carta existe en la colección y actualiza su información en el archivo JSON correspondiente.

  - Método mostrarcarta:
    - Muestra la información de una carta específica de la colección de un usuario.
    - Lee el archivo JSON de la carta y muestra su contenido.

  - Método listarcartas:
    - Lista todas las cartas en la colección de un usuario.
    - Lee todos los archivos JSON en el directorio del usuario y muestra la información de cada carta.

  - Creación de instancias de cartas de ejemplo:
    - Se crean instancias de cartas de ejemplo para usar en las pruebas.
    - En resumen, esta clase proporciona funcionalidades para gestionar una colección de cartas mágicas, incluyendo la capacidad de agregar, eliminar, modificar, mostrar y listar cartas para un       usuario específico.

## Conclusión
En conclusión, el desarrollo de aplicaciones cliente-servidor con sockets en TypeScript ofrece una solución poderosa y flexible para la comunicación en tiempo real entre dispositivos y programas a través de una red. El uso de TypeScript proporciona la ventaja de la verificación estática de tipos, lo que ayuda a reducir errores y mejorar la calidad del código, especialmente en aplicaciones complejas. El desarrollo de la aplicación ha servido como prototipo para futuros proyectos interesantes






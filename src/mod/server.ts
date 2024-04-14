//Servidor que ejecuta los comandos escritos por el cliente

import net from 'net';
import {spawn} from 'child_process';


// Se establece la conexión y espera a que se envíen datos
  net.createServer((connection) => {
    console.log('A client has connected.');
    connection.on('data', (dataBuffer) => {
        // Recibe el Json del cliente y lo parsea cogiendo el comando y los parámetros
        const message = JSON.parse(dataBuffer.toString());
        console.log(message)
        if(message.parameters !== ''){
            const command = spawn(message.command, [message.parameters]);
            command.stderr.on('error', (data) => {
                console.error("comando no soportado");
            })
            command.stdout.pipe(process.stdout);
        } else if(message.parameters === ''){
            //En este caso el comando se ha enviado con parámetros
            const command = spawn(message.command);
            command.on('error', (data) => {
                console.error("comando no soportado");
            })
            command.stdout.pipe(process.stdout);
        }
        
    })
    
    connection.on('close', () => {
      console.log('A client has disconnected.');
    });
  }).listen(60300, () => {
    console.log('Waiting for clients to connect.');
  });

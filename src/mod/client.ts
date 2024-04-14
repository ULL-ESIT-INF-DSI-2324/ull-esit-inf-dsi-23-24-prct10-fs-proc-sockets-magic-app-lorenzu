// Programa cliente, ejecuta los comandos que se pasan por pantalla en el servidor
import net from 'net';

const client = net.connect({port: 60300});

//Procesa los argumentos escritos por el usuario
//El cliente manda un Json con el comando y los parámetros

if (process.argv.length < 3) {
    console.log('Please, provide a command.');
  } else if(process.argv.length === 3){
    // En este caso solo disponemos de un comando, por lo tanto el campo de parámetros queda vacío
    const command = process.argv[2];
    client.write(JSON.stringify({'command': command, 'parameters': ''}) +
    '\n');
  } else if(process.argv.length > 3){
    
    // En este caso procesamos el comando y sus parámetros
    const command = process.argv[2];
    let parameter:string = '';
    let i = 3;


    while(i < process.argv.length){
        parameter += process.argv[i];
        i++;
    }
    parameter.split(" ");
    client.write(JSON.stringify({'command': command, 'parameters': parameter}) +
    '\n');
    //client.write(command + ", " + parameter);
  }

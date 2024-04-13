import { Carta, Color, Tipo, Rareza } from './Carta.js';
import {  ColecciondeCartas } from "./ColecciondeCartas.js";

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const NuevaColeccion = new ColecciondeCartas;

// Agregar cartas por linea de comandos
yargs(hideBin(process.argv))
  .command('add', 'Agrega una carta a la coleccion', {
  usuario: {
   description: 'Usuario de la coleccion',
   type: 'string',
   demandOption: true
  },
  id: {
    description: 'Card ID',
    type: 'number',
    demandOption: true
  },
  nombre: {
    description: 'Nombre de la carta',
    type: 'string',
    demandOption: true
  },
  mana: {
    description: 'Coste de mana de la carta',
    type: 'number',
    demandOption: true
  },
  color: {
    description: 'Color de la carta',
    type: 'string',
    demandOption: true,
    choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor']
  },
  tipo: { 
    description: 'Tipo de la carta',
    type: 'string', 
    choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'],
    demandOption: true 
  },
  rareza: {
    description: 'Rareza de la carta', 
    type: 'string', 
    choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'], 
    demandOption: true 
  },
  reglas: {
    description: 'Reglas de la carta', 
    type: 'string', 
    demandOption: true 
  },
  fuerza: {
    description: 'Fuerza de la Criatura', 
    type: 'number', 
  },
  resistencia: {
    description: 'Resistencia de la Criatura', 
    type: 'number', 

  },
  lealtad: {
    description: 'Lealtad del Planeswalker', 
    type: 'number',  
  },
  valor: {
    description: 'Valor de la carta en el mercado', 
    type: 'number', 
    demandOption: true 
  },

 }, (argv) => {
  if(argv.tipo === 'Criatura' && argv.fuerza === undefined){
    throw new Error('No has agregado el atributo de Fuerza a la Criatura');
  }
  
  if(argv.tipo === 'Criatura' && argv.resistencia === undefined){
    throw new Error('No has agregado el atributo de Resistencia a la Criatura');
  }
  
  if(argv.tipo === 'Planeswalker' && argv.lealtad === undefined){
    throw new Error('No has agregado la lealtad al Planeswalker');
  }

  if(argv.tipo !== 'Criatura' && argv.fuerza !== undefined) {
    throw new Error('Solo las Criaturas tienen el atributo de fuerza');
  } 

  if(argv.tipo !== 'Criatura' && argv.resistencia !== undefined) {
    throw new Error('Solo las Criaturas tienen el atributo de resistencia');
  }

  if(argv.tipo !== 'Planeswalker' && argv.lealtad !== undefined) {
    throw new Error('Solo los Planeswalker tienen el atributo de lealtad');
  }
  
  const nuevaCarta: Carta = {
    id: argv.id,
    nombre: argv.nombre,
    mana: argv.mana,
    color: argv.color as Color,
    tipo: argv.tipo as Tipo,
    rareza: argv.rareza as Rareza,
    reglas: argv.reglas,
    fuerza: argv.fuerza,
    resistencia: argv.resistencia,
    lealtad: argv.lealtad,
    valor_mercado: argv.valor
  }
  NuevaColeccion.agregarcarta(argv.usuario, nuevaCarta);
  
 })
 .help()
 .argv;


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

  NuevaColeccion.eliminarcarta(argv.usuario, argv.id);
  
 })
 .help()
 .argv;
// Lista cartas por linea de comandos
 yargs(hideBin(process.argv))
 .command('list', 'lista las cartas de una coleccion', {
 usuario: {
  description: 'Usuario de la coleccion',
  type: 'string',
  demandOption: true
 }
}, (argv) => {

 NuevaColeccion.listarcartas(argv.usuario);
 
})
.help()
.argv;

// Muestra cartas por linea de comandos
yargs(hideBin(process.argv))
.command('read', 'muestra una carta de la coleccion', {
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

NuevaColeccion.mostrarcarta(argv.usuario, argv.id);

})
.help()
.argv;

// Modifica cartas por linea de comandos

yargs(hideBin(process.argv))
  .command('update', 'Actualiza una carta de la coleccion', {
  usuario: {
   description: 'Usuario de la coleccion',
   type: 'string',
   demandOption: true
  },
  id: {
    description: 'Card ID',
    type: 'number',
    demandOption: true
  },
  nombre: {
    description: 'Nombre de la carta',
    type: 'string',
    demandOption: true
  },
  mana: {
    description: 'Coste de mana de la carta',
    type: 'number',
    demandOption: true
  },
  color: {
    description: 'Color de la carta',
    type: 'string',
    demandOption: true,
    choices: ['Blanco', 'Azul', 'Negro', 'Rojo', 'Verde', 'Incoloro', 'Multicolor']
  },
  tipo: { 
    description: 'Tipo de la carta',
    type: 'string', 
    choices: ['Tierra', 'Criatura', 'Encantamiento', 'Conjuro', 'Instantaneo', 'Artefacto', 'Planeswalker'],
    demandOption: true 
  },
  rareza: {
    description: 'Rareza de la carta', 
    type: 'string', 
    choices: ['Comun', 'Infrecuente', 'Rara', 'Mitica'], 
    demandOption: true 
  },
  reglas: {
    description: 'Reglas de la carta', 
    type: 'string', 
    demandOption: true 
  },
  fuerza: {
    description: 'Fuerza de la Criatura', 
    type: 'number', 
  },
  resistencia: {
    description: 'Resistencia de la Criatura', 
    type: 'number', 

  },
  lealtad: {
    description: 'Lealtad del Planeswalker', 
    type: 'number',  
  },
  valor: {
    description: 'Valor de la carta en el mercado', 
    type: 'number', 
    demandOption: true 
  },

 }, (argv) => {
  if(argv.tipo === 'Criatura' && argv.fuerza === undefined){
    throw new Error('No has agregado el atributo de Fuerza a la Criatura');
  }
  
  if(argv.tipo === 'Criatura' && argv.resistencia === undefined){
    throw new Error('No has agregado el atributo de Resistencia a la Criatura');
  }
  
  if(argv.tipo === 'Planeswalker' && argv.lealtad === undefined){
    throw new Error('No has agregado la lealtad al Planeswalker');
  }

  if(argv.tipo !== 'Criatura' && argv.fuerza !== undefined) {
    throw new Error('Solo las Criaturas tienen el atributo de fuerza');
  } 

  if(argv.tipo !== 'Criatura' && argv.resistencia !== undefined) {
    throw new Error('Solo las Criaturas tienen el atributo de resistencia');
  }

  if(argv.tipo !== 'Planeswalker' && argv.lealtad !== undefined) {
    throw new Error('Solo los Planeswalker tienen el atributo de lealtad');
  }
  
  const nuevaCarta: Carta = {
    id: argv.id,
    nombre: argv.nombre,
    mana: argv.mana,
    color: argv.color as Color,
    tipo: argv.tipo as Tipo,
    rareza: argv.rareza as Rareza,
    reglas: argv.reglas,
    fuerza: argv.fuerza,
    resistencia: argv.resistencia,
    lealtad: argv.lealtad,
    valor_mercado: argv.valor
  }
  NuevaColeccion.modificarcarta(argv.usuario, nuevaCarta);
 })
 .help()
 .argv;
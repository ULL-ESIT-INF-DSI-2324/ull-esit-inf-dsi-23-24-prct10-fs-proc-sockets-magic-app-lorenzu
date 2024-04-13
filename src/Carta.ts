import * as fs from 'fs';
import chalk from 'chalk';

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

/**
 * Función que verifica si existe el directorio de usuario y lo devuelve.
 * @param usuario Nombre del usuario.
 * @returns Ruta del directorio del usuario.
 */
export function checkUserDirectory(usuario: string): string {
  const userDirectory = `./cartas/${usuario}/`;
  if(!fs.existsSync(userDirectory)){
    //fs.mkdirSync(userDirectory, {recursive: true});
    console.log(chalk.red(`No existe el usuario ${usuario}`))
  }
  return userDirectory;
}

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


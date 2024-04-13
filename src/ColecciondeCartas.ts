import * as fs from 'fs';
import chalk from 'chalk';
import { Carta, checkUserDirectory, Mostrarporpantalla, Tipo, Color, Rareza } from './Carta.js';

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
  public agregarcarta(usuario: string , nuevaCarta: Carta): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + nuevaCarta.id + '.json';

    if(fs.existsSync(filePath)){
      console.log(chalk.red(`Error: ya existe una carta con ese ID en la colección de ${usuario}`))
      return;
    }

    fs.writeFileSync(filePath, JSON.stringify(nuevaCarta));
    console.log(chalk.green(`Carta agregada a la colección de ${usuario}`));
  }

  /**
   * Método para eliminar una carta de la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param id ID de la carta que se desea eliminar.
   */
  public eliminarcarta(usuario: string, id: number): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + id + '.json';
    if(fs.existsSync(filePath)){
      fs.unlinkSync(filePath);
      console.log(chalk.green(`Carta eliminada de la colección de ${usuario}`))
      return;
    } else {
      console.log(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  /**
   * Método para modificar una carta de la colección de un usuario.
   * @param usuario Nombre del usuario.
   * @param carta Carta modificada que se desea guardar.
   */
  public modificarcarta(usuario: string, carta: Carta): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + carta.id + '.json';
    if(fs.existsSync(filePath)){
      fs.writeFileSync(filePath, JSON.stringify(carta));
      console.log(chalk.green(`Carta modificada en la colección de ${usuario}`))
      return;
    } else {
      console.log(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  /**
   * Método para mostrar por pantalla la información de una carta de un usuario.
   * @param usuario Nombre del usuario.
   * @param id ID de la carta que se desea mostrar.
   */
  public mostrarcarta(usuario: string, id: number): void {
    const userDirectory = checkUserDirectory(usuario);
    const filePath = userDirectory + id + '.json';
    if(fs.existsSync(filePath)){
      const data = fs.readFileSync(filePath).toString();
      Mostrarporpantalla(data);
      return;
    } else {
      console.log(chalk.red(`La carta no existe en la colección de ${usuario}`))
    }
  }

  /**
   * Método para listar todas las cartas de un usuario por pantalla.
   * @param usuario Nombre del usuario.
   */
  public listarcartas(usuario: string): void{
    const userDirectory = checkUserDirectory(usuario);
    if(!fs.existsSync(userDirectory)){
      console.log(chalk.red(`${usuario} no dispone de cartas`))
    } else {
      const cartas = fs.readdirSync(userDirectory);
      cartas.forEach((archivo) => {
        let filePath: string  = userDirectory + `${archivo}`;
        const carta = fs.readFileSync(filePath).toString();
        Mostrarporpantalla(carta);
      })
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


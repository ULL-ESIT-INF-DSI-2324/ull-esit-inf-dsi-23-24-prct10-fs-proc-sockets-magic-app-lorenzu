import 'mocha'
import { expect } from 'chai';
import { Carta, Tipo, Color, Rareza } from '../src/Carta.js';
import { ColecciondeCartas } from '../src/ColecciondeCartas.js';
import { EventEmitterServer } from '../src/server.js';
import chalk from 'chalk';
//import { EventEmitter } from "events";

describe ('Tests sobre las cartas', () => {
  it ('crear carta', () => {
    const nuevaCarta: Carta = {
      id: 1,
      nombre: 'Prueba',
      mana: 1,
      color: Color.Azul,
      tipo: Tipo.Criatura,
      rareza: Rareza.Comun,
      reglas: 'Una carta de prueba.',
      valor_mercado: 10
    };
    expect(nuevaCarta.id).to.be.equal(1);
    expect(nuevaCarta.nombre).to.be.equal('Prueba');
    expect(nuevaCarta.mana).to.be.equal(1);
    expect(nuevaCarta.color).to.be.equal('Azul');
    expect(nuevaCarta.tipo).to.be.equal('Criatura');
    expect(nuevaCarta.rareza).to.be.equal('Común');
    expect(nuevaCarta.reglas).to.be.equal('Una carta de prueba.');
    expect(nuevaCarta.valor_mercado).to.be.equal(10);
  });

  

  });

  describe ('Tests sobre las peticiones del test_user', () => {
    it ('add carta', (done) => {
      const coleccion = new ColecciondeCartas;
      const nuevaCarta: Carta = {
        id: 1,
        nombre: 'Prueba',
        mana: 1,
        color: Color.Azul,
        tipo: Tipo.Criatura,
        rareza: Rareza.Comun,
        reglas: 'Una carta de prueba.',
        valor_mercado: 10
      };
      coleccion.agregarcarta("test_user", nuevaCarta, (error, result) => {
        expect(error).to.be.undefined;
        expect(result).to.be.equal(chalk.green(`Carta agregada a la colección de test_user`))
        done();
      })
    });

    it ('update carta', (done) => {
      const coleccion = new ColecciondeCartas;
      const nuevaCarta: Carta = {
        id: 1,
        nombre: 'Prueba',
        mana: 1,
        color: Color.Azul,
        tipo: Tipo.Criatura,
        rareza: Rareza.Comun,
        reglas: 'Una carta de prueba modificada.',
        valor_mercado: 1033
      };



      coleccion.modificarcarta("test_user", nuevaCarta , (error, result) => {
        expect(error).to.be.undefined;
        expect(result).to.be.equal(chalk.green(`Carta modificada en la colección de test_user`))
        done();
      });

    });
    
    it ('update carta no valida', (done) => {
      const coleccion = new ColecciondeCartas;
      const nuevaCartamal: Carta = {
        id: 2,
        nombre: 'Prueba',
        mana: 1,
        color: Color.Azul,
        tipo: Tipo.Criatura,
        rareza: Rareza.Comun,
        reglas: 'Una carta de prueba modificada.',
        valor_mercado: 1033
      };

      coleccion.modificarcarta("test_user", nuevaCartamal , (error, result) => {
        expect(error).to.be.equal(chalk.red('La carta no existe en la colección de test_user'));
        done();
      });
    });

    it ('remove carta', (done) => {
      const coleccion = new ColecciondeCartas;
      coleccion.eliminarcarta("test_user", 1, (error, result) => {
        expect(error).to.be.undefined;
        expect(result).to.be.equal(chalk.green(`Carta eliminada de la colección de test_user`))
        done();
      });
    });
    });


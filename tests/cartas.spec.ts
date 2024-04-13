import 'mocha'
import { expect } from 'chai';
import { Carta, Tipo, Color, Rareza } from '../src/Carta.js';
import { ColecciondeCartas } from '../src/ColecciondeCartas.js';


describe('ColecciondeCartas', () => {
  let coleccion: ColecciondeCartas;

  beforeEach(() => {
    coleccion = new ColecciondeCartas();
  });

  it('debería agregar una carta a la colección', () => {
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

    coleccion.agregarcarta('test_user', nuevaCarta);

  });



  it('debería modificar una carta de la colección', () => {
    // Agregar una carta para poder modificarla
    const nuevaCarta: Carta = {
      id: 3,
      nombre: 'Prueba3',
      mana: 3,
      color: Color.Negro,
      tipo: Tipo.Encantamiento,
      rareza: Rareza.Infrecuente,
      reglas: 'Tercera carta de prueba.',
      valor_mercado: 30
    };

    coleccion.agregarcarta('test_user', nuevaCarta);

    const cartaModificada: Carta = {
      id: 3,
      nombre: 'Prueba Modificada',
      mana: 4,
      color: Color.Azul,
      tipo: Tipo.Criatura,
      rareza: Rareza.Rara,
      reglas: 'Nueva regla.',
      valor_mercado: 40
    };

    coleccion.modificarcarta('test_user', cartaModificada);

  });

  it('debería eliminar una carta de la colección', () => {
    // Agregar una carta para poder eliminarla
    const nuevaCarta: Carta = {
      id: 2,
      nombre: 'Prueba2',
      mana: 2,
      color: Color.Verde,
      tipo: Tipo.Conjuro,
      rareza: Rareza.Rara,
      reglas: 'Otra carta de prueba.',
      valor_mercado: 20
    };

    coleccion.agregarcarta('test_user', nuevaCarta);
    coleccion.eliminarcarta('test_user', 2);
  });
});

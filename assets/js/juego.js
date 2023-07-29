// Patron Modulo
(() => {
  'use strict';

  let deck = [];
  const tipos = ['C', 'H', 'S', 'D'];
  const especiales = ['A', 'J', 'Q', 'K'];

  let puntosJugador = 0;
  let puntosComputadora = 0;

  // Referencias al HTML
  const btnNewGame = document.querySelector('#btn-new-game');
  const btnPedirCarta = document.querySelector('#btn-pedir-carta');
  const btnDetener = document.querySelector('#btn-detener');
  const contenedorCartasJugador = document.querySelector('#jugador-cartas');
  const contenedorCartasComputadora = document.querySelector(
    '#computadora-cartas'
  );
  const [elementoJugadorPuntuacion, elementoComputadoraPuntuacion] =
    document.querySelectorAll('small');

  // jugador

  const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
      for (const tipo of tipos) {
        deck.push(`${i}${tipo}`);
      }
    }

    for (const especial of especiales) {
      for (const tipo of tipos) {
        deck.push(`${especial}${tipo}`);
      }
    }
  };

  const mezclarDeck = (arr) => {
    // Swap made with the algorithm Fisher-Yates
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      // Interesting way of writing the same assign is [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  // Trae una carta en la forma de: '2H'
  const pedirCarta = (arr) => {
    if (arr.length <= 0) {
      throw 'No hay cartas en el deck.';
    }
    return arr.pop();
  };

  // Devuelve el valor al recibir una carta en forma de: '2H'
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return !isNaN(valor)
      ? Number.parseInt(valor)
      : valor.toUpperCase() === 'A'
      ? 11
      : 10;
  };

  // Crea una carta con imagen y la inserta en el contenedor
  const crearCartaHTML = (carta, contenedorCartas) => {
    const cartaHTML = document.createElement('img');
    cartaHTML.classList.add('carta');
    cartaHTML.src = `assets/cartas/${carta}.png`;
    contenedorCartas.append(cartaHTML);
  };

  // Ejecuta el turno de la computadora en base a lo hecho por el jugador.
  const turnoComputadora = (puntosJugador) => {
    if (puntosComputadora < puntosJugador) {
      const carta = pedirCarta(deck);
      crearCartaHTML(carta, contenedorCartasComputadora);
      puntosComputadora += valorCarta(carta);
      elementoComputadoraPuntuacion.innerText = puntosComputadora;
      // console.log(
      //   `Jugador: ${puntosJugador}, Computadora: ${puntosComputadora}`
      // );
      if (puntosJugador > 21) {
        return;
      }
      turnoComputadora(puntosJugador);
    }
  };

  // Obtiene el ganador
  const obtenerGanador = (puntosJugador, puntosComputadora) => {
    let ganador = null;

    if (puntosJugador === 21) {
      ganador = 'Jugador';
    } else if (puntosJugador < 21 && puntosComputadora > 21) {
      ganador = 'Jugador';
    } else if (puntosJugador < 21 && puntosComputadora >= puntosJugador) {
      ganador = 'Computadora';
    } else if (puntosJugador > 21) {
      ganador = 'Computadora';
    }
    return ganador;

    // return puntosJugador === 21
    //   ? 'Jugador'
    //   : puntosJugador < 21 && puntosComputadora > 21
    //   ? 'Jugador'
    //   : puntosJugador < 21 && puntosJugador > puntosComputadora
    //   ? 'Jugador'
    //   : 'Computadora';
  };

  // Muestra al ganador en un modal.
  const mostrarGanador = (ganador) => {
    const modal = document.createElement('div');
    modal.classList.add('modale');
    const textoGanador = document.createElement('h2');
    textoGanador.innerText = `Ganador: ${ganador}!`;
    const btnCerrar = document.createElement('button');
    btnCerrar.classList.add('btn', 'btn-danger');
    btnCerrar.innerText = 'Cerrar Modal';
    btnCerrar.addEventListener('click', () => {
      modal.remove();
    });
    modal.append(textoGanador, btnCerrar);

    document.body.prepend(modal);
  };

  // Crear nuevo Juego
  const nuevoJuego = () => {
    deck = [];
    puntosJugador = 0;
    puntosComputadora = 0;
    contenedorCartasJugador.innerHTML = '';
    contenedorCartasComputadora.innerHTML = '';
    elementoComputadoraPuntuacion.innerText = 0;
    elementoJugadorPuntuacion.innerText = 0;
    btnPedirCarta.removeAttribute('disabled');
    btnDetener.removeAttribute('disabled');
    crearDeck();
    mezclarDeck(deck);
  };

  // Eventos
  btnPedirCarta.addEventListener('click', function () {
    const carta = pedirCarta(deck);
    crearCartaHTML(carta, contenedorCartasJugador);
    puntosJugador += valorCarta(carta);
    elementoJugadorPuntuacion.innerText = puntosJugador;

    if (puntosJugador > 21) {
      // console.log('Game over');
      btnPedirCarta.setAttribute('disabled', '');
      btnDetener.setAttribute('disabled', '');
      turnoComputadora(puntosJugador);
      let ganador = obtenerGanador(puntosJugador, puntosComputadora);
      window.setTimeout(() => {
        mostrarGanador(ganador);
      }, 500);
    }
  });

  btnDetener.addEventListener('click', () => {
    btnDetener.setAttribute('disabled', '');
    btnPedirCarta.setAttribute('disabled', '');
    turnoComputadora(puntosJugador);
    let ganador = obtenerGanador(puntosJugador, puntosComputadora);
    window.setTimeout(() => {
      mostrarGanador(ganador);
    }, 500);
  });

  btnNewGame.addEventListener('click', () => {
    nuevoJuego();
  });
})();

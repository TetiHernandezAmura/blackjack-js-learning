// 2C = 2 Club
// 2H = 2 Hearts
// 2S = 2 Spades
// 2C = 2 Diamonds

const deck = [];
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
const cartasJugador = [];

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

const pedirCarta = (arr) => {
  if (arr.length <= 0) {
    throw 'No hay cartas en el deck.';
  }
  return arr.pop();
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return !isNaN(valor)
    ? Number.parseInt(valor)
    : valor.toUpperCase() === 'A'
    ? 11
    : 10;
};

const crearCartaHTML = (carta, contenedorCartas) => {
  const cartaHTML = document.createElement('img');
  cartaHTML.classList.add('carta');
  cartaHTML.src = `assets/cartas/${carta}.png`;
  contenedorCartas.append(cartaHTML);
};

const turnoComputadora = (puntosJugador) => {
  setTimeout(() => {
    if (puntosComputadora < puntosJugador) {
      const carta = pedirCarta(deck);
      crearCartaHTML(carta, contenedorCartasComputadora);
      puntosComputadora += valorCarta(carta);
      elementoComputadoraPuntuacion.innerText = puntosComputadora;
      if (puntosJugador > 21) {
        return;
      }
      turnoComputadora(puntosJugador);
    }
  }, 750);
};

// Eventos
btnPedirCarta.addEventListener('click', function () {
  const carta = pedirCarta(deck);
  crearCartaHTML(carta, contenedorCartasJugador);
  puntosJugador += valorCarta(carta);
  elementoJugadorPuntuacion.innerText = puntosJugador;

  if (puntosJugador > 21) {
    console.log('Game over');
    btnPedirCarta.setAttribute('disabled', '');
    btnDetener.setAttribute('disabled', '');
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener('click', () => {
  btnDetener.setAttribute('disabled', '');
  btnPedirCarta.setAttribute('disabled', '');
  turnoComputadora(puntosJugador);
});

crearDeck();
mezclarDeck(deck);
console.log(deck);

// TODO: Ver video de Crear Cartas HTML, comparar con mi forma y commit.

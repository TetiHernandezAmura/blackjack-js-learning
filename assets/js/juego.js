// 2C = 2 Club
// 2H = 2 Hearts
// 2S = 2 Spades
// 2C = 2 Diamonds

const deck = [];
const tipos = ['C', 'H', 'S', 'D'];
const especiales = ['A', 'J', 'Q', 'K'];

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

crearDeck();
console.log(deck);
mezclarDeck(deck);
console.log(deck);

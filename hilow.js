const suits = ['hearts', 'diamonds', 'spades', 'clubs'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// This function generates a deck of cards as an array of objects
function generateDeck() {
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

let deck = generateDeck();
let currentCard = null;
let nextCard = null;
let betAmount = null;

// This function shuffles the deck using the Fisher-Yates shuffle algorithm
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// This function draws a card from the top of the deck
function drawCard(deck) {
  return deck.shift();
}

// This function displays the current card in the #current-card div
function displayCard(card) {
  const cardContainer = document.querySelector('#current-card');
  cardContainer.innerHTML = `
    <div class="card-value">${card.value}</div>
    <div class="card-suit">${card.suit}</div>
  `;
}

// This function displays the next card in the #next-card div
function displayNextCard(card) {
  const cardContainer = document.querySelector('#next-card');
  cardContainer.innerHTML = `
    <div class="card-value">${card.value}</div>
    <div class="card-suit">${card.suit}</div>
  `;
}

// This function gets the bet amount from the form
function getBetAmount() {
  const form = document.querySelector('#bet-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    betAmount = document.querySelector('#bet-amount').value;
  });
}
                 

function compareCards(currentCard,nextCard) {
const resultContainer = document.querySelector('#result');
const currentCardValue = values.indexOf(currentCard.value);
const nextCardValue = values.indexOf(nextCard.value);

if (currentCardValue < nextCardValue) {
resultContainer.textContent = 'You won $${betAmount}!';
} else if (currentCardValue > nextCardValue) {
resultContainer.textContent = 'You lost $${betAmount}. Better luck next time!';
} else {
resultContainer.textContent = 'It was a tie! No one wins or loses.';
}
}

// This function handles the higher button click
function handleHigherClick() {
const higherButton = document.querySelector('#higher-button');
higherButton.addEventListener('click', () => {
nextCard = drawCard(deck);
displayNextCard(nextCard);
compareCards(currentCard, nextCard);
});
}

// This function handles the lower button click
function handleLowerClick() {
const lowerButton = document.querySelector('#lower-button');
lowerButton.addEventListener('click', () => {
nextCard = drawCard(deck);
displayNextCard(nextCard);
compareCards(currentCard, nextCard);
});
}

// This function initializes the game
function init() {
deck = shuffleDeck(deck);
currentCard = drawCard(deck);
displayCard(currentCard);
getBetAmount();
handleHigherClick();
handleLowerClick();
}

init();      
let player = {
    name: "",
    chips: 200
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsContainer = document.getElementById("cards-el");
let playerEl = document.getElementById("player-info");

function startGame() {
    let playerNameInput = document.getElementById("player-name");
    let playerName = playerNameInput.value.trim();
    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }
    player.name = playerName;
    playerNameInput.disabled = true;

    isAlive = true;
    document.getElementById("start-btn").disabled = true;
    document.getElementById("new-card-btn").disabled = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function renderGame() {
    cardsContainer.innerHTML = "";
    for (let i = 0; i < cards.length; i++) {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        cardDiv.innerHTML = `<span class="card-text">${cards[i]}</span>`;
        cardsContainer.appendChild(cardDiv);
    }
    document.getElementById("sum-value").textContent = sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = message;
    playerEl.textContent = `${player.name} - Chips: $${player.chips}`;
}

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

function resetGame() {
    document.getElementById("player-name").disabled = false;
    document.getElementById("player-name").value = "";
    document.getElementById("start-btn").disabled = false;
    document.getElementById("new-card-btn").disabled = true;
    player.name = "";
    cards = [];
    sum = 0;
    hasBlackJack = false;
    isAlive = false;
    message = "";
    renderGame();
}
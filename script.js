'use strict';
let secretNumber = Math.floor(Math.random() * 20);
let score = 20;
let highScore = 0;
let readHighScore = localStorage.getItem('highScore');

let messageEl = document.querySelector('.message');
let checkButtonEl = document.querySelector('.check'); // done
let bodyEl = document.querySelector('body'); // done
let hintButtonEl = document.querySelector('.hint');  // done
let scoreEl = document.querySelector('.score');  // done
let newGameButtonEl = document.querySelector('.again');  // done
let numberInputEl = document.querySelector('.guess');  // done
let gameDisplayEl = document.querySelector('.number'); // done
let saveGameEl = document.querySelector('.save');
let loadGameEl = document.querySelector('.load')

const messages = {
    lostMessage: `🔃 You lost 1 point... Try again 🔃`,
    winMessage: `🥳 Wohooo, there is a match 🥳`,
    errMessage: `⛔ Please add number between 0 and 20 ⛔`,
    tooLowMessage: ` 📉 Your number is too low 📉`,
    tooHighMessage: ` 📈 Your number is too high 📈`,
    gameLost: ` 💩 You lost the game 💩`,
    gameStart: ` 🎯 Start guessing 🎯`,
}

const displayMessage = (message) => {
    return messageEl.textContent = message;
}

const checkButtonState = (state) => {
    return document.querySelector('.check').style.display = state;
}

checkButtonEl.addEventListener('click', () => {
    const guess = Number(numberInputEl.value);

    hintButtonEl.addEventListener('click', () => {
        gameDisplayEl.textContent = 
        guess < secretNumber ? messages.tooLowMessage : messages.tooHighMessage;
    });

    if (score > 1) {
        if (guess === secretNumber) {
            gameDisplayEl.textContent = `Match!`;
            scoreEl.textContent = score += 1;
            numberInputEl.style.display = 'none';
            bodyEl.style.backgroundColor = '#007a37';
            hintButtonEl.style.visibility = 'hidden';
            checkButtonState('none');

            if (score > highScore) {
                highScore = score;
                document.querySelector('.highscore').textContent = highScore;
            }
            return displayMessage(messages.winMessage);
        } if (guess > 20 || guess < 1 || guess === undefined) {
            gameDisplayEl.textContent = `Invalid Number`;
            return displayMessage(messages.errMessage);
        } else {
            gameDisplayEl.textContent = `No match! Maybe you need a hint?`;
            scoreEl.textContent = score -= 1;
            return displayMessage(messages.lostMessage);
        }
    } else {
        bodyEl.style.border = '2px solid #FF0000';
        bodyEl.style.transition = 'all 3s';
        numberInputEl.style.display = 'none';
        newGameButtonEl.style.backgroundColor = '#FF0000';
        newGameButtonEl.style.transition = 'all 3s';
        checkButtonState('none');
        return gameDisplayEl.textContent = messages.gameLost;
    }
});

newGameButtonEl.addEventListener('click', () => {
    scoreEl.textContent = score = 20;
    secretNumber = Math.floor(Math.random() * 20);
    gameDisplayEl.textContent = '❓';
    messageEl.textContent = messages.gameStart;
    bodyEl.style.border = '2px solid #FFFFFF';
    bodyEl.style.transition = 'all 1s';
    bodyEl.style.backgroundColor = '#333333'
    numberInputEl.style.display = 'flex';
    newGameButtonEl.style.backgroundColor = '#FFFFFF';
    newGameButtonEl.style.transition = 'all 3s';
    numberInputEl.value = '';
    hintButtonEl.style.visibility = 'visible';
    saveGameEl.textContent = `Save Highscore`
    checkButtonState('flex');
})

saveGameEl.addEventListener('click', () => {
    localStorage.setItem('highScore', highScore );
    saveGameEl.textContent = `saved`;
})

loadGameEl.addEventListener('click', () => {
    document.querySelector('.highscore').textContent = readHighScore;
    loadGameEl.textContent = 'loaded';
    loadGameEl.style.opacity = '0.5';
})
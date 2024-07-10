let score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,
    Losses: 0,
    Ties: 0
};
updateScoreElement();

let isAutoPlaying = false;
let intervalId;
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(function () {
            let playerMove = pickComputerMove();
            pickResult(playerMove);
            isAutoPlaying = true;
            updateAutoPlay();
        }, 1000)
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        updateAutoPlay();
    }
}

function updateAutoPlay() {
    const button = document.querySelector('.js-auto-play');
    if (isAutoPlaying === true) {
        button.innerHTML = 'Stop Playing';
    }
    else {
        button.innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => { pickResult('rock') });
document.querySelector('.js-paper-button')
    .addEventListener('click', () => { pickResult('paper') });
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => { pickResult('scissors') });

function resetScore() {
    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
}

function addScoreConfirmation() {
    document.querySelector('.js-reset-confirmation')
        .innerHTML =
        `<div class = "reset-confirmation">
        Are you sure you want to reset the score?
        <button class = 'yes-button'>Yes</button>
        <button class = 'no-button'>No</button>
        </div>`;
}

function resetScoreConfirmation() {
    const yesButton = document.querySelector('.yes-button');
    yesButton.addEventListener('click', () => {
        resetScore();
        document.querySelector('.js-reset-confirmation').innerHTML = '';
    });
    const noButton = document.querySelector('.no-button');
    noButton.addEventListener('click', () => {
        document.querySelector('.js-reset-confirmation').innerHTML = '';
    });
}

function checkResetCondition() {
    if (score.Wins === 0 && score.Losses === 0 && score.Ties === 0) {
        document.querySelector('.js-reset-confirmation')
            .innerHTML = 'Score is already 0';

        setTimeout(() => {
            document.querySelector('.js-reset-confirmation')
                .innerHTML = '';
        }, 1000);
    }
    else {
        addScoreConfirmation();
        resetScoreConfirmation();
    }
}

document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
        checkResetCondition();
    });
document.querySelector('.js-auto-play')
    .addEventListener('click', () => { autoPlay() });



function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    }
    else {
        computerMove = 'scissors'
    }
    return computerMove;
}

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        pickResult('rock');
    }
    else if (event.key === 'p') {
        pickResult('paper');
    }
    else if (event.key === 's') {
        pickResult('scissors');
    }
    else if (event.key === 'a') {
        autoPlay();
    }
    else if (event.key === 'Backspace') {
        checkResetCondition();
    }
    else if (event.key === 'y') {
        resetScore();
        document.querySelector('.js-reset-confirmation').innerHTML = '';
    }
    else if (event.key === 'n') {
        document.querySelector('.js-reset-confirmation').innerHTML = '';
    }
})

function pickResult(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'you loose';
        }
        else if (computerMove === 'paper') {
            result = 'you win'
        }
        else {
            result = 'Tie';
        }
    }
    else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie';
        }
        else if (computerMove === 'paper') {
            result = 'you loose'
        }
        else {
            result = 'you win';
        }
    }
    else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'you win';
        }
        else if (computerMove === 'paper') {
            result = 'Tie'
        }
        else {
            result = 'you loose';
        }
    }
    if (result === 'you win') {
        score.Wins += 1;
    }
    else if (result === 'you loose') {
        score.Losses += 1;
    }
    else if (result === 'Tie') {
        score.Ties += 1;
    }
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-pick').innerHTML = `You <img src="Assets/${playerMove}-emoji.png" class="move-icon">  <img src="Assets/${computerMove}-emoji.png" class="move-icon"> Computer`;
    document.querySelector('.js-result').innerHTML = `${result}`;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML =
        `Wins = ${score.Wins} Losses = ${score.Losses} Ties = ${score.Ties}`;
}

// Game values

let min = 1,
    max = 10,
    diff = max - min + 1,
    winningNum = Math.floor(Math.random() * diff) + min,
    guessesLeft = 3;

// UI Element
const UIgame = document.getElementById('game'),
      minNum = document.getElementById('min-num'),
      maxNum = document.getElementById('max-num'),
      guessInput = document.getElementById('guess-input'),
      guessBtn = document.getElementById('guess'),
      message = document.getElementById('message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listeners
guessBtn.addEventListener('click', function() {

  if (guessesLeft === 0) {
    guessesLeft = 3;
    restart();
  } else {
    let guess = parseInt(guessInput.value);
    let valid = validate(guess);
    if (valid) {
      if (guess === winningNum){
        youWin(guess);
        guessesLeft = 0;
      } else {
        guessInput.style.borderColor = "red";
        guessesLeft = guessesLeft - 1;
        if (guessesLeft === 0) {
          youLose();
        } else {
          tryAgain();
        }
      }    
    } else {
      message.textContent = "Invalid guess."
    }
  }
});


function validate(guess) {
  if(isNaN(guess) || guess < min || guess > max ) {
    return false;
  } else {
    return true;
  }
}

function youWin(guess) {
  confetti.start(2000, 150, 300); //throws a random number of confetti particles (between 50 and 150) for 1200 milliseconds (1.2 seconds)
  message.textContent = `You win! ${guess} is correct!`;
  message.style.color = "green";
  guessBtn.innerText = "Play Again" 
  guessInput.style.borderColor = "green";
  guessInput.readOnly = true;
  guessInput.style.backgroundColor = "gray";
}

function youLose() {
  message.textContent = "Sorry, you lost the game.";
  guessBtn.innerText = "Play Again"  
  guessInput.style.borderColor = "red";
  message.style.color = "red";
  guessInput.readOnly = true;
  guessInput.style.backgroundColor = "gray";
}

function tryAgain() {
  message.innerText = `You have ${guessesLeft} guesses remaining.`;
  message.style.color ="red";
}

function restart() {
  guessInput.readOnly = false;
  guessInput.style.backgroundColor = "white";
  message.textContent = "";
  guessInput.value = "";
  guessBtn.innerText = "Guess";
  guessInput.style.borderColor = "gray";

  winningNum = Math.floor(Math.random() * diff) + min;

}
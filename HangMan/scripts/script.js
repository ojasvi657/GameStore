const hangmanImage =document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText =document.querySelector(".guesses-text b");
const keyboardDiv =document.querySelector(".keyboard");
const gameModal =document.querySelector(".game-modal");
const playAgainBtn =document.querySelector(".play-again");

let currentWord,correctLetters, wrongGuessCount;
const maxGuess =6;

const resetGame =()=>{
    correctLetters=[];
    wrongGuessCount=0;
    hangmanImage.src=`image/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText=`${wrongGuessCount}/ ${maxGuess}`;
    keyboardDiv.querySelectorAll("button").forEach(btn =>btn.disabled= false);
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord =()=>{
    // selecting a random word and hint from the wordlist
    const {word, hint}= wordList[Math.floor(Math.random()* wordList.length)];
    currentWord= word;
    document.querySelector(".hint-text b").innerText=hint;
    resetGame();
}

const gameOver = (isVictory)=>{
    //after 600ms of game complete.. Showing modal with relevant details
    setTimeout(()=>{
        const ModalText= isVictory ?`You found the word:` : `The correct word was`;
        gameModal.querySelector("img").src =`image/${isVictory? 'victory':'lost'}.gif`;
        gameModal.querySelector("h4").innerText =`${isVictory? 'congrats!':'gameover!'}`;
        gameModal.querySelector("p").innerHTML =`${ModalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    },300);
}

const initGame=(button, clickedLetter)=>{
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index)=>{
            if(letter === clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }
    else{
        wrongGuessCount++;
        hangmanImage.src=`image/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled=true; //jo use kar liya woh disable
    guessesText.innerText=`${wrongGuessCount}/ ${maxGuess}`;
    
    if(wrongGuessCount === maxGuess) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}
//creating keyboard buttons
for(let i=97; i<=122; i++){
    const button =document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e=> initGame(e.target,String.fromCharCode(i)))
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
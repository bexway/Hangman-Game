var game = {
  word : "word",
  board: "",
  guessedLetters: "",
  guessesRemaining: 7,
  wins : 0,
  gameState : 0,
  database: word_db,

  pickWord: function(){
    this.word = this.database[Math.floor(Math.random()*this.database.length)];
  },

  setBoard: function(){
    for(var i=0;i< this.word.length;i++){
      this.board += "_ ";
    }
  },

  checkLetter: function(letter){
    var correct = false;
    var messageBox = document.getElementById("message");
    var lastGuessBox = document.getElementById("lastGuess");
    //go through the word and check for the chosen letter
    if(isCharInStr(letter, this.guessedLetters)){
      messageBox.textContent = "You've already guessed that letter! Try again!";
    }
    else{
      lastGuessBox.textContent = letter;
      for(var i=0;i< this.word.length;i++){
        if(letter.toLowerCase()===this.word[i].toLowerCase()){
          this.board[i*2] = letter;
          //js strings are immutable, so add to it in a weird way
          this.board = this.board.substr(0,i*2) + this.word[i] + this.board.substr(i*2+1);
          correct = true;
        }
      }
      if(!correct){
        console.log(correct);
        this.guessesRemaining--;
        // console.log(this.guessesRemaining);
      }
      this.guessedLetters += letter;
      console.log(this.guessedLetters);
      //will check if the game is over, and end it if it is.
      this.updateScreen();
      this.checkGameEnd();
    }
  },

  checkGameEnd: function(){
    //Check if word is solved
    if(!isCharInStr("_", this.board)){
      this.gameOver(1);
    }
    else if(this.guessesRemaining<=0){
      this.gameOver(0);
    }
  },

  gameOver: function(isWon){
    //ideally, display message and say press another button to play again
    //but also, reveal the full word
    var countBox, messageBox, message, count, boardBox;
    messageBox = document.getElementById("message");
    if(isWon){
      countBox = document.getElementById("wincount");
      message = "Hooray, you won! Press any key to play again!";
    }
    else{
      countBox = document.getElementById("losscount");
      boardBox = document.getElementById("board");
      //adding the word to the board if you lost, so you can see what you didn't guess
      boardBox.textContent = this.word.split('').join(' ');
      message = "Oh no, you lost! Press any key to play again!";
    }
    count = countBox.textContent;
    //change the tally value to be itself plus one
    countBox.textContent = parseInt(count) + 1;
    messageBox.textContent = message;
    this.gameState = 0;
  },

  startGame: function(){
    this.gameState = 1;
    this.board = "";
    this.guessesRemaining = 7;
    this.guessedLetters = [];
    this.pickWord();
    this.setBoard();
    this.updateScreen();
  },

  updateScreen: function(){
    letterBox = document.getElementById("guessedLetters");
    guessesBox = document.getElementById("guessesRemaining");
    boardBox = document.getElementById("board");
    letterBox.textContent = this.guessedLetters;
    guessesBox.textContent = this.guessesRemaining;
    boardBox.textContent = this.board;
  },

  postMessage: function(message){
    var messageBox = document.getElementById("message");
    messageBox.textContent = message;
  },

  setDB: function(db){
    console.log(db);
    switch(db){
      case 'word-db':
        this.database = word_db;
        break;
      case "food-db":
        this.database = food_db;
        break;
    }
    this.startGame();
  }

};

function isCharInStr(char, str){
  for(var i = 0; i<str.length; i++){
    if(str[i] === char){
      return true;
    }
  }
  return false;
}

// function isLetter(c) {
//   return c.toLowerCase() != c.toUpperCase();
// }

function isLetter(e){
  return (e.keyCode >= 65 && e.keyCode <= 90);
}

//Listen for keys, and act based on game state
//if playing, check letter
//if not playing, start new round
document.onkeyup = function(event) {
  if(game.gameState){
    if(isLetter(event)){
      game.checkLetter(event.key);
    }
  }
  else{
    game.startGame();
  }
};

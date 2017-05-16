var game = {
  word : "word",
  board: "",
  guessedLetters: [],
  guessesRemaining: 7,
  wins : 0,
  gameState : 0,

  pickWord: function(){
    this.word = word_db[Math.floor(Math.random()*word_db.length)];
    console.log(this.word);
  },

  setBoard: function(){
    for(var i=0;i< this.word.length;i++){
      this.board += "_ ";
    }
    console.log(this.board);
  },

  checkLetter: function(letter){
    var correct = false;
    //go through the word and check for the chosen letter
    for(var i=0;i< this.word.length;i++){
      if(letter.toLowerCase()===this.word[i].toLowerCase()){
        this.board[i*2] = letter;
        //js strings are immutable, so add to it in a weird way
        this.board = this.board.substr(0,i*2) + this.word[i] + this.board.substr(i*2+1);
        console.log(this.board);
        corret = true;
      }
    }
    if(!correct){
      this.guessesRemaining--;
      // console.log(this.guessesRemaining);
    }
    this.guessedLetters += letter;
    console.log(this.guessedLetters);
    //will check if the game is over, and end it if it is.
    this.updateGuesses()
    this.checkGameEnd();
  },

  checkGameEnd: function(){
    //Check if word is solved
    if(!isCharInStr("_", this.board)){
      console.log("end");
      //gameWon
      this.gameOver(1);
    }
    else if(this.guessesRemaining<=0){
      console.log("guessesend");
      this.gameOver(0);
    }
  },

  gameOver: function(isWon){
    //ideally, display message and say press another button to play again
    //but also, reveal the full word
    var countBox, messageBox, message, count;
    messageBox = document.getElementById("message");
    if(isWon){
      countBox = document.getElementById("wincount");
      message = "Hooray, you won! Press any key to play again!";
    }
    else{
      countBox = document.getElementById("losscount");
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
    this.pickWord();
    this.setBoard();
  },

  updateGuesses: function(){
    letterBox = document.getElementById("guessedLetters");
    guessesBox = document.getElementById("guessesRemaining");
    letterBox.textContent = this.guessedLetters;
    guessesBox.textContent = this.guessesRemaining;
  }

};

game.pickWord();
game.setBoard();
game.checkLetter("e");
game.checkLetter("a");
game.checkLetter("i");
game.checkLetter("o");
game.checkLetter("u");
game.checkLetter("s");
game.checkLetter("t");
game.checkLetter("r");
game.checkLetter("l");
game.checkLetter("p");
game.checkLetter("w");
game.checkLetter("y");
game.checkLetter("k");
game.checkLetter("m");
game.checkLetter("n");
game.checkLetter("c");

function isCharInStr(char, str){
  for(var i = 0; i<str.length; i++){
    if(str[i] === char){
      return true;
    }
  }
  return false;
}

//Listen for keys, and act based on game state
//if playing, check letter
//if not playing, start new round
// document.onkeyup = function(event) {}

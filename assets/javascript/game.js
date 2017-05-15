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
    this.checkGameEnd();
  },

  checkGameEnd: function(){
    //Check if word is solved
    if(!isCharInStr("_", this.board)){
      console.log("end");
      //gameWon
    }
    else if(this.guessesRemaining<=0){
      console.log("guessesend");
      //gameLost
    }
  },

  gameLost: function(){
    //ideally, display message and say press another button to play again
    //but also, reveal the full word
  },

  gameWon: function(){
    //ideally, display message and say press another button to play again
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

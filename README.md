# Hangman-Game
A browser hangman game, found [here](https://bexway.github.io/Hangman-Game/). There are two word lists available: an assorted word list of various words without significant theme, as well as a food word list, full of food-related words.

Pressing any letter key on the keybard will make a guess for that letter. If that letter is present in the word, it will appear in its place on the board. Letters that have already been guessed (regardless of whether they appear in the word) will not detract from the player's number of guesses. The game will track the player's wins (where they guessed the word before running out of guesses) and losses (where they ran out of guesses before completing the word). When the game ends, the player can 

The game is written as a JS object, with methods to start, progress, and end the game and properties to track the current word and score.

const symbols = ["heart", "circle", "cube", "triangle", "leaf", "star", "flower", "peace", "heart", "circle", "cube", "triangle", "leaf", "star", "flower", "peace"];

let errors = 0;
let moves = 0;
let matches = 0;
var symbolsSet;
var game = [];
var columns = 4;
countdownTime = 45;
var checker = 8;
var symbol1Selected;
var symbol2Selected;


// used this resource for a reset button that shuffles and flips over the symbols:https://www.youtube.com/watch?v=M0egyNvsN-Y&t=426s
window.onload = function() 
{
  symbolsSet = symbols.slice(); 
  shufflesymbols(); 
  startGame(symbolsSet);
}

// calls to functions from Game.js
shufflesymbols();

startGame(symbolsSet);

hideSymbols();

selectSymbol();

update();

function Player (playerName) {
  this.playerName = playerName;
}
function Game (gameType, gameMode) {
  this.gameType = gameType;
  this.gameMode = gameMode;
  this.answers = 0;
  this.wrongAnswers = 0;
  this.correctAnswers= 0;

}
Game.prototype.getCorrectAnswer = function (){
  this.answers++;
  this.correctAnswers++;
}
Game.prototype.getWrongAnswer = function (){
  this.answers++;
  this.correctAnswers++;
}

// function Players (bluePlayer, redPlayer, bluePlayerName, redPlayerName) {
//   this.bluePlayer = bluePlayer,
//   this.redPlayer = redPlayer,
//   this.bluePlayerName = bluePlayerName,
//   this.redPlayerName = redPlayerName,
//   this.currentPlayer = "blue"
//
//
//   this.starter = function (){
//     var random =Math.floor(Math.random()*2);
//     if (random===1) {
//       this.currentPlayer = "red";
//     }
//   }
//   this.starter()
//   this.autoNaming = function (){
//     if (this.bluePlayer==="comEasy") {
//       this.bluePlayerName +="(Computer-Easy)"
//     } else if (this.bluePlayer==="comHard") {
//       this.bluePlayerName +="(Computer-Hard)"
//     }
//     if (this.redPlayer==="comEasy") {
//       this.redPlayerName +="(Computer-Easy)"
//     } else if (this.redPlayer==="comHard") {
//       this.redPlayerName +="(Computer-Hard)"
//     }
//   }
//   this.autoNaming();
// }
// Players.prototype.changeCurrent = function (){
//   if (this.currentPlayer === "blue"){
//     this.currentPlayer = "red";
//   } else {
//     this.currentPlayer = "blue";
//   }
//   return this.currentPlayer;
// }
// Players.prototype.whoPlays = function (){
//   if (this.currentPlayer==="blue") {
//     if (this.bluePlayer==="player") {
//       return "player"
//     } else if (this.bluePlayer==="comEasy") {
//       return "easy"
//     } else {
//       return "hard"
//     }
//   } else {
//     if (this.redPlayer==="player") {
//       return "player"
//     } else if (this.redPlayer==="comEasy") {
//       return "easy"
//     } else {
//       return "hard"
//     }
//   }
// }
// function Turn () {
//   this.point = 0,
//   this.dice =0,
//   this.changeTurn= false,
//   this.turn=1
// }
// Turn.prototype.rollDice = function () {
//   this.dice= Math.floor(Math.random() * 6)+1;
//   if (this.dice===1) {
//     this.point = 0;
//     this.changeTurn= true;
//   } else {
//     this.point += this.dice;
//     this.turn ++;
//   }
// }
// Turn.prototype.reset = function () {
//   this.point = 0,
//   this.dice =0,
//   this.changeTurn= false,
//   this.turn=1
// }
// function Game (){
//   this.finished = false;
//   this.bluePoint = 0,
//   this.redPoint = 0
// }
// Game.prototype.ifSomeoneWin = function (){
//   if (this.bluePoint>=100 || this.redPoint>=100) {
//     this.finished = true;
//     return true;
//   } else {
//     return false;
//   }
// }
// Game.prototype.turnEnd = function (turn,players){
//   if (players.currentPlayer==="red") {
//     this.redPoint+=turn.point;
//   } else {
//     this.bluePoint+=turn.point;
//   }
// }
//
// function turnUpdate (game,players,turn){
//   $("span#turnPoint").text(turn.point).css('color',players.currentPlayer);
//   $("span#redPlayerScore").text(game.redPoint);
//   $("span#bluePlayerScore").text(game.bluePoint);
// }
// function diceUpdate (turn,players){
//   var images=["./img/dice1.png","./img/dice2.png","./img/dice3.png","./img/dice4.png","./img/dice5.png","./img/dice6.png"];
//   var dices = [1,2,3,4,5,6];
//   dices.forEach(function(dice){
//     if (dice===turn.dice) {
//       $(".dice img").attr('src',images[dice-1]);
//     }
//   })
//   $("span#turnPoint").text("this turn :"+turn.point).css('color',players.currentPlayer)
// }
// function holdTheDice (players,turn,game){
//   game.turnEnd(turn,players);
//   turnUpdate(game,players,turn);
//   if (game.ifSomeoneWin()){
//     alert (players.currentPlayer+" player won!");
//   } else {
//     players.changeCurrent();
//     turn.reset();
//     if (players.whoPlays()==="player") {
//       $(".game-buttons").show();
//     } else {
//       $(".game-buttons").hide();
//       rollTheDice(players,turn,game);
//     }
//   }
// }
// function rollTheDice (players,turn,game){
//   turn.rollDice();
//   diceUpdate(turn,players);
//   if (turn.changeTurn) {
//     turn.changeTurn = false;
//     holdTheDice (players,turn,game);
//     }
//   if (players.whoPlays()==="player"){
//     $(".game-buttons").show()
//   } else if (players.whoPlays()==="easy"){
//     $(".game-buttons").hide();
//     if (turn.turn=2) {
//       holdTheDice(players,turn,game);
//     } else {
//       rollTheDice(players,turn,game);
//     }
//   } else {
//     $(".game-buttons").hide();
//     if (turn.point > 10){
//       holdTheDice(players,turn,game);
//     } else {
//       rollTheDice(players,turn,game);
//     }
//   }
// }
//
// $(document).ready(function() {
//   $("form#formOne").submit(function(event) {
//    event.preventDefault();
//     $('.background').show();
//     var bluePlayer = $("#bluePlayerType").val();
//     var redPlayer = $("#redPlayerType").val();
//     var bluePlayerName = $("input#bluePlayer").val();
//     var redPlayerName = $("input#redPlayer").val();
//     var players = new Players(bluePlayer, redPlayer, bluePlayerName, redPlayerName);
//     $("span#redPlayerName").text(players.redPlayerName);
//     $("span#bluePlayerName").text(players.bluePlayerName);
//     var game = new Game();
//     var turn = new Turn();
//     console.log(turn);
//     if (players.bluePlayer==="player" || players.redPlayer==="player"){
//       $("#rollDiceButton").click(function(){
//         rollTheDice (players,turn,game);
//       })
//       $("#holdButton").click(function(){
//         holdTheDice (players,turn,game);
//       })
//     }
//     if (players.whoPlays()==="player"){
//       $(".game-buttons").show()
//     } else {
//       rollTheDice(players,turn,game);
//     }
//   })
// })

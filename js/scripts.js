function Player (playerName) {
  this.playerName = playerName;
}
function Game () {

  this.answers = 0;
  this.wrongAnswers = 0;
  this.correctAnswers= 0;
  this.progress = "continue";
}
Game.prototype.getCorrectAnswer = function (){
  this.answers++;
  this.correctAnswers++;
}
Game.prototype.getWrongAnswer = function (){
  this.answers++;
  this.correctAnswers++;
}
Game.prototype.checkEndOfGame = function (){
  if (this.correctAnswers===10){
    this.progress = "win";
  }
  if (this.wrongAnswers===3){
    this.progress = "loose";
  }
}
function Datas (gameType,gameMode) {
  this.questions = [],
  this.correctAnswers = [],
  this.wrongAnswers1 = [],
  this.wrongAnswers2 = [],
  this.gameType = gameType,
  this.gameMode = gameMode

}
Datas.prototype.getData= function(){
  var thisObject = this;
	$.ajax({
		url: "addition.txt",
		type: "GET",
		dataType: "text",
		success: successFn,
		error: errorFn
	})
  function successFn(result){
    console.log(result);
    var meetGame= false;
    var lineByLine = result.split("\n");
    for (i=0;i<lineByLine.length;i++) {
      if (lineByLine[i].match(/^[a-z]/)) {
        var words= lineByLine[i].split(" ");
        if (words[0]===thisObject.gameType && words[1]===thisObject.gameMode) {
          meetGame= true;
        } else {
          meetGame= false;
        }
      }
      if (lineByLine[i].match(/^[0-9]/)) {
        if (meetGame) {
          var words= lineByLine[i].split(" ");
          console.log(words);
          thisObject.questions.push(words[0]);
          thisObject.correctAnswers.push(words[1]);
          thisObject.wrongAnswers1.push(words[2]);
          thisObject.wrongAnswers2.push(words[3]);
        }
      }
    }
  }
  function errorFn(xhr, status, strErr){
    console.log("error");
  }
}
function Dragon(){
  this.shape=""
  this.xCordinate=0

}
Dragon.prototype.move= function () {
  this.xCordinate +=50;
}
Dragon.prototype.breath= function () {
  
}
$(document).ready(function() {
  $("form#formOne").submit(function(event) {
    event.preventDefault();
    gameType = $("#gameType").val();
    gameMode = $("#gameMode").val();
    var data= new Datas (gameType,gameMode);
    data.getData();

setTimeout(function(){
  console.log(data.questions,data.correctAnswers,data.wrongAnswers1,data.wrongAnswers2);

}, 500);

  })
})

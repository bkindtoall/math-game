// Business Logic

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
  this.wrongAnswers++;
}
Game.prototype.checkEndOfGame = function (){
  if (this.correctAnswers===10){
    this.progress = "win";
  }
  if (this.wrongAnswers===3){
    this.progress = "lose";
  }
}
function Datas (gameType,gameMode,name) {
  this.name = name,
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
Datas.prototype.generateRandomQuestion= function () {
  var random=generateRandom(this.questions.length);
  var randomAnswer=generateRandom(3);
  var firstButton=$("button#answerOne")
  var secondButton=$("button#answerTwo")
  var thirdButton=$("button#answerThree")
  firstButton.removeClass();
  secondButton.removeClass();
  thirdButton.removeClass();
  firstButton.addClass("btn btn-primary");
  secondButton.addClass("btn btn-primary");
  thirdButton.addClass("btn btn-primary");
  if (randomAnswer===0){
    firstButton.text(this.correctAnswers[random]);
    secondButton.text(this.wrongAnswers1[random]);
    thirdButton.text(this.wrongAnswers2[random]);
    firstButton.addClass("correctAnswer");
    secondButton.addClass("wrongAnswer1");
    thirdButton.addClass("wrongAnswer2");
  } else if (randomAnswer===1){
    firstButton.text(this.wrongAnswers1[random]);
    secondButton.text(this.correctAnswers[random]);
    thirdButton.text(this.wrongAnswers2[random]);
    firstButton.addClass("wrongAnswer1");
    secondButton.addClass("correctAnswer");
    thirdButton.addClass("wrongAnswer2");
  } else {
    firstButton.text(this.wrongAnswers1[random]);
    secondButton.text(this.wrongAnswers2[random]);
    thirdButton.text(this.correctAnswers[random]);
    firstButton.addClass("wrongAnswer1");
    secondButton.addClass("wrongAnswer2");
    thirdButton.addClass("correctAnswer");
  }
  $("label#question").text(this.questions[random]);

}
function generateRandom(number){
  return Math.floor(Math.random() * number);
}
function addStartEventListeners(data,game){
  $("button#startGame").click(function(){
    $("button#startGame").hide();
    $(".game-buttons").show();
    $(".background-forest").show();

    moveDragon();
    continueGame(data,game);
  })
}
function continueGame (data,game){
  data.generateRandomQuestion();
  audio["rock"].play();
  $("button.correctAnswer").click(function(){
    game.getCorrectAnswer();
    audio["fire"].play();
    $(".dragon#flying").hide();
    $(".dragon#firebreathing").show();
    setInterval(function(){
      $(".dragon#flying").show();
      $(".dragon#firebreathing").hide();
      return
    },800);
    goOn(data,game);
  })
  $("button.wrongAnswer1").click(function(){
    game.getWrongAnswer();
    audio["wrong"].play();
    $(".dragon#flying").show();
    $(".dragon#firebreathing").hide();
    goOn(data,game);
  })
  $("button.wrongAnswer2").click(function(){
    game.getWrongAnswer();
    audio["wrong"].play();
    $(".dragon#flying").show();
    $(".dragon#firebreathing").hide();
    goOn(data,game);
  })
}
function goOn(data,game){
  refreshPoints(game);
  game.checkEndOfGame();
  $("button.correctAnswer").off("click");
  $("button.wrongAnswer1").off("click");
  $("button.wrongAnswer2").off("click");
  if (game.progress==="lose"){
    lose(data);
  } else if (game.progress==="win"){
    win(data);
  } else {
    continueGame(data,game);
  }
}
function refreshPoints (game) {
  $("#correctAnswers").text(game.correctAnswers);
  $("#wrongAnswers").text(game.wrongAnswers);

}
function win(data){
  setInterval(function(){
    audio["flying"].pause();
    $("#flying").hide();
    $(".dragon#firebreathing").hide();
    $(".wings-down").hide();
    $("#question").hide();
    $(".game-buttons").hide();
    $(".wings-up").hide();
    $("#win").show();
    $(".gold").show();
    return
  },1000);
}
function lose(data) {
    audio["flying"].pause();
    $(".dragon#flying").hide();
    $(".dragon#firebreathing").hide();
    $(".wings-down").hide();
    $("#question").hide();
    $(".game-buttons").hide();
    $(".wings-up").hide();
    $("#lose").show();
}
$(document).ready(function() {
  audio["backSound"] = new Audio();
  audio["backSound"].src = "audio/game-melody.mp3";
  audio["backSound"].volume= 0.3;
  audio["backSound"].loop= true;
  audio["backSound"].play();
  audio["flying"] = new Audio();
  audio["flying"].src = "audio/wings-flapping95.wav";
  audio["flying"].loop= true;
  audio["rock"] = new Audio();
  audio["rock"].src = "audio/swoosh.wav";
  audio["fire"] = new Audio();
  audio["fire"].src = "audio/firesmall1.wav";
  audio["wrong"] = new Audio();
  audio["wrong"].src = "audio/wrong-answer.wav";
  $("#gamePage").hide();
  $("#reset").hide();
  $("#win").hide();
  $("#lose").hide();
  $(".gold").hide();
  $(".background-forest").hide();
  bubbles();
  $("html").addClass("set-background");
  $(document.body).addClass("set-background");
  $("form#formOne").submit(function(event) {
    event.preventDefault();
    audio["flying"].play ();
    gameType = $("#gameType").val();
    gameMode = $("#gameMode").val();
    name = $("input#gameName").val();

    var data= new Datas (gameType,gameMode,name);
    var game= new Game ();
    data.getData();
    $("#playerName").text(data.name);
    $(".homePage").hide();
    $(".gamePage").show();
    $("#dragon-sleep").hide();
    // $(".dragon#firebreathing").show();
    $(".dragon#flying").show();
    // $(".dragon#surprised").show();

    $(".game-buttons").hide();



    addStartEventListeners(data,game);

  })
})
// Bubbles

function bubbles() {
  var bArray = [];
  var sArray = [4,6,8,10];
  for (var i = 0; i < $('.bubbles').width(); i++) {
    bArray.push(i);
  }
  function randomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  setInterval(function(){
    var size = randomValue(sArray);
    $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');

    $('.individual-bubble').animate({
      'bottom': '100%',
      'opacity' : '-=0.7'
    }, 3000, function(){
      $(this).remove()
    }
  );
}, 350);
}
function moveDragon() {
var flightDistance = 2;
  setInterval(function(){
  $(".dragon").css("left", flightDistance+"%");
  if(flightDistance != 32) {
  flightDistance+=0.5;
  } else {
  return
  }
  console.log($(".dragon").css("left"));
},50);
}

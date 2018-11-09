// Business Logic
// Game constructor to create game object to keep scores and check the end game condition.
function Game () {
  this.wrongAnswers = 0;
  this.correctAnswers= 0;
  this.progress = "continue";
}
Game.prototype.getCorrectAnswer = function (){
  this.correctAnswers++;
}
Game.prototype.getWrongAnswer = function (){
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
//Data constructor that use Ajax to get questions and answers from addition.txt file,store them in 4 arrays and generate random position for answers
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
  });
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
        };
      };
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
  var firstButton=$("button#answerOne");
  var secondButton=$("button#answerTwo");
  var thirdButton=$("button#answerThree");
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
//just create random values
function generateRandom(number){
  return Math.floor(Math.random() * number);
}
//add event listener to start button
function addStartEventListeners(data,game){
  $("button#startGame").click(function(){
    $("button#startGame").hide();
    $(".game-buttons").show();
    $(".rock").show();
    moveDragon();
    continueGame(data,game);
  })
}
//add event listener to random answers and use goOn object to continue playing game
function continueGame (data,game){
  data.generateRandomQuestion();
  audio["rock"].play();
  $("button.correctAnswer").click(function(){
    game.getCorrectAnswer();
    audio["fire"].play();
    $(".dragon#flying").hide();
    $(".dragon#firebreathing").show();
    setTimeout(function(){
      $(".dragon#flying").show();
      $(".dragon#firebreathing").hide();
    },800);
    goOn(data,game);
  });
  $("button.wrongAnswer1").click(function(){
    game.getWrongAnswer();
    audio["wrong"].play();
    $(".dragon#flying").show();
    $(".dragon#firebreathing").hide();
    goOn(data,game);
  });
  $("button.wrongAnswer2").click(function(){
    game.getWrongAnswer();
    audio["wrong"].play();
    $(".dragon#flying").show();
    $(".dragon#firebreathing").hide();
    goOn(data,game);
  });
}
// a function to refresh points showed in game screen and check the condition for end game or continue playing
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
  };
}
function refreshPoints (game) {
  $("#correctAnswers").text(game.correctAnswers);
  $("#wrongAnswers").text(game.wrongAnswers);
}
//to create win scenario
function win(data){
  $(".rock").addClass("explode");
  setTimeout(function(){
    audio["flying"].pause();
    audio["backSound"].pause();
    audio["win"].play();
    $("#flying").hide();
    $(".dragon#firebreathing").hide();
    $(".wings-down").hide();
    $("#question").hide();
    $(".game-buttons").hide();
    $(".wings-up").hide();
    $("#win").show();
    $(".gold").show();
  },1000);
}
//to create lose scenario
function lose(data) {
    audio["flying"].pause();
    audio["backSound"].pause();
    audio["lose"].play();
    $(".dragon#flying").hide();
    $(".dragon#firebreathing").hide();
    $(".wings-down").hide();
    $("#question").hide();
    $(".game-buttons").hide();
    $(".wings-up").hide();
    $("#lose").show();
}
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
  return;
  }
  console.log($(".dragon").css("left"));
},50);
}
//main code
$(document).ready(function() {
  //music creators and play the back sound
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
  audio["win"] = new Audio();
  audio["win"].src = "audio/win.mp4";
  audio["lose"] = new Audio();
  audio["lose"].src = "audio/lose.mp4";
  audio["fire"] = new Audio();
  audio["fire"].src = "audio/firesmall1.wav";
  audio["wrong"] = new Audio();
  audio["wrong"].src = "audio/wrong-answer.wav";
  //hide later features
  $("#gamePage").hide();
  $("#reset").hide();
  $("#win").hide();
  $("#lose").hide();
  $(".gold").hide();
  $(".rock").hide();
  bubbles();
  $("html").addClass("set-background");
  $(document.body).addClass("set-background");
  //event listener for submit button
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
    $(".dragon#flying").show();
    $(".game-buttons").hide();
    addStartEventListeners(data,game);
  });
});

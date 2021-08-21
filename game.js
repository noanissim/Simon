
var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$('body').keydown( function(){
  if(!started){
    $('#level-title').text( 'level '+level);
    nextSequence();
    started = true; }

});


$('.btn').on('click', function(){ //פונקציה שתזהה איזה כפתור נלחץ
  var userChosenColor = $(this).attr('id'); //שומר את האיידי של הכפתור שנלחץ
  userClickedPattern.push(userChosenColor); //דוחף למערך ההצבעות

  checkAnswer(userClickedPattern.length-1);
  // מעביר לפונקציה את המיקום במערךשל התשובה האחרונה שהמשתמש הכניס
  animatePress(userChosenColor);
  playSound(userChosenColor);


});

function checkAnswer(currentLevel){
  if( gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
    console.log('success');
    // אם באותו מקום המערך של מה שהיוזר לחץ שווה לאותו מקום במערךשל מה שנבחר לצבעים מדפיס הצלחה
    if(gamePattern.length === userClickedPattern.length){
// בודקת אם המשתמש סיים להכניס את כל הרצף צבעים שהוא מקליק
      setTimeout(function(){
        nextSequence();},1000);
    }
// אם סיים- הפונקציה של צליל הבא מופעלת
  } else{
    console.log('wrong');
    playSound('wrong');
    $('body').addClass('game-over');
    $('#level-title').html('Game over,press any key to start');

    setTimeout(function(){
      $('body').removeClass('game-over');
    }, 200);
    startOver();
  }
}



function nextSequence(){
  userClickedPattern = [];
  level ++;
  $('#level-title').html('Level '+level);
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $('#'+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //אנימציה

  playSound(randomChosenColor);

}





function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play(); //שם את האודיו המתאים מהתיקייה

}




function animatePress(currentColor){
  $('#'+currentColor).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColor).removeClass('pressed'); }, 100);
}


function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern=[];

}

console.log("I'm on the game");
// put the functions in an object and then have it prototype new funcitons in each part ofthe game!!!
// It would be nice to have something that differentiates between no play and play - glowing outside box.... 

// Game speed up
// Different game states - when it is your turn
// Style the black circles: DONE
// Make the REF announce wins and streaks!

$(init);

function init (){
  console.log("I'm loaded too!")

// This stores the played moves
  var userMoves = [];

// this stores how many moves we have
  var playerToken = 0;
 
// If the game is over
  var gameOver = false;

// setTimeout delay
  var time = 0;

// need a place holder to decrease as you get higher in the sequence...
  var difficultyLevel = 0;

  // Need something to take time and half it for light up and loight out
  var lightSpeed = 0;

// My sequece to test
  var mySequence = [randomNumber()];

// how many I have right in row
  var correct = -1;

// the current streak
  var score = 0;

// jQuerying my listener on the do
  var $document = $(document);

// array that holds all the balues
  var hiScore = [];

// while it's playing a sequence display WAIT when it's done display GO
function gameStatus(time){
  

  $('#inner-circle').html("<br>WAIT");

  var statusTimer = setTimeout(function(){
                          
                            $('#inner-circle').html("<br>GO");
                          
                          }
                          , time);
                          statusTimer;

}

// Rest the Game  - will use ths in both cases.....
function resetTheGame(playerWon,startPosition,speed){
  
  userMoves = [];
  playerToken = 0;

  if (playerWon === true){
    score += 1;
    $('#playerScore').html(score);
    lightSpeed -=10;
  }
  else if (playerWon === false){
    $('#hiScore').html(setHighScore(score));
    score = 0;
    $('#playerScore').html(score);
    mySequence = [startPosition];
    runGame(speed);
  }

}
// its between 37 and 40 so I'll need to just have a switch to reutrn a different number
function randomNumber(){
      return  Math.floor(Math.random()*(40-37+1)+37);
  }


// Add a new number to the array 37,38,39,40
function addColorToPatern (){
    mySequence.push(randomNumber());
}

// This is my animation funciton that I use EVERYWHERE!
function lightUp(id,howFast){
  $(id).animate({
                  opacity: 1.0,
                  queue : true},
                  howFast, 
                  function (){
                    $(id).animate({
                                        opacity: 0.4},
                                        howFast)

                  });
  // console.log(idPlay);
}

function playSound(id){
  var gameAudio = document.getElementById(id)
  console.log(id);
  gameAudio.play();
}

// This is to check if user is putting the right stuff in order! get max from array

function setHighScore(lastScore){

  hiScore.push(lastScore);

  return Math.max.apply(Math,hiScore)
}

function checkSequence (){

  // stuff to check i'm not lost.....
  console.log("CHECK SEQUECNE RUN");
  console.log("playerToken currently: "+ playerToken);
  console.log("Your Last Move: " + userMoves[playerToken]);
  console.log("The computer Mover: " + mySequence[playerToken]);

  if (userMoves[playerToken] !== mySequence[playerToken])
  {
    resetTheGame(false,randomNumber(),500);

  } else{

    playerToken += 1;

  }
}

// this is run to first see if we have reached the end of the array of moves and then if the input if right... 
// Note to future mike could maybe put the check sequence and win into one function.... seems like if you haven't won then 
// you should check a squence.... then... move on..... hmmm okay...
function checkWin(){
  console.log("CHECK WIN RUN");

  if((userMoves[playerToken] === mySequence[playerToken] ) && (userMoves.length === mySequence.length)){
    // console.log("YOU DID IT");
    // score += 1;
    // $('#playerScore').html(score);
    // userMoves = [];
    // playerToken = 0;

    resetTheGame(true,randomNumber,500);

    return true
  }
  else {
    return false;
  }
}

// I noticed that in my game i was repeating a lof of this phrase so I put it here for now.... 
function gamePusher (color,key){
  

  lightUp(color,lightSpeed);


  userMoves.push(key);

    if (checkWin() === true ){ 
      addColorToPatern();
      difficultyLevel -= 20;
      runGame(difficultyLevel);
    }        
    else { 
      checkSequence();
    } 

}


// This put an event listener on the whole page so when I press an arrow button it changes the opacity of the divs
function playerAllowedToMove(time){

// Switch off the keylisten while the patern runs to avoid false inputs
  $document.off('keydown');
  
// switch it back on....
  mover = setTimeout( function (){
    console.log("MAKE A MOVE")
  
  $document.on('keydown', function(e){
    switch(e.which){
      case 37:  gamePusher("#red",37);
                playSound("redPlay");
      break;

      case 38:  gamePusher("#green", 38);
                playSound("greenPlay");
            
      break;

      case 39:  gamePusher("#yellow", 39);
                playSound("yellowPlay");

      break;

      case 40:  gamePusher("#blue", 40);
                playSound("bluePlay");

      break;
    }
  });    

  }, time);

}

// Run a pattern

function moves(e) {
  
  switch(e){
        case 37:  console.log("You pressed LEFT");
                  lightUp("#red",lightSpeed);
                  playSound("redPlay");
        break;

        case 38:  console.log("You pressed UP");
                  lightUp("#green",lightSpeed);
                  playSound("greenPlay");

        break;
        
        case 39:  console.log("You pressed RIGHT");
                  lightUp("#yellow",lightSpeed);
                  playSound("yellowPlay");

        break;
        
        case 40:  console.log("You pressed DOWN");
                  lightUp("#blue", lightSpeed);
                  playSound("bluePlay");

        break;
      }
}

  function runGame(difficulty){
    
    time = difficulty;
    lightSpeed = difficulty/2;
    difficultyLevel = difficulty;


    for (var i = 0 ; i < mySequence.length ; i++){      
          console.log(mySequence[i]);

          switch(mySequence[i]){
            
          case 37:      timer = setTimeout(function(){
                        console.log("RED");
                        moves(37);
                        playSound("redPlay");
                        }
                        , time);
                        timer;
                        time += difficulty;
          break;

          case 38:      timer = setTimeout(function(){
                        console.log("GREEN");
                        moves(38);
                        }
                        , time);
                        timer;
                        time+= difficulty;
          break;

          case 39:      timer = setTimeout(function(){
                        console.log("YELLOW");
                        moves(39);
                        }
                        , time);
                        timer;
                        time+= difficulty;
          break;

          case 40:      timer = setTimeout(function(){
                        console.log("BLUE");
                        moves(40);
                        }
                        , time);
                        timer;
                        time+= difficulty;
          break;

          }
    // }
    
      }

      // put something here that stops the user from pressing buttons.... .delay(time)
      playerAllowedToMove(time);
      gameStatus(time);

  }



// Start the game!
  // runGame(500);

$document.on('keydown', function(e){
  console.log(e.which);
})


73
79
75
76



  // EOL
};
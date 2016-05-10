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




// // This is my boolean to make sure only one game is running....
//   var killTheGame = false;

// // This stores the played moves
//   var userMoves = [];

// // this stores how many moves we have
//   var playerToken = 0;
 
// // If the game is over
//   var gameOver = false;

// // setTimeout delay
//   var time = 0;

// // need a place holder to decrease as you get higher in the sequence...
//   var difficultyLevel = 0;

//   // Need something to take time and half it for light up and loight out
//   var lightSpeed = 0;

// // My sequece to test
//   var mySequence = [randomNumber()];

// // how many I have right in row
//   var correct = -1;

// // the current streak
//   var score = 0;


// // array that holds all the balues
//   var hiScore = [];



// jQuerying my listener on the do


var $document = $(document);



var Referee = {

     killTheGame      : false,
     userMoves        : [],
     playerToken      : 0,
     gameOver         : false,
     time             : 0,
     difficultyLevel  : 0,
     lightSpeed       : 0,
     mySequence       : [],
     correct          : -1,
     score            : 0,
     hiScore          : []
}

var SimonSays = {

  gameStatus          : function(time){

                        $('#inner-circle').html("<br>WAIT");

                        var statusTimer = setTimeout(function(){
                                                
                                                  $('#inner-circle').html("<br>GO");
                                                
                                                }
                                                , time);
                        statusTimer;

                        console.log("Youv'e run the Game Status from Simon Object: ");
  },

  randomNumber        : function(){

                        console.log("You've run Random Number");
                        return Math.floor(Math.random()*(40-37+1)+37);


  },

  addColorToPatern    : function(){

                        Referee.mySequence.push(this.randomNumber());
                        console.log("You've run Addcolortopatern from simon");

  },

  lightUp             : function(id,howFast){
                        $(id).animate({
                                        opacity: 1.0,
                                        queue : true},
                                        howFast, 
                                        function (){
                                          $(id).animate({
                                                              opacity: 0.4},
                                                              howFast)

                                        });

                        console.log("You've run lightUP from Simon");

  },

  playSound           : function (id){
                        var gameAudio = document.getElementById(id)
                        console.log(id);
                        gameAudio.play();

                        console.log("You've run PlaySound from Simon");

  },

  setHighScore        : function (lastScore){
                        Referee.hiScore.push(lastScore);
                        return Math.max.apply(Math,Referee.hiScore);

                        console.log("You've run setHighScore from Simon");
  },

  resetTheGame        : function(playerWon,startPosition,speed) {

                        Referee.userMoves = [];
                        Referee.playerToken = 0;

                        if (playerWon === true){
                            Referee.score += 1;
                            $('#playerScore').html(Referee.score);
                            Referee.lightSpeed -=10;
                          }
                        else if (playerWon === false){
                            $('#hiScore').html(SimonSays.setHighScore(Referee.score));
                            Referee.score = 0;
                            $('#playerScore').html(Referee.score);
                            Referee.mySequence = [startPosition];
                            SimonSays.runGame(speed);
                          }

                        console.log("You've run Reset the Game from Simon Object");

  },

  checkSequence       : function (){

                        console.log("CHECK SEQUECNE RUN");
                        console.log("playerToken currently: "+ Referee.playerToken);
                        console.log("Your Last Move: " + Referee.userMoves[Referee.playerToken]);
                        console.log("The computer Mover: " + Referee.mySequence[Referee.playerToken]);


                        if (Referee.userMoves[Referee.playerToken] !== Referee.mySequence[Referee.playerToken])
                        { 
                          $('#inner-circle').html("<br>NOPE");
                          setTimeout( function(){SimonSays.resetTheGame(false,SimonSays.randomNumber(),500)}, 1500);

                        } else{

                          Referee.playerToken += 1;

                        }

                        console.log("You've run checkSequence from Simon Object");

  },

  checkWin              : function (){
                          console.log("CHECK WIN RUN");


                          if((Referee.userMoves[this.playerToken] === Referee.mySequence[this.playerToken] ) && (Referee.userMoves.length === Referee.mySequence.length)){
                            // console.log("YOU DID IT");
                            // score += 1;
                            // $('#playerScore').html(score);
                            // userMoves = [];
                            // playerToken = 0;
                            $document.off('keydown');


                            SimonSays.resetTheGame(true,SimonSays.randomNumber,500);

                            SimonSays.playerAllowedToMove(1);

                            return true
                          }
                          else {
                            
                            return false;

                        console.log("You've run checkWin from Simon Object");

    }
  },


  gamePusher            : function (color,key){
    
                        this.lightUp(color, Referee.lightSpeed);
                        Referee.userMoves.push(key);

                          if (SimonSays.checkWin() === true ){ 
                            console.log("WE ARE IN THE GAMEPUSHER checkWin is TRUE");
                            SimonSays.addColorToPatern();
                            Referee.difficultyLevel -= 20;
                            $('#inner-circle').html("<br>NICE");
                            setTimeout ( function () {SimonSays.runGame(Referee.difficultyLevel)}, 1000);
                          }        
                          else { 
                            SimonSays.checkSequence();
                          } 

                          console.log("You've run checkWin from Simon Object");

  },

  playerAllowedToMove   : function (time) {

                        // Switch off the keylisten while the patern runs to avoid false inputs
                          $document.off('keydown');

                        // switch it back on....
                          mover = setTimeout( function (){
                            console.log("MAKE A MOVE")
                          
                          $document.on('keydown', function(e){

                              switch(e.which){
                                case 37:  SimonSays.gamePusher("#red",37);
                                          SimonSays.playSound("redPlay");
                                break;

                                case 38:  SimonSays.gamePusher("#green", 38);
                                          SimonSays.playSound("greenPlay");
                                break;

                                case 39:  SimonSays.gamePusher("#yellow", 39);
                                          SimonSays.playSound("yellowPlay");
                                break;

                                case 40:  SimonSays.gamePusher("#blue", 40);
                                          SimonSays.playSound("bluePlay");
                                break;
                              }


                            
                          });    

                          }, time);

  },

  moves                 : function (e) {
    
                              switch(e){
                                    case 37:  console.log("You pressed LEFT");
                                              SimonSays.lightUp("#red", Referee.lightSpeed);
                                              SimonSays.playSound("redPlay");
                                    break;

                                    case 38:  console.log("You pressed UP");
                                              SimonSays.lightUp("#green", Referee.lightSpeed);
                                              SimonSays.playSound("greenPlay");

                                    break;
                                    
                                    case 39:  console.log("You pressed RIGHT");
                                              SimonSays.lightUp("#yellow", Referee.lightSpeed);
                                              SimonSays.playSound("yellowPlay");
                                    break;
                                    
                                    case 40:  console.log("You pressed DOWN");
                                              SimonSays.lightUp("#blue", Referee.lightSpeed);
                                              SimonSays.playSound("bluePlay");
                                    break;
        }
  },


  runGame                 : function (difficulty){

                            Referee.time = difficulty;
                            Referee.lightSpeed = difficulty/2;
                            Referee.difficultyLevel = difficulty;


                            for (var i = 0 ; i < Referee.mySequence.length ; i++){      
                                  
                                  console.log(Referee.mySequence[i]);

                                          switch(Referee.mySequence[i]){
                                            
                                          case 37:      timer = setTimeout(function(){
                                                        console.log("RED");
                                                        SimonSays.moves(37);
                                                        }
                                                        , Referee.time);
                                                        timer;
                                                        Referee.time += difficulty;
                                          break;

                                          case 38:      timer = setTimeout(function(){
                                                        console.log("GREEN");
                                                        SimonSays.moves(38);
                                                        }
                                                        , Referee.time);
                                                        timer;
                                                        Referee.time += difficulty;
                                          break;

                                          case 39:      timer = setTimeout(function(){
                                                        console.log("YELLOW");
                                                        SimonSays.moves(39);
                                                        }
                                                        , Referee.time);
                                                        timer;
                                                        Referee.time += difficulty;
                                          break;

                                          case 40:      timer = setTimeout(function(){
                                                        console.log("BLUE");
                                                        SimonSays.moves(40);
                                                        }
                                                        , Referee.time);
                                                        timer;
                                                        Referee.time += difficulty;
                                          break;

                                          }
                            // }
                              }

                              // put something here that stops the user from pressing buttons.... .delay(time)
                              this.playerAllowedToMove(Referee.time);
                              this.gameStatus(Referee.time);

                          }


}

Referee.mySequence[0] = SimonSays.randomNumber();

SimonSays.runGame(500);


// SimonSays.addColorToPatern();
// SimonSays.lightUp("#red", 100);
// SimonSays.playSound("redPlay")

// // THIS IS THE OLD COLD ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// // while it's playing a sequence display WAIT when it's done display GO
// function gameStatus(time){
  

//   $('#inner-circle').html("<br>WAIT");

//   var statusTimer = setTimeout(function(){
                          
//                             $('#inner-circle').html("<br>GO");
                          
//                           }
//                           , time);
//                           statusTimer;

// }

// // Rest the Game  - will use ths in both cases.....
// function resetTheGame(playerWon,startPosition,speed){
  
//   // userMoves = [];
//   // playerToken = 0;

//   // if (playerWon === true){
//   //   score += 1;
//   //   $('#playerScore').html(score);
//   //   lightSpeed -=10;
//   // }
//   // else if (playerWon === false){
//   //   $('#hiScore').html(setHighScore(score));
//   //   score = 0;
//   //   $('#playerScore').html(score);
//   //   mySequence = [startPosition];
//   //   runGame(speed);
//   // }

//   Referee.userMoves = [];
//   Referee.playerToken = 0;

//   if (playerWon === true){
//     Referee.score += 1;
//     $('#playerScore').html(Referee.score);
//     Referee.lightSpeed -=10;
//   }
//   else if (playerWon === false){
//     $('#hiScore').html(setHighScore(Referee.score));
//     Referee.score = 0;
//     $('#playerScore').html(Referee.score);
//     Referee.mySequence = [startPosition];
//     runGame(speed);
//   }


// }
// // its between 37 and 40 so I'll need to just have a switch to reutrn a different number
// function randomNumber(){
//       return  Math.floor(Math.random()*(40-37+1)+37);
//   }


// // Add a new number to the array 37,38,39,40
// function addColorToPatern (){
//     Referee.mySequence.push(randomNumber());
// }

// // This is my animation funciton that I use EVERYWHERE!
// function lightUp(id,howFast){
//   $(id).animate({
//                   opacity: 1.0,
//                   queue : true},
//                   howFast, 
//                   function (){
//                     $(id).animate({
//                                         opacity: 0.4},
//                                         howFast)

//                   });
//   // console.log(idPlay);
// }

// function playSound(id){
//   var gameAudio = document.getElementById(id)
//   console.log(id);
//   gameAudio.play();
// }

// // This is to check if user is putting the right stuff in order! get max from array

// function setHighScore(lastScore){

//   Referee.hiScore.push(lastScore);

//   return Math.max.apply(Math,Referee.hiScore);
// }

// function checkSequence (){

//   // // stuff to check i'm not lost.....
//   // console.log("CHECK SEQUECNE RUN");
//   // console.log("playerToken currently: "+ playerToken);
//   // console.log("Your Last Move: " + userMoves[playerToken]);
//   // console.log("The computer Mover: " + mySequence[playerToken]);

//   // if (userMoves[playerToken] !== mySequence[playerToken])
//   // { 
//   //   $('#inner-circle').html("<br>NOPE");
//   //   setTimeout( function(){resetTheGame(false,randomNumber(),500)}, 1500);

//   // } else{

//   //   playerToken += 1;

//   // }

// // stuff to check i'm not lost.....
//   console.log("CHECK SEQUECNE RUN");
//   console.log("playerToken currently: "+ Referee.playerToken);
//   console.log("Your Last Move: " + Referee.userMoves[Referee.playerToken]);
//   console.log("The computer Mover: " + Referee.mySequence[Referee.playerToken]);

//   if (Referee.userMoves[Referee.playerToken] !== Referee.mySequence[Referee.playerToken])
//   { 
//     $('#inner-circle').html("<br>NOPE");
//     setTimeout( function(){resetTheGame(false,randomNumber(),500)}, 1500);

//   } else{

//     Referee.playerToken += 1;

//   }



// }

// // this is run to first see if we have reached the end of the array of moves and then if the input if right... 
// // Note to future mike could maybe put the check sequence and win into one function.... seems like if you haven't won then 
// // you should check a squence.... then... move on..... hmmm okay...
// function checkWin(){
//   // console.log("CHECK WIN RUN");

//   // if((userMoves[playerToken] === mySequence[playerToken] ) && (userMoves.length === mySequence.length)){
//   //   // console.log("YOU DID IT");
//   //   // score += 1;
//   //   // $('#playerScore').html(score);
//   //   // userMoves = [];
//   //   // playerToken = 0;

//   //   resetTheGame(true,randomNumber,500);

//   //   return true
//   // }
//   // else {
//   //   return false;
//   // }

//   console.log("CHECK WIN RUN");

//   if((Referee.userMoves[this.playerToken] === Referee.mySequence[this.playerToken] ) && (Referee.userMoves.length === Referee.mySequence.length)){
//     // console.log("YOU DID IT");
//     // score += 1;
//     // $('#playerScore').html(score);
//     // userMoves = [];
//     // playerToken = 0;

//     resetTheGame(true,randomNumber,500);

//     return true
//   }
//   else {
//     return false;
//   }





// }

// // I noticed that in my game i was repeating a lof of this phrase so I put it here for now.... 
// function gamePusher (color,key){
  

//   // lightUp(color,lightSpeed);


//   // userMoves.push(key);

//   //   if (checkWin() === true ){ 
//   //     console.log("WE ARE IN THE GAMEPUSHER checkWin is TRUE");
//   //     addColorToPatern();
//   //     difficultyLevel -= 20;
//   //     $('#inner-circle').html("<br>NICE");
//   //     setTimeout ( function () {runGame(difficultyLevel)}, 1000);
//   //   }        
//   //   else { 
//   //     checkSequence();
//   //   } 


//   lightUp(color, Referee.lightSpeed);


//   Referee.userMoves.push(key);

//     if (checkWin() === true ){ 
//       console.log("WE ARE IN THE GAMEPUSHER checkWin is TRUE");
//       addColorToPatern();
//       Referee.difficultyLevel -= 20;
//       $('#inner-circle').html("<br>NICE");
//       setTimeout ( function () {runGame(Referee.difficultyLevel)}, 1000);
//     }        
//     else { 
//       checkSequence();
//     } 

// }


// // This put an event listener on the whole page so when I press an arrow button it changes the opacity of the divs
// function playerAllowedToMove(time){

// // Switch off the keylisten while the patern runs to avoid false inputs
//   $document.off('keydown');

// // switch it back on....
//   mover = setTimeout( function (){
//     console.log("MAKE A MOVE")
  
//   $document.on('keydown', function(e){

//       switch(e.which){
//         case 37:  gamePusher("#red",37);
//                   playSound("redPlay");
//         break;

//         case 38:  gamePusher("#green", 38);
//                   playSound("greenPlay");
//         break;

//         case 39:  gamePusher("#yellow", 39);
//                   playSound("yellowPlay");
//         break;

//         case 40:  gamePusher("#blue", 40);
//                   playSound("bluePlay");
//         break;
//       }


    
//   });    

//   }, time);

// }

// // Run a pattern

// // Key up..... last of key up while keydown === true DONT RUN ANOYTHING // SPACE TO START

// function moves(e) {
  
//   switch(e){
//         case 37:  console.log("You pressed LEFT");
//                   lightUp("#red", Referee.lightSpeed);
//                   playSound("redPlay");
//         break;

//         case 38:  console.log("You pressed UP");
//                   lightUp("#green", Referee.lightSpeed);
//                   playSound("greenPlay");

//         break;
        
//         case 39:  console.log("You pressed RIGHT");
//                   lightUp("#yellow", Referee.lightSpeed);
//                   playSound("yellowPlay");

//         break;
        
//         case 40:  console.log("You pressed DOWN");
//                   lightUp("#blue", Referee.lightSpeed);
//                   playSound("bluePlay");

//         break;
//       }
// }

//   function runGame(difficulty){

//     // flashAllColors();

    
//     // time = difficulty;
//     // lightSpeed = difficulty/2;
//     // difficultyLevel = difficulty;


//     // for (var i = 0 ; i < mySequence.length ; i++){      
//     //       console.log(mySequence[i]);

//     //       switch(mySequence[i]){
            
//     //       case 37:      timer = setTimeout(function(){
//     //                     console.log("RED");
//     //                     moves(37);
//     //                     playSound("redPlay");
//     //                     }
//     //                     , time);
//     //                     timer;
//     //                     time += difficulty;
//     //       break;

//     //       case 38:      timer = setTimeout(function(){
//     //                     console.log("GREEN");
//     //                     moves(38);
//     //                     }
//     //                     , time);
//     //                     timer;
//     //                     time+= difficulty;
//     //       break;

//     //       case 39:      timer = setTimeout(function(){
//     //                     console.log("YELLOW");
//     //                     moves(39);
//     //                     }
//     //                     , time);
//     //                     timer;
//     //                     time+= difficulty;
//     //       break;

//     //       case 40:      timer = setTimeout(function(){
//     //                     console.log("BLUE");
//     //                     moves(40);
//     //                     }
//     //                     , time);
//     //                     timer;
//     //                     time+= difficulty;
//     //       break;

//     //       }
//     // // }
    
//     //   }



//     Referee.time = difficulty;
//     Referee.lightSpeed = difficulty/2;
//     Referee.difficultyLevel = difficulty;


//     for (var i = 0 ; i < Referee.mySequence.length ; i++){      
//           console.log(Referee.mySequence[i]);

//           switch(Referee.mySequence[i]){
            
//           case 37:      timer = setTimeout(function(){
//                         console.log("RED");
//                         moves(37);
//                         playSound("redPlay");
//                         }
//                         , Referee.time);
//                         timer;
//                         Referee.time += difficulty;
//           break;

//           case 38:      timer = setTimeout(function(){
//                         console.log("GREEN");
//                         moves(38);
//                         }
//                         , Referee.time);
//                         timer;
//                         Referee.time += difficulty;
//           break;

//           case 39:      timer = setTimeout(function(){
//                         console.log("YELLOW");
//                         moves(39);
//                         }
//                         , Referee.time);
//                         timer;
//                         Referee.time += difficulty;
//           break;

//           case 40:      timer = setTimeout(function(){
//                         console.log("BLUE");
//                         moves(40);
//                         }
//                         , Referee.time);
//                         timer;
//                         Referee.time += difficulty;
//           break;

//           }
//     // }
    
//       }
//       // put something here that stops the user from pressing buttons.... .delay(time)
//       playerAllowedToMove(Referee.time);
//       gameStatus(Referee.time);

//   }


// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ THIS IS HTE OLD CODE



// Start the game!

  // runGame(500);

// $document.on('keydown', function(e){
//   console.log(e.which);
// })




  // EOL
};
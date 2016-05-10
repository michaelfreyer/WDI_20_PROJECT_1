console.log("I'm on the game");

$(init);

function init (){
  console.log("I'm loaded too!")
// This stores the played moves
  var userMoves = [];

// this stores how many moves we have
  var playerToken = -1;
 
// If the game is over
  var gameOver = false;

// setTimeout delay
  var time = 0;

// My sequece to test
  var mySequence = [37,38,39,40];

// how many I have right in row
  var correct = -1;

  var score = 0;


  // var timer = null;
  
  // if (time) {
  //     clearTimeout(timer); //cancel the previous timer.
  //     timer = null;
  // }
  // timer = setTimeout(thisFunction, 10000);


// This put an event listener on the whole page so when I press an arrow button it changes the opacity of the divs
  $(document).on('keydown', function(e){
    switch(e.which){
      case 37:  console.log("You pressed LEFT");
                $("#red").animate({
                  opacity: 1.0,
                  queue : true},
                  250, 
                  function (){
                    $("#red").animate({
                                        opacity: 0.4},
                                        250)

                  });
                  userMoves.push(37);
                  
                  if ((userMoves[playerToken] === mySequence[playerToken] ) && (userMoves.length === mySequence.length)){
                    console.log("YOU DID IT");
                    score += 1;
                    $('#playerScore').html(score);
                    userMoves = [];
                    runGame(500)


                  }        
                  console.log(userMoves);

                  playerToken += 1;


      break;

      case 38:  console.log("You pressed UP");
                $("#green").animate({
                  opacity: 1.0,
                  queue : true},
                  250, 
                  function (){
                    $("#green").animate({
                                        opacity: 0.4},
                                        250)

                  });
                  userMoves.push(38);
                  if ((userMoves[playerToken] === mySequence[playerToken] ) && (userMoves.length === mySequence.length)){
                    console.log("YOU DID IT");
                    score += 1;
                    $('#playerScore').html(score);
                    userMoves = [];
                    runGame(500)


                  }

                  console.log(userMoves);
                  playerToken += 1 ;
      break;

      case 39:  console.log("You pressed RIGHT");
                $("#yellow").animate({
                  opacity: 1.0,
                  queue : true},
                  250, 
                  function (){
                    $("#yellow").animate({
                                        opacity: 0.4},
                                        250)

                  });
                  userMoves.push(39);
                  
                  if ((userMoves[playerToken] === mySequence[playerToken] ) && (userMoves.length === mySequence.length)){
                    console.log("YOU DID IT");
                    score += 1;
                    $('#playerScore').html(score);
                    userMoves = [];
                    runGame(500)


                  }

                  console.log(userMoves);
                  playerToken += 1;
      break;

      case 40:  console.log("You pressed DOWN");
                $("#blue").animate({
                  opacity: 1.0,
                  queue : true},
                  250, 
                  function (){
                    $("#blue").animate({
                                        opacity: 0.4},
                                        250)

                  });
                  userMoves.push(40);
                  if ((userMoves[playerToken] === mySequence[playerToken] ) && (userMoves.length === mySequence.length)){
                    console.log("YOU DID IT");
                    score += 1;
                    $('#playerScore').html(score);
                    userMoves = [];
                    runGame(500)


                  }

                  console.log(userMoves);
                  playerToken += 1;
      break;
    }
  });


// This is my test case to match


// Run a pattern

function moves(e) {
  
  switch(e){
        case 37:  console.log("You pressed LEFT");
                        $("#red").animate({
                          opacity: 1.0,
                          queue : true},
                          250, 
                          function (){
                            $("#red").animate({
                                                opacity: 0.4},
                                                250)

                          });

              break;
              case 38:  console.log("You pressed UP");
                        $("#green").animate({
                          opacity: 1.0,
                          queue : true},
                          250, 
                          function (){
                            $("#green").animate({
                                                opacity: 0.4},
                                                250)

                          });
              break;
              case 39:  console.log("You pressed RIGHT");
                        $("#yellow").animate({
                          opacity: 1.0,
                          queue : true},
                          250, 
                          function (){
                            $("#yellow").animate({
                                                opacity: 0.4},
                                                250)

                          });
              break;
              case 40:  console.log("You pressed DOWN");
                        $("#blue").animate({
                          opacity: 1.0,
                          queue : true},
                          250, 
                          function (){
                            $("#blue").animate({
                                                opacity: 0.4},
                                                250)

                          });
              break;
      }
}

  function runGame(difficulty){
    time = difficulty;

    for (var i = 0 ; i < mySequence.length ; i++){
      
          console.log(mySequence[i]);

          switch(mySequence[i]){
            
          case 37:      timer = setTimeout(function(){
                        console.log("RED");
                        moves(37);
                        }
                        , time);
                        // timer;
                        time+= 500;
          break;

          case 38:      timer = setTimeout(function(){
                        console.log("GREEN");
                        moves(38);
                        }
                        , time);
                        timer;
                        time+= 500;
          break;

          case 39:      timer = setTimeout(function(){
                        console.log("YELLOW");
                        moves(39);
                        }
                        , time);
                        timer;
                        time+= 500;
          break;

          case 40:      timer = setTimeout(function(){
                        console.log("BLUE");
                        moves(40);
                        }
                        , time);
                        timer;
                        time+= 500;
          break;

          }
    // }
    
      }
  }

  runGame(500);
  // console.log($('#playerScore').html('11'));

















  // EOL
};
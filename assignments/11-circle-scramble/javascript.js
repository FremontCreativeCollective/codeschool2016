var circles = document.getElementsByClassName("circle");
var score = document.getElementById("score");
var time_remaining = document.getElementById("time_remaining");
var high_score = document.getElementById("high_score");
var number = 0;
var time = 15;

// an array of keyCode's that is our cheat!
var cheat_code1 = [87, 79, 79, 84]; // w, o, o, t
var cheat_code2 = [83, 79, 83]; // s, o, s

var cheat_codes = [cheat_code1, cheat_code2];

var user_entered = [];
var valid_cheats = [];

document.addEventListener('keydown', checkCheat);

function checkCheat(event){
  
  var keycode = event.keyCode;
  
  if(keycode == 27){
      // they pressed 'esc' and want to start over
      user_entered = [];
      return;
  }
  
  user_entered.push(keycode);
  
  for(var i = 0; i < cheat_codes.length; i++){
    var cheat_code = cheat_codes[i];
    
    valid_cheats[i] = true;
    for(var k = 0; k < cheat_code.length; k++){
      var cheat_keycode = cheat_code[k];
      var user_keycode = user_entered[k];
    
      if(cheat_keycode != user_keycode){
        valid_cheats[i] = false;
      }
    
    } // ends the keycode checking
    
  } // ends cheat_codes loop
  
  if(valid_cheats[0] == true){
    //cheat_code1 is valid

    user_entered = [];
    
    var single_circle = circles[2];
    var cloned_circle = single_circle.cloneNode();
     
    console.log(circles);
     
    cloned_circle.addEventListener("click", addPoints);
     
    document.body.appendChild(cloned_circle);
  }
  
  if(valid_cheats[1]){
    //cheat_code2 is valid
    
    var random = Math.floor(Math.random() * 4); // random number generator
    
    if(random == 1){
      time = time + time;
    }else if(random == 2){
      time = time / 2;
    }else if(random == 3){
      time = time * 2;
    } else if(random == 4){
      time = time - 5;
    }
    
  }
  
}

//console.log(circles);
//console.log(score);

var countdownIntervalId;

// wait until page is done loading, then run the start() function
document.onload = start();

function start(){
	// [X] Loop through the circles we have 
	// [X] Create a temporary variable to hold a single circle
	// [X] Add an event listener to that circle
	// [X] "click" event and call the addPoints() function
	
	for(var i = 0; i < circles.length; i++){
		var circle = circles[i];
		
		circle.addEventListener("click", addPoints);
	}
	
  // Update the screen with the starting time remaining
  time_remaining.innerHTML = time;
  
  // Start with a fresh score of GOOSEEGG!
  score.innerHTML = number;
  
  // Load the high score to display it
  high_score.innerHTML = localStorage.getItem('high_score');
  
	// set the circles randomly the begin with
	move(false);
	
	// tell the browser to run the move function every second
	setInterval( move, 1000, false);
  setInterval( move, 1000, true);
  
  // start counting down the time remaining
  countdownIntervalId = setInterval( countdown, 1000 );
}

function move(special){
	// loop through the array of circles and create a temporary variable for a SINGLE circle from the array
	for(var i = 0; i < circles.length; i++){
		var circle = circles[i];
		
    if(special == true){
      if(circle.id != "red"){
        continue;
      }      
    }    

		// 1. Generate TINY random number (0 - 1) Math.random()
		// 2. multiply by bigger number to get a BIG number * 100
		// 3. Round numbers down Math.floor()
		
		var left = Math.floor( Math.random() * 100 );
		var top = Math.floor( Math.random() * 100 );
		
		//console.log(left, top);
		
		circle.style.top = top + "%";
		circle.style.left = left + "%";
	}
}

function addPoints(event){
	//console.log(event);
	
	// find out the ID of the thing that was clicked on
	var id = event.target.id;
	
	// red gives you more points?!?!?
	if(id == "red"){
		var points = 100;
	}else{
		var points = 50;
	}
	
	// take old points and add new points and save the new total 
	number = number + points;
	
	// update the screen with the new total
	score.innerHTML = number;	
  
  var stored_high_score = localStorage.getItem('high_score');
  if(number > stored_high_score){
    
    // we have a new high score!
    localStorage.setItem('high_score', number);
    
    // update the page for the user to see their new high score!
    high_score.innerHTML = number;
  }
}

function countdown(){
 
  // calculate the new time remaining
  var new_time = time - 1;
  time = new_time;
  
  // check to see if time has run out
  if(time == 0){
    // game over, man!
       
    // stop the countdown timer from running anymore
    clearInterval(countdownIntervalId);
    
    // clear event listeners to make the game not work after time expires
    for(var i = 0; i < circles.length; i++){
      var circle = circles[i];
		
      circle.removeEventListener("click", addPoints);
    }
    
    var answer = confirm("Want to play again?");
    if(answer == true){
      // they want to play again!
      
      // reset score
      number = 0;
      
      // reset time
      time = 5;
      
      // start the game again!
      start();
    }

  }
  
  // update the screen for the user
  time_remaining.innerHTML = time;
  
}
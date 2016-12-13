var circles = document.getElementsByClassName("circle");
var score = document.getElementById("score");
var number = 0;
var timer = 10;
//console.log(circles);
//console.log(score);

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
	
	// set the circles randomly the begin with
	move(false);
	
	// tell the browser to run the move function every second
	setInterval( move, 1000, false);
  setInterval( move, 500, true);
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
}
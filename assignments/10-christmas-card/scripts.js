// Define our constants
var MAX_FLAKES = 10;
var MAX_SPEED = 15;

var FLAKE_HEIGHT = 100;
var FLAKE_WIDTH = 100;

var MAX_HEIGHT = 400;
var MAX_WIDTH = 600;

var flakes = [];

// Get reference to HTML elements
var card = document.getElementById("card");

// Start the "animationloop"
document.onload = start();

// create a "start" function
function start(){
	setInterval(animationLoop, 33);
}

// loop-de-loop
function animationLoop(){
		
	// 1. see if the all the flakes are still on the card and remove if necessary
	checkFlakes();
	
	// 2. make sure we have the MAX_FLAKES in our flakes array
	resetFlakes();
	
	// 3. move 'em! 
	moveFlakes();
	
}

// Step 1
function checkFlakes(){
	// loop
	// init: number of flakes in the array (remember: length vs. index value)
	// condition: i >= 0
	
	// must start counting backwards to not screw up index values
	for(var i = flakes.length - 1; i >= 0; i--){
		var flake = flakes[i];
	
		var current_position = parseInt(flake.style.top);

		console.log(current_position, MAX_HEIGHT);
		if(current_position >= MAX_HEIGHT){
			// remove this flake from the flakes array
			flakes.splice(i, 1);
			
			//				0	 1		2	  3		4	5
			// flakes = [john, brock, dylan, cat, dog, monkey]
			
			// remove the image from the screen
			flake.parentNode.removeChild(flake);
		}
	}
	
}

// Step 2
function resetFlakes(){
	
	// loop 
	// first (init): how many flakes do we currently have
	// second (condition): how many CAN we have?
	for(var i = flakes.length; i < MAX_FLAKES; i++){
		var new_flake = document.createElement("img");
				
		new_flake.src = "flake.png";
		new_flake.style.position = "absolute";
		new_flake.style.top = -FLAKE_HEIGHT + "px";
		new_flake.style.left = Math.floor(Math.random() * MAX_WIDTH) + "px";
		
		new_flake.speed = Math.floor(Math.random() * MAX_SPEED) + 1;
		
		// add it to the flakes array
		flakes.push(new_flake);
		
		// add it to the card
		card.appendChild(new_flake);
				
		/*
		
		->	* * *      *     *       *
	0,0	--------------------------------
		|								| *
		|								|
		---------------------------------
		
		*/
		
	}
}

// Step 3
function moveFlakes(){
	for(var i = 0; i < flakes.length; i++){
		var flake = flakes[i];
		
		var speed = flake.speed;
		var current_position = parseInt(flake.style.top);
		
		flake.style.top = current_position + speed + "px";
		
	}
}

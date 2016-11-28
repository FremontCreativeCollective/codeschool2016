var colors = ['red', 'blue', 'yellow', 'green'];
var targetColor;
var buttons = document.getElementsByClassName("square"); 

setTimeout(resetTargetColor, 50);

for(var i = 0; i < buttons.length; i++){
	var button = buttons[i];
	button.addEventListener("click", buttonPress);
}

document.getElementById('playAgain').addEventListener("click", playAgain);

function buttonPress(event){
	if(event.srcElement.id == targetColor){
		gameContinue();
	}else{
		gameOver();
	}
}

function gameContinue(){
	// update point count
	updateStreak();

	// reset the target color for the next turn
	resetTargetColor();
}

function updateStreak(){
	var currentStreak = document.getElementById('streakNumber');
	streak = parseInt(currentStreak.textContent);

	streak++;
	currentStreak.innerHTML = streak;
}

function resetTargetColor(){
	// remove highlight from old color
	var oldTarget = document.getElementsByClassName("targeted")[0];
	if(oldTarget) oldTarget.classList.remove("targeted");

	// since 0 is a valid number (index value) we can do floor 
  	var random = Math.floor(Math.random() * colors.length);

  	// pick color from the colors array 
  	targetColor = colors[random];

  	// change the board by highlighting the color that should be clicked
  	document.getElementById(targetColor).classList.add("targeted");
}

function gameOver(){
	document.getElementById('gameOver').style.display = "block";
}

function playAgain(){
	document.getElementById('gameOver').style.display = "none";
	document.getElementById('streakNumber').innerHTML = "0";
}
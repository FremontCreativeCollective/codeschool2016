var trooper_src = "stormtrooper.png";
var trooper_shooting_src = "stormtrooper_shooting.png";
var intervalId;

// sounds
var lightsaberOn = document.getElementById('lightsaberOn');
var lightsaberOff = document.getElementById('lightsaberOff');
var blasters = document.getElementsByClassName('blasters');

// references
var game = document.getElementById("game");
var container = document.getElementById("container");
var button = document.getElementById("button");
var saber = document.getElementById("saber");
var troopers = document.getElementsByClassName("troopers");
var healthbar = document.getElementById("healthbar");
var health = document.getElementsByClassName("health");
var endgame = document.getElementById("endgame");
var restartgame = document.getElementById("restartGame");
var attackingTrooper;

document.addEventListener('keydown', defendByKey);

function defendByKey(event){

  if(event.keyCode == 39){
    container.classList.remove('defendBottom', 'defendLeft');
    container.classList.add('defendRight');
  }else if(event.keyCode == 37){
    container.classList.remove('defendBottom', 'defendRight');
    container.classList.add('defendLeft');
  }else if(event.keyCode == 38){
    container.classList.remove('defendBottom', 'defendLeft', 'defendRight');
  }else if(event.keyCode == 40) {
    container.classList.remove('defendLeft', 'defendRight');
    container.classList.add('defendBottom');
  }else if (event.keyCode == 32){
  
    if(saber.classList.contains('active')){
      lightsaberOff.play();
    }else{
      lightsaberOn.play();
    }
  
    saber.classList.toggle('active');
  }
}

document.onload = start();

function start(){
  intervalId = setInterval(animationLoop, 1000);
}

function animationLoop(){
  // check to see if you've successfully defended yourself
  if(attackingTrooper){
    
    //reset image source so he's a normal bad guy again
    attackingTrooper.src = trooper_src;
    
    // find out which trooper is attacking us
    var attackDirection = attackingTrooper.id;     

    // remove the shake class from him so he can try and fight us again
    attackingTrooper.classList.toggle("shake");
    
    // -> triggering reflow /* The actual magic */ allows the reuse of the animation
    void attackingTrooper.offsetWidth;
         
    var damage = true;
    if(	
      (attackDirection == 'left' && container.classList.contains('defendLeft')) ||
      (attackDirection == 'right' && container.classList.contains('defendRight')) ||
      (attackDirection == 'bottom' && container.classList.contains('defendBottom')) ||
      (attackDirection == 'top' && container.classList.length == 0) ){

      saber.classList.toggle('deflection');
      setTimeout(resetSaber, 50);
      
      damage = false;
    }

    // logic for being dead here
    if(healthbar.children.length == 0){
      endGame();
      return;
    }
    
    if(damage){
      console.error("You took damage!");
      
      healthbar.removeChild(healthbar.children[0]);
      
      game.classList.toggle('damage');
      setTimeout(resetDamage, 50);
    }
  }

  var random = Math.floor(Math.random() * troopers.length);
  var trooper = troopers[random];

  trooper.classList.toggle("shake");
  attackingTrooper = trooper;
  setTimeout(fireBlaster, 750);
}

function resetDamage(){
  game.classList.toggle('damage');
}

function resetSaber(){
  saber.classList.toggle('deflection');
}

function fireBlaster(){
  var random = Math.floor(Math.random() * blasters.length);

  //make trooper blast us
  attackingTrooper.src = trooper_shooting_src;

  // play blaster sounds
  blasters[random].play();
}

function endGame(){
  clearInterval(intervalId);
  attackingTrooper = null;
  endgame.style.display = "flex";
}

function restartGame(){
  endgame.style.display = "none";

  //add back our 3 lives
  for(var i = 0; i < 3; i++){
    var elm = document.createElement("img");
    elm.src = "health.png";
    elm.classList.add("health");
    healthbar.appendChild(elm);
  }

  start();
}

restartgame.addEventListener("click", restartGame);
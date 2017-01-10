var pikachu_image = document.getElementById("pikachu");
pikachu_image.addEventListener("click", pikachuCry);
function pikachuCry(){
  var sound = document.getElementById("pikachu_sound");
  sound.play();
}

var bulbasaur_image = document.getElementById("bulbasaur");
bulbasaur_image.addEventListener("click", bulbasaurCry);
function bulbasaurCry(){
  var sound = document.getElementById("bulbasaur_sound");
  sound.play();
}

var ditto_image = document.getElementById("ditto");
ditto_image.addEventListener("click", dittoCry);
function dittoCry(){
console.log("got to ditto");
  var sound = document.getElementById("ditto_sound");
  sound.play();
}

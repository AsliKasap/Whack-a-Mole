const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomHole(holes) {
  const holeIndex = Math.floor(Math.random() * holes.length);
  const hole = holes[holeIndex];

  if (hole === lastHole) {
   
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep(); 
  }, time);
}
function startGame() {
  scoreBoard.innerHTML = 0;
  timeUp = false;
  if(localStorage.getItem("high")){
      document.querySelector(".highscore").innerHTML="High Score ="+ localStorage.getItem("high");
      
  }else{
    document.querySelector(".highscore").innerHTML="High Score = 0";
  }
  score = 0;
  peep();
  document.querySelector("button").style.visibility = "hidden";
  gameOver();
}
function gameOver() {
  setTimeout(() => {
    document.querySelector("button").style.visibility = "visible";
    timeUp = true;
    if(localStorage.getItem("high")<score){
        setScoreLS(score);
    }
  }, 10000); 
}
function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  lastHole.classList.remove("up");
  scoreBoard.innerHTML = score;
}
function setScoreLS(score) {
    localStorage.setItem("high",score);
}


moles.forEach((mole) => mole.addEventListener("click", bonk));

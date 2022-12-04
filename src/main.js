const choices = document.querySelectorAll('.choice');
const score = document.getElementById('score');
const result = document.getElementById('result');
const restart = document.getElementById('restart');
const modal = document.querySelector('.modal');

let player;
let computer;



//Save game state

if(localStorage.getItem("User_Score") == null && localStorage.getItem("Comp_Score") == null){
  localStorage.clear();
  player = 0;
  computer = 0;

  localStorage.setItem("User_Score", player);
  localStorage.setItem("Comp_Score", computer);
} else {
  player = localStorage.getItem("User_Score");
  computer = localStorage.getItem("Comp_Score");

  score.innerHTML = `
    <p class = "box-border bg-blue-300 py-2 text-center">Player: ${player}</p>
    <p class = "box-border bg-red-300 py-2 text-center">Computer: ${computer}</p>
    `;

}

// Play game
function play(e) {
  restart.style.display = 'inline-block';
  const playerChoice = e.currentTarget.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showWinner(winner, computerChoice);

  localStorage.setItem("User_Score", player);
  localStorage.setItem("Comp_Score", computer);

  console.log(e.target.id);
}

// Get computers choice
function getComputerChoice() {
  const rand = Math.random();
  if (rand < 0.34) {
    return 'rock';
  } else if (rand <= 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

const scoreboard = {player, computer};

// Get game winner
function getWinner(p, c) {
  if (p === c) {
    return 'draw';
  } else if (p === 'rock') {
    if (c === 'paper') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'paper') {
    if (c === 'scissors') {
      return 'computer';
    } else {
      return 'player';
    }
  } else if (p === 'scissors') {
    if (c === 'rock') {
      return 'computer';
    } else {
      return 'player';
    }
  }
}

function showWinner(winner, computerChoice) {
  if (winner === 'player') {
    // Inc player score
    player++;
    // Show modal result
    result.innerHTML = `
      <h1>You Win</h1>
      <i ${computerChoice}></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else if (winner === 'computer') {
    // Inc computer score
    computer++;
    // Show modal result
    result.innerHTML = `
      <h1 class="text-lose">You Lose</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  } else {
    result.innerHTML = `
      <h1>It's A Draw</h1>
      <i class="fas fa-hand-${computerChoice} fa-10x"></i>
      <p>Computer Chose <strong>${computerChoice.charAt(0).toUpperCase() +
        computerChoice.slice(1)}</strong></p>
    `;
  }
  // Show score
  score.innerHTML = `
    <p class = "box-border bg-blue-300 py-2 text-center">Player: ${player}</p>
    <p class = "box-border bg-red-300 py-2 text-center">Computer: ${computer}</p>
    `;

 //modal.style.display = 'block';
}

// Restart game
function restartGame() {
  player = 0;
  computer = 0;
  score.innerHTML = `
    <p class = "box-border bg-blue-300 py-2 text-center">Player: ${player}</p>
    <p class = "box-border bg-red-300 py-2 text-center">Computer: ${computer}</p>
  `;
  result.innerHTML = "";

  localStorage.setItem("User_Score", player);
  localStorage.setItem("Comp_Score", computer);
}

// Clear modal
function clearModal(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

// Event listeners
console.log(choices)
choices.forEach(choice => choice.addEventListener('click', play));
window.addEventListener('click', clearModal);
restart.addEventListener('click', restartGame);

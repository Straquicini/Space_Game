const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const panel = document.getElementById("panel");
const scoresList = document.getElementById("scores");

const pauseOverlay = document.getElementById("pauseOverlay");
const scoreText = document.getElementById("pauseScore");
const resumeBtn = document.getElementById("resumeBtn");
const exitBtn = document.getElementById("exitBtn");

let player = { x: 230, y: 600, width: 40, height: 40, color: 'cyan' };
let bullets = [];
let enemies = [];
let score = 0;
let gameInterval, enemyInterval;
let nickname = '';
let paused = false;

// Ações dos botões do overlay
resumeBtn.onclick = () => {
  paused = false;
  pauseOverlay.style.display = "none";
};

exitBtn.onclick = () => {
  paused = false;
  pauseOverlay.style.display = "none";
  endGame();
};

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = 'yellow';
  bullets.forEach((b, i) => {
    b.y -= 5;
    if (b.y < 0) bullets.splice(i, 1);
    else ctx.fillRect(b.x, b.y, 5, 10);
  });
}

function drawEnemies() {
  ctx.fillStyle = 'red';
  enemies.forEach((e, ei) => {
    e.y += 2;
    if (e.y > canvas.height) enemies.splice(ei, 1);
    else ctx.fillRect(e.x, e.y, e.size, e.size);

    bullets.forEach((b, bi) => {
      if (
        b.x < e.x + e.size && b.x > e.x &&
        b.y < e.y + e.size && b.y > e.y
      ) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        score++;
      }
    });
  });
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText('Aperte "P" para pausar', 300, 30);
}

function updateGame() {
  if (paused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  drawEnemies();
  drawScore();
}

function startGame() {
  nickname = document.getElementById("nickname").value.trim();
  if (!nickname) return alert("Insira um nickname");

  panel.style.display = 'none';
  canvas.style.display = 'block';

  score = 0;
  bullets = [];
  enemies = [];
  paused = false;

  gameInterval = setInterval(updateGame, 1000 / 60);
  enemyInterval = setInterval(() => {
    if (!paused) enemies.push({ x: Math.random() * 460, y: 0, size: 30 });
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  saveScore();
  updateScoreboard();
  canvas.style.display = 'none';
  panel.style.display = 'block';
  pauseOverlay.style.display = 'none';
}

function saveScore() {
  const data = JSON.parse(localStorage.getItem("scores") || "[]");
  data.push({ nickname, score });
  localStorage.setItem("scores", JSON.stringify(data));
}

function updateScoreboard() {
  const data = JSON.parse(localStorage.getItem("scores") || "[]");
  const sorted = data.sort((a, b) => b.score - a.score).slice(0, 5);
  scoresList.innerHTML = sorted.map(s => `<li>${s.nickname}: ${s.score}</li>`).join('');
}

// Controles do jogador e pausa
window.addEventListener("keydown", (e) => {
  if (e.key === 'ArrowLeft') player.x -= 10;
  if (e.key === 'ArrowRight') player.x += 10;
  if (e.key === ' ') bullets.push({ x: player.x + player.width / 2 - 2, y: player.y });

  if (e.key.toLowerCase() === 'p') {
    paused = !paused;
    if (paused) {
      scoreText.innerText = `Pontuação atual: ${score}`;
      pauseOverlay.style.display = "block";
    } else {
      pauseOverlay.style.display = "none";
    }
  }
});

// Encerrar clicando no canvas (opcional)
canvas.addEventListener("click", endGame);

updateScoreboard();
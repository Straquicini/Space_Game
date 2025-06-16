const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const panel = document.getElementById("panel");
const scoresList = document.getElementById("scores");

const pauseOverlay = document.getElementById("pauseOverlay");
const scoreText = document.getElementById("pauseScore");
const resumeBtn = document.getElementById("resumeBtn");
const exitBtn = document.getElementById("exitBtn");

let player = { x: 230, y: 600, width: 50, height: 60, health: 100 };
let bullets = [];
let enemyBullets = [];
let enemies = [];
let score = 0;
let nickname = '';
let paused = false;
let gameInterval = null;
let enemyInterval = null;

const naveImg = new Image();
naveImg.src = "images/NavePrincipal.png";
naveImg.onload = () => {}; // imagem pronta

const enemyImgWeak = new Image();
enemyImgWeak.src = "images/NaveInimiga1.png";

const enemyImgMedium = new Image();
enemyImgMedium.src = "images/NaveInimiga2.png";

const enemyImgStrong = new Image();
enemyImgStrong.src = "images/NaveInimiga3.png";

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
  ctx.drawImage(naveImg, player.x, player.y, player.width, player.height);
}

function drawHealthBar() {
  ctx.fillStyle = 'gray';
  ctx.fillRect(10, 40, 100, 10);
  ctx.fillStyle = 'lime';
  ctx.fillRect(10, 40, player.health, 10);
  ctx.strokeStyle = 'white';
  ctx.strokeRect(10, 40, 100, 10);
}

function drawBullets() {
  ctx.fillStyle = 'yellow';
  bullets.forEach((b, i) => {
    b.y -= 5;
    if (b.y < 0) bullets.splice(i, 1);
    else ctx.fillRect(b.x, b.y, 5, 10);
  });

  ctx.fillStyle = 'red';
  enemyBullets.forEach((b, i) => {
    b.y += 4;
    if (b.y > canvas.height) {
      enemyBullets.splice(i, 1);
    } else {
      ctx.fillRect(b.x, b.y, 4, 10);
      // colisão com player
      if (
        b.x < player.x + player.width &&
        b.x + 4 > player.x &&
        b.y < player.y + player.height &&
        b.y + 10 > player.y
      ) {
        player.health -= b.damage;
        enemyBullets.splice(i, 1);
        if (player.health <= 0) endGame();
      }
    }
  });
}

function drawEnemies() {
  enemies.forEach((e, ei) => {
    e.y += e.speed;

    // disparo do inimigo
    if (Math.random() < e.fireChance) {
      enemyBullets.push({ x: e.x + e.size/2, y: e.y + e.size, damage: e.damage });
    }

    if (e.type === 'weak') {
      ctx.drawImage(enemyImgWeak, e.x, e.y, e.size, e.size);
    } else if (e.type === 'medium') {
      ctx.drawImage(enemyImgMedium, e.x, e.y, e.size, e.size);
    } else if (e.type === 'strong') {
      ctx.drawImage(enemyImgStrong, e.x, e.y, e.size, e.size);
    } else {
      ctx.fillStyle = e.color;
      ctx.fillRect(e.x, e.y, e.size, e.size);
    }

    // colisão com player
    if (
      e.x < player.x + player.width &&
      e.x + e.size > player.x &&
      e.y < player.y + player.height &&
      e.y + e.size > player.y
    ) {
      player.health -= e.damage;
      enemies.splice(ei, 1);
      if (player.health <= 0) endGame();
      return;
    }

    // colisão com balas do player
    bullets.forEach((b, bi) => {
      if (
        b.x < e.x + e.size &&
        b.x + 5 > e.x &&
        b.y < e.y + e.size &&
        b.y + 10 > e.y
      ) {
        e.life--;
        bullets.splice(bi, 1);
        if (e.life <= 0) {
          enemies.splice(ei, 1);
          score++;
        }
      }
    });

    // sai da tela
    if (e.y > canvas.height) {
      enemies.splice(ei, 1);
    }
  });
}

function drawScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
  ctx.fillText('Aperte "P" para pausar', 250, 20);
}

function updateGame() {
  if (paused) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawHealthBar();
  drawBullets();
  drawEnemies();
  drawScore();
}

function spawnEnemies() {
  if (paused) return;
  const rand = Math.random();
  let enemy;
  if (rand < 0.6) { // fracos
    enemy = {
      x: Math.random() * (canvas.width - 30),
      y: 0,
      size: 40,
      speed: 3,
      damage: 5,
      life: 1,
      color: 'red',
      fireChance: 0.005,
      type: 'weak'
    };
  } else if (rand < 0.85) { // intermediários
    enemy = {
      x: Math.random() * (canvas.width - 50),
      y: 0,
      size: 50,
      speed: 2,
      damage: 10,
      life: 2,
      fireChance: 0.007,
      type: 'medium' 
    };
  } else { // fortes
    enemy = {
      x: Math.random() * (canvas.width - 50),
      y: 0,
      size: 80,
      speed: 1.5,
      damage: 20,
      life: 3,
      color: 'purple',
      fireChance: 0.01,
      type: 'strong'
    };
  }
  enemies.push(enemy);
}

function startGame() {
  nickname = document.getElementById("nickname").value.trim();
  if (!nickname) return alert("Digite seu nickname");

  panel.style.display = 'none';
  canvas.style.display = 'block';

  player.health = 100;
  score = 0;
  bullets = [];
  enemyBullets = [];
  enemies = [];
  paused = false;

  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  gameInterval = setInterval(updateGame, 1000 / 60);
  enemyInterval = setInterval(spawnEnemies, 800);
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

canvas.addEventListener("click", () => {
  if (!paused) {
    bullets.push({ x: player.x + player.width / 2 - 2, y: player.y });
  }
});

//window.addEventListener("keypress", (e) => {
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    player.x -= 10;
    if (player.x + player.width < 0) player.x = canvas.width;
  }
  if (e.key === "ArrowRight") {
    player.x += 10;
    if (player.x > canvas.width) player.x = -player.width;
  }
  if (e.key.toLowerCase() === 'p') {
    paused = !paused;
    if (paused) {
      scoreText.innerText = `Pontuação: ${score}`;
      pauseOverlay.style.display = 'block';
    } else {
      pauseOverlay.style.display = 'none';
    }
  }
});

updateScoreboard();

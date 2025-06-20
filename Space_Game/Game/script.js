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

let keyLeft = false;
let keyRight = false;

const naveImg = new Image();
naveImg.src = "images/NavePrincipal.png";
naveImg.onload = () => {};
const enemyImgWeak = new Image();
enemyImgWeak.src = "images/NaveInimiga1.png";
const enemyImgMedium = new Image();
enemyImgMedium.src = "images/NaveInimiga2.png";
const enemyImgStrong = new Image();
enemyImgStrong.src = "images/NaveInimiga3.png";

// Áudios
const backgroundMusic = new Audio("audio/background.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

const shotSound = new Audio("audio/shot.mp3");
shotSound.volume = 0.5;

const explosionSound = new Audio("audio/explosion.mp3");
explosionSound.volume = 0.7;

const gameOverMusic = new Audio("audio/gameover-music.mp3");
gameOverMusic.loop = true;
gameOverMusic.volume = 0.5;

const gameOverVoice = new Audio("audio/gameover-voice.mp3");
gameOverVoice.volume = 1.0;


resumeBtn.onclick = () => {
  paused = false;
  pauseOverlay.style.display = "none";
};

exitBtn.onclick = () => {
  paused = false;
  returnToMenu();
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

    if (Math.random() < e.fireChance) {
      enemyBullets.push({ x: e.x + e.size / 2, y: e.y + e.size, damage: e.damage });
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
          explosionSound.currentTime = 0;
          explosionSound.play();
          enemies.splice(ei, 1);
          score++;
        }
      }
    });
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

  // Movimentação contínua
  if (keyLeft) {
    player.x -= 5;
    if (player.x + player.width < 0) player.x = canvas.width;
  }
  if (keyRight) {
    player.x += 5;
    if (player.x > canvas.width) player.x = -player.width;
  }

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

  if (rand < 0.6) {
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
  } else if (rand < 0.85) {
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
  } else {
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

  // Reiniciar e tocar música de fundo
  gameOverMusic.pause();
  gameOverMusic.currentTime = 0;
  startBackgroundMusic();
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);

  backgroundMusic.pause();
  gameOverMusic.currentTime = 0;
  gameOverMusic.play();
  gameOverVoice.currentTime = 0;
  gameOverVoice.play();

  const gameOverOverlay = document.getElementById("gameOverOverlay");
  gameOverOverlay.style.display = "flex";

  const gameOverBtn = document.getElementById("gameOverBtn");
  gameOverBtn.onclick = async () => {
    await saveScore();
    await updateScoreboard();
    canvas.style.display = 'none';
    gameOverMusic.pause();
    startBackgroundMusic();
    panel.style.display = 'block';
    pauseOverlay.style.display = 'none';
    gameOverOverlay.style.display = 'none';
  };
}

function saveScore() {
  const data = {
    datascore: new Date().toISOString(),
    nickname,
    score,
    game: 'Space Game' // nome do seu jogo
  };
  return fetch('http://localhost:3000/api/scores/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Erro ao salvar o score');
    }
    return response.json();
  }).catch(error => {
    console.error(error);
  });
}

function updateScoreboard() {
  return fetch('http://localhost:3000/api/scores/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar o scoreboard');
      }
      return response.json();
    })
    .then(data => {
      // Ordena por score e pega top 5
      const sorted = data.sort((a, b) => b.score - a.score).slice(0, 5);
      scoresList.innerHTML = sorted
        .map(s => `<li>${s.nickname}: ${s.score}</li>`)
        .join('');
    })
    .catch(error => {
      console.error(error);
    });
}

// Disparo ao clicar
canvas.addEventListener("click", () => {
  if (!paused) {
    bullets.push({ x: player.x + player.width / 2 - 2, y: player.y });
    shotSound.currentTime = 0;
    shotSound.play();
  }
});

// Teclado
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") keyLeft = true;
  if (e.key === "ArrowRight") keyRight = true;

  if (e.key.toLowerCase() === 'p' && canvas.style.display === 'block' && document.activeElement.tagName !== 'INPUT') {
    paused = !paused;
    if (paused) {
      scoreText.innerText = `Pontuação: ${score}`;
      pauseOverlay.style.display = 'block';
    } else {
      pauseOverlay.style.display = 'none';
    }
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft") keyLeft = false;
  if (e.key === "ArrowRight") keyRight = false;
});

function returnToMenu() {
  clearInterval(gameInterval);
  clearInterval(enemyInterval);
  /*backgroundMusic.pause();
  backgroundMusic.currentTime = 0;*/
  canvas.style.display = 'none';
  panel.style.display = 'block';
  pauseOverlay.style.display = 'none';
}

function startBackgroundMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play().catch((e) => {
      console.warn("Autoplay bloqueado. Música será iniciada após interação.");
    });
  }
}


document.body.addEventListener("click", () => {
  startBackgroundMusic();
}, { once: true });

// Inicia o scoreboard
updateScoreboard();


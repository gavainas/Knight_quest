const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const groundY = 330;
const gravity = 0.6;
let gameOver = false;
let score = 0;

let player = {
  x: 100,
  y: groundY,
  size: 30,
  color: "blue",
  velocityY: 0,
  jumpForce: -12,
  onGround: true
};

let obstacle = {
  x: 800,
  y: 310,
  width: 20,
  height: 50,
  color: "red",
  speed: 5
};

document.addEventListener("keydown", (e) => {
  if ((e.key === "ArrowUp" || e.key === " ") && player.onGround && !gameOver) {
    player.velocityY = player.jumpForce;
    player.onGround = false;
  }

  if (e.key === "Enter" && gameOver) {
    restartGame();
  }
});

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawGround() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, groundY + player.size, canvas.width, canvas.height - (groundY + player.size));
}

function drawObstacle() {
  ctx.fillStyle = obstacle.color;
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Puntaje: " + score, 20, 30);
}

function drawGameOver() {
  ctx.fillStyle = "white";
  ctx.font = "36px Arial";
  ctx.fillText("Game Over", 300, 180);
  ctx.font = "20px Arial";
  ctx.fillText("Presioná Enter para reiniciar", 260, 220);
}

function applyGravity() {
  player.velocityY += gravity;
  player.y += player.velocityY;

  if (player.y >= groundY) {
    player.y = groundY;
    player.velocityY = 0;
    player.onGround = true;
  }
}

function moveObstacle() {
  obstacle.x -= obstacle.speed;

  if (obstacle.x + obstacle.width < 0) {
    obstacle.x = canvas.width + Math.random() * 200;
    score++;
  }
}

function checkCollision() {
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.size > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.size > obstacle.y
  ) {
    gameOver = true;
  }
}

function restartGame() {
  gameOver = false;
  score = 0;
  player.y = groundY;
  player.velocityY = 0;
  player.onGround = true;
  obstacle.x = 800;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGround();
  drawPlayer();
  drawObstacle();
  drawScore();

  if (!gameOver) {
    applyGravity();
    moveObstacle();
    checkCollision();
    requestAnimationFrame(update);
  } else {
    drawGameOver();
  }
}

update();

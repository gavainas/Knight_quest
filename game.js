const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const groundY = 330;
const gravity = 0.6;

let player = {
  x: 100,
  y: groundY,
  size: 30,
  color: "blue",
  speed: 5,
  velocityY: 0,
  jumpForce: -12,
  onGround: true
};

let keys = {};

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;

  if ((e.key === "ArrowUp" || e.key === " ") && player.onGround) {
    player.velocityY = player.jumpForce;
    player.onGround = false;
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawGround() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, groundY + player.size, canvas.width, canvas.height - (groundY + player.size));
}

function movePlayer() {
  if (keys["ArrowRight"]) player.x += player.speed;
  if (keys["ArrowLeft"]) player.x -= player.speed;

  if (player.x < 0) player.x = 0;
  if (player.x + player.size > canvas.width) {
    player.x = canvas.width - player.size;
  }
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

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer();
  applyGravity();
  drawPlayer();
  drawGround();
  requestAnimationFrame(update);
}

update();

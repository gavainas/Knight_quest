const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let player = {
  x: 100,
  y: 300,
  size: 30,
  color: "blue"
};

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  requestAnimationFrame(update);
}

update();
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") player.x += 10;
  if (e.key === "ArrowLeft") player.x -= 10;
});

// GLOBALS //
let discoBtn = document.getElementById("disco-btn");
let scoreDisplay = document.getElementById("score-span");
let clickSound = document.getElementById("sound");
let soundBtn = document.getElementById("img-icon");

// Make it work yo
// Please make it work
discoBtn.addEventListener("click", () => (colorSwitch = !colorSwitch));
soundBtn.addEventListener("click", () => {
  // turn on/off sound and darken/brigthen sound button.
  sound = !sound;
  sound
    ? soundBtn.classList.remove("active")
    : soundBtn.classList.add("active");
});

let mouseX, mouseY, goalX, goalY;
let colorSwitch = true;
let score;
let sound = true;

// CANVAS SETUP AND INIT VARIABLES;
const canvas = document.getElementById("my-canvas");
const ctx = canvas.getContext("2d");
const balls = [];

const h = window.innerHeight - 30;
const w = window.innerWidth;

canvas.height = h;
canvas.width = w;

goalX = Math.floor(Math.random() * (canvas.width - 30 - 30) + 30);
goalY = Math.floor(Math.random() * (canvas.height - 30 - 30) + 30);

// Randomly draw a black dot (goal)
const createGoal = () => {
  x = goalX;
  y = goalY;
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(x, y, 30, 0, 2 * Math.PI, false);
  ctx.closePath();
  ctx.fill();
};

// create new ball instance and push into balls array
const createBall = (x, y) => {
  let ball = new Ball(x, y);
  balls.push(ball);
};

// create a random rgba color for disco setting
const colorEngine = () => {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let a = Math.random();
  let color = `rgba(${r}, ${g}, ${b}, ${a})`;
  return color;
};

// animation sequence calling balls move() method
const animate = () => {
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "white";
  createGoal();
  ctx.stroke();
  ctx.fillStyle = colorSwitch ? "cornflowerblue" : colorEngine();
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
  }
};

// animation timer, called at bottom of .js file
const start = () => setInterval(animate, 30);

// ball constructor
function Ball(x, y, forwardX, forwardY) {
  this.x = x;
  this.y = y;
  this.forwardX = forwardX;
  this.forwardY = forwardY;
  this.move = () => {
    // check to see if a ball has entered into the score space
    if (x < goalX + 21 && x > goalX - 21) {
      if (y < goalY + 21 && y > goalY - 21) {
        // remove the ball from the array of balls and add to score
        balls.splice(balls.indexOf(this), 1);
        // reset time to 0 so sounds can play as soon as triggered
        clickSound.currentTime = 0;
        // if sound is on, play it
        sound ? clickSound.play() : null;
        // add to score
        score === undefined ? (score = 1) : score++;
        scoreDisplay.textContent = score;
      }
    }

    // ball x movement
    if (x < canvas.width - 15 && this.forwardX) {
      x += 10;
    } else if (x >= 20) {
      x -= 10;
      this.forwardX = false;
    } else if (x <= 20) {
      this.forwardX = true;
    }

    // ball y movement
    if (y < canvas.height - 15 && this.forwardY) {
      y += 10;
    } else if (y >= 20) {
      y -= 10;
      this.forwardY = false;
    } else if (y <= 20) {
      this.forwardY = true;
    }

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
  };
}

// creates ball at mouse X, Y with random settings to begin
window.addEventListener("click", () => {
  x = mouseX;
  y = mouseY;
  let rando1 = Math.floor(Math.random() * (11 - 1));
  let rando2 = Math.floor(Math.random() * (11 - 1));
  createBall(x, y, false, false);
});

// track mouse x and y to set global mouseX,Y
window.addEventListener("mousemove", e => {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});

start();

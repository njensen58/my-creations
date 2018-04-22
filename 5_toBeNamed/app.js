const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const body = document.querySelector('body');
const btn = document.createElement('button');
const lives = document.getElementById('lives-span');
const scoreSpan = document.getElementById('score-span');


let h = window.innerHeight - 30;
let w = window.innerWidth;
const balls = [];
const enemies = [];
const userMouse = {x: 0, y: 0};
let livesCount = 10;
let startID;
let enemyTimerID;
let scoreCounID;
let score = 0;

const makeStartButton = btn => {
        btn.innerHTML = `<span>Click Me</span>`;
        btn.classList.add('startBtn');
        btn.addEventListener('click', start);
        return btn;
}

const scoreKeeper = () => {
     score++;
     scoreSpan.textContent = score;
}

const scoreCounter = () => {
    scoreCountID = setInterval(scoreKeeper, 100);
}



class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        ctx.save();
            ctx.fillStyle = 'navy';
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        ctx.restore();
    }
}



class Enemy {
    constructor(x, y, v, d, forwardX, forwardY){
        this.x = x;
        this.y = y;
        this.v = v;
        this.d = d;
        this.forwardX = true;
        this.forwardY = true;
        this.move = () => {
            if(this.x <= canvas.width  && forwardX){
                x += v;
            } else if(this.x > canvas.width || !forwardX){
                x -= v;
                forwardX = !forwardX
            }

            if(this.y <= canvas.height  && forwardY){
                y += d;
            } else if(this.y > canvas.height || !forwardY){
                y -= d;
                forwardY = !forwardY
            }

            // Check for collision with player
            if(userMouse.x <= x + 25 && userMouse.x >= x - 25){
                if(userMouse.y <= y + 25 && userMouse.y >= y - 25){
                    enemies.splice(enemies.indexOf(this), 1)
                    livesCount--
                    lives.textContent = livesCount;
                }
            }

            //
            ctx.save();
                ctx.fillStyle = 'firebrick';
                ctx.beginPath();
                ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
            ctx.restore();
        }
    }
}

const enemyOptionChooser = () => {
    let randomNum = Math.floor(Math.random() * (100 - 1) + 1);
    let opt1 = {
        x: Math.floor(Math.random() * (w - 10)  + 10),
        y: -20,
        v: Math.floor(Math.random() * (20 - 1) + 1),
        d: 3
    }
    let opt2 = {
        x: Math.floor(Math.random() * (w - 10)  + 10),
        y: h + 20,
        v: Math.floor(Math.random() * (10- 1) + 1),
        d: Math.floor(Math.random() * (10 - 1) + 1)
    }
    let opt3 = {
        x: Math.floor(Math.random() * (w - 100)  + 100),
        y: h + 20,
        v: 0,
        d: Math.floor(Math.random() * (10 - 1) + 1)
    }
    let opt4 = {
        x: -20,
        y: Math.floor(Math.random() * (h - 50) + 50),
        v: Math.floor(Math.random() * (10 - 1) + 1),
        d: Math.floor(Math.random() * (10 - 1) + 1)
    }
    let opt5 = {
        x: w + 20,
        y: Math.floor(Math.random() * ((h + 30) - 20) + 20),
        v: Math.floor(Math.random() * (10 - 1) + 1),
        d: Math.floor(Math.random() * (10 - 1) + 1)
    }
    let opt6 = {
        x: w + 20,
        y: Math.floor(Math.random() * ((h + 30) - 20) + 20),
        v: Math.floor(Math.random() * (10 - 1) + 1),
        d: 0
    }
    if(randomNum < 15){
        return opt1
    } else if(randomNum >= 15 && randomNum < 30){
        return opt2
    } else if(randomNum >= 30 && randomNum < 50){
        return opt3
    } else if(randomNum >= 50 && randomNum < 70){
        return opt4
    } else if(randomNum >= 70 && randomNum < 85){
        return opt5;
    } else if(randomNum >= 85 && randomNum <= 100){
        return opt6;
    }
}

const createEnemy = () => {
    let enemy;
    let opt = enemyOptionChooser();
    enemy = new Enemy(opt.x, opt.y, opt.v, opt.d)
    enemies.push(enemy)
}

const createBall = (x, y) => {
    let ball = new Ball(x, y)
    balls.push(ball);
}



const enemyTimer = () => {
    enemyTimerID = setInterval(createEnemy, 250);
}

const start = () => {
        body.removeChild(btn);
        body.classList.add('removeCursor')
        canvas.width = w;
        canvas.height = h;
        canvas.style.backgroundColor = "#333";
        lives.textContent = livesCount;
        startID = setInterval(clock, 27)
        enemyTimer();
        scoreCounter();
}


const clock = () => {
    ctx.clearRect(0, 0, w, h);
    createBall(userMouse.x, userMouse.y)
    if(enemies){
        for(let i = 0; i < enemies.length; i++){
            enemies[i].move();
        }
    }
}




body.appendChild(makeStartButton(btn));

window.addEventListener('mousemove', (e) => {
    userMouse.x = e.offsetX;
    userMouse.y = e.offsetY;
})

window.addEventListener('resize', () => {
        h = window.innerHeight - 30;
        w = window.innerWidth
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 30
})

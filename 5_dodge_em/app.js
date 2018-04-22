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


// Initial game button
const makeStartButton = btn => {
        btn.innerHTML = `<span>Click Me</span>`;
        btn.classList.add('startBtn');
        btn.addEventListener('click', start);
        return btn;
}


// Score keeping functions
const scoreKeeper = () => {
     score++;
     scoreSpan.textContent = score;
}
const scoreCounter = () => {
    scoreCountID = setInterval(scoreKeeper, 100);
}



// new ball created at every re render with x and y on mouse position;
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

            // Handles X and Y movement regardless of initial placement
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

            // print enemy to canvas
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


// Big messy function that creates random enemy starting positions, speed, and chance.
const enemyOptionChooser = () => {
    let randomNum = Math.floor(Math.random() * (315 - 1) + 1);
    let opt1 = {
        x: Math.floor(Math.random() * ((w - w/2) - 10)  + 10),
        y: -20,
        v: Math.floor(Math.random() * (20 - 1) + 1),
        d: 3
    }
    let opt2 = {
        x: Math.floor(Math.random() * ((w - w/2) - 10)  + 10),
        y: h + 20,
        v: Math.floor(Math.random() * (15- 1) + 1),
        d: Math.floor(Math.random() * (15 - 1) + 1)
    }
    let opt3 = {
        x: Math.floor(Math.random() * (w - 100)  + 100),
        y: h + 20,
        v: 0,
        d: Math.floor(Math.random() * (10 - 5) + 5)
    }
    let opt4 = {
        x: -20,
        y: Math.floor(Math.random() * (h / 2 - 50) + 50),
        v: Math.floor(Math.random() * (20 - 1) + 1),
        d: Math.floor(Math.random() * (20 - 5) + 5)
    }
    let opt5 = {
        x: w + 20,
        y: Math.floor(Math.random() * ((h + 30) - 20) + 20),
        v: 4,
        d: Math.floor(Math.random() * (20 - 1) + 1)
    }
    let opt6 = {
        x: Math.floor(Math.random() * (w / 2) + 20),
        y: -20,
        v: Math.floor(Math.random() * (15 - 5) + 5),
        d: 0
    }
    let opt7 = {
        x: w + 20,
        y: Math.floor(Math.random() * (h  - 20) + 20),
        v: 0,
        d: Math.floor(Math.random() * (15 - 1) + 1)
    }
    let opt8 = {
        x: w + 20,
        y: Math.floor(Math.random() * ((h + 100)  - 40) + 40),
        v: Math.floor(Math.random() * (15 - 5) + 1),
        d: Math.floor(Math.random() * (15 - 5) + 1)
    }
    let opt9 = {
        x: Math.floor(Math.random() * (w/2 - 50) + 80),
        y: - 20,
        v: 0,
        d: Math.floor(Math.random() * (15 - 5) + 1)
    }
    let opt10 = {
        x: w + 20,
        y: Math.floor(Math.random() * (h - 10) + 10),
        v: Math.floor(Math.random() * (8 - 2) + 2),
        d: 0
    }
    let opt11 = {
        x: -20,
        y: Math.floor(Math.random() * (h - 40) + 40),
        v: Math.floor(Math.random() * (8 - 2) + 2),
        d: 0
    }
    let opt12 = {
        x: Math.floor(Math.random() * (w - 20) + 20),
        y: h + 20,
        v: 0,
        d: Math.floor(Math.random() * (8 - 2) + 2)
    }
    let opt13 = {
        x: Math.floor(Math.random() * (w - 20) + 20),
        y: -20,
        v: Math.floor(Math.random() * (15 - 5) + 5),
        d: Math.floor(Math.random() * (25 - 20) + 20)
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
    } else if(randomNum >= 85 && randomNum < 100){
        return opt6;
    } else if(randomNum >= 100 && randomNum < 120){
        return opt7;
    } else if(randomNum >= 120 && randomNum < 140){
        return opt8;
    } else if(randomNum >= 140 && randomNum < 180){
        return opt9;
    } else if(randomNum >= 180 && randomNum < 225){
        return opt10;
    } else if(randomNum >= 225 && randomNum < 270){
        return opt11;
    } else if(randomNum >= 270 && randomNum < 300){
        return opt12;
    } else if(randomNum >= 300 && randomNum < 315){
        return opt13;
    }
}


// creat enemey and random option, and push to array so clock() can use enemy.move()
const createEnemy = () => {
    let enemy;
    let opt = enemyOptionChooser();
    enemy = new Enemy(opt.x, opt.y, opt.v, opt.d)
    enemies.push(enemy)
}

// new ball on every render
const createBall = (x, y) => {
    let ball = new Ball(x, y)
}


// generates an enemy once every .1 second// could expand this to decrement when score hits certain threshholds
const enemyTimer = () => {
    enemyTimerID = setInterval(createEnemy, 100);
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

const endGame = () => {
    ctx.clearRect(0, 0, w, h);
    body.classList.remove('removeCursor');
    canvas.style.backgroundColor = "#111";
    let text = `Final Score: ${score}`
    ctx.font = '30px sans-serif';
    ctx.fontWeight = 300;
    ctx.fillStyle = 'white';
    ctx.fillText(text, w/3, h/2 - 20);
}

const clock = () => {
    ctx.clearRect(0, 0, w, h);
    if(livesCount <= 0){
        clearInterval(startID);
        clearInterval(enemyTimerID);
        clearInterval(scoreCountID);
        endGame()
    }
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

window.addEventListener('touchstart', (e) => {
    e.preventDefault();
    userMouse.x = e.pageX;
    userMouse.y = e.pageY;
})

window.addEventListener('touchmove', (e) => {
    e.preventDefault();
    userMouse.x = e.pageX;
    userMouse.y = e.pageY;
})

window.addEventListener('resize', () => {
        h = window.innerHeight - 30;
        w = window.innerWidth
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 30
})

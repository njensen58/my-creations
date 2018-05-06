const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

let height = window.innerHeight;
let width = window.innerWidth;

canvas.height = height - 30;
canvas.width = width;

// axis is setting and keeping track of player's x & y
const axis = {x: 50, y: 410}
let player;
let maxHeight = 100;
let jumpingID = null;
let goingDown = false;
const blocks = [];
let lives = 10;
let score = 0;
let blockID = null;
let scoreID;
let scoreDisplay;
let livesDisplay;
let speed2 = false;
let speed3 = false;
let speed4 = false;
let doubles = false;
let triples = false;


class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.generate = () => {
            ctx.beginPath();
            ctx.fillStyle = 'navy';
            ctx.arc(x, y, 25, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }

        this.moveRight = () => {
            if(axis.x < width - 50) {axis.x += 40}
        }

        this.moveLeft = () => {
            if(axis.x > 50) {axis.x -= 30}
        }

    }
}

class Block {
    constructor(x, y, h){
        this.x = x;
        this.y = y;
        this.h = h;
        this.move = () => {

            if(x > -20){
                x -= 5
            }

            // check for collision with player //
            if(axis.x < x + 25 && axis.x > x - 25){
                if(axis.y >= y - 25 && axis.y < y + h + 25){
                    blocks.splice(blocks.indexOf(this), 1)
                    lives--;
                    livesDisplay.textContent = lives;
                }
            }

            ctx.beginPath();
            ctx.fillStyle = 'red';
            ctx.rect(x, y, 20, h);
            ctx.fill();
            ctx.closePath();
        }
    }
}

    // Jumping interval //
const initiateJump = () => {
    if(jumpingID === null){
        jumpingID = setInterval(jump, 20)
    }
}

const jump = () => {
    if(axis.y > maxHeight && !goingDown){
        axis.y -= 12;
    } else {
        goingDown = true;
        axis.y += 12;
        if(axis.y >= 410){
            clearInterval(jumpingID);
            jumpingID = null;
            goingDown = false;
            axis.y = 410;
        }
    }
}

const blockMaker = (speed) => {
    if(blockID === null){
        blockID = setInterval(generateBlock, speed)
    }
}

const createFloorCeiling = () => {
    // floor
    ctx.beginPath();
    ctx.fillStyle = '#333';
    ctx.strokeStyle = 'black';
    ctx.rect(0, 435, width, 500);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // ceiling
    ctx.beginPath();
    ctx.fillStyle = '#333';
    ctx.strokeStyle = 'black';
    ctx.rect(0, 0, width, 65);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

const clock = () => {
    if(lives <= 0){
        clearInterval(clockID)
        clearInterval(scoreID)
    }
    ctx.clearRect(0, 0, width, height);
    player = new Player(axis.x, axis.y);
    player.generate();
    for(let i = 0; i < blocks.length; i++){
        blocks[i].move();
    }
    createFloorCeiling();
    if(score > 250 && !speed2){
        clearInterval(blockID)
        blockID = null
        blockMaker(1000)
        speed2 = true
    }
    if(score > 500 && !speed3){
        clearInterval(blockID)
        blockID = null
        blockMaker(750)
        speed3 = true
    }
    if(score > 800 && !speed4){
        clearInterval(blockID)
        blockID = null
        blockMaker(550)
        speed4 = true
    }
    if(score > 1200 && !doubles){
        blockID = null;
        blockMaker(1000);
        doubles = true;
    }
    if(score > 2000 && !triples){
        blockID = null;
        blockMaker(1000);
        triples = true;
    }
}


const generateBlock = () => {
    let block = new Block(
                    width + 40,                                      // x
                    Math.floor(Math.random() * (390 - 30 + 1) + 30), // y
                    Math.floor(Math.random() * (60 - 20 + 1) + 20)) // height
    blocks.push(block)
}


const generateEvents = () => {
    window.addEventListener('keydown', (e) => {
        if(e.key === "ArrowRight"){
            player.moveRight();
        }
        if(e.key === "ArrowLeft"){
            player.moveLeft();
        }
        if(e.key === "ArrowUp"){
            initiateJump()
        }
    })
    window.addEventListener('resize', (e) => {
        height = e.target.innerHeight - 30;
        width = e.target.innerWidth;
    })
}

const setLivesAndScore = (livesDis, scoreDis) => {
    livesDis.textContent = lives;
    scoreDis.textContent = score;
}

const startScore = () => {
    scoreID = setInterval(function(){
        score+=2
        scoreDisplay.textContent = score;
    }, 50)
}

const grabElements = () => {
    scoreDisplay = document.getElementById('score');
    livesDisplay = document.getElementById('lives');
    setLivesAndScore(livesDisplay, scoreDisplay);
}

// Start all functions/events //

let clockID = setInterval(clock, 30);
generateEvents();
grabElements();
blockMaker(2000);
startScore();


///

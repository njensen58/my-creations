const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

const height = window.innerHeight;
const width = window.innerWidth;

canvas.height = height;
canvas.width = width;

// axis is setting and keeping track of player's x & y
const axis = {x: 50, y: 400}
let player;
let maxHeight = 100;
let jumpingID = null;
let goingDown = false;
const blocks = [];


class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.generate = () => {
            ctx.beginPath();
            ctx.fillStyle = 'navy';
            ctx.transition = 'all .5s'
            ctx.arc(x, y, 35, 0, 2 * Math.PI, false);
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
            if(axis.x < x + 35 && axis.x > x - 35){
                if(axis.y >= y - 35 && axis.y < y + h + 35){
                    blocks.splice(blocks.indexOf(this), 1)
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
        axis.y -= 10;
    } else {
        goingDown = true;
        axis.y += 10;
        if(axis.y >= 400){
            clearInterval(jumpingID);
            jumpingID = null;
            goingDown = false;
            axis.y = 400;
        }
    }
}

const blockMaker = () => {
    setInterval(generateBlock, 2000)
}

const clock = () => {
    ctx.clearRect(0, 0, width, height);
    player = new Player(axis.x, axis.y);
    player.generate();
    for(let i = 0; i < blocks.length; i++){
        blocks[i].move();
    }
}


const generateBlock = () => {
    let block = new Block(
                    width + 40,                                    // x
                    Math.floor(Math.random() * (450 - 200) + 200), // y
                    Math.floor(Math.random() * (100 - 50) + 50))   // height
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
}

// Start all functions/events //

setInterval(clock, 30);
generateEvents();
blockMaker();



///

(function(){

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const p1ScoreDis = document.getElementById('player1Score');
const p2ScoreDis = document.getElementById('player2Score');
const serveBtn = document.getElementById('serveBtn');
const p1Up = document.getElementById('p1Up');
const p2Up = document.getElementById('p2Up');
const p1Down = document.getElementById('p1Down');
const p2Down = document.getElementById('p2Down');

let height = window.innerHeight;
let width = window.innerWidth;

canvas.style.border = '1px solid black'

const balls = [];
let gameBall;

const players = [];
let player1;
let player2;
const player1Axis = {x: 10, y: 200}
const player2Axis = {x: canvas.width - 25, y: 200}
const scoreCard = {p1: 0, p2: 0}


class Player {
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.render = () => {
            ctx.beginPath();
            ctx.fillStyle = 'navy';

            ctx.rect(x, y, 15, 75);
            ctx.fill();
            ctx.closePath();
        }
        this.moveDown = () => {
            if (y < canvas.height - 70) {
                y+=20;
                player1Axis.y = y;
                player2Axis.y = y;
            }
        }
        this.moveUp = () => {
            if (y > 0) {
                y-=20;
                player1Axis.y = y;
                player2Axis.y = y;
            }
        }
    }
}

class Ball {
    constructor(x, y, movingRight, movingUp, speed){
        this.x = x;
        this.y = y;
        this.movingRight = movingRight;
        this.movingUp = movingUp;
        this.speed = speed;
        this.move = () => {

            // Check to see if ball hits player 1's paddle //
            if(x <= player1Axis.x + 25){
                if(y <= player1Axis.y + 75 && y >= player1Axis.y){
                    movingRight = true;
                    speed+=.25
                }
            }
            // Check to see if ball hits player 1's wall //
            if(x <= player1Axis.x){
                balls.splice(balls.indexOf(this));
                scoreCard.p2++;
                p2ScoreDis.textContent = scoreCard.p2;
            }

            // Check to see if it hits player 2's paddle //
            if(x >= player2Axis.x - 10 && x <= player2Axis.x + 10){
                if(y <= player2Axis.y + 75 && y >= player2Axis.y){
                    movingRight = false;
                    speed+=.5
                }
            }

            //Check to see if ball hits player 2's wall //
            if(x >= player2Axis.x + 10){
                balls.splice(balls.indexOf(this));
                scoreCard.p1++;
                p1ScoreDis.textContent = scoreCard.p1;
            }

            // Handle x movement of ball //
            if(x > 0 && !movingRight){
                x-=speed
            } else if(x <= 0 || movingRight){
                movingRight = true;
                x+=speed
                if(x > canvas.width - 1){
                    movingRight = false;
                }
            }

            // Handle y movement of ball //
            if(y < canvas.height - 15 && !movingUp){
                y+=speed
            } else if(y >= canvas.height - 25 || movingUp){
                movingUp = true;
                y-=speed
                if(y <= 10){
                    movingUp = false;
                }
            }

            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.arc(x, y, 10, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }
    }
}


function animate(){
    ctx.clearRect(0, 0, width, height);
    for(let i = 0; i < players.length; i++){
            players[i].render();
    }
    for(let i = 0; i < balls.length; i++){
            balls[i].move();
    }
}


serveBtn.addEventListener('click', ()=>{
    let randomDir1 = Math.floor(Math.random() * (3 - 1) + 1)
    let randomDir2 = Math.floor(Math.random() * (3 - 1) + 1)
    if(balls.length < 1){
        gameBall = new Ball(canvas.width / 2,
                            canvas.height / 2,
                            randomDir1 % 2 === 0,
                            randomDir2 % 2 === 0,
                            2.75);
        balls.push(gameBall);
    }
})


window.addEventListener('keydown', (e) => {
    if(e.code === "KeyZ"){
        player1.moveDown();
    }
    if(e.code === "KeyA"){
        player1.moveUp();
    }
    if(e.code === "Slash"){
        player2.moveDown();
    }
    if(e.code === "Quote"){
        player2.moveUp();
    }
    if(e.code === "Enter"){
        if(balls.length < 1){
            gameBall = new Ball(canvas.width / 2,
                                canvas.height / 2,
                                randomDir1 % 2 === 0,
                                randomDir2 % 2 === 0,
                                3);
            balls.push(gameBall);
        }
    }
})

p1Up.addEventListener('click', () => { player1.moveUp() })
p2Up.addEventListener('click', () => { player2.moveUp() })
p1Down.addEventListener('click', () => { player1.moveDown() })
p2Down.addEventListener('click', () => { player2.moveDown() })

player1 = new Player(player1Axis.x, player1Axis.y);
players.push(player1);
player2 = new Player(player2Axis.x, player2Axis.y);
players.push(player2);

p1ScoreDis.textContent = scoreCard.p1;
p2ScoreDis.textContent = scoreCard.p2;

let randomDir1 = Math.floor(Math.random() * (3 - 1) + 1)
let randomDir2 = Math.floor(Math.random() * (3 - 1) + 1)



setInterval(animate, 30)

}());

(function(){

const canvas = document.getElementById('my-canvas');
const ctx = canvas.getContext('2d');

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
                y+=10;
                player1Axis.y = y;
                player2Axis.y = y;
            }
        }
        this.moveUp = () => {
            if (y > 5) {
                y-=10;
                player1Axis.y = y;
                player2Axis.y = y;
            }
        }
    }
}

class Ball {
    constructor(x, y, movingRight, movingUp){
        this.x = x;
        this.y = y;
        this.movingRight = movingRight;
        this.movingUp = movingUp;
        this.move = () => {

            // Check to see if ball hits player 1's paddle
            if(x <= player1Axis.x + 25){
                if(y <= player1Axis.y + 75 && y >= player1Axis.y){
                    movingRight = true;
                }
            }
            // Check to see if ball hits player 1's wall
            if(x <= player1Axis.x){
                balls.splice(balls.indexOf(this));
            }

            // Check to see if it hits player 2's paddle
            if(x >= player2Axis.x - 10 && x <= player2Axis.x + 10){
                if(y <= player2Axis.y + 75 && y >= player2Axis.y){
                    movingRight = false;
                }
            }

            //Check to see if ball hits player 2's wall
            if(x >= player2Axis.x + 10){
                balls.splice(balls.indexOf(this));
            }

            if(x > 5 && !movingRight){
                x-=3
            } else if(x <= 5 || movingRight){
                movingRight = true;
                x+=3
                if(x > canvas.width - 15){
                    movingRight = false;
                }
            }

            if(y < canvas.height - 15 && !movingUp){
                y+=2
            } else if(y >= canvas.height - 25 || movingUp){
                movingUp = true;
                y-=2
                if(y <= 10){
                    movingUp = false;
                }
            }

            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.arc(x, y, 15, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
        }
    }
}




function clock(){
    ctx.clearRect(0, 0, width, height);
    for(let i = 0; i < players.length; i++){
            players[i].render();
    }
    for(let i = 0; i < balls.length; i++){
            balls[i].move();
    }
}



window.addEventListener('keypress', (e) => {
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
})


player1 = new Player(player1Axis.x, player1Axis.y);
players.push(player1);
player2 = new Player(player2Axis.x, player2Axis.y);
players.push(player2);

gameBall = new Ball(canvas.width / 2, canvas.height / 2);
balls.push(gameBall);


setInterval(clock, 30)

}());


window.onload = () => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    const balls = [];
    const mouse = {x: 0, y: 0};

    let h = window.innerHeight - 40; // making room for nav bar
    let w = window.innerWidth;

    canvas.height = h;
    canvas.width = w;

    function Ball(x, y, x2, y2){
        this.x = x;
        this.y = y;
        this.x2 = x2;
        this.y2 = y2;

        this.move = () => {
            if(this.x > w - 10) {
				this.x = w - 10;
				this.x2 = -this.x2;
			} else if(this.x < 10) {
				this.x = 10;
				this.x2 = -this.x2;
			}

			if(this.y > h - 10) {
				this.y = h - 10;
				this.y2 = -this.y2;
			} else if(this.y < 10) {
				this.y = 10;
				this.y2 = -this.y2;
			}

			this.x+= this.x2;
			this.y+= this.y2;

			ctx.beginPath();
			ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false); // create a 10px circ ball
			ctx.closePath();
			ctx.fill();
        }
    }


    const start = () => window.setInterval(clock, 30);

    const clock = () => {
        // clear the canvas on every interval
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = 'cornflowerblue';

        // animate all existing balls in the ball array by calling their move method.
        for(let i = 0; i < balls.length; i++){
            balls[i].move();
        }
    }


    // creates a ball instance that starts at the x/y designated by event listener, and sets speed with the math.random calls
    const makeBall = (x, y) => balls.push(new Ball(x, y, Math.random() * 20, Math.random() * 20));


    start();


    canvas.addEventListener('click', (e) => {
        mouse.x = e.pageX - canvas.offsetLeft;
        mouse.y = e.pageY - canvas.offsetTop;
    })

    canvas.addEventListener('click', (e) => {
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        makeBall(x, y);
    })

    canvas.addEventListener('click', (e) => {
        var x = e.pageX - canvas.offsetLeft + 40;
        var y = e.pageY - canvas.offsetTop + 40;

        makeBall(x, y);
    })

    canvas.addEventListener('click', (e) => {
        var x = e.pageX - canvas.offsetLeft + 10;
        var y = e.pageY - canvas.offsetTop + 10;

        makeBall(x, y);
    })

    canvas.addEventListener('click', (e) => {
        var x = e.pageX - canvas.offsetLeft - 40;
        var y = e.pageY - canvas.offsetTop - 40;

        makeBall(x, y);
    })

    canvas.addEventListener('click', (e) => {
        var x = e.pageX - canvas.offsetLeft - 10;
        var y = e.pageY - canvas.offsetTop - 10;

        makeBall(x, y);
    })

}

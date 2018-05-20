(function(){

const gameBoard = document.getElementById('gameContainer');
const boxes = document.querySelectorAll('.box');
const message = document.getElementById('messageDisplay');
const scoreDis = document.getElementById('scoreSpan');
const popBtn = document.getElementById('popOverBtn');
const popOverDiv = document.getElementById('popOver');

const chosen = [];
const found = [];
let clickCounter = 0;


const checkForMatch = () => ( typeof chosen[1] !== "undefined" && chosen[1] === chosen[3] )



function handleClick(){
    console.log('hello')
    clickCounter++;
    scoreDis.textContent = clickCounter;
    message.classList.remove('messagePhase')
    // If this card and it's duplicate have not been found //
    if(!found.includes(this)){
        // if card is currently turned over //
        if(chosen.indexOf(this) >= 0){
            // remove it from the chosen array //
            chosen.splice(chosen.indexOf(this), 1);
            chosen.splice(chosen.indexOf(this.id), 1);

            this.style.background = "#888";
            // if less than 2 cards are currently turned over, add the clicked card to the chosen arr
        } else if (chosen.length < 4){
            this.style.background = this.chosenImg;
            this.style.backgroundSize = 'cover'
            chosen.push(this, this.id);
        }
        if(checkForMatch()){ // Checks to see if the card ids match in the chosen arr //
            clickCounter-=3;
            message.textContent = "It's a Match!";
            message.classList.toggle('messagePhase');
            // Grab all the two cards that were just matched and store them in node list //
            let foundItems = document.querySelectorAll(`#${this.id}`);

            // remove found pair from chosen arr, and push to found arr //
            foundItems.forEach(item => {
                item.classList.add('found');
                chosen.splice(chosen.indexOf(this), 1);
                chosen.splice(chosen.indexOf(this.id), 1);
                found.push(item);
            })
        }
    }

    // Checking on each click if game is over //
    if(found.length === 16){
        message.textContent = "You won!";
        message.style.opacity = '1';
    }
}


function generateRandomOrder(){
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
    const randomArr = [];
    for(let i = 0; i < 16; i++){
        // creates a random ordered array from arr //
        randomArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }
    return randomArr;
}


function addImages(){
    let arr = generateRandomOrder();
    for(let i = 0; i < 16; i++){
        boxes[i].chosenImg = `url(./resources/imgs/vanGogh-${arr[i]}.jpg)`
        boxes[i].style.background = '#888';
        // Make sure the cards that match have the same ID key
        if(arr[i] < 8){
            boxes[i].id = 'a' + arr[i];
        } else {
            boxes[i].id = 'a' + (arr[i - 8]);
        }
        boxes[i].style.backgroundSize = 'cover';
    }
}

function popOver(){
    popOverDiv.classList.toggle('popOver-toggle')
}


function addEvents(){
    boxes.forEach(box => box.addEventListener('click', handleClick));
    popBtn.addEventListener('click', popOver);
};


function init(){
    addImages();
    addEvents();
    scoreDis.textContent = clickCounter;
}


init();

}());

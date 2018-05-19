(function(){

const gameBoard = document.getElementById('gameContainer');
const boxes = document.querySelectorAll('.box');

const chosen = [];
const found = [];

function checkForMatch(){
    return (typeof chosen[1] !== "undefined" && chosen[1] === chosen[3])
}

function handleClick(){
    if(!found.includes(this)){
        if(chosen.indexOf(this) >= 0){
            chosen.splice(chosen.indexOf(this), 1)
            chosen.splice(chosen.indexOf(this.id), 1)
            this.classList.toggle('revolve')
        } else if (chosen.length < 4){
            this.classList.toggle('revolve');
            chosen.push(this, this.id)
        }
        if(checkForMatch()){
            console.log(`It's a match`)
            let foundItems = document.querySelectorAll(`#${this.id}`)
            foundItems.forEach(item => {
                item.classList.add('found');
                chosen.splice(chosen.indexOf(this), 1);
                chosen.splice(chosen.indexOf(this.id), 1);
                found.push(item)
            })
        }
    }
    if(found.length === 16){
        console.log('Yay you won')
    }
}

function generateRandomOrder(){
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
    const randomArr = [];
    for(let i = 0; i < 16; i++){
        randomArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }
    return randomArr;
}


function addImages(){
    let arr = generateRandomOrder();
    for(let i = 0; i < 16; i++){
        let curr = arr[i]
        if(i < 8){
            boxes[i].style.background = `url(./resources/imgs/vanGogh-${arr[i]}.jpg)`;
            boxes[i].id = 'a' + i;
        } else {
            boxes[i].style.background = `url(./resources/imgs/vanGogh-${arr[i - 8]}.jpg)`;
            boxes[i].id = 'a' + (i - 8);
        }
        boxes[i].style.backgroundSize = 'cover';
        console.log(arr[i])
    }
}

function addEvents(){ boxes.forEach(box => box.addEventListener('click', handleClick)) }

function init(){
    addEvents();
    addImages();
}


init();
}())

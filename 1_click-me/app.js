
// write a function that creates a button with random css features, and places it randomly on the html page.
    // when clicked remove that button and create a new button with the same method.
let btn;
let count = 0;

const display = document.getElementById('main-display');
const startBtn = document.getElementById('start-button');

const randomColorGenerator = () => {
    const colors = ['cornflowerblue', 'red', 'grey', 'green', 'dodgerblue', 'rebeccapurple', 'violet', 'pink', 'yellow', 'orange', 'blue', 'tan', 'darkslategrey', 'gold', 'silver', 'orchid'];
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

const btnText = () => {
    count += 1;
    return count % 2 !== 0 ? "Now click Me!!!" : "Now me!!";
}

const btnMaker = () => {
    // remove existing button
    if(btn) {display.removeChild(btn)};
    // create random number generators for css parameters
    let btnWidth = Math.floor(Math.random() * (300 - 100) + 100);
    let btnHeight = Math.floor(Math.random() * (150 - 50) + 50);
    let borderRadius = Math.floor(Math.random() * (70 - 2) + 2);
    let btnFontSize = Math.floor(Math.random() * (22 - 10) + 10);
    let btnBorder = Math.floor(Math.random() * (10 - 2) + 2);
    // create random numbers for x and y of absolute position of button class
    let top = Math.floor(Math.random() * (80 - 20) + 20);
    let left = Math.floor(Math.random() * (65 - 10) + 10);
    // create button element
    btn = document.createElement('button');
    btn.textContent = btnText();
    // add class to btn element with random parameters
    btn.classList.add('randomClass');
    btn.style.top = top + '%';
    btn.style.left = left + '%';
    btn.style.width = btnWidth + 'px';
    btn.style.height = btnHeight + 'px';
    btn.style.borderRadius = borderRadius + '%';
    btn.style.backgroundColor = randomColorGenerator();
    btn.style.fontSize = btnFontSize + 'px';
    btn.style.border = `${btnBorder}px solid ${randomColorGenerator()}`;
    btn.style.color = randomColorGenerator();
    // add event listener to btn
    btn.addEventListener('click', btnMaker);
    // append btn element to main-display
    display.appendChild(btn);
}

const startGame = () => {
    display.removeChild(startBtn);
    btnMaker();
}

startBtn.addEventListener('click', startGame);

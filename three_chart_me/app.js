// ELEMENTS AND GLOBAL VARIABLES //

const userInput = document.getElementById('user-input');
const graphType = document.getElementById('graph-type');
const submitBtn = document.getElementById('form-submit');
const avgSpan = document.getElementById('avg-span');

const canvas = document.getElementById('my-canvas');
const xCanvas = document.getElementById('my-text-canvas');
const ctx = canvas.getContext('2d');
const textCtx = xCanvas.getContext('2d');

const userData = [];
let avgOfUserData;
let prevGraphType = 'bar';




// Chart out the amount of X axis inputs
const xAxisText = () => {
    // reset x, count, and textCanvas
    let textX = 27;
    let count = 1;
    textCtx.clearRect(0, 0, canvas.width, canvas.height);
    let fontSize = 10 + 'px sans-serif';
    for(let i = 0; i < userData.length; i++){
        // loop through current user data and generate numbers for x axis
        let text = count;
        textCtx.font = fontSize;
        textCtx.fillText(text, textX, 10);
        count++
        // at count 10, add 2 less pixels to fix alignment (dirty fix)
        count === 10 ? textX += 23 : textX += 25
    }
}

const calculateAvg = arr => arr.reduce((final, num) => final += Number(num), 0) / arr.length;

// Chart as bar graph
const barGraph = () => {
    // clear graph is graph type has changed
    if(prevGraphType === 'dot'){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    const width = 20;
    let currentX = 20;
    for(let i = 0; i < userData.length; i++){
        let h = userData[i];
        let y = canvas.height - h;

        ctx.fillStyle = 'cornflowerblue';
        ctx.fillRect(currentX, y, width, h)
        ctx.beginPath();
        ctx.stroke();

        currentX += width + 5;
        prevGraphType = 'bar';
    }
}



// Chart as dot graph
const dotGraph = () => {
    // clear graph is graph type has changed
    if(prevGraphType === 'bar'){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    const width = 20;
    let currentX = 20;
    let startX = 0;
    let startY = 500;
    for(let i = 0; i < userData.length; i++){
        let x = currentX;
        let h = userData[i];
        let y = canvas.height - h;

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();

        // add an extra 20 px on each move so line does not overlap circle
        startX = currentX + 20;
        startY = y;

        ctx.fillStyle = 'cornflowerblue';
        ctx.beginPath();
        // x, y, radius, start, full circle, clockwise
        ctx.arc(currentX + width / 2, y, 10, 0, 2 * Math.PI, false);
        ctx.fill();

        currentX += width + 5;
        // change prevGraphType to reflect change
        prevGraphType = 'dot';
    }
}




// custom input validation used as practice rather than putting inputs and buttons
// into a form and requiring them.

const userSubmit = () => {
    // If input is empty && the graph type has not changed, required input.
    if(userInput.value === '' && prevGraphType === graphType.value){
        alert("Must enter a number to Submit");
        // if there is input and the graph type has not changed
    } else if(prevGraphType === graphType.value || prevGraphType !== graphType.value) {
        // if there have been less than 15 total inputs and there is current user input
        if(userData.length < 15){
            // because onchange triggers this function, must check for empty values during graph type change
            if(userInput.value !== ''){
            // lastly, is the user input number in the valid range
                if(userInput.value >= 0 && userInput.value <= 500){
                    // add the user input to the data array and clear inthe input
                    userData.push(userInput.value);
                    xAxisText();
                    userInput.value = '';
                    avgOfUserData = calculateAvg(userData).toFixed(2);
                    avgSpan.textContent = avgOfUserData;
                } else {
                    alert('Enter a number between 0 - 500')
                }
            } else {
                    // Do nothing since the user just change categories and on change was triggered.
            }
        } else if(userInput.value !== ''){
            alert('Maximum Entries Reached')
        } else {
            // do nothing
        }
        if(graphType.value === 'bar'){ barGraph() }
        if(graphType.value === 'dot'){ dotGraph() }
    } else {
        // if only the graph type has changed, but no new input to add
        if(graphType.value === 'bar'){ barGraph() }
        if(graphType.value === 'dot'){ dotGraph() }
    }
}




// EVENT LISTENERS //

graphType.addEventListener('change', userSubmit);
submitBtn.addEventListener('click', userSubmit);
window.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){userSubmit()}
})

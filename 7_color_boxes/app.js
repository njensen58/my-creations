
// -- Random Color generator -- //
const randomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const a = Math.random()
    return `rgba(${r},${g},${b},${a})`
}


// -- Generate 600 divs, give them classes, and append them to the document. -- //
const createBoxes = () => {
    const container = document.getElementById('container')
    for(let i = 0; i < 600; i++){
        var box = document.createElement('div');
        box.classList.add('box');
        container.appendChild(box);
    }
}


// -- loop over divs and give them events // -
const addEvents = () => {
    const boxes = document.querySelectorAll('.box');
    const resetBtn = document.getElementById('resetBtn');
    const spinBtn = document.getElementById('spin');
    for(let i = 0; i < boxes.length; i++){
        boxes[i].addEventListener('mouseover', function(){
            boxes[i].style.backgroundColor = randomColor();
            boxes[i].classList.add('on');
        });

        boxes[i].addEventListener('mouseout', function(){
            boxes[i].classList.remove('on');
        })
    }

    // -- set boxes to default color on reset click -- //
    resetBtn.addEventListener('click', function(){
        for(let i = 0; i < boxes.length; i++){
            boxes[i].style.backgroundColor = 'blue'
        }
    })

    // -- add spin animation to boxes on toggle -- //
    spinBtn.addEventListener('click', function(){
        for(let i = 0; i < boxes.length; i++){
            boxes[i].classList.toggle('animate')
        }
    })
}


// -- Call functions after document load -- //
createBoxes();
addEvents();

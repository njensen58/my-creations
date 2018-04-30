
const boxes = document.querySelectorAll('.box');
const resetBtn = document.getElementById('resetBtn');

const randomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    const a = Math.random()
    return `rgba(${r},${g},${b},${a})`
}

resetBtn.addEventListener('click', function(){
    for(let i = 0; i < boxes.length; i++){
        boxes[i].style.backgroundColor = 'blue'
    }
})


for(let i = 0; i < boxes.length; i++){
    boxes[i].addEventListener('mouseover', function(){
        boxes[i].style.backgroundColor = randomColor();
        boxes[i].classList.add('on');
    });

    boxes[i].addEventListener('mouseout', function(){
        boxes[i].classList.remove('on');
    })
}

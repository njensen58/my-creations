const num1Top = document.getElementById('num1-num1');
const num1TopLeft = document.getElementById('num1-num2');
const num1TopRight = document.getElementById('num1-num3');
const num1Mid = document.getElementById('num1-num4');
const num1BtmLeft = document.getElementById('num1-num5');
const num1BtmRight = document.getElementById('num1-num6');
const num1Btm = document.getElementById('num1-num7');

function getTime(){
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();

    num1Render(hour)
}


function num1Render(hour){
    switch(hour){
        case 0:
            num1Mid.classList.remove('num4');
            break;
        case 1:
            num1Mid.classList.remove('num4');
            break;
        case 2:
            num1Mid.classList.remove('num4');
            break;
        case 3:
            num1Mid.classList.remove('num4');
            break;
        case 4:
            num1Mid.classList.remove('num4');
            break;
        case 5:
            num1Mid.classList.remove('num4');
            break;
        case 6:
            num1Mid.classList.remove('num4');
            break;
        case 7:
            num1Mid.classList.remove('num4');
            break;
        case 8:
            num1Mid.classList.remove('num4');
            break;
        case 9:
            num1Mid.classList.remove('num4');
            break;
        case 10:
            num1Top.classList.remove('num1');
            num1TopLeft.classList.remove('num2');
            num1Mid.classList.remove('num4');
            num1BtmLeft.classList.remove('num5');
            num1Btm.classList.remove('num7')
            break;
        case 11:
            // code:
            break;
        case 12:
            // code;
            break;
    }
}

setInterval(getTime, 1000)

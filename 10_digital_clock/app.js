(function(){

const clockContainer = document.getElementById('clock-container')
const num1  = document.getElementById('num1')
const num2  = document.getElementById('num2')
const num3  = document.getElementById('num3')
const num4  = document.getElementById('num4')
const colon = document.getElementById('colon')
const amPm  = document.getElementById('amPm')
const lightBtn = document.getElementById('light-btn');

let lightToggle = false;




function getTime() {
    let now = new Date()
    let hour = now.getHours()
    let min = now.getMinutes()
    colon.textContent = ':'
    if(hour <= 12){
        amPm.textContent = "am"
    } else {
        amPm.textContent = "pm"
    }
    setHour(hour);
    setMinute(min)
}


function setHour(hour) {
    if(hour < 10){
        num1.textContent = `0${hour}`
    } else {
        num1.textContent = `${hour}`
    }
}

function setMinute(min) {
    if(min < 10){
        num3.textContent = `0${min}`;
    } else {
        num3.textContent = `${min}`;
    }
}



lightBtn.addEventListener('click', function(){
    if(lightToggle){
        lightToggle = !lightToggle
        console.log(lightToggle)
    } else {
        lightToggle = !lightToggle
        console.log(lightToggle)
    }
})


setInterval(getTime, 1000);


}())

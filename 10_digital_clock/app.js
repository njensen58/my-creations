(function(){

const clockContainer = document.getElementById('clock-container')
const num1  = document.getElementById('num1')
const num3  = document.getElementById('num3')
const colon = document.getElementById('colon')
const amPm  = document.getElementById('amPm')
const lightBtn = document.getElementById('light-btn');
const themeSelect = document.themeForm.themeType;
let prevTheme = 'basic';



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
        num3.textContent = `0${min}`
    } else {
        num3.textContent = `${min}`
    }
}


themeSelect.addEventListener('change', (e) => {
    let theme = e.target.value;
    clockContainer.classList.remove(`lightOn-${prevTheme}`)
    clockContainer.classList.remove(`lightOff-${prevTheme}`)
    clockContainer.classList.add(`lightOff-${theme}`)
    prevTheme = theme;
})


lightBtn.addEventListener('click', function() {
        clockContainer.classList.toggle(`lightOn-${themeSelect.value}`)
        clockContainer.classList.toggle(`lightOff-${themeSelect.value}`)
})



setInterval(getTime, 1000)

}())

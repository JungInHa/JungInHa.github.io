const timeContainer = document.querySelector(".js-time"), 
    today = timeContainer.querySelector(".js-date"),
    clock = timeContainer.querySelector(".js-clock");

function getTime() {

    const date = new Date(); 

    const option = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const todayIs = Intl.DateTimeFormat('en-US', option).format(date);

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    today.innerText = `${todayIs}`;
    clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();

{/* <div class="js-time">
<h1 class="js-date">Sunday, January 24, 2021</h1>
<h1 class="js-clock">00:00</h1>
</div> */}
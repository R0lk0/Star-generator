const canvas = document.querySelector('canvas');
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const starCount = document.getElementById('starCount');
const minSize = document.getElementById('minSize');
const maxSize = document.getElementById('maxSize');
const regenerateButton = document.getElementById('regenerateButton');

//Star generation
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function randomColor() {
    const r = Math.random();

    if (r < 0.7) {
        return `rgb(${245 + Math.random()*10}, ${245 + Math.random()*10}, 255)`;
    } 
    else if (r < 0.9) {
        return `rgb(255, ${235 + Math.random()*20}, ${170 + Math.random()*20})`;
    } 
    else {
        return `rgb(${180 + Math.random()*20}, ${225 + Math.random()*20}, 255)`;
    }
}

var ctx = canvas.getContext('2d');

function generateStars(){
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //limiting
    if (starCount.value > 10000){
        starCount.textContent = 10000;
        starCount.value = 10000;
    }
    if (maxSize.value != "" && minSize.value > maxSize.value){
        minSize.textContent = maxSize.textContent;
        minSize.value = maxSize.value;
    }
    if (maxSize.value > 5){
        maxSize.textContent = 5;
        maxSize.value = 5
    }

    //rendering each star
    for (let i = 0; i < starCount.value; i++){
        ctx.beginPath();

        ctx.arc(getRandom(0, window.innerWidth),
                getRandom(0, window.innerHeight),
                getRandom(+minSize.value, +maxSize.value),
                0,
                Math.PI * 2,
            );

        ctx.fillStyle = randomColor();
        ctx.fill();
    }
}

generateStars();
starCount.addEventListener("keyup", generateStars);
minSize.addEventListener("keyup", generateStars);
maxSize.addEventListener("keyup", generateStars);
regenerateButton.addEventListener("click", ()=>{
    generateStars();
})

//Settings
menuButton.addEventListener("click", ()=>{
    sidebar.classList.toggle("open");
    menuButton.classList.toggle("open");

    if (menuButton.classList.contains("open")){
        menuButton.textContent = "<"
    }
    else{
        menuButton.textContent = ">"
    }
})
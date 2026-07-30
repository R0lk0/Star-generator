const canvas = document.querySelector('canvas');
const startButton = document.getElementById('startButton');
const welcome = document.getElementById('welcome');
const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');
const starCount = document.getElementById('starCount');
const minSize = document.getElementById('minSize');
const maxSize = document.getElementById('maxSize');
const regenerateButton = document.getElementById('regenerateButton');
const rotationSpeed = document.getElementById('rotationSpeed');
const graphics = document.getElementById('graphics');

var ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
}

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

let stars = [];
class Star{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = randomColor();
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        if (graphics.value != "fast"){
            ctx.shadowColor= this.color;
            ctx.shadowBlur = 10;
        }
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){
        this.draw();
    }
}

function init(){
    limitSettings();

    stars = [];

    ctx.fillStyle = 'rgba(10, 10, 10, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < starCount.value; i++){
        const x = getRandom(-((window.innerWidth + 500)/2), (window.innerWidth + 500)/2);
        const y = getRandom(-((window.innerHeight + 1200)/2), (window.innerHeight + 1200)/2)
        const r = getRandom(+minSize.value, +maxSize.value)

        stars.push(new Star(x, y, r));
    }
}

let radians = 0;
function animate(){
    requestAnimationFrame(animate);
    let alpha;
    if (graphics.value == "glow"){ alpha = 0.1; }
    else{ alpha = 1; }

    ctx.fillStyle = `rgba(10, 10, 10, ${alpha})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(radians);
    stars.forEach((star) => {
        star.update();
    })
    ctx.restore();
    radians += +rotationSpeed.value;
}

function limitSettings(){
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
}

init();
animate();

//Welcome screen
canvas.classList.add("blurred");
startButton.addEventListener("click", ()=>{
    welcome.style.display = "none";
    canvas.classList.remove("blurred");
    menuButton.style.display = "block";
})

starCount.addEventListener("keyup", init);
minSize.addEventListener("keyup", init);
maxSize.addEventListener("keyup", init);

regenerateButton.addEventListener("click", ()=>{
    init();
})

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

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


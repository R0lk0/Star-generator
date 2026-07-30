var canvas = document.querySelector('canvas');

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

for (let i = 0; i < 2000; i++){
    ctx.beginPath();
    ctx.arc(getRandom(0, window.innerWidth),
            getRandom(0, window.innerHeight),
            getRandom(0.2, 2.5),
            0,
            Math.PI * 2,
            false)
    ctx.fillStyle = `${randomColor()}`;
    ctx.fill();
}
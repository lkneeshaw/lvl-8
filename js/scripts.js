// @codekit-prepend "jquery.js";
// @codekit-prepend "semantic.js";

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

//Canvas fills whole width, height of page
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Brush styling
ctx.strokeStyle = 'aaa';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

// Variables
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

// Click and drag functionality

function draw(e) {
    if(!isDrawing) return;
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    // Starts from
    ctx.beginPath();
    // Goes to
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    
    hue++;
    if (hue >= 360) {
        hue = 0;
    }
    
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
     ctx.lineWidth++;   
    } else {
        ctx.lineWidth--;
    }
    
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
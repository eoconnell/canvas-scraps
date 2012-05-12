var canvas;
var context;

canvas = document.getElementById('myCanvas');
canvas.width  = window.innerWidth;  // visable width of browser
canvas.height = window.innerHeight; // visable height of browser

context = canvas.getContext('2d');

// keeps the canvas fullscreen when the browser window is resized
window.onresize = function(event) {
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	draw();
};

function draw() {
	context.fillRect(10, 10, canvas.width-20, canvas.height-20);
}

draw();
setInterval(draw, 10);
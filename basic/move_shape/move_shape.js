var canvas;
var context;
var dx = 5;
var dy = 5;
var x = 150;
var y = 100;
var radius = 20;

// key code constants
var UP    = 38;
var DOWN  = 40;
var LEFT  = 37;
var RIGHT = 39;

function circle(x,y,r) {
	context.beginPath();
	context.arc(x, y, r, 0, Math.PI*2, true);
	context.fill();
}

function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function init() {
	canvas = document.getElementById('myCanvas');
	canvas.width  = 400;
	canvas.height = 400;
	context = canvas.getContext('2d');
	return setInterval(draw, 10);
}

function doKeyDown(evt){
	switch (evt.keyCode) {
		case UP:
			if (y - dy > radius){
				y -= dy;
			}
			break;
		case DOWN:
			if (y + dy < canvas.height-radius){
				y += dy;
			}
			break;
		case LEFT:
			if (x - dx > radius){
				x -= dx;
			}
			break;
		case RIGHT:
			if (x + dx < canvas.width-radius){
				x += dx;
			}
			break;
	}
}

function draw() {
	clear();
	context.fillStyle = "red";
	circle(x, y, radius);
}

init();
window.addEventListener('keydown',doKeyDown,true);
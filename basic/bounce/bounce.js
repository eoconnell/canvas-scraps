var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');

var dX = 1;
var dY = 1;

var x = 20;
var y = 20;

var size = 30;

function draw() {
	clear();
	context.fillStyle = 'red';

	// check for collision with left & right edges
	if (x >= (canvas.width - size) || x <= 0) {
		dX = (dX * -1);
	}

	// check for collision with top & bottom edges
	if (y >= (canvas.height - size) || y <= 0) {
		dY = (dY * -1);
	}

	x = x + dX;
	y = y + dY;
	context.fillRect(x, y, size, size);
}

/**
 * Clears the 2d rendering context.
 */
function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

draw();
setInterval(draw, 10);
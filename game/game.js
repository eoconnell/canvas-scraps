var canvas  = document.getElementById('stage');
var context = canvas.getContext('2d');

canvas.width  = 500;
canvas.height = 600;

// key code constants
var LEFT  = 37;
var RIGHT = 39;
var SPACE = 32;

var cannon = {
	x: 225,
	y: 550,
	width: 50,
	speed: 15
};

var hits = 0;
var bullets  = [];
var enemies = [];

/**
 * Construct a new Bullet.
 *
 * x - starting x position.
 * y - starting y position.
 *
 * Examples
 *
 *     var bul = new Bullet(10,40)
 *
 * Returns a new Bullet literal.
 */
function Bullet(x,y) {
	
	return {
		x: x,
		y: y,
		width: 5,
		height: 10,
		speed: 5,
		color: 'yellow'
	};
}

/**
 * Construct a new Enemy with random values.
 *
 * Examples
 *
 *     var bal = new Enemy()
 *
 * Returns a new Enemy literal.
 */
function Enemy() {
	
	return {
		x: Math.floor(Math.random()*(canvas.width-25)),
		y: Math.floor(Math.random()*(-25)),
		width: 15,
		height: 15,
		speed: Math.floor((Math.random()*2)+1),
		color: 'red'
	};
}

/**
 * Draws the Cannon on the canvas.
 */
function drawCannon() {
	context.fillStyle = 'white';
	context.fillRect((cannon.x+20), cannon.y, 10, 10);  // gun
	context.fillRect(cannon.x, (cannon.y+10), cannon.width, 15);  // ship
}

/**
 * Draws each Bullet on the canvas and removes it once off the canvas.
 */
function drawBullets() {
	for (var i=0; i<bullets.length; i++) {
		var b = bullets[i];

		context.fillStyle = b.color;
		context.fillRect(b.x, b.y, b.width, b.height);
		bullets[i].y = b.y - b.speed;

		if (bullets[i].y < 0) {   // went off the canvas
			bullets.splice(i,1);
		}
	}
}

/**
 * Draws each Enemy on the canvas and removes it once off the canvas.
 */
function drawEnemies() {
	for (var i=0; i < enemies.length; i++) {
		var e = enemies[i];

		context.fillStyle = e.color;
		context.fillRect(e.x, e.y, e.width, e.height);
		enemies[i].y = e.y + e.speed;
		
		if (enemies[i].y > canvas.height) {   // went off the canvas
			enemies.splice(i,1);
		}
	}
}

/**
 * Adds a new Enemy to the game.
 */
function addEnemy() {
	enemies.push(Enemy());
}

setInterval(addEnemy, 3000);

/**
 * Calculates whether two objects intersect.
 *
 * a - object that has properties {x,y,width,height}.
 * b - object that has properties {x,y,width,height}.
 *
 * Returns true or false.
 */
function intersect(a,b) {
	if ((a.x+a.width) < b.x) { return false; }  // a is left of b
	if (a.x > (b.x+b.width)) { return false; }  // a is right of b
	if ((a.y+a.height) < b.y) { return false; } // a is above b
	if (a.y > (b.y+b.height)) { return false; } // a is below b
	return true;                                // a overlaps b
}

/**
 * Checks to see if any Bullets intersect with an Enemy.
 */
function detectCollisions() {
	for (var a = 0; a < bullets.length; a++) {
		for (var b =0 ; b < enemies.length; b++) {
			if (intersect(bullets[a], enemies[b])) {
				bullets.splice(a, 1);
				enemies.splice(b, 1);
				hits = hits + 1;
			}
		}
	}
}

/**
 * Handles user input.
 */
function onKeyPress(event) {
	switch (event.keyCode) {
		case LEFT:
			if (cannon.x > 0) {
				cannon.x = cannon.x - cannon.speed;
			} else {
				cannon.x = 0;
			}
			break;
		case RIGHT:
			if (cannon.x < canvas.width - cannon.width) {
				cannon.x = cannon.x + cannon.speed;
			} else {
				cannon.x = canvas.width - cannon.width;
			}
			break;
		case SPACE:
			bullets.push(Bullet(cannon.x+22, cannon.y));
			break;
	}
}

window.addEventListener('keydown', onKeyPress, true);

/**
 * Clears the 2d rendering context.
 */
function clear() {
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Draws each object on the canvas and checks for collisions.
 */
function draw() {
	clear();
	drawCannon();
	drawEnemies();
	drawBullets();
	detectCollisions();

	// Print # hits on canvas
	context.fillStyle = 'white';
	context.font = '12pt Arial';
	context.fillText('Hit: '+hits, (canvas.width-75), (canvas.height-5));
}

setInterval(draw, 10);
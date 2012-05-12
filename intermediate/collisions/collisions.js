var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

context.globalAlpha = 0.5; // emphasis for intersection

/**
 * Constructs a new Shape object.
 *
 * Returns the new Shape object.
 */
function Shape() {
	this.x = 0;
	this.y = 0;
	this.dx = 1;
	this.dy = 1;
	this.color = 'black';
}

/**
 * Moves the Shape one step in it's current direction.
 */
Shape.prototype.step = function() {
	this.x = this.x + this.dx;
	this.y = this.y + this.dy;
};

/**
 * Sets the fill color of the Shape.
 */
Shape.prototype.setColor = function(color) {
	this.color = color;
};

/**
 * Returns a string of Shape properties.
 */
Shape.prototype.toString = function() {
	return '[Shape {x: '+this.x+', y: '+this.y+', dx: '+this.dx+', dy: '+this.dy+']';
};

/**
 * Box inherits the properties of Shape.
 */
Box.prototype = new Shape();
Box.prototype.constructor = Box;

/**
 * Constructs a new Box object.
 *
 * x     - the x coordinate.
 * y     - the y coordinate.
 * w     - width of the box.
 * h     - height of the box.
 * color - color of the box. default: 'black'
 *
 * Returns the new Box object.
 */
function Box(x,y,w,h,color) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.color = (typeof color == "undefined")?'black':color;
}

/**
 * Draws a Box on the canvas.
 *
 * ctx - canvas 2d rendering context.
 *
 * Returns nothing.
 */
Box.prototype.draw = function(ctx) {
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x,this.y,this.w,this.h);
};

/**
 * Calculates whether two Boxes intersect.
 *
 * that - Box object.
 *
 * Returns true or false.
 */
Box.prototype.intersect = function(that) {
	if ((this.x+this.w) < that.x) { return false; }  // this is left of that
	if (this.x > (that.x+that.w)) { return false; }  // this is right of that
	if ((this.y+this.h) < that.y) { return false; }  // this is above that
	if (this.y > (that.y+that.h)) { return false; }  // this is bloew that
	return true;                                     // this overlaps that
};

/**
 * Returns a string of Box properties.
 */
Box.prototype.toString = function() {
	return '[Box {x: '+this.x+', y: '+this.y+', dx: '+this.dx+', dy: '+this.dy+', width: '+this.w+', height: '+this.h+']';
};

/**
 * Clears the 2d rendering context.
 */
function clear() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Array of objects to be drawn on the canvas.
 */
var objects = [];
objects.push(new Box(50,50,100,100,'red'));
objects.push(new Box(100,100,100,100,'blue'));
objects.push(new Box(175,25,100,100,'green'));
objects.push(new Box(250,150,100,100,'black'));

/**
 * Draws each object on the canvas and checks for collisions.
 */
function draw() {

	for (var i=0; i<objects.length; i++) {
		objects[i].draw(context);
	}
	detectCollisions();
}

var results = document.getElementById('results');

/**
 * Checks to see if any object intersects with another object.
 */
function detectCollisions() {
	for (var a = 0; a < objects.length; a++) {
		for (var b =0 ; b < objects.length; b++) {
			if (b != a) {
				results.innerHTML += '<li>'+objects[a].color+' intersects '+objects[b].color+'? '+objects[a].intersect(objects[b])+'</li>';
			}
		}
	}
}

draw();
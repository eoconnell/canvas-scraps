/*
	How it works:

	ParentClass.prototype.inheritedMethod = function() {};

	ChildClass.prototype = new ParentClass();
	ChildClass.prototype.constructor = ChildClass;
*/

/**
 * Construct a new Rectangle object.
 *
 * width  - width of the rectangle.
 * height - height of the rectangle.
 *
 * Examples
 *
 *    var r = new Rectangle(10,20)
 *
 * Returns the new Rectangle object.
 */
function Rectangle(width, height) {
	this.width  = width;
	this.height = height;
}

/**
 * Returns the area of the Rectangle.
 */
Rectangle.prototype.area = function() {
	return this.width * this.height;
};

/**
 * Returns a string of Rectangle properties.
 */
Rectangle.prototype.toString = function() {
	return 'Rectangle ['+this.width+'x'+this.height+']';
};

/**
 * Square inherits the properties of Rectangle.
 */
Square.prototype = new Rectangle();
Square.prototype.constructor = Square;

/**
 * Construct a new Square object.
 *
 * size  - width and height of the square. (inherited)
 *
 * Examples
 *
 *    var s = new Square(20)
 *
 * Returns the new Square object.
 */
function Square(size) {
	this.width  = size;
	this.height = size;
}

/**
 * Returns a string of Square properties.
 */
Square.prototype.toString = function() {
	return 'Square ['+this.width+'x'+this.height+']';
};

var r = new Rectangle(30,10);
var s = new Square(20);

document.getElementById('r').innerHTML = r.toString();
document.getElementById('s').innerHTML = s.toString();

document.getElementById('rarea').innerHTML = r.area();
document.getElementById('sarea').innerHTML = s.area();

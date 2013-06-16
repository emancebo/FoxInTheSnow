function Shape() {}
Shape.prototype.handleCollision = function() {}
Shape.prototype.collidesWith = function(shape) {
	return false;
}

function Rect(x, y, width, height, theta) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.theta = theta;
}

Rect.prototype = new Shape();
Rect.prototype.type = 'rect';

Rect.prototype.collidesWith = function (shape) {
	if (shape.type === 'circle') {
		return shape.collidesWith(this);
	}
	return false;
}

Rect.prototype.getCorners = function() {
	var corners = [
		{x: this.x, y: this.y},
		rotatePoint({x: this.x, y: this.y}, {x: this.x, y: this.y+this.height}, this.theta),
		rotatePoint({x: this.x, y: this.y}, {x: this.x+this.width, y: this.y+this.height}, this.theta),
		rotatePoint({x: this.x, y: this.y}, {x: this.x+this.width, y: this.y}, this.theta),
	];
	
	//var corners = [
	//	{x: this.x, y: this.y},
	//	{x: this.x, y: this.y+this.height},
	//	{x: this.x+this.width, y: this.y+this.height},
	//	{x: this.x+this.width, y: this.y},
	//];
	
	return corners;
}

function Circle(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
}

Circle.prototype = new Shape();
Circle.prototype.type = 'circle';

Circle.prototype.collidesWith = function (shape) {

	if (shape.type === 'rect') {
		// rotate this circle about the rect origin to undo to rect rotation
		var point = 
			rotatePoint({x: shape.x,  y: shape.y}, {x: this.x, y: this.y}, -shape.theta);
		var circle = new Circle(point.x, point.y, this.r);
		
		// expand the rect by radius pixels in each direction
		var rect = 
			new Rect(shape.x-this.r, shape.y-this.r, shape.width+2*this.r, shape.height+2*this.r, 0);
			
		// now collision occurs if circle center is within the expanded rect
		if (circle.x >= rect.x && circle.x <= rect.x+rect.width &&
			circle.y >= rect.y && circle.y <= rect.y+rect.height) {
			return true;	
		}
	}
	
	return false;
}

function rotatePoint (origin, point, angle) {		
		var xp = point.x - origin.x;
		var yp = point.y - origin.y;
		var h = Math.sqrt(xp*xp + yp*yp);
		var theta = -Math.acos(xp/h); // adjust for neg. y axis		
		theta += angle;
		var dx = h * Math.cos(theta);
		var dy = h * Math.sin(theta);
		
		return {
			x: origin.x + dx,
			y: origin.y + dy,
		};
}
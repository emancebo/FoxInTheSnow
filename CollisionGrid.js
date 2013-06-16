function CollisionGrid (ctx, precision) {
	this.ctx = ctx;
	this.precision = precision;
	
	this.width = Math.ceil(ctx.canvas.width / precision);
	this.height = Math.ceil(ctx.canvas.height / precision);
	
	this.grid = new Array(this.width * this.height);
}

CollisionGrid.prototype.registerObject = function (obj, x_idx, y_idx) {
	var idx = this.getArrayIdx(x_idx, y_idx);
	this.addAtIndex(obj, idx);
}

// Register object in all grid spaces based on list of points
// Takes care of de-duping
CollisionGrid.prototype.registerObjectPoints = function (obj, points) {
	var indexes = {};
	for (var i=0; i < points.length; ++i) {
		indexes[this.getArrayIdx(points[i].x, points[i].y)] = true;
	}	
	for (k in indexes) {
		this.addAtIndex(obj, k);
	}
}

CollisionGrid.prototype.getArrayIdx = function (x, y) {
	return Math.floor(x/this.precision) + Math.floor(y/this.precision) * this.width;
}

CollisionGrid.prototype.addAtIndex = function (obj, idx) {
	var a = this.grid[idx];
	if (a == null) {
		a = [];
		this.grid[idx] = a;
	}
	a.push(obj);
}
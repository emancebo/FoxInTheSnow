function Tree(ctx, x, y, scaleFactor) {
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.scaleFactor = scaleFactor;
	this.seed = uuid();
	this.branches = [];
}

Tree.prototype.draw = function () {
	Math.seedrandom(this.seed);
	this.branches = [];
	this._drawBranches(0, -Math.PI/2, this.x, this.y, 30 * this.scaleFactor);
}

Tree.prototype._drawBranches = function (i, angle, x, y, width) {
	ctx = this.ctx;
	ctx.save();

	var length = interpolate(i, 1, 6, 50, 60) * random(0.7, 1.3);	
	if (i == 0) {
		length = 140;
	}	
	length *= this.scaleFactor;
	
	ctx.fillStyle="#000000";
	var xt = x + Math.sin(angle)*(width/2);
	var yt = y - Math.cos(angle)*(width/2);
	ctx.translate(xt, yt);
	ctx.rotate(angle);
	ctx.fillRect(0,0,length, width);	
	if (i > 2) {
		this.branches.push(new Rect(xt, yt, length, width, angle));
	}
	ctx.restore();

	var pt = {}
	pt.x = x + (length - width/2) * Math.cos(angle);
	pt.y = y + (length - width/2) * Math.sin(angle);

	if (i < 3) {
		this._drawBranches(i+1, angle + Math.PI/10 * random(.7, 1.3), pt.x, pt.y, width * .65);
		this._drawBranches(i+1, angle - Math.PI/10 * random(.7, 1.3), pt.x, pt.y, width * .65);
	}
	else if (i < random(5, 7)) {
		this._drawBranches(i+1, angle + Math.PI/16 * random(.7, 1.3), pt.x, pt.y, width * .65);
		this._drawBranches(i+1, angle - Math.PI/16 * random(.7, 1.3), pt.x, pt.y, width * .65);
	}
}

Tree.prototype.getCollisionGrid = function(precision) {
	var grid = new CollisionGrid(this.ctx, precision);
	for (var i=0; i < this.branches.length; ++i) {
		var corners = this.branches[i].getCorners();
		///// DEBUG
		//for (var j=0; j < corners.length; ++j) {
		//	ctx.beginPath();
		//	ctx.arc(corners[j].x, corners[j].y, 2, 0, 2*Math.PI);
		//	ctx.closePath();
		//	ctx.strokeStyle = "#FF0080";
		//	ctx.stroke();
		//}
		///// END DEBUG
		grid.registerObjectPoints(this.branches[i], corners);
	}
	return grid;
}
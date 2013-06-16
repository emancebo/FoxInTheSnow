function Snowfall(ctx) {
	this.ctx = ctx;
	this.snowflakes = new LinkedList();
	
	// snowflakes per square pixel
	this.snowflakeDensity = 100 / (1024 * 768);
	
	// animation params
	this.speedMin = 40;
	this.speedMax = 60;
	this.driftMin = -3;
	this.driftMax = 3;
	this.radiusMin = 3;
	this.radiusMax = 5;	
}

Snowfall.prototype.initialize = function() {
	// populate initial canvas with snow in flight
	var nFlakes = this.snowflakeDensity * ctx.canvas.width * ctx.canvas.height;
	var startTime = new Date().getTime();
	this.lastUpdatedTime = startTime;
	
	// initial snowflakes don't stick 
	this._addFlakes(nFlakes, null, null, startTime, false);
}

Snowfall.prototype._addFlakes = function (n, _x, _y, startTime, canStick) {
	var x = _x;
	var y = _y;
	for (var i=0; i < n; ++i) {
		if (_x == null) {
			x = random(0, ctx.canvas.width);
		}	
		if (_y == null) {
			y = random(0, ctx.canvas.height);
		}	
		var params = {
			speed: random(this.speedMin, this.speedMax),
			drift: random(this.driftMin, this.driftMax),
			radius: random(this.radiusMin, this.radiusMax),
		};
		var s = new Snowflake(ctx, x, y, startTime, params);
		s.canStick = canStick;
		this.snowflakes.push(s);
	}
}

Snowfall.prototype.draw = function() {
	var itr = this.snowflakes.iterator();
	while (itr.hasNext()) {
		itr.next().draw();
	}
}

Snowfall.prototype.update = function (t) {
	Math.seedrandom();

	// update existing snowflakes
	var itr = this.snowflakes.iterator();
	while (itr.hasNext()) {
		var s = itr.next();
		s.update(t);
		
		// prune snowflakes that have fallen outside the canvas
		if (s.y > this.ctx.canvas.height) {
			itr.remove();
		}
	}	
	
	// add new snowflakes
	var dt = t - this.lastUpdatedTime;
	var speed = (this.speedMin + this.speedMax) / 2;
	var dArea = this.ctx.canvas.width * speed * dt/1000;
	var nFlakes = this.snowflakeDensity * dArea;	
	var nFlakesInteger = Math.floor(nFlakes);
	if (nFlakes - nFlakesInteger > Math.random()) {
		nFlakesInteger++; // round probabilistically in case nFlakesInteger is always < 1
	}
	this._addFlakes(nFlakesInteger, null, 0, t, Math.random() > 0.5);
	
	this.lastUpdatedTime = t;
}

Snowfall.prototype.getCollisionGrid = function(precision) {

	var grid = new CollisionGrid(this.ctx, precision);
	var itr = this.snowflakes.iterator();
	while (itr.hasNext()) {
		var s = itr.next();
		if (!s.isFixed) {
			grid.registerObject(s, s.x, s.y);
		}
	}
	return grid;
}
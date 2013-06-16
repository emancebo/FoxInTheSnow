function Snowflake(ctx, x, y, startTime, params) {
	this.ctx = ctx;
	this.x = this.x0 = x;
	this.y = this.y0 = y;
	this.r = params.radius;
	this.startTime = startTime;
	this.params = params;
	
	this.isFixed = false;
	this.canStick = true;
}

Snowflake.prototype = new Circle();

Snowflake.prototype.draw = function () {
	var ctx = this.ctx;

	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
	ctx.closePath();
	ctx.fillStyle = "#FFFFFF";
	ctx.fill();
}

Snowflake.prototype.update = function(t) {
	if (!this.isFixed) {
		var dt = t - this.startTime;
		this.y = this.y0 + this.params.speed * dt/1000;
		this.x = this.x0 + this.params.drift * dt/1000;
	}
}

Snowflake.prototype.handleCollision = function (obj) {
	if (this.canStick && Math.random() > 0.98) {
		// let snowflakes rest on tree branches
		this.isFixed = true;
	}	
}
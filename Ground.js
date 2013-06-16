function Ground (ctx, height, slope) {
	this.ctx = ctx;
	this.height = height;
	this.slope = slope; 
}

Ground.prototype.draw = function () {	
	var ctx = this.ctx;
	var w = ctx.canvas.width;
	var h = ctx.canvas.height;
	
	ctx.beginPath();
	ctx.moveTo(0, h);
	ctx.lineTo(0, h - this.height);
	
	for (var xval=10; xval < w; xval += Math.random(10,50)) {
		var yval = h - this.height - this.slope*xval;
		yval += Math.random(-5, 5);
		ctx.lineTo(xval, yval);
	}
		
	ctx.lineTo(w, (h-this.height) - this.slope*w);
	ctx.lineTo(w, h);
	ctx.lineTo(0, h);
	ctx.closePath();
	
	ctx.fillStyle = '#FFFFFF';
	ctx.fill();
}
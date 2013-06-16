function CollisionManager (precision) {
	this.precision = precision;
	this.objects = [];
}

CollisionManager.prototype.registerObject = function (obj) {
	this.objects.push(obj);
}

CollisionManager.prototype.processCollisions = function () {
	
	var grids = [];
	
	for (var i=0; i < this.objects.length; ++i) {
		var g = this.objects[i].getCollisionGrid(this.precision);
		grids.push(g);
	}
	
	for (var i=0; i < grids.length; ++i) {
		for (var j=i+1; j < grids.length; ++j) {
			var g1 = grids[i].grid;
			var g2 = grids[j].grid;
			
			for (var k=0; k < g1.length; ++k) {
				if (g1[k] != null && g2[k] != null) {
					for (var a=0; a < g1[k].length; ++a) {
						for (var b=0; b < g2[k].length; ++b) {
							var o1 = g1[k][a];
							var o2 = g2[k][b];
							
							if (o1.collidesWith(o2)) {
								o1.handleCollision(o2);
								o2.handleCollision(o1);
							}
						}
					}
				}
			}
		}
	}
}
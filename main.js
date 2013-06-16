var ctx;
var gameObjects = [];
var collisionMgr;

window.onload = function() {
	var bgcanvas = document.getElementById("bgcanvas");
	collisionMgr = new CollisionManager(100);
	
	var bgctx = bgcanvas.getContext("2d");
	bgctx.canvas.width = window.innerWidth;
	bgctx.canvas.height = window.innerHeight;
	
	ctx = bgctx;
	
	var t = new Tree(bgctx, bgctx.canvas.width/2, bgctx.canvas.height, 1.0);
	gameObjects.push(t);
	collisionMgr.registerObject(t);
		
	var snowfall = new Snowfall(bgctx);
	snowfall.initialize();
	gameObjects.push(snowfall);
	collisionMgr.registerObject(snowfall);
	
	mainLoop();
}


function mainLoop() {
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	collisionMgr.processCollisions();
	
	var t = new Date().getTime();	
	for (var i=0; i < gameObjects.length; ++i) {
		g = gameObjects[i];
		if (g.update) {
			g.update(t);
		}
		g.draw();
	}
	
	window.requestAnimationFrame(mainLoop);
}

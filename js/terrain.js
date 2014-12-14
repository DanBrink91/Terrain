function TerrainRule(operator, value, display) {
	this.operator = operator;
	this.value = value;
	this.display = display;
}	
TerrainRule.prototype.evaluate = function(noise_value) {
	switch(this.operator) {
		case "<" : return this.value < noise_value;
		case ">": return this.value > noise_value;
		default: console.log("Invalid operator.", this.operator); return false;
	}
};
function TerrainGenerator() {
	this.mapWidth = window.innerWidth;
	this.mapHeight = window.innerHeight;
	// Terrain Rules
	this.rules = [];

	// Simplex Noise
	this.simplex = new SimplexNoise();	
	this.zoom = 200;
	
	// Renderer
	this.stage = new PIXI.Stage(0xFFFFFF);
	this.renderer = PIXI.autoDetectRenderer(this.mapWidth, this.mapHeight);
	this.graphics = new PIXI.Graphics();
	
	this.drawLines = true;
	this.graphics.lineStyle(1, 0x000000);

	this.stage.addChild(this.graphics);

	document.getElementById("drawArea").appendChild(this.renderer.view);
}

TerrainGenerator.prototype.generate = function() {
	console.log(this.rules);
	this.graphics.clear();
	if(this.drawLines) {
		this.graphics.lineStyle(1, 0x000000);
	}
	else {
		this.graphics.lineStyle(0, 0x000000);
	}
	var rule_length = this.rules.length;
	for(var y = 0; y < this.mapHeight; y += 20) {
		for(var x = 0; x < this.mapWidth; x += 20) {
			
			var noise = this.simplex.noise(x/this.zoom, y/this.zoom);
			
			for(var i = 0; i < rule_length; i++)
			{
				if(this.rules[i].evaluate(noise)) {
					this.graphics.beginFill(this.rules[i].display);
					this.graphics.drawRect(x, y, 20, 20);
					this.graphics.endFill();	
					break;
				}
			}
			// else {
			// 	this.graphics.lineStyle(1, 0xFF0000);
			// 	this.graphics.drawRect(x, y, 20, 20);			}
			// }
		}
	}
};

TerrainGenerator.prototype.render = function() {
	requestAnimFrame(this.render.bind(this));
	this.renderer.render(this.stage);
};

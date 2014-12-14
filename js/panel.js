(function(){
	// Noise section
	var noisePanel = document.getElementById("noisePanel");
	var seedInput = document.getElementById("seed");
	var randomSeed = document.getElementById("randomSeed");
	var smoothFunctionSelect = document.getElementById("smoothFunction");
	var updateNoiseButton = document.getElementById("noiseButton");

	// Terrain Rules
	var terrainRules = document.getElementById("terrainRules");
	var rulesInput = document.getElementById("rulesInput");
	var noiseThreshold = document.getElementById("noiseThreshold");
	var ruleOperator = document.getElementById("operator");
	var terrainDisplay = document.getElementById("terrainColor");
	var addTerrain = document.getElementById("addTerrain");

	var drawLines = document.getElementById("drawLines");

	var tg = new TerrainGenerator();

	addTerrain.addEventListener("click", function(){
		var threshold_value = parseFloat(noiseThreshold.value);
		var operator = ruleOperator.options[ruleOperator.selectedIndex].value;
		var color = parseInt(terrainDisplay.value.substring(1, terrainDisplay.value.length), 16);

		tg.rules.push(new TerrainRule(operator, threshold_value, color));
		// create a new entry on the rule list
		refreshRules();
		tg.generate();
	});
	
	// Refresh the current terrain rules on the DOM
	// TODO: make this better
	function refreshRules() {
		terrainRules.innerHTML = "";

		var frag = document.createDocumentFragment();
		
		for(var i = 0; i < tg.rules.length; i++) {
			var tr = document.createElement("tr");
			var td_info = document.createElement("td");
			var td_color = document.createElement("td");
			var td_remove = document.createElement("td");

			// black evalutes to #0, make it the full length.
			if(tg.rules[i].display == 0) {
				td_color.style.backgroundColor = "#000000";
			}
			else {
				td_color.style.backgroundColor = "#" + tg.rules[i].display.toString(16);
			}
			
			td_info.innerHTML =  tg.rules[i].value + " " + tg.rules[i].operator;
			td_remove.innerHTML = "<button class='remove_terrain'>-</button>";

			tr.appendChild(td_info);
			tr.appendChild(td_color);
			tr.appendChild(td_remove);
			frag.appendChild(tr);
		} 
		terrainRules.appendChild(frag);
	}
	//tg.rules = [new TerrainRule(">", -0.2, 0x0000FF), new TerrainRule(">", 0.4, 0x00FF00), new TerrainRule("<", 0.4, 0xFF0000)];
	
	tg.generate();
	
	tg.render();

})();
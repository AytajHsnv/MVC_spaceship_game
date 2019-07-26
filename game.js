	/* view */
	 const view = {
		showMessage: function(msg){
			  document.querySelector("#message").innerHTML = msg;
		},
		changeColor: function(id, situat){
			xana = document.getElementById(id);
			if(situat){ 
				cl = "full";
				document.querySelector("#message").innerHTML = "Destroyed";
			}
			else {
				cl = "empty";
				document.querySelector("#message").innerHTML = "Missed";
			}
			xana.setAttribute("class",cl);

		}
	};

	/* controller */
	const controller = {
		fireEle: function(id){
			let situat = model.checkPlace(id)[0];
			let SituatOfShips = model.checkPlace(id)[1];
			view.changeColor(id,situat);
			if(situat && SituatOfShips){
				model.sizeShip--;
				if(model.sizeShip > 0){
					view.showMessage("Destroyed whole ship and remained " + model.sizeShip);
				}
				else if(model.sizeShip == 0){
					view.showMessage("You are hero and you quited the game");}
				
					
			}
			
			
		}
	};

	/* model */
	const model = {
		n: 8,
		sizeShip: 3,
		ships: [
		{position: [11,12,13], situat: [0,0,0]},
		{position: [34,44], situat: [0,0]},
		{position: [63,64,65,66], situat: [0,0,0,0]}
		],
		checkPlace: function(id){
			for(i = 0; i < this.ships.length; i++){
				ship = this.ships[i];
				for(j = 0; j < ship.position.length; j++){
					if(id == ship.position[j]){ 
						ship.situat[j] = 1;
						return [true, model.checkSituat(ship)];
						
					}
					
				}
				
			}
			return [false, model.checkSituat(ship)];
		},
		checkSituat: function(ship){
				let count = 0;
				for(j = 0; j < ship.position.length; j++){
					if(ship.situat[j] == 1){
						count++;
					}
						
				}
				if(ship.position.length == count){
					return true;
				}
				return false;	
		},
		creatingRandomPos: function(){
			var arr = [];
				var r = Math.floor(Math.random()*88);
				if(arr.indexOf(r) === -1) arr.push(r);
			return arr[r];
		}
				
	};

	/* Initialisation */
	(function(){
		const app = {
			init: function(){
				this.main();
				this.event();
			},
			main: function(){
				let n = 8;
				let code = "";
				for(i = 1; i <= n; i++){
					code += "<tr>";
					for(j = 1; j <= n; j++){
						code += '<td id = "'+i+j+'"></td>';
					}
					code += "</tr>";
				}
				document.querySelector("#game").innerHTML = code;
				document.querySelector("#message").innerHTML = "Start";
			},
			event: function(){
				let counter = {};
				document.querySelectorAll('#game td').forEach(e => e.addEventListener("click", function() {
					if(this.className){
						document.querySelector("#message").innerHTML = "You've already destroyed this place";
					}
					else{
						controller.fireEle(this.id);
					}
					
				}));
			}
		}
		app.init();
	})();
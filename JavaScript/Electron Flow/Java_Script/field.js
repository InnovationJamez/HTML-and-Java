function Charge(x, y, dx, dy, field) {
	// current location
	this.x = x;
	this.y = y;
	// velocity
	this.dx = dy;
	this.dy = dy;
	// next location
	this.nx = 0;
	this.ny = 0;
	// edge of circle
	this.crx = 0;
	this.cry = 0;
	// stoes the field 
	this.field = field;
	// radias of circle
	this.radias = 10;

	this.nextPosition = function(){
		this.nx = this.x + this.dx;
		this.ny = this.y + this.dy;

		var rVal = (this.dx > 0) ? 1 : -1;

		this.crx = this.nx + this.radias * rVal;

		rVal = (this.dy > 0) ? 1 : -1;

		this.cry = this.ny + this.radias * rVal;
	};

	this.move = function() {
		this.x = this.nx;
		this.y = this.ny;
	};

	this.draw = function(c){
		c.beginPath();
		c.arc(this.x, this.y, this.radias, Math.PI*2, false);
		c.fillStyle = 'black';
		c.moveTo(this.x, this.y);
		c.lineTo(this.crx, this.cry);
		c.fillStyle = 'blue';
		c.fill();
		c.stroke();
	};
}


function Field() {
	// canvas stuff
	this.canvasId = document.querySelector('canvas');
	this.canvasId.width = window.innerWidth * 0.995;
	this.canvasId.height = window.innerHeight * 0.995;
	this.context = this.canvasId.getContext("2d");

	// wire field
	/*
	this.wireField = [
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
					0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 
					0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 
					0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
					0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
					0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
					0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					];
*/

	this.wireField = [
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
					0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
					0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
					];

	this.fieldWidth = 10;
	this.fieldHeight = 10;

	// tiles
	this.tileWidth = this.canvasId.width / this.fieldWidth;
	this.tileHeight = this.canvasId.height / this.fieldHeight;

	// draw field
	this.drawField = function() {
		for(var x = 0; x < this.fieldWidth; x++) {
			for(var y = 0; y < this.fieldHeight; y++){
				this.context.beginPath();
				if(this.wireField[y * this.fieldWidth + x]) {
					this.context.fillStyle = "red";
				}
				else {
					this.context.fillStyle = "green";
				}

				this.context.rect(x * this.tileWidth, y * this.tileHeight, 
					this.tileWidth, this.tileHeight);
				this.strokeStyle = "black";
				this.context.fill();
				this.context.stroke();
			}

		}		
	};

	// set a vallue from the list

	this.setValue = function() {
		this.wireField[this.yTile * this.fieldWidth + this.xTile] = 
			!this.wireField[this.yTile * this.fieldWidth + this.xTile];
	};

	// find what tile and object is on
	this.getIndex = function(objectX, objectY) {
		return [Math.floor(objectX / this.tileWidth), 
			Math.floor(objectY / this.tileHeight)];
	};

	// update the field and redraw

	this.update = function() {
		this.context.clearRect(0,0,innerWidth, innerHeight);
		this.drawField();
	};
}
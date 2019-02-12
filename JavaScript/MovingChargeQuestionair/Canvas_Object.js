function Canvas_Object(canvasId) {
	this.canvasId = document.querySelector('canvas');
	this.canvasId.width = window.innerWidth * 0.8;
	this.canvasId.height = window.innerHeight * 0.8;
	this.context = this.canvasId.getContext("2d");

	// for storing the charges
	this.chargeList = [];
	this.numCharges = 0;

	// for storing the arrows
	this.arrowList = [];
	this.numArrows = 0;

	// for creating the arrow field
	this.rowNum = Math.floor(this.canvasId.height / 25);
	this.columnNum = Math.floor(this.canvasId.width / 25);

	// for storing the field probes
	this.probeList = [];
	this.numbProbes = 0;

	// create arrows
	this.createArrows = function() {
		var arrowX, arrowY;
		for(var i = 0; i < this.columnNum * this.rowNum; i++){
		arrowX = ((i + this.columnNum) % this.columnNum) * this.canvasId.width / 
			this.columnNum + this.canvasId.width / (2 * this.columnNum);
		arrowY = Math.floor(i / this.columnNum) * this.canvasId.height / 
			this.rowNum + this.canvasId.height / (2 * this.rowNum);
		this.arrowList.push(new Field_Arrow(arrowX,arrowY));
		}		
	}

	// update arrows

	this.updateArrows = function() {
		this.numArrows = this.arrowList.length;

		for(var i = 0; i < this.numArrows; i++) {
			console.log(this.arrowList[i]);
			this.arrowList[i].update(this.chargeList);
			this.arrowList[i].draw(this.context);
		}
	}


	// create charge

	// update charges


	// create probe

	// update probe


	// update the canvas
}

var canOne = new Canvas_Object("canvasOne");
canOne.createArrows();
canOne.updateArrows();
function Canvas_Object(canvasId) {
	this.canvasId = document.querySelector('canvas');
	this.canvasId.width = window.innerWidth * 0.99;
	this.canvasId.height = window.innerHeight * 0.99;
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
		this.arrowList.push(new Field_Arrow(arrowX, arrowY, this.canvasId.height));
		}		
	}

	// add on arrow to specified location

	this.addArrow = function(x, y) {
		this.arrowList.push(new Field_Arrow(x, y, this.canvasId.height));
	}

	// update arrows

	this.updateArrows = function() {
		this.numArrows = this.arrowList.length;

		for(var i = 0; i < this.numArrows; i++) {
			this.arrowList[i].update(this.chargeList);
			this.arrowList[i].draw(this.context);
		}
	}


	// create charge

	this.addCharge = function(x, y, q) {
		this.chargeList.push(new Charge(x, y, q, this.canvasId.height));
	}

	// update charges

	this.updateCharges = function() {
		this.numcharges = this.chargeList.length;

		for(var i = 0; i < this.numcharges; i++){
			this.chargeList[i].update();
			this.chargeList[i].draw(this.context);
		}
	}


	// create probe

	// update probe


	// update the canvas

	this.updateCanvas = function() {
		this.context.clearRect(0,0,innerWidth, innerHeight);

		this.updateArrows();

		this.updateCharges();
	}
}

var canOne = new Canvas_Object("canvasOne");
canOne.createArrows();
canOne.addCharge(100, 200, -2);
canOne.addCharge(200, 400, 2);
canOne.updateCanvas();
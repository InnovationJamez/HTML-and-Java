function Canvas_Object(width, height) {
	this.canvasId = document.querySelector('canvas');
	this.canvasId.width = window.innerWidth * width;
	this.canvasId.height = window.innerHeight * height;
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

	// for buttons
	this.buttonList = [];

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

	// remove charge

	this.removeCharge = function(){
		this.chargeList.pop();
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

	this.addProbe = function(x, y) {
		this.probeList.push(new Field_Probe(x, y, this.canvasId.height));
	}

	// update probe

	this.updateProbes = function() {
		this.numbProbes = this.probeList.length;

		for(var i = 0; i < this.numbProbes; i++) {
			this.probeList[i].update(this.chargeList);
			this.probeList[i].draw(this.context);
		}

	}

	// reset canvas

	this.resetCanvas = function(){
		this.chargeList = [];
		this.probeList = [];

		var buttonListLength = this.buttonList.length;

		for(var i = 0; i < buttonListLength; i++){
			this.buttonList[i].drawn = false;
		}
	}

	this.updateCanvas = function() {
		this.context.clearRect(0,0,innerWidth, innerHeight);

		this.updateArrows();

		this.updateCharges(); 

		this.updateProbes();
	}

}


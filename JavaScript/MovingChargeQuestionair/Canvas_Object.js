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
			this.probeList[i].getData();
		}

	}

	// create button
	this.addButton = function(x1, y1, x2, y2, qType, angle){
		this.buttonList.push(new Text_Box(x1, y1, x2, y2, qType, angle));
	}

	// create buttons
	this.createButtons = function() {
		// question bar : 0
		this.addButton(this.canvasId.width * 0.05, this.canvasId.height * 0.03, 
			this.canvasId.width * 0.95, this.canvasId.height * 0.1, 0, 0);

		// submitt : 1
		this.addButton(this.canvasId.width * 0.01, this.canvasId.height * 0.95, 
			this.canvasId.width * 0.33, this.canvasId.height * 0.999, 2);

		// show field : 2
		this.addButton(this.canvasId.width * 0.33, this.canvasId.height * 0.95, 
			this.canvasId.width * 0.66, this.canvasId.height * 0.999, 3);

		// main menue : 3
		this.addButton(this.canvasId.width * 0.66, this.canvasId.height * 0.95, 
			this.canvasId.width * 0.99, this.canvasId.height * 0.999, 4);

		// answer questions : 4
		this.addButton(this.canvasId.width * 0.20, this.canvasId.height * 0.40, 
			this.canvasId.width * 0.80, this.canvasId.height * 0.50, 5);

		// freeplay : 5
		this.addButton(this.canvasId.width * 0.20, this.canvasId.height * 0.60, 
			this.canvasId.width * 0.80, this.canvasId.height * 0.70, 6);

		// add charge : 6
		this.addButton(this.canvasId.width * 0.01, this.canvasId.height * 0.95, 
			this.canvasId.width * 0.33, this.canvasId.height * 0.999, 7);

		// remove charge : 7
		this.addButton(this.canvasId.width * 0.33, this.canvasId.height * 0.95, 
			this.canvasId.width * 0.66, this.canvasId.height * 0.999, 8);
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

	// update the canvas

	this.drawQuestionBox = function(value) {
		switch(value){
			case 0: // main menue
				this.buttonList[4].draw(this.context);
				this.buttonList[5].draw(this.context);
				break;
			case 1: // free play
				this.buttonList[6].draw(this.context);
				this.buttonList[7].draw(this.context);
				this.buttonList[3].draw(this.context);
				break;
			case 2: // question mode
				this.buttonList[0].draw(this.context);
				this.buttonList[1].draw(this.context);
				this.buttonList[2].draw(this.context);
				this.buttonList[3].draw(this.context);
				break;
		}
	}

	this.updateCanvas = function() {
		this.context.clearRect(0,0,innerWidth, innerHeight);

		this.updateArrows();

		this.updateCharges(); 

		this.updateProbes();
	}
}

/*
var canOne = new Canvas_Object("canvasOne");
canOne.createArrows();
canOne.addCharge(100, 200, 2);
canOne.addCharge(100, 400, 2);
canOne.addProbe(100, 300);
canOne.updateCanvas();
canOne.createButtons();
canOne.drawQuestionBox(1);
*/
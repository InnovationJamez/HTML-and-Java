function Canvas_Object(canvasId) {
	this.canvasId = document.querySelector('canvas');
	this.canvasId.width = window.innerWidth * 0.8;
	this.canvasId.height = window.innerHeight * 0.8;
	this.context = this.canvasId.getContext("2d");

	this.chargeList = [];
	this.numCharges = 0;

	this.arrowList = [];
	this.numArrows = 0;

	this.probeList = [];
	this.numbProbes = 0;

	// create arrows

	// update arrows


	// create charge

	// update charges


	// create probe

	// update probe


	// update the canvas
}

var canOne = new Canvas_Object("canvasOne");
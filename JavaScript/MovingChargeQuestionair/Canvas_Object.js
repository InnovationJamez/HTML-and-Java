function Canvas_Object(canvasId) {
	this.canvasId = canvasId;
	this.canvasId.width = window.innerWidth;
	this.canvasId.height = window.innerHeight;
	this.context = this.canvasId.getContext('2d');

	console.log("hi");

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
console.log("hi");
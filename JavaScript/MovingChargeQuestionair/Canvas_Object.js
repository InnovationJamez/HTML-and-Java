function Canvas_Object(canvasId) {
	this.canvasId = canvasId;
	this.context = canvasId.getContext('2d');

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

	// instintiate the canvas
	this.onStart = function() {
		canvasId.width = window.innerWidth;
		canvasId.height = window.innerHeight;
	}


	// update the canvas
}

var canvasOne = new Canvas_Object("canvasOne");
canvasOne.onstart();
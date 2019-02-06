// the charges and field arrows are stored in these variables
var chargeList = [];
var numCharges = 0;
var arrowList = [];
var numArrows = 0;

// object to store the location of clicks
var mouse = {
	mouseX:0,
	mouseY:0
};

// the outline of the field arrow objects
function Field_Arrow(x, y) {
	this.x = x;
	this.y = y;
	this.angle = 0;
	this.xField = [];
	this.yField = [];
	this.magnitudeField = 0;
	this.k = 9 * 10 ** 9;

	this.draw = function() {

	}

	this.update = function() {

		/*
		for each charge find the distance between the arrow and the charge
		{
		find the angle from the 0 axis 
		find the field strngth of the charge at that point
		find the x and y components of the field
		add them to the lists above	
		}
		take the sum of the x and y components 
		find the magnitude of the e field
		find the firection in drgrees
		*/
		var tempAngle;
		var xDis; // x displacement
		var yDis; // y displacement
		var hDis; // hypotenuse 
		var i;
		var fieldMag = 0;
		var tempAngle = 0;
		numCharges = chargeList.length;
		for(i = 0; i < numCharges; i++) {
			xDis = Math.abs(this.x - chargeList[i].x);
			yDis = Math.abs(this.y - chargeList[i].y);
			hDis = Math.sqrt(xDis ** 2 + yDis ** 2);

			console.log("yDis: " + yDis);
			console.log("xDis: " + xDis);
			console.log("hDis: " + hDis);

			// charge x greater than arrow x
			if(chargeList[i].x > this.x){
				tempAnlge = 360 - (Math.atan(yDis / xDis) * 180 / Math.PI);
			}
			// charge x less than arrow x
			else{
				tempAnlge = 180 - (Math.atan(yDis / xDis) * 180 / Math.PI);
			}
			console.log("temp angle: " + tempAngle);			

			// find the magnitude of the field
			fieldMag = (this.k * chargeList[i].q) / (hDis ** 2);
			console.log("field magnitude: " + fieldMag);
		}

	}
}

// create the field arrows and fill the list

function createArrows() {

}

// outline of the charge objects
function Charge(x, y, q) {
	this.x = x;
	this.y = y;
	this.q = q;

	this.draw = function() {

	}

	this.update = function() {

		
	}
}

// will add one charge to the list of charges
function addCharge() {
	var xLoc = document.getElementById("xPos").value;
	var yLoc = document.getElementById("yPos").value;
	var charge = document.getElementById("charge").value;
	if(xLoc == "" || yLoc == "" || charge == ""){
		console.log("missing credentials");
	}
	else{
		xLoc = parseFloat(xLoc);
		yLoc = parseFloat(yLoc);
		charge = parseFloat(charge);
		chargeList.push(new Charge(xLoc,yLoc,charge));
		console.log(chargeList);		
	}

}

// will remove one charge from the list of charges
function removeCharge(){
	chargeList.pop;
}

// for debugging purposes add individual field arrows
function addArrow(){
	var xLoc = document.getElementById("xPos").value;
	var yLoc = document.getElementById("yPos").value;
	if(xLoc == "" || yLoc== "" || charge == ""){
		console.log("missing credentials");
	}
	else{
		xLoc = parseFloat(xLoc);
		yLoc = parseFloat(yLoc);
		arrowList.push(new Field_Arrow(xLoc, yLoc));
		console.log(arrowList);
	}

}

// draws all elements on the field
// resets the field
// calls the update function on all obejcts
function update() {
	numCharges = chargeList.length;
	numArrows = arrowList.length;

	for(var i = 0; i < numArrows; i++){
		arrowList[i].update();
	}
}
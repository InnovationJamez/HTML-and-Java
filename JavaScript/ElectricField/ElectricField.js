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
	this.k = 9 * 10e9;

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
		var fieldMag;
		numCharges = chargeList.length;
		for(i = 0; i < numCharges; i++) {
			xDis = Math.abs(this.x - chargeList[i].x);
			yDis = Math.abs(this.y - chargeList[i].y);
			hDis = Math.sqrt(xDis ** 2 + yDis ** 2);
			// x greater and y greater
			if(this.x > chargeList[i].x && this.y > chargeList[i].y){
				tempAngle = 270 - Math.asin(xDis/hDis);
			}
			// x greater and y lessthan
			else if(this.x > chargeList[i].x && this.y < chargeList[i].y) {
				tempAngle = 180 - Math.sin(yDis/hDis);
			}
			// x less than and y greater
			else if(this.x < chargeList[i].x && this.y > chargeList[i].y) {
				tempAngle = 360 - Math.asin(xDis/hDis);
			}
			// x less than and y less than
			else {
				tempAngle = Math.asin(yDis/hDis);
			}

			// find the magnitude of the field
			fieldMag = this.k * this.q / (hDis ** 2);
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
	if(xLoc == "" || yLoc=="" || charge == ""){
		console.log("missing credentials");
	}
	else{
		chargeList.push(new Charge(xLoc,yLoc,charge));
		console.log(chargeList);		
	}

}

// will remove one charge from the list of charges
function removeCharge(){
	chargeList.pop;
}

// draws all elements on the field
// resets the field
// calls the update function on all obejcts
function update() {

}
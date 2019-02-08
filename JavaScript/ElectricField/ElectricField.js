// the charges and field arrows are stored in these variables
var chargeList = [];
var numCharges = 0;
var arrowList = [];
var numArrows = 0;

// canves elements
var canvasOne = document.querySelector('canvas');
canvasOne.width = window.innerWidth;
canvasOne.height = window.innerHeight;

var c = canvasOne.getContext("2d");

// click event

window.addEventListener('click',function(event){
	mouse.x = event.x;
	mouse.y = event.y;

	numCharges = chargeList.length;

	for(var i = 0; i < numCharges; i++){
		chargeList[i].select();
	}

});

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	update();
});

// object to store the location of clicks
var mouse = {
	x:0,
	x:0
};

// function for getting sum of array

function getSum(numList) {
	var sum = 0;
	length = numList.length;
	for(var i = 0; i < length; i++){
		sum += numList[i];
	}
	return sum;
}

// the outline of the field arrow objects
function Field_Arrow(x, y) {
	this.x = x;
	this.y = canvasOne.height - y;
	this.angle = 0;
	this.xField = [];
	this.xFieldSum = 0;
	this.yField = [];
	this.yFieldSum = 0;
	this.magnitudeField = 0;
	this.k = 9 * 10 ** 9;
	this.len = 10;


	this.draw = function() {
		c.beginPath();
		c.moveTo(-Math.cos(this.angle * Math.PI / 180) * this.len + this.x, 
			Math.sin(this.angle * Math.PI / 180) * this.len + this.y);
		c.lineTo(-Math.cos(this.angle * Math.PI / 180) * -this.len + this.x, 
			Math.sin(this.angle * Math.PI / 180) * -this.len + this.y);
		// Arrow Head
		c.lineTo(-Math.cos((this.angle - 40) * Math.PI / 180) * -this.len  * 0.25 + this.x, 
			Math.sin((this.angle - 40) * Math.PI / 180) * -this.len * 0.25 + this.y);
		c.lineTo(-Math.cos((this.angle + 40) * Math.PI / 180) * -this.len * 0.25 + this.x, 
			Math.sin((this.angle + 40) * Math.PI / 180) * -this.len * 0.25 + this.y);
		c.lineTo(-Math.cos(this.angle * Math.PI / 180) * -this.len + this.x, 
			Math.sin(this.angle * Math.PI / 180) * -this.len + this.y);
		c.strokeStyle = 'black';
		c.fillStyle = 'black';
		c.fill();
		c.stroke();
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
		this.xField = [];
		this.xFieldSum = 0;
		this.yField = [];
		this.yFieldSum = 0;
		var tempAngle;
		var xDis = 0; // x displacement
		var yDis = 0; // y displacement
		var hDis = 0; // hypotenuse 
		var i = 0;
		var fieldMag = 0;
		var tempAngle = 0;
		numCharges = chargeList.length;
		var xComp = 0;
		var yComp = 0;

		// for each charge find the field 

		for(i = 0; i < numCharges; i++) {
			xDis = this.x - chargeList[i].x;
			yDis = this.y - chargeList[i].y;
			hDis = Math.sqrt(xDis ** 2 + yDis ** 2);

			// find the angle from arrow to charge

			if(chargeList[i].x > this.x){
				tempAngle = 180 - (Math.atan(yDis / xDis) * 180 / Math.PI);
			}
			else{
				tempAngle = 360 - (Math.atan(yDis / xDis) * 180 / Math.PI);
			}
			

			// find the magnitude of the field
			fieldMag = (this.k * chargeList[i].q) / (hDis ** 2);

			// get the a and y components of the field vector

			if(tempAngle <= 90) {
				xComp = Math.cos(tempAngle * Math.PI / 180) * fieldMag;
				yComp = Math.sin(tempAngle * Math.PI / 180) * fieldMag;
			}
			else if(tempAngle > 90 || tempAngle <= 180) {
				xComp = -Math.cos((180 - tempAngle) * Math.PI / 180) * fieldMag;
				yComp = Math.sin((180 - tempAngle) * Math.PI / 180) * fieldMag;
			}
			else if(tempAngle > 180 || tempAngle <= 270) {
				xComp = Math.sin((270 - tempAngle) * Math.PI / 180) * fieldMag;
				yComp = Math.cos((270 - tempAngle) * Math.PI / 180) * fieldMag;
			}
			else {
				xComp = Math.sin((360 - tempAngle) * Math.PI / 180) * fieldMag;
				yComp = Math.cos((360 - tempAngle) * Math.PI / 180) * fieldMag;
			}

			// push the vallues

			console.log(xComp);
			console.log(yComp);

			this.xField.push(xComp);
			this.yField.push(yComp);
		}

		if(this.xField.length > 0 && this.yField.length > 0) {

			this.xFieldSum = getSum(this.xField);
			this.yFieldSum = getSum(this.yField);

			if(this.xFieldSum >= 0 ){
				this.angle = Math.atan(this.yFieldSum/this.xFieldSum) * 180 / Math.PI;
			}
			else{
				this.angle = 180 + Math.atan(this.yFieldSum/this.xFieldSum) * 180 / Math.PI;
			}

			this.len = Math.sqrt(this.xFieldSum ** 2 + this.yFieldSum ** 2) / 200000 + 5;
			this.len = (this.len > 20) ? 20 : this.len;

		}
		else{

			this.angle = 0;
			this.len = 5;
		}




		this.draw();

	}
}

// creating field arrows
var rows = Math.floor(window.innerHeight / 25);
var columns= Math.floor(window.innerWidth / 25);
var arrowX, arrowY;

// create the field arrows and fill the list
// create a grid of arrows

function createArrows() {
	for(var i = 0; i < columns * rows; i++){
	arrowX = ((i + columns) % columns) * window.innerWidth / 
		columns + window.innerWidth / (2 * columns);
	arrowY = Math.floor(i/columns) * window.innerHeight / 
		rows + window.innerWidth / (2 * rows);
	arrowList.push(new Field_Arrow(arrowX,arrowY));
	}
}

// outline of the charge objects
function Charge(x, y, q) {
	this.x = x;
	this.y = canvasOne.height - y;
	this.q = q;
	this.selected = false;

	this.select = function() {
		if(Math.abs(mouse.x - this.x) < 30 && Math.abs(mouse.y - this.y < 30)){
			this.selected = !this.selected;
		}
	}

	this.draw = function() {
		c.beginPath();
		c.arc(this.x,this.y,10,Math.PI*2,false);
		c.strokeStyle = 'rgb(' + this.x + ',' + 0 + ',' + this.y + ', 1)';
		c.fillStyle = (q > 0) ? 'blue' : 'red';
		c.fill();
		c.strokeStyle = (q > 0) ? 'blue' : 'red';
		c.stroke();
	}

	this.update = function() {
		if(this.selected == true){
			this.x = mouse.x;
			this.y = mouse.y;
		}

		this.draw();
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
	}

	update();

}

// will remove one charge from the list of charges
function removeCharge(){
	chargeList.pop();

	update();
}

// for debugging purposes add individual field arrows
function addArrow(){
	var xLoc = document.getElementById("xPos").value;
	var yLoc = document.getElementById("yPos").value;
	if(xLoc == "" || yLoc== ""){
		console.log("missing credentials");
	}
	else{
		xLoc = parseFloat(xLoc);
		yLoc = parseFloat(yLoc);
		arrowList.push(new Field_Arrow(xLoc, yLoc));
	}

	update();

}

// draws all elements on the field
// resets the field
// calls the update function on all obejcts
function update() {
	c.clearRect(0,0,innerWidth, innerHeight);
	numCharges = chargeList.length;
	numArrows = arrowList.length;

	for(var i = 0; i < numArrows; i++){
		arrowList[i].update();
	}

	for(var i = 0; i < numCharges; i++){
		chargeList[i].update();
	}
}


createArrows();
update();


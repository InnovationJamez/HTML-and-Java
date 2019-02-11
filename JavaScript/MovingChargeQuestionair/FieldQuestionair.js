// field arrow consctuctor
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

	this.draw = function(c) {
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
	} // draw

	this.update = function() {
		numCharges = chargeList.length;

		// for each charge find the field 

		for(i = 0; i < numCharges; i++) {
			this.getFieldComponents();
		} // for

		this.getComponentSum();

		this.draw();

	} // update

} // Field Arrow

Field_Arrow.prototype.getFieldComponents = function() {
	var xComp = 0;
	var yComp = 0; 
	var fieldMag = 0;

	// find the angle from arrow to charge

	if(chargeList[i].x > this.x){
		this.angle = 180 - (Math.atan(this.y - chargeList[i].y / 
			this.x - chargeList[i].x) * 180 / Math.PI);
	} // if
	else{
		this.angle = 360 - (Math.atan(this.y - chargeList[i].y / 
			this.x - chargeList[i].x) * 180 / Math.PI);
	} // else
	

	// find the magnitude of the field
	fieldMag = (this.k * chargeList[i].q) / (xDis ** 2 + yDis ** 2);

	// get the a and y components of the field vector

	if(tempAngle <= 90) {
		xComp = Math.cos(this.angle * Math.PI / 180) * fieldMag;
		yComp = Math.sin(this.angle * Math.PI / 180) * fieldMag;
	}
	else if(this.angle > 90 || this.angle <= 180) {
		xComp = -Math.cos((180 - tempAngle) * Math.PI / 180) * fieldMag;
		yComp = Math.sin((180 - tempAngle) * Math.PI / 180) * fieldMag;
	}
	else if(this.angle > 180 || this.angle <= 270) {
		xComp = Math.sin((270 - this.angle) * Math.PI / 180) * fieldMag;
		yComp = Math.cos((270 - this.angle) * Math.PI / 180) * fieldMag;
	}
	else {
		xComp = Math.sin((360 - this.angle) * Math.PI / 180) * fieldMag;
		yComp = Math.cos((360 - this.angle) * Math.PI / 180) * fieldMag;
	}

	// push the vallues

	this.xField.push(xComp);
	this.yField.push(yComp);
}

Field_Arrow.prototype.getComponentSum = function() {
	if(this.xField.length > 0 && this.yField.length > 0) {

		this.xFieldSum = getSum(this.xField);
		this.yFieldSum = getSum(this.yField);

		if(this.xFieldSum >= 0 ){
			this.angle = Math.atan(this.yFieldSum/this.xFieldSum) * 180 / Math.PI;
		}
		else{
			this.angle = 180 + Math.atan(this.yFieldSum/this.xFieldSum) * 180 / Math.PI;
		}

		this.len = Math.sqrt(this.xFieldSum ** 2 + this.yFieldSum ** 2) / 300000 + 5;
		this.len = (this.len > 20) ? 20 : this.len;
	}
	else{

		this.angle = 0;
		this.len = 5;
	}
}

// Field_Probe
function Field_Probe() {

	this.draw = function(){

	}

	this.update = function(){

	}

}

// charge

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

	this.update = function() {
		this.draw();
	}

	this.draw = function(c) {
		c.beginPath();
		c.arc(this.x,this.y,10,Math.PI*2,false);
		c.strokeStyle = 'rgb(' + this.x + ',' + 0 + ',' + this.y + ', 1)';
		c.fillStyle = (q > 0) ? 'blue' : 'red';
		c.fill();
		c.strokeStyle = (q > 0) ? 'blue' : 'red';
		c.stroke();
	}	
}

//button

function Button(x1, y1, x2, y2, fillColor, lineColor){
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.fillColor = fillColor;
	this.lineColor = lineColor;

	this.draw = function(c){
		c.beginPath();
		c.moveTo(this.x1, this.y1);
		c.lineTo(this.x2, this.y1);
		c.lineTo(this.x2, this.y2);
		c.lineTo(this.x1, this.y2);
		c.lineTo(this.x1, this.y1);
		c.fillStyle = this.fillColor;
		c.fill();
		c.strokeStyle = this.lineColor;
		c.stroke();
	}

}


// canvas and question object consctuctor

function Question(canvasId){
	this.canvasId = canvasId;
	this.canvas = document.getElementById(canvasId);
	this.context = this.canvas.getContext("2d");
	this.buttonList = [];
	this.chargeList = [];
	this.arrowList = [];

	this.onCreate = function(){
		this.canvas.width = window.innerWidth * 0.993;
		this.canvas.height = window.innerHeight * 0.993;

		this.buttonList.push(new Button(0, this.canvas.height * 0.9, this.canvas.width / 3, 
			this.canvas.height, 'blue', 'red'));

		this.buttonList.push(new Button(this.canvas.width / 3, this.canvas.height * 0.9, 
			this.canvas.width / 3 * 2, this.canvas.height, 'green', 'red'));

		this.buttonList.push(new Button(this.canvas.width / 3 * 2, this.canvas.height * 0.9, 
			this.canvas.width, this.canvas.height, 'blue', 'red'));

		this.buttonList[0].draw(this.context);
		this.buttonList[1].draw(this.context);
		this.buttonList[2].draw(this.context);

	}


}

var quest = new Question('canvasOne');
quest.onCreate();
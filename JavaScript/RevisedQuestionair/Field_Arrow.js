var mouse = {
	x : 0,
	y : 0
}

// function for getting sum of array

function getSum(numList) {
	var sum = 0;
	length = numList.length;
	for(var i = 0; i < length; i++){
		sum += numList[i];
	}
	return sum;
}


function Charge(x, y, q, height) {
	this.x = x;
	this.y = height - y;
	this.q = q;

	this.update = function() {
	};

	this.draw = function(c){
		c.beginPath();
		c.arc(this.x, this.y, 10, Math.PI*2, false);
		c.strokeStyle = 'rgb(' + this.x + ',' + 0 + ',' + this.y + ', 1)';
		c.fillStyle = (q > 0) ? 'blue' : 'red';
		c.fill();
		c.strokeStyle = (q > 0) ? 'blue' : 'red';
		c.stroke();

		c.beginPath();
		c.moveTo(this.x - 8, this.y);
		c.lineTo(this.x + 8, this.y);
		if(this.q > 0){
			c.moveTo(this.x, this.y - 8);
			c.lineTo(this.x, this.y + 8);	
		}
		c.strokeStyle = "black";
		c.stroke();
	};

	this.followMouse = function(){
		if(this.selected){
			this.x = mouse.x;
			this.y = mouse.y;		
		}

	};

	this.checkMouse = function(){
		if(Math.abs(this.x - mouse.x) < 20 && 
			Math.abs(this.y - mouse.y) < 20){
			this.selected = true;
		}
	};

}

function Field_Arrow(x, y, height, angle = 0) {
	this.x = x;
	this.y = height - y;

	this.angle = angle;
	this.xField = [];
	this.xFieldSum = 0;
	this.yField = [];
	this.yFieldSum = 0;
	this.magnitudeField = 0;
	this.k = 9 * 10 ** 9;
	this.len = 10;
	this.xComp = 0;
	this.yComp = 0;

	this.draw = function(c){
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
	};
}

Field_Arrow.prototype.getComponents = function(chargeList, i) {
	this.magnitudeField = 0;
	this.xComp = 0;
	this.yComp = 0;

	// find the angle from arrow to charge

	if(chargeList[i].x > this.x){
		this.angle = 180 - (Math.atan((this.y - chargeList[i].y) / (this.x - chargeList[i].x)) * 180 / Math.PI);
	}
	else{
		this.angle = 360 - (Math.atan((this.y - chargeList[i].y) / (this.x - chargeList[i].x)) * 180 / Math.PI);
	}

	this.angle = this.angle % 360;
	

	// find the magnitude of the field
	this.fieldMag = (this.k * chargeList[i].q) / (Math.sqrt((this.x - chargeList[i].x) ** 2 + (this.y - chargeList[i].y) ** 2) ** 2);

	// get the a and y components of the field vector

	if(this.angle <= 90) {
		this.xComp = Math.cos(this.angle * Math.PI / 180) * this.fieldMag;
		this.yComp = Math.sin(this.angle * Math.PI / 180) * this.fieldMag;
	}
	else if(this.angle > 90 || this.angle <= 180) {
		this.xComp = -Math.cos((180 - this.angle) * Math.PI / 180) * this.fieldMag;
		this.yComp = Math.sin((180 - this.angle) * Math.PI / 180) * this.fieldMag;
	}
	else if(this.angle > 180 || this.angle <= 270) {
		this.xComp = Math.sin((270 - this.angle) * Math.PI / 180) * this.fieldMag;
		this.yComp = Math.cos((270 - this.angle) * Math.PI / 180) * this.fieldMag;
	}
	else {
		this.xComp = Math.sin((360 - this.angle) * Math.PI / 180) * this.fieldMag;
		this.yComp = Math.cos((360 - this.angle) * Math.PI / 180) * this.fieldMag;
	}

	// push the vallues

	this.xField.push(this.xComp);
	this.yField.push(this.yComp);
};

// field arrow object

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

		this.angle = (this.angle > 0) ? this.angle : this.angle + 360;

		this.magnitudeField = Math.sqrt(this.xFieldSum ** 2 + this.yFieldSum ** 2)
		this.len = this.magnitudeField / 300000 + 5;
		this.len = (this.len > 20) ? 20 : this.len;

	}
	else{

		this.angle = 0;
		this.len = 5;
	}
};

Field_Arrow.prototype.update = function(chargeList) {

	var numCharges = chargeList.length;

	this.xField = [];
	this.yField = [];

	for(var i = 0; i < numCharges; i++){
		this.getComponents(chargeList, i);
	}

	this.getComponentSum();
}

function Field_Probe(x, y, height) {
	this.x = x;
	this.y = height - y;

	this.angle = 0;
	this.xField = [];
	this.xFieldSum = 0;
	this.yField = [];
	this.yFieldSum = 0;
	this.magnitudeField = 0;
	this.k = 9 * 10 ** 9;
	this.len = 10;
	this.xComp = 0;
	this.yComp = 0;
	this.selected = false;

	this.draw = function(c){
		c.beginPath();
		c.arc(this.x,this.y,10,Math.PI*2,false);
		c.strokeStyle = 'black';
		c.fillStyle = 'green';
		c.fill();
		c.strokeStyle = 'green';
		c.stroke();

		c.beginPath();
		c.moveTo(this.x - 5, this.y - 5);
		c.lineTo(this.x + 5, this.y + 5);
		c.moveTo(this.x - 5, this.y + 5);
		c.lineTo(this.x + 5, this.y - 5);
		c.strokeStyle = 'black';
		c.stroke();
	};

	this.followMouse = function(){
		if(this.selected){
			this.x = mouse.x;
			this.y = mouse.y;			
		}
	};

	this.checkMouse = function(){

		if(Math.abs(this.x - mouse.x) < 20 && 
			Math.abs(this.y - mouse.y) < 20){
			this.selected = true;		
		}
	};

	this.getData = function() {
		console.log("field: " + this.magnitudeField + " \nangle: " + this.angle);
	};

}

Field_Probe.prototype = new Field_Arrow(); 


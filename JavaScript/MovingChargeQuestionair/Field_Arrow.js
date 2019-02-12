var mouse = {
	x : 0,
	y : 0
}


function Charge(x, y, q) {
	this.x = x;
	this.y = y;
	this.q = q;

	this.draw = function(c){
		c.beginPath();
		c.arc(this.x,this.y,10,Math.PI*2,false);
		c.strokeStyle = 'rgb(' + this.x + ',' + 0 + ',' + this.y + ', 1)';
		c.fillStyle = (q > 0) ? 'blue' : 'red';
		c.fill();
		c.strokeStyle = (q > 0) ? 'blue' : 'red';
		c.stroke();

		c.beginPath
		c.MoveTo(this.x - 8, this.y);
		c.lineTo(this.x + 8, this.y);
		if(this.q > 0){
			c.moveTo(this.x, this.y - 8);
			c.lineTo(this.x, this.y + 8);	
		}
		c.strokeStyle = "black";
		c.stroke;
	}
}

function Field_Arrow(x, y) {
	this.x = x;
	this.y = y;

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
	}
}

Field_Arrow.prototype = {
	angle : 0,
	xField : [],
	xFieldSum : 0,
	yField : [],
	yFieldSum : 0,
	magnitudeField : 0,
	k:9 * 10 ** 9,
	len:10
};

Field_Probe.prototype.update = function(chargeList) {

	var chargeListLength = chargeList.length;

	for(var i = 0; i < chargeListLength; i++){
		this.getComponents();
	}

}

Field_Probe.prototype.getComponents = function(chargeList) {
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

	this.xField.push(xComp);
	this.yField.push(yComp);
}

Field_Probe.prototype.getComponentSum = function() {
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

function Field_Probe(x, y) {
	this.x = x;
	this.y = y;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,10,Math.PI*2,false);
		c.strokeStyle = 'rgb(' + this.x + ',' + 0 + ',' + this.y + ', 1)';
		c.fillStyle = (q > 0) ? 'blue' : 'red';
		c.fill();
		c.strokeStyle = (q > 0) ? 'blue' : 'red';
		c.stroke();
	}

}

Field_Probe.prototype = new Field_Arrow();


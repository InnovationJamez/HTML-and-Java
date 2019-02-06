var canvasOne = document.querySelector('canvas');
var c = canvasOne.getContext("2d");
var columns = 10;
var rows = 10;
var width = canvasOne.width / columns;
var height = canvasOne.height / rows;
var arrowArray = [];
var arryLength = arrowArray.length;

function charge(x,y,dx,dy) {
	// position and speed
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.mass = 1;
	this.charge = 1;
	this.posetive = true;
	// force on partacle by magnetic field
	this.fx = 0;
	this.fy = 0;

	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,10,Math.PI*2,false);
		c.strokeStyle = 'rgb(' + this.x + ',' + 0 + ',' + this.y + ', 1)';
		c.fillStyle = (this.posetive)? 'black' : 'red';
		c.fill();
		c.stroke();
	}

	this.update = function(){

	}
}

function fieldArrows(x, y, strength){
	this.x = x;
	this.y = y;
	this.strength = strength;
	this.magnitude = Math.abs(strength);

	this.draw = function(){

		if(this.strength > 0){
			c.beginPath();
			c.arc(this.x,this.y,5,Math.PI*2,false);
			c.strokeStyle = 'rgb(' + this.x + ',' + 0 + ',' + this.y + ', 1)';
			c.fillstyle = 'black';
			c.fill();
			c.stroke();
		}
		else{
			c.beginPath();
			c.moveTo(this.x + this.magnitude, this.y + this.magnitude);
			c.lineTo(this.x - this.magnitude, this.y - this.magnitude);
			c.lineTo(this.x, this.y);
			c.lineTo(this.x - this.magnitude, this.y + this.magnitude);
			c.lineTo(this.x + this.magnitude, this.y - this.magnitude);
			c.stroke();
		}

	}
}

function createArrows(){
	for(var i = 0; i < columns * rows; i++){
		x = ((i + columns) % columns) * width + width / 2;
		y = Math.floor(i/columns) * height + height / 2;
		arrowArray.push(new fieldArrows(x, y, -5));
	}

	arryLength = arrowArray.length;
}

function drawField(){
	for(var i = 0; i < arryLength; i++){
		arrowArray[i].draw();
	}
}

createArrows();
drawField();


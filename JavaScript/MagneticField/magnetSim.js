var canvasOne = document.querySelector('canvas');
canvasOne.width = window.innerWidth;
canvasOne.height = window.innerHeight;

var c = canvasOne.getContext("2d");

var mouse = {
	x:undefined,
	y:undefined
}

window.addEventListener('click',function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	pos.selected();
	neg.selected();
});

window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
	updateField();
	pos.update();
	neg.update();
});

function Field_Arrow(x, y){
	this.x = x;
	this.y = y;
	this.rotation = 90;
	this.len = 10;
	this.xDis = 0;
	this.yDis = 0;
	this.angle1 = 0;
	this.angle2 = 0;
	this.posDis = 0;
	this.negDis = 0;

	this.arrowDirections = function(){
		// negative charge
		this.xDis = neg.x - this.x;
		this.yDis = neg.y - this.y;
		this.negDis = Math.sqrt(this.xDis ** 2 + this.yDis ** 2);

		if(neg.x > this.x){
			this.angle1 = 360 - (Math.atan(this.yDis / this.xDis) * 180 / Math.PI);
		}
		else{
			this.angle1 = 180 - (Math.atan(this.yDis / this.xDis) * 180 / Math.PI);
		}

		// posetive charge
		this.xDis = pos.x - this.x;
		this.yDis = pos.y - this.y;
		this.posDis = Math.sqrt(this.xDis ** 2 + this.yDis ** 2);

		if(pos.x < this.x){
			this.angle2 = 360 - (Math.atan(this.yDis / this.xDis) * 180 / Math.PI);
		}
		else{
			this.angle2 = 180 - (Math.atan(this.yDis / this.xDis) * 180 / Math.PI);
		}
	}

	this.update = function(){
		
		this.arrowDirections();

		this.rotation = this.angle1 + this.angle2;
		this.draw();  

	}

	this.draw = function(){
		c.beginPath();
		c.moveTo(-Math.cos(this.rotation * Math.PI / 180) * this.len + this.x, 
			Math.sin(this.rotation * Math.PI / 180) * this.len + this.y);
		c.lineTo(-Math.cos(this.rotation * Math.PI / 180) * -this.len + this.x, 
			Math.sin(this.rotation * Math.PI / 180) * -this.len + this.y);
		// Arrow Head
		c.lineTo(-Math.cos((this.rotation - 20) * Math.PI / 180) * -this.len * 0.25 + this.x, 
			Math.sin((this.rotation - 20) * Math.PI / 180) * -this.len * 0.25 + this.y);
		c.lineTo(-Math.cos((this.rotation + 20) * Math.PI / 180) * -this.len * 0.25 + this.x, 
			Math.sin((this.rotation + 20) * Math.PI / 180) * -this.len * 0.25 + this.y);
		c.lineTo(-Math.cos(this.rotation * Math.PI / 180) * -this.len + this.x, 
			Math.sin(this.rotation * Math.PI / 180) * -this.len + this.y);
		c.strokeStyle = 'black';
		c.fill();
		c.stroke();
	}
}

function Charge(x, y, posetive){
	this.x = x;
	this.y = y;
	this.posetive = posetive; // true : posetive, false : negative
	this.select = false;

	this.selected = function() {
		var dist = Math.sqrt((this.x - mouse.x) ** 2 + (this.y - mouse.y) ** 2);
		console.log(dist);
		if(dist < 50){
			this.select = !this.select;
		}
	}

	this.update = function(){
		if(this.select === true){
			this.x = mouse.x;
			this.y = mouse.y;
		}
		this.draw();

	}

	this.draw = function(){
		c.beginPath();
		c.arc(this.x,this.y,10,Math.PI*2,false);
		c.strokeStyle = 'rgb(' + this.x + ',' + 0 + ',' + this.y + ', 1)';
		c.fillStyle = (this.posetive)? 'black' : 'red';
		c.fill();
		c.stroke();
	}
}

var arrowArray = [];
var rows = Math.floor(window.innerHeight / 25);
var columns= Math.floor(window.innerWidth / 25);
var x, y;

function drawField(){
	c.clearRect(0,0,innerWidth, innerHeight);

	var arryLength = arrowArray.length;

	for(var i = 0; i < arryLength; i++){
		arrowArray[i].draw();
	}

}

function updateField(){
	c.clearRect(0,0,innerWidth, innerHeight);

	var arryLength = arrowArray.length;

	for(var i = 0; i < arryLength; i++){
		arrowArray[i].update();
	}
}

for(var i = 0; i < columns * rows; i++){
	x = ((i + columns) % columns) * window.innerWidth / 
		columns + window.innerWidth / (2 * columns);
	y = Math.floor(i/columns) * window.innerHeight / 
		rows + window.innerWidth / (2 * rows);
	arrowArray.push(new Field_Arrow(x,y));
}

drawField();

var pos = new Charge(100,100,true);
var neg = new Charge(500,500,false);
var chargeList = [pos, neg];
var length = chargeList.length;
neg.draw();
pos.draw();

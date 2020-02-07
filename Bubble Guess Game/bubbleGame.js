var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");

function bubble(color, radias){
	this.x = Math.Random() * 10;
	this.y = Math.Random() * 10;
	this.radias = radias;
	this.color = color;

	this.drawSelf = function(){
		c.arc(75, 75, 50, 0, Math.PI * 2, true);
		c.fillStyle = color;
		c.fill();
		c.stroke();
	}

	this.move = function(){
		
	}

}
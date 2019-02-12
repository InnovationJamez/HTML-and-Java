questionText = [
	"Find the point where the electric field is ",
	"Find the point where the angle of the electric field is "
];

function Text_Box(x1, y1, x2, y2, questionNumber, targetAngle) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.questionNumber = questionNumber;
	this.targetAngle = targetAngle;
	this.xPos = x2 - (x2 - x1) / 2;
	this.yPos = y2 - (y2 - y1) / 2;

	this.checkClick = function(){
		if(mouse.x > this.x1 && mouse.x < this.x2 && 
			mouse.y > this.x2 && mouse.y < this.y2){
			return true;
		}
		else{
			return false;
		}
	}

	this.draw = function(c){
		c.beginPath();
		c.moveTo(this.x1, this.y1);
		c.lineTo(this.x2, this.y1);
		c.lineTo(this.x2, this.y2);
		c.lineTo(this.x1, this.y2);
		c.lineTo(this.x1, this.y1);
		c.stroke();
		c.fillStyle = 'white';
		c.fill();

		c.font = '20px Arial';
		c.textAlign = "center";
		c.strokeText(questionText[this.questionNumber] + 
			this.targetAngle, this.xPos, this.yPos);
	}

}
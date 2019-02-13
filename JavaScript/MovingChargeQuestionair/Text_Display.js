questionText = [
	"Find the point where the electric field is ",
	"Find the point where the angle of the electric field is ",
	"Submitt",
	"Show field",
	"Main menu",
	"Answer Questions",
	"Free Play",
	"Add charge",
	"Remove charge"
];

function Text_Box(x1, y1, x2, y2, questionNumber = 2, targetAngle = 0) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.questionNumber = questionNumber;
	this.targetAngle = targetAngle;
	this.xPos = x2 - (x2 - x1) / 2;
	this.yPos = y2 - (y2 - y1) / 2 + 5;

	//record if the item is drawn
	this.drawn = false;

	this.checkClick = function(){
		if(mouse.x > this.x1 && mouse.x < this.x2 && 
			mouse.y > this.y1 && mouse.y < this.y2){
			return true;
		}
		else{
			return false;
		}
	};

	this.update = function(questionNumber, targetAngle) {
		this.questionNumber = questionNumber;
		this.targetAngle = targetAngle;
	};

	this.draw = function(c){
		c.beginPath();
		c.moveTo(this.x1, this.y1);
		c.lineTo(this.x2, this.y1);
		c.lineTo(this.x2, this.y2);
		c.lineTo(this.x1, this.y2);
		c.lineTo(this.x1, this.y1);
		c.fillStyle = 'white';
		c.fill();
		c.fillStyle = 'rgba(50,50,50,0.5)';
		c.fill();
		c.stroke();

		c.font = '20px Arial';
		c.textAlign = "center";
		if(this.questionNumber > 1){
			c.strokeText(questionText[this.questionNumber], this.xPos, this.yPos);
		}
		else{
			c.strokeText(questionText[this.questionNumber] + 
				this.targetAngle, this.xPos, this.yPos);
		}

		this.drawn = true;
	};

	this.revert = function(){
		this.drawn = false;
	};

}
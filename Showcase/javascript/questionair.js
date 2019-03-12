// 1: find a certian angle on the field
// 2: fidn the point where the electric field is zero

var angleList = [0, 45, 90, 135, 180, 225, 270, 315, 360];

var questionText = [
	"Place the probe where the angle of the electric field is ",
	"Place the probe where the magnitude of the electric field is zero"
];

function Question(){
	this.canvas = new Canvas_Object(0.98, 0.79);
	this.drawArrows = false;
	this.correct = false;
	this.targetAngle = 0;
	this.questionMode = 0;
	this.textBox = document.getElementById("textBox");
	this.answerId = document.getElementById("answer");

	//create arrows
	this.canvas.createArrows();

	// generate two random charges and create arrows
	this.Question = function(){

		// set question mode
		this.questionMode = (Math.random() - 0.5 < 0.25) ? 0 : 1;

		//set the angle
		this.targetAngle = angleList[Math.ceil(Math.random() * 8)];

		//set the question text
		if(this.questionMode == 0){
			this.textBox.innerHTML = questionText[this.questionMode] + this.targetAngle + "<sup>o</sup>";
		}
		else{
			this.textBox.innerHTML = questionText[this.questionMode];
		}

		// create two random charges
		for(var i = 0; i < 2; i++){
			this.addRandomCharge();
		}

		// create a filed probe
		this.canvas.addProbe(this.canvas.canvasId.width / 2, this.canvas.canvasId.height / 2);

		// update canvas

		this.updateQuestion()
	};

	// add a random charge
	this.addRandomCharge = function(){
		var charge = Math.random() * 1.5 + 0.20;

		if(this.questionMode == 1){
			charge *= -1;
		}
		else{
			charge *= (Math.random() - 0.5 > 0) ? 1 : -1;
		}

		var xPos = Math.random() * (this.canvas.canvasId.width * 0.8) + 
			this.canvas.canvasId.width * 0.10;

		var yPos = Math.random() * (this.canvas.canvasId.height * 0.8) + 
			this.canvas.canvasId.height * 0.10;

		this.canvas.addCharge(xPos, yPos, charge);
	}

	// show / hide field

	this.invertField = function(){
		this.drawArrows = !this.drawArrows;
		this.updateQuestion();
	}

	// reset the question
	this.resetQuestion = function(){
		this.canvas.resetCanvas();
		this.Question();
	}

	// update the canvas
	this.updateQuestion = function(){
		this.canvas.context.clearRect(0,0,innerWidth, innerHeight);
		if(this.drawArrows){
			this.canvas.updateArrows();	
		}

		this.canvas.updateProbes();
		this.canvas.updateCharges();
	}

	// check answer

	this.checkAnswer = function() {
		this.correct = false;
		switch(this.questionMode){
			case 0:
				this.correct = this.checkAngle();
				question.canvas.showCorrect(this.correct, this.canvas.probeList[0].angle.toFixed(0));
				break;
			case 1:
				this.correct = this.checkMagnitude();
				question.canvas.showCorrect(this.correct);
				break;
			default:
				break;
		}		
	}

	this.checkAngle = function() {
			var minAngle = this.targetAngle - 10;
			var maxAngle = this.targetAngle + 10;

			if(this.canvas.probeList[0].angle > minAngle && this.canvas.probeList[0].angle < maxAngle){
				return true;
			}
			else{
				return false;
			}
	}

	this.checkMagnitude = function() {
			var xAv = (this.canvas.chargeList[0].x + this.canvas.chargeList[1].x) / 2;
			var yAv = (this.canvas.chargeList[0].y + this.canvas.chargeList[1].y) / 2;

			var xMin =  xAv - 25;
			var xMax = xAv + 25;
			var yMin = yAv - 25;
			var yMax = yAv + 25;


			if(this.canvas.probeList[0].x > xMin && this.canvas.probeList[0].x < xMax && 
				this.canvas.probeList[0].y > yMin && this.canvas.probeList[0].y < yMax){
				return true;
			}
			else{
				this.canvas.context.moveTo(xMin, yMin); 
				this.canvas.context.lineTo(xMin, yMax);
				this.canvas.context.lineTo(xMax, yMax);
				this.canvas.context.lineTo(xMax, yMin);
				this.canvas.context.lineTo(xMin, yMin);
				this.canvas.context.stroke();
				this.canvas.context.fillStyle = 'grey';
				this.canvas.context.fill();
				return false;
			}
	}
}

var question = new Question();
question.Question();

question.canvas.canvasId.addEventListener("mousedown", function(){
	question.canvas.mouseDown(event, 1);
});

question.canvas.canvasId.addEventListener("mouseup", function() {
	question.canvas.mouseUp(event, 1);
});

question.canvas.canvasId.addEventListener("mousemove", function() {
	question.canvas.mouseMove(event, 1);
	question.updateQuestion();
});





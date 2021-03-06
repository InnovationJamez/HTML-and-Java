/* Question Types

Two charges of same posetive or nagative

find the point between the two charges there 
the field is Equal to zero

One charge

you are given an angle find where on the board 
the field is in that ditrection

Two charges different

you are given an angle find where on the board 
the field is in that ditrection

game modes

0: main manue
1: free play
2: question mode

*/

var angleList = [0, 45, 90, 135, 180, 225, 270, 315, 360]



function Question(){
	this.mode = 0;
	this.canvas = new Canvas_Object("canvasOne");
	this.drawArrows = false;
	this.targetAngle = 0;
	this.textNum;

	this.start = function(){
		this.canvas.createButtons();
		this.canvas.createArrows();
	};

	this.addRandomCharge = function(mod = true){
		var charge = Math.random() * 2 + 0.25;

		if(mod){
			charge *= (Math.random() - 0.5 > 0) ? 1 : -1;
		}
		else{
			charge *= (Math.random() - 0.5 > 0) ? -1 : -1;
		}

		var xPos = Math.random() * (this.canvas.canvasId.width * 0.6) + 
			this.canvas.canvasId.width * 0.20;

		var yPos = Math.random() * (this.canvas.canvasId.height * 0.6) + 
			this.canvas.canvasId.height * 0.20;

		this.canvas.addCharge(xPos, yPos, charge);
		this.update();
	}

	this.update = function(){
		this.canvas.context.clearRect(0,0,innerWidth, innerHeight);
		if(this.mode == 1 || this.mode == 2 && this.drawArrows){
			this.canvas.updateArrows();
		}
		this.canvas.updateProbes();
		this.draw();
	};

	this.draw = function(){
		this.canvas.drawQuestionBox(this.mode);

		this.canvas.updateCharges();

	};

	this.onQuestionModeStart = function(){
		this.textNum = (Math.random() - 0.5 > -0.25) ? 0 : 1;
		this.targetAngle = (this.textNum == 1) ? 0 : angleList[Math.floor(Math.random() * angleList.length)];

		this.canvas.buttonList[0].update(this.textNum, this.targetAngle);
		if(this.textNum == 0){
			this.addRandomCharge();
			this.addRandomCharge();		
		}
		else{
			this.addRandomCharge(false);
			this.addRandomCharge(false);	
		}

		this.canvas.addProbe(this.canvas.canvasId.width / 2, 
			this.canvas.canvasId.height / 2);
	};

	this.checkAnswer = function() {
		var correct = false;

		var xAv = (this.canvas.chargeList[0].x + this.canvas.chargeList[1].x) / 2;
		var yAv = (this.canvas.chargeList[0].y + this.canvas.chargeList[1].y) / 2;

		var xMin =  xAv - 25;
		var xMax = xAv + 25;
		var yMin = yAv - 25;
		var yMax = yAv + 25;
		var minAngle = this.targetAngle - 10;
		var maxAngle = this.targetAngle + 10;

		// check angle is close to the target


		if(this.textNum == 0){
			if(this.canvas.probeList[0].angle > minAngle && this.canvas.probeList[0].angle < maxAngle){
				this.correct = true;
				this.canvas.buttonList[8].draw(this.canvas.context);
			}
			else{
				this.correct = false;
				this.canvas.buttonList[9].draw(this.canvas.context, 
					this.canvas.probeList[0].angle);
			}
		}
		else{ // check that the field is close to zero

			if(this.canvas.probeList[0].x > xMin && this.canvas.probeList[0].x < xMax && 
				this.canvas.probeList[0].y > yMin && this.canvas.probeList[0].y < yMax){
				correct = true;
				this.canvas.buttonList[8].draw(this.canvas.context);
			}
			else{
				correct = false;
				this.canvas.context.beginPath();
				this.canvas.context.moveTo(xMin, yMin);
				this.canvas.context.lineTo(xMax, yMin);
				this.canvas.context.lineTo(xMax, yMax);
				this.canvas.context.lineTo(xMin, yMax);
				this.canvas.context.lineTo(xMin, yMin);
				this.canvas.context.stroke();

				this.canvas.buttonList[9].draw(this.canvas.context, 
					this.canvas.probeList[0].magnitudeField);
			}
		}

	}

}

var question = new Question();
question.start();
question.draw();

question.canvas.canvasId.addEventListener('click', function(event){
	mouse.x = event.x;
	mouse.y = event.y;

	switch(question.mode){
		case 0:
			if(question.canvas.buttonList[4].checkClick() && question.canvas.buttonList[4].drawn){
				question.mode = 2;
				question.onQuestionModeStart();
				question.update();
			}
			else if(question.canvas.buttonList[5].checkClick() && question.canvas.buttonList[5].drawn){
				question.mode = 1;
				question.update();
			}
			break;
		case 1:
			if(question.canvas.buttonList[3].checkClick() && question.canvas.buttonList[4].drawn){
				question.mode = 0;
				question.canvas.resetCanvas();
				question.update();
			}
			else if(question.canvas.buttonList[6].checkClick() && question.canvas.buttonList[4].drawn){
				question.addRandomCharge();
				question.update();
			}
			else if(question.canvas.buttonList[7].checkClick() && question.canvas.buttonList[4].drawn){
				question.canvas.removeCharge();
				question.update();
			}
			break;
		case 2:
			if(question.canvas.buttonList[0].checkClick() && question.canvas.buttonList[4].drawn){
			}
			else if(question.canvas.buttonList[1].checkClick() && question.canvas.buttonList[4].drawn){
				question.checkAnswer();
			}
			else if(question.canvas.buttonList[2].checkClick() && question.canvas.buttonList[4].drawn){
				question.drawArrows = !question.drawArrows;
				question.update();
			}
			else if(question.canvas.buttonList[3].checkClick() && question.canvas.buttonList[4].drawn){
				question.mode = 0;
				question.canvas.resetCanvas();
				question.update();
			}
			break;
		case 3:
			
			break;
	}

});

question.canvas.canvasId.addEventListener('mousedown', function(event){
	mouse.x = event.x;
	mouse.y = event.y;

	question.canvas.numbProbes = question.canvas.probeList.length;

	for(var i = 0; i < question.canvas.numbProbes; i++){
		question.canvas.probeList[i].checkMouse();
	}

	if(question.mode == 1){
		question.canvas.numCharges = question.canvas.chargeList.length;

		for(var i = 0; i < question.canvas.numCharges; i++){
			question.canvas.chargeList[i].checkMouse();
		}		
	}

});

question.canvas.canvasId.addEventListener('mouseup', function(event){
	mouse.x = event.x;
	mouse.y = event.y;

	question.canvas.numbProbes = question.canvas.probeList.length;

	for(var i = 0; i < question.canvas.numbProbes; i++){
		question.canvas.probeList[i].selected = false;
	}

	question.canvas.numCharges = question.canvas.chargeList.length;

	for(var i = 0; i < question.canvas.numCharges; i++){
		question.canvas.chargeList[i].selected = false;
	}		


});

question.canvas.canvasId.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;

	question.canvas.numbProbes = question.canvas.probeList.length;

	for(var i = 0; i < question.canvas.numbProbes; i++){
		question.canvas.probeList[i].followMouse();
	}

	if(question.mode == 1){
		question.canvas.numCharges = question.canvas.chargeList.length;

		for(var i = 0; i < question.canvas.numCharges; i++){
			question.canvas.chargeList[i].followMouse();
		}		
	}

	question.update();
});





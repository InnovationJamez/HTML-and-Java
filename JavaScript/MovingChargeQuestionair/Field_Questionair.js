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



function Question(){
	this.mode = 0;
	this.canvas = new Canvas_Object("canvasOne");
	this.drawArrows = false;

	this.start = function(){
		this.canvas.createButtons();
		this.canvas.createArrows();
	};

	this.addRandomCharge = function(){
		var charge = Math.random() * 2 + 0.25;
		charge *= (Math.random() - 0.5 > 0) ? 1 : -1;

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
		this.draw();
	};

	this.draw = function(){
		this.canvas.drawQuestionBox(this.mode);

		this.canvas.updateCharges();

	};


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
	}

});

question.canvas.canvasId.addEventListener('onmousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;

	question.update();
	console.log("update");
});

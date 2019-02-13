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

	this.start = function(){
		this.canvas.createButtons();
	};

	this.update = function(){
		this.canvas.context.clearRect(0,0,innerWidth, innerHeight);
		this.draw();
	};

	this.draw = function(){
		this.canvas.drawQuestionBox(this.mode);

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
				question.update();
			}
			else if(question.canvas.buttonList[6].checkClick() && question.canvas.buttonList[4].drawn){

			}
			else if(question.canvas.buttonList[7].checkClick() && question.canvas.buttonList[4].drawn){

			}
			break;
		case 2:
			if(question.canvas.buttonList[0].checkClick() && question.canvas.buttonList[4].drawn){

			}
			else if(question.canvas.buttonList[1].checkClick() && question.canvas.buttonList[4].drawn){

			}
			else if(question.canvas.buttonList[2].checkClick() && question.canvas.buttonList[4].drawn){
				
			}
			else if(question.canvas.buttonList[3].checkClick() && question.canvas.buttonList[4].drawn){
				question.mode = 0;
				question.update();
			}
			break;
	}

});

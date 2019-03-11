/*
	1: decimal to binary 
	2: binary to decimal
	3: binary to octal
	4: octal to binary
	5: binary to hex
	6: hex to binary
*/

function Question(questionId, answerId, questionType){
	this.questionId = questionId;
	this.answerId = answerId;
	this.questionType = questionType;
	this.decNum = Math.floor(Math.random()*50);
	this.binNum = this.decNum.toString(2);
	this.octNum = this.decNum.toString(8);
	this.hexNum = this.decNum.toString(16);

	// remove leading zeros from bin value
	this.removeLeadingZero = function(binaryNum){
		var len = binaryNum.length;
		for(var i = 0; i < len; i++){
			if(binaryNum[i] == '0'){
			}
			else{
				binaryNum = binaryNum.slice(i, len);
				break;
			}
		}

		console.log(binaryNum);

		return binaryNum;
	};

	switch(this.questionType){
		case 1:
			first = "<b>decimal</b>: <b>" + this.decNum + "</b>";
			second = "<b>binary</b>";
			this.correctAnswer = this.binNum;
			break;
		case 2:
			first = "<b>binary</b>: <b>" + this.binNum + "</b>";
			second = "<b>decimal</b>";
			this.correctAnswer = this.decNum;
			break;
		case 3:
			first = "<b>binary</b>: <b>" + this.binNum + "</b>";
			second = "<b>octal</b>";
			this.correctAnswer = this.octNum;
			break;
		case 4:
			first = "<b>octal</b>: <b>" + this.octNum + "</b>";
			second = "<b>binary</b>";
			this.correctAnswer = this.binNum;
			break;
		case 5:
			first = "<b>binary</b>: <b>" + this.binNum + "</b>";
			second = "<b>hex</b>";
			this.correctAnswer = this.hexNum;
			break;
		case 6:
			first = "<b>hex</b>: <b>" + this.hexNum + "</b>";
			second = "<b>binary</b>";
			this.correctAnswer = this.binNum;
			break;	
	}
	document.getElementById(this.questionId).innerHTML 
	= ("Convert from " + first + " to equivalent " + second + " value!");
}

q1 = new Question("q1","a1", 1);
q2 = new Question("q2","a2", 2);
q3 = new Question("q3","a3", 3);
q4 = new Question("q4","a4", 4);
q5 = new Question("q5","a5", 5);
q6 = new Question("q6","a6", 6);

questionList = [q1, q2, q3, q4, q5, q6];

function checkAnswers(){
	var score = 0;
	var total = 0;
	questionList.forEach(function tallyResults(element){
		var input = document.getElementById(element.answerId).value;
		input = (element.questionType == 6 || element.questionType == 4 || 
			element.questionType == 2) ? element.removeLeadingZero(input) : input;
		var answer = element.correctAnswer;
		if(input == answer){
			document.getElementById(element.answerId).style.backgroundColor = "green";
			score++;
			total++;
		}
		else{
			document.getElementById(element.answerId).style.backgroundColor = "red";
			total++;
		}
	});
	document.getElementById("score").innerHTML = score + "/" + total; 
}

/*

 note: in conversions to binary the program cannot differentiate 001 and 1
 and leading zero's need to be removed for the program to recegnise the answer

 */



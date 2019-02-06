function getInput(paraId, inputId, buttonId, binNum){
	answer = document.getElementById(inputId).value
	if(binNum == answer){
		document.getElementById(inputId).style.background="green";
	}
	else{
		document.getElementById(inputId).style.background="red";
	}
}

function createQuestion(paraId, inputId, buttonId, binNum, randNum){
	var text = '"' + paraId + '"' + "," + '"' + inputId + '"' 
		+ "," +  '"' + buttonId + '"';

	var text1 = 'getInput(\'' + paraId + "'" + "," + "'" + inputId + "'" 
		+ "," +  "'" + buttonId + "'" + "," + "'" + binNum + '\')';

	var button = "<button type=\"button\" id=\"" + buttonId + "\" onclick =\""+
	text1 + "\">Check answer</button>";

	document.write("<p>What is " + randNum + " in binary?</p>");
	document.write("<input id=" + inputId + ">");
	document.write(button);
	document.write("<p id=\"score\"></p>");
} 

function Question(num){
	this.paraId = "p" + num;
	this.inputId = "i" + num;
	this.buttonId = "b" + num;
	this.randNum = Math.floor(Math.random()*20);
	this.binNum = this.randNum.toString(2);
	createQuestion(this.paraId, this.inputId, this.buttonId, 
		this.binNum, this.randNum);

} // Question

for(var i = 0; i < 10; i++){
	q1 = new Question(i);
}



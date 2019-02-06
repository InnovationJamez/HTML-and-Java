function getInput(paraId, inputId, buttonId, binNum){
	answer = document.getElementById(inputId).value
	console.log(binNum + " " + answer);
	if(binNum == answer){
		document.getElementById(inputId).style.background="green";
	}
	else{
		document.getElementById(inputId).style.background="red";
	}
}

function Question(spanId, inputId, paraId, buttonId, max){
	this.spanId = spanId;
	this.inputId = inputId;
	this.paraId = paraId;
	this.buttonId = buttonId;
	this.max = max;
	this.randNum = Math.floor(Math.random()*this.max);
	this.binNum = this.randNum.toString(2);
	var text = 'getInput(\'' + this.spanId + "'" + "," + "'" + this.inputId + "'" 
		+ "," +  "'" + this.buttonId + "'" + "," + "'" + this.binNum + '\')';

	var button = "<button type=\"button\" id=\"" + buttonId + "\" onclick =\""+
	text + "\">Check answer</button>";
	document.getElementById(this.paraId).innerHTML = button;
	document.getElementById(this.spanId).innerHTML = this.randNum;
}

q1 = new Question("s1","i1", "p1","b1", 50);
q1 = new Question("s2","i2", "p2","b2", 50);
x = [];y=[];
for(var i=-20; i<20;i++){
	x.push(i);
	y.push(0.5 * i ** 3);
}


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = 'black';

var canvas1 = document.getElementById("myCanvas");
var dtx = canvas1.getContext("2d");
dtx.strokeStyle = 'red';

var width = myCanvas.width;
var height = myCanvas.height;

function drawGraph(){
	ctx.moveTo(width / 2, 0);
	ctx.lineTo(width / 2, height);
	ctx.moveTo(0, height / 2);
	ctx.lineTo(width, height /2);

	for(var i = 0; i < 21; i++){
		ctx.moveTo(width / 2 - width * 0.025, height / 20 * i);
		ctx.lineTo(width / 2 + width * 0.025, height / 20 * i);
	}

	for(var i = 0; i < 21; i++){
		ctx.moveTo(width / 20 * i, height / 2 - height * 0.025);
		ctx.lineTo(width / 20 * i, height / 2 + height * 0.025);
	}

	ctx.stroke();

	for(var i=0; i<40;i++){
		if(i == 0){
			dtx.moveTo(x[i] * width / 40 + width / 2, height - (y[i] + height / 2));
		}
		else{
			dtx.lineTo(x[i] * width / 40 + width / 2, height - (y[i] + height / 2));
		}
	
	}
	dtx.stroke();
}


function drawTable(){
	header = "<table style=\"width:100%\">" + 
	"<tr><th>X</th> <th>Y</th></tr>"

	document.write(header);
	for(var i=0; i<40;i++){
		document.write("<tr><td>" + x[i] + 
			"</td><td>" + y[i] + "</td></tr>");
	}
	document.write("</table>");
}

drawTable();
drawGraph();
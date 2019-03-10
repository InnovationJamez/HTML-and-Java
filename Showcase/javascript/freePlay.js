canvasOne = new Canvas_Object(0.95, 0.875);
canvasOne.createArrows();
canvasOne.updateCanvas();

altercharges = function(num){
	var charge = document.getElementById("chargeNum").value;

	if(num == 1 && charge != 0){
		canvasOne.addCharge(50, 50, charge);
	}
	else if(num == 2) {
		canvasOne.removeCharge();
	}
	canvasOne.updateCanvas();
}

// event handlers 

canvasOne.canvasId.addEventListener("mousedown", function(){
	canvasOne.mouseDown(event);
});

canvasOne.canvasId.addEventListener("mouseup", function() {
		canvasOne.mouseUp(event);
});

canvasOne.canvasId.addEventListener("mousemove", function() {
		canvasOne.mouseMove(event);
		canvasOne.updateCanvas();
});

var chargeMeter = document.getElementById("chargeNum");
var number = document.getElementById("p");

chargeMeter.onmouseup = function(){
	number.innerHTML = chargeMeter.value;
}
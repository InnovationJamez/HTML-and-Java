function Wires() {
	this.field = new Field();


	// for keep track of charges
	this.chargeList = [];
	this.numCharges = 0;

	// create single charge
	this.addCharge = function(){
		this.chargeList.push(new Charge(this.field.canvasId.width / 2, 
			this.field.canvasId.height / 2, Math.random() * 1.55 + 1, Math.random() * 1.5 + 1, this.field.wireField));
		this.numCharges++;
	}


	this.onStart = function() {
		this.field.drawField();
		this.addCharge();
		this.addCharge();
	}

	this.checkTile = function(){
		var p1, p2;
		for(var i = 0; i < this.numCharges; i++){
			this.chargeList[i].nextPosition();
			p1 = this.field.getIndex(this.chargeList[i].x, this.chargeList[i].y);
			p2 = this.field.getIndex(this.chargeList[i].nx, this.chargeList[i].ny);
			p3 = this.field.getIndex(this.chargeList[i].crx, this.chargeList[i].cry);

			if(this.field.wireField[p3[1] * this.field.fieldWidth + p3[0]]){
				this.chargeList[i].move();
			}
			else{
				this.chargeList[i].dx *= (p2[0] == p3[0]) ? -1 : 1;
				this.chargeList[i].dy *= (p2[1] == p3[1]) ? -1 : 1;

				console.log(this.chargeList[i].dx + " " + this.chargeList[i].dy)

				this.chargeList[i].nextPosition();
				this.chargeList[i].move();
			}
		}
	}


	this.updateBoard = function() {
		this.field.update();
		this.checkTile();
		this.draw();
	}

	this.draw = function() {
		this.field.drawField();

		for(var i = 0; i < this.numCharges; i++){
			this.chargeList[i].draw(this.field.context);
		}
	}
} // Wires

var wires = new Wires();
wires.onStart();
wires.updateBoard();

function animationLoop(){
	requestAnimationFrame(animationLoop);
	wires.updateBoard();
}

animationLoop();

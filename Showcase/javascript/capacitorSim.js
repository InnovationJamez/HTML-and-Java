function capacitorSim() {
	// for drawing the data on canvas
	this.canvasId = document.querySelector('canvas');
	this.width = window.innerWidth;
	this.height = this.width;
	this.canvasId.width = this.width;
	this.canvasId.height = this.height;
	this.context = this.canvasId.getContext("2d");

	// circuit elements
	this.circuit = new Circuit;

	// charges
	this.coordList = [];
	this.coordListTwo = [];
	this.chargeList = [];
	this.startX = this.width * 0.2;
	this.startY = this.height * 0.45;
	this.i = 0;

	// create coordinate List for battery to capacitor
	this.createCoords = function(){
		this.coordList.push(new coord(this.width * 0.2, this.height * 0.8));
		this.coordList.push(new coord(this.width * 0.5, this.height * 0.8));
		this.coordList.push(new coord(this.width * 0.5, this.height * 0.50));		
	};

	// create coordiante List for capacitor to resistor
	this.createSecondCoordList = function() {
		this.coordListTwo.push(new coord(this.width * 0.5, this.height * 0.8));
		this.coordListTwo.push(new coord(this.width * 0.8, this.height * 0.8));
		this.coordListTwo.push(new coord(this.width * 0.8, this.height * 0.2));
		this.coordListTwo.push(new coord(this.width * 0.6, this.height * 0.2));
		this.coordListTwo.push(new coord(this.width * 0.5, this.height * 0.45));
	};

	// set up coord lists
	this.createCoords();
	this.createSecondCoordList();

	// create new charge
	this.createCharge = function() {
		this.chargeList.push(new Charge(this.startX, this.startY, 1.0, this.coordList, this.coordListTwo));
	};

	//update charges

	this.updateCharges = function() {
		for(var i = 0; i < this.chargeList.length; i++){
				this.chargeList[i].update(this.context, this.circuit.switch);
		}
	};

	// draw the circuit
	this.drawLanes = function(){
		// wire
		this.context.beginPath();
		this.context.moveTo(this.width * 0.4, this.height * 0.2);
		this.context.lineTo(this.width * 0.2, this.height * 0.2);
		this.context.lineTo(this.width * 0.2, this.height * 0.4);
		// voltage source
		this.context.moveTo(this.width * 0.1, this.height * 0.4);
		this.context.lineTo(this.width * 0.3, this.height * 0.4);
		this.context.moveTo(this.width * 0.25, this.height * 0.45);
		this.context.lineTo(this.width * 0.15, this.height * 0.45);
		// wire
		this.context.moveTo(this.width * 0.2, this.height * 0.45);
		this.context.lineTo(this.width * 0.2, this.height * 0.8);
		this.context.lineTo(this.width * 0.5, this.height * 0.8);
		this.context.lineTo(this.width * 0.5, this.height * 0.5);
		this.context.stroke();
		// capacitor
		this.context.moveTo(this.width * 0.4, this.height * 0.5);
		this.context.lineTo(this.width * 0.6, this.height * 0.5);
		this.context.moveTo(this.width * 0.4, this.height * 0.45);
		this.context.lineTo(this.width * 0.6, this.height * 0.45);
		// wire
		this.context.moveTo(this.width * 0.5, this.height * 0.45);
		this.context.lineTo(this.width * 0.5, this.height * 0.3);
		//wire
		this.context.moveTo(this.width * 0.6, this.height * 0.2);
		this.context.lineTo(this.width * 0.8, this.height * 0.2);
		this.context.lineTo(this.width * 0.8, this.height * 0.4);
		// resistor
		this.context.lineTo(this.width * 0.85, this.height * 0.42);
		this.context.lineTo(this.width * 0.75, this.height * 0.44);
		this.context.lineTo(this.width * 0.85, this.height * 0.46);
		this.context.lineTo(this.width * 0.75, this.height * 0.48);
		this.context.lineTo(this.width * 0.85, this.height * 0.50);		
		this.context.lineTo(this.width * 0.75, this.height * 0.52);
		this.context.lineTo(this.width * 0.85, this.height * 0.54);
		this.context.lineTo(this.width * 0.75, this.height * 0.56);
		this.context.lineTo(this.width * 0.85, this.height * 0.58);
		this.context.lineTo(this.width * 0.80, this.height * 0.60);
		// wire
		this.context.lineTo(this.width * 0.8, this.height * 0.8);
		this.context.lineTo(this.width * 0.5, this.height * 0.8);
		this.context.stroke();
		// switch
		this.context.beginPath();
		this.context.arc(this.width * 0.4, this.height * 0.2, 10, 0, 2 * Math.PI);
		this.fillStyle = 'black';
		this.context.fill();
		this.context.stroke();
		// switch
		this.context.beginPath();
		this.context.arc(this.width * 0.5, this.height * 0.3, 10, 0, 2 * Math.PI);
		this.fillStyle = 'black';
		this.context.fill();
		this.context.stroke();
		// switch
		this.context.beginPath();
		this.context.arc(this.width * 0.6, this.height * 0.2, 10, 0, 2 * Math.PI);
		this.fillStyle = 'black';
		this.context.fill();
		this.context.stroke();

		// arm
		this.context.beginPath();
		this.context.moveTo(this.width * 0.5, this.height * 0.3);
		if(this.circuit.switch){
			this.context.lineTo(this.width * 0.4, this.height * 0.2);
		}
		else {
			this.context.lineTo(this.width * 0.6, this.height * 0.2);
		}
		this.context.stroke();
	};

	this.update = function(){
		this.circuit.otherStart = new Date();
		this.context.clearRect(0,0,innerWidth, innerHeight);
		this.drawLanes();
		this.circuit.update();
		this.updateCharges();

		var text = (this.circuit.switch) ? "closed" : "open"
		this.context.beginPath();
		this.context.font = "20px Arial"; 
		this.context.fillStyle = "black";                                                                         
		this.context.fillText("switch: " + text, 20, 20);
		this.context.fillText("charge: " + this.circuit.capVoltage.toPrecision(2) + " V", 20, 40);
		this.context.fillText("percent charge: " + this.circuit.percentCharge.toPrecision(2) + " %", 20, 60);
		this.context.fillText("current: " + this.circuit.I.toPrecision(2) + " A", 20, 80);
		this.context.fillText("time: " + this.circuit.elapsedTime.toPrecision(2) + " us", 20, 100);
		this.context.fillText("gap: " + this.circuit.gap.toPrecision(2) + " ms", 20, 120);
		this.context.stroke();

		if(this.circuit.switch){
			this.circuit.gap += (this.circuit.endCount.getMilliseconds() + this.circuit.endCount.getSeconds() * 1000) - 
				(this.circuit.otherStart.getMilliseconds() + this.circuit.otherStart.getSeconds() * 1000);		
		}

	
		if(this.circuit.gap > 10 + 20 * this.circuit.percentCharge / 100 && this.circuit.switch == true){
			this.createCharge();
			this.circuit.gap = 0;
		}

	};
}

var circuit = new capacitorSim;

function animate(){
	circuit.update();
	requestAnimationFrame(animate);
}

animate();
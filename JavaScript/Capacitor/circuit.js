function Circuit() {
	// circuit data
	this.res = 2000;
	this.emf = 12;
	this.cap = 2 * 10 ** -9;

	//time data
	this.startCount;
	this.endCount;
	this.shift;
	this.elapsedTime = 0;

	// for storing calculations
	this.capVoltage;
	this.initCapVoltage = 0;
	this.I;
	this.deltaV;
	this.percentCharge;

	//for stroring the position of the switch  false: open
	this.switch = false //                     true:closed

	// for drawing the data on canvas
	this.canvasId = document.querySelector('canvas');
	this.canvasId.width = window.innerWidth;
	this.canvasId.height = 300;
	this.context = this.canvasId.getContext("2d");

	// update switch
	this.invertSwtich = function(){
		this.switch = !this.switch;
		this.elapsedTime = 0;
		this.initCapVoltage = this.capVoltage;
	}

	// update valluee
	this.updateCircuit = function(){

		if(this.switch){
			this.capVoltage = this.initCapVoltage + this.emf * (1 - Math.E ** (-this.elapsedTime / 
				(this.res * this.cap)));
		}
		else{
			this.capVoltage = this.initCapVoltage * Math.E ** (-this.elapsedTime / 
				(this.res * this.cap));
		}

		this.percentCharge = this.capVoltage / this.emf * 100;
		this.deltaV = this.emf - this.capVoltage;
		this.I = this.deltaV / this.res;
		
	};

	// draw Info
	this.drawInfo = function() {
		this.context.clearRect(0, 0, innerWidth, innerHeight);
		this.context.font = "20px Arial";
		this.context.fillText("Capacitor: " + this.cap + " F", 20, 40);
		this.context.fillText("Battery emf: " + this.emf + " V", 20, 60);
		this.context.fillText("Resistor: " + this.res + " Ohm", 20, 80);
		this.context.fillText("Capacitor voltage: " + this.capVoltage.toPrecision(3) + " V", 20, 100);
		this.context.fillText("Percent charged: " + this.percentCharge.toPrecision(3) + "  %", 20, 120);
		this.context.fillText("delta V: " + this.deltaV.toPrecision(3) + " V", 20, 140);
		this.context.fillText("current: " + this.I.toPrecision(3) + " A", 20, 160);
		this.context.fillText((this.switch) ? "closed" : "open", 20, 180);
	};

	// update
	this.update = function(){

		this.startCount = new Date();
		requestAnimationFrame(animate);
		this.updateCircuit();
		this.drawInfo();
		this.endCount = new Date();

		this.shift = Math.abs(this.endCount.getMilliseconds() - 
			this.startCount.getMilliseconds()) / 100000000;

		this.elapsedTime += this.shift;

	}

}

var circuit = new Circuit;
circuit.updateCircuit();
circuit.drawInfo();

function animate(){
	
	circuit.update();
}


animate();
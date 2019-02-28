var capacitor = {
	epsilonNot: 8.85 * 10 ** -12,  // F / m
	area: 1, //m^2
	d: 0.002, //m
	k: 1.00, //dielectric constant // relative permitticity
	capacitance:0,
	findCapacatence: function() {
		this.capacitance = (this.k * this.epsilonNot * this.area) / this.d;
	},

};

var battery = {
	emf: 12 //voltage: V
};

var resistor = {
	resistance: 20 // ohms
};


function RC_Circuit() {
	this.currentCharge = 0;
	this.percentCharge = 0;
	this.switch = true; // true: open false: closed

	// for storing time
	this.elapsedTime = 0;
	this.start;
	this.shift;
	this.end;

	// for string the current in the circuit
	this.I;

	// for drawing stuff
	this.canvasId = document.querySelector('canvas');
	this.context = this.canvasId.getContext("2d");

	//on start
	this.onstart = function() {
		capacitor.findCapacatence();
	};

	// get values from the user
	this.getValues = function() {

	};

	// open / close the switch
	this.switchToggle = function() {
		this.switch = !this.switch;		
	};

	// reset the time and charge
	this.resetcircuit = function() {
		this.elapsedTime = 0;
		this.switch = true;
	};

	// calculate the capacitance of the capacitor
	this.calcCalacatence = function() {
		capacitor.findCapacatence();
	};

	// update the capacitor based on elapsed time
	this.updateCapacitor = function() {
		this.currentCharge = capacitor.capacitance * battery.emf * (1 - Math.pow(Math.E, -this.elapsedTime / 
			(resistor.resistance * capacitor.capacitance))); // forumal goes here
		this.I = (battery.emf / resistor.resistance) * Math.pow(Math.E, -this.elapsedTime / 
			(resistor.resistance * capacitor.capacitance)) * 1000; 
	};

	// draw info
	this.drawInfo = function() {
		this.context.clearRect(0, 0, innerWidth, innerHeight);
		this.context.fillText("time: " + this.elapsedTime.toPrecision(3) + " s", 20, 20);
		this.context.fillText("capacitanse: " + capacitor.capacitance + " F", 20, 30);
		this.context.fillText("battery emf: " + battery.emf + " V", 20, 40);
		this.context.fillText("charge: " + this.currentCharge + " V", 20, 50);
		this.context.fillText("curent: " + this.I + " mA", 20, 60);
		this.context.fillText((this.switch) ? "open" : "closed", 20, 70);
	};

	// update
	this.update = function() {
		this.start = new Date()

		// do stuff
		requestAnimationFrame(animate);
		this.updateCapacitor();
		this.drawInfo();

		this.end = new Date();

		this.shift = Math.abs((this.end.getMilliseconds() - this.start.getMilliseconds()) / 100);

		if(this.switch == true){ //open
			this.elapsedTime -= this.shift;
		}
		else{ //closed
			this.elapsedTime += this.shift;
		}

		this.elapsedTime = (this.elapsedTime < 0) ? 0 : this.elapsedTime;
	};
}

this.circuit = new RC_Circuit;
circuit.onstart();
circuit.update();

function animate(){
	circuit.update();
}


animate();
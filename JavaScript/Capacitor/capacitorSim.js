function capacitorSim() {
	// for drawing the data on canvas
	this.canvasId = document.querySelector('canvas');
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.canvasId.width = this.width;
	this.canvasId.height = this.height;
	this.context = this.canvasId.getContext("2d");

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
		this.context.fill();
		this.context.stroke();
		// switch
		this.context.beginPath();
		this.context.arc(this.width * 0.5, this.height * 0.3, 10, 0, 2 * Math.PI);
		this.context.fill();
		this.context.stroke();
		// switch
		this.context.beginPath();
		this.context.arc(this.width * 0.6, this.height * 0.2, 10, 0, 2 * Math.PI);
		this.context.fill();
		this.context.stroke();

		// arm
		this.context.beginPath();
		this.context.moveTo(this.width * 0.5, this.height * 0.3);
		if(false){
			this.context.lineTo(this.width * 0.4, this.height * 0.2);
		}
		else {
			this.context.lineTo(this.width * 0.6, this.height * 0.2);
		}
		this.context.stroke();
	}
}

var circuit = new capacitorSim;
circuit.drawLanes();
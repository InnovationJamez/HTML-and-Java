function Circuit() {
	// circuit data
	this.res = 5000;
	this.emf = 12;
	this.cap = 5 * 10 ** -9;

	//time data
	this.startCount = new Date();
	this.endCount;
	this.otherStart;
	this.gap = 0;
	this.elapsedTime = 0;
	this.done = false;

	// for storing calculations
	this.capVoltage;
	this.initCapVoltage = 0;
	this.I;
	this.deltaV;
	this.percentCharge;

	//for stroring the position of the switch  false: open
	this.switch = false; //                     true: closed

	// update switch
	this.invertSwtich = function(){
		this.switch = !this.switch;
		this.initCapVoltage = this.capVoltage;
		this.startCount = new Date();
		this.elpasedTime = 0;
	}

	// update valluee
	this.updateCircuit = function(){

		if(this.switch){
			this.capVoltage = this.initCapVoltage + this.emf * (1 - Math.E ** (-this.elapsedTime * 15 ** -5.25 / 
				(this.res * this.cap)));
		}
		else{
			this.capVoltage = this.initCapVoltage * Math.E ** (-this.elapsedTime * 10 ** -5.70 / 
				(this.res * this.cap));
		}

		this.percentCharge = this.capVoltage / this.emf * 100;
		this.percentCharge = (this.percentCharge > 100) ? 100 : this.percentCharge;
		this.deltaV = this.emf - this.capVoltage;
		this.I = this.deltaV / this.res;
		
	};

	// update
	this.update = function(){

		this.updateCircuit();
		this.endCount = new Date();

		this.elapsedTime = (this.endCount.getSeconds() + this.endCount.getMinutes() * 60) - 
			(this.startCount.getSeconds() + this.startCount.getMinutes() * 60);

	}

}

function coord(x, y){
	this.x = x;
	this.y = y;
}

/// Charge stufff

function Charge(x, y, s, width, height, chargeNum){
	this.numcharges = chargeNum;
	this.speed = s;
	this.dx = 0, this.dy = 0;
	this.x = x, this.y = y;
	this.width = width;
	this.height = height;
	//this.combined list
	this.combinedList = [];
	this.combinedListLength = 0;
	this.comCount = 0;
	// for counting
	this.count = 0, this.countOne = 0, this.countTwo = 0;

	this.comList = function() {
		// One
		this.combinedList.push(new coord(this.width * 0.2, this.height * 0.8));
		this.combinedList.push(new coord(this.width * 0.5, this.height * 0.8));
		this.combinedList.push(new coord(this.width * 0.5, this.height * 0.50));
		this.combinedList.push(new coord(this.width * 0.4 +(this.numcharges * 10) % (this.width * 0.2), 
			this.height * 0.5));	

		// two
		this.combinedList.push(new coord(this.width * 0.5, this.height * 0.5));
		this.combinedList.push(new coord(this.width * 0.5, this.height * 0.8));
		this.combinedList.push(new coord(this.width * 0.8, this.height * 0.8));
		this.combinedList.push(new coord(this.width * 0.8, this.height * 0.2));
		this.combinedList.push(new coord(this.width * 0.6, this.height * 0.2));
		this.combinedList.push(new coord(this.width * 0.5, this.height * 0.45));
		this.combinedList.push(new coord(this.width * 0.4 + (this.numcharges * 10) % (this.width * 0.2), 
			this.height * 0.45));

		// three
		this.combinedList.push(new coord(this.width * 0.5, this.height * 0.45));
		this.combinedList.push(new coord(this.width * 0.5, this.height * 0.30));
		this.combinedList.push(new coord(this.width * 0.4, this.height * 0.20));
		this.combinedList.push(new coord(this.width * 0.2, this.height * 0.20));
		this.combinedList.push(new coord(this.width * 0.2, this.height * 0.50));

		this.combinedListLength = this.combinedList.length;

	};

	this.comList();

	this.setSpeed = function(list, num, length){
		if(this.y < list[num].y){
			this.dy = this.speed;
		}
		if(this.y > list[num].y){
			this.dy = -this.speed;
		}
		if(this.y == list[num].y){
			this.dy = 0;
		}
		if(this.x < list[num].x){
			this.dx = this.speed * (this.width / this.height);
		}
		if(this.x > list[num].x){
			this.dx = -this.speed * (this.width / this.height);
		}
		if(this.x == list[num].x){
			this.dx = 0;
		}
		// if close to spot move to right on top of it
		if(this.x > list[num].x - 2 && this.x < list[num].x + 2 && 
			this.y > list[num].y - 2 && this.y < list[num].y + 2){

			this.x = list[num].x;
			this.y = list[num].y;

			if(num < (length - 1)){
				num += 1;
				console.log(num);
			}
		}

		this.move();

		return num;		
	};

	this.move= function(){
		this.x += this.dx;
		this.y += this.dy;
	};

	this.draw = function(c){
		c.beginPath();
		c.arc(this.x, this.y, 10, 0, 2 * Math.PI);
		c.fillStyle = "red"
		c.fill();
		c.lineWidth = 2;
		c.stroke();		

		c.beginPath();
		c.moveTo(this.x - 6, this.y);
		c.lineTo(this.x + 6, this.y);
		c.lineWidth = 2;
		c.stroke();
	};

	this.update = function(c, move){
		if(move == true && this.comCount < 4){
			this.comCount = this.setSpeed(this.combinedList, this.comCount, this.combinedListLength);
		}
		else if(move == true && this.comCount == 5 || this.comCount == 4 && this.move == false){
			this.comCount = 2;
		}
		else if(move == false && this.comCount >= 2 && this.comCount < 11){
			this.comCount = (this.comCount < 4) ? 5 : this.comCount;
			this.comCount = this.setSpeed(this.combinedList, this.comCount, this.combinedListLength);
		}
		else if(move == true && this.comCount > 8){
			this.comCount = (this.comCount < 11) ? 11 : this.comCount;
			this.comCount = this.setSpeed(this.combinedList, this.comCount, this.combinedListLength);
		}
		else if(this.comCount == this.combinedListLength - 1){
			this.done = true;
		}

		this.draw(c);

	};

}
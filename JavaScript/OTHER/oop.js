// object
var customer = {
	name:"tom smith",
	speak:function(){
		return "My name is " + this.name;
	}

	address: {
		street:"123 Main street",
		city: "Pittsburg",
		state: "PA"
	}

};

//consctucror

function Person(name, street) {
	this.name = name;
	this.street = street;

	this.info = function(){
		return this.name + " " + this.street;
	}

	var bobsmith = new Person("Bob Smith", "234 main st");
}

// getters setters

function Coordinates(){
	this.longitude = 0;
	this.latitude = 0;	
}

Object._defineGetter_.call(Coordinates.protitype, "getCoords", function(){
	return "Lat : " + this.latitude + " Long : " + this.longitude;
});

Object._defineSetter_.call(Coordinates.prototype, "getCoords", function(coords){
	var parts = coords.toString().splt(",");
	this.latitude = parts[0] || "";
	this.longitude = parts[1] || "";
});

// define

var coords = {
	this.x = 0;
	this.y = 0;
}

Object.defineProperty(coords.prototype, "pointPos", {
	get: function(){
		return "X : " + this.x + " Y : " + this.y;
	},
	set : function(thePoint){
		var parts = thePoint.toString.split(", ");
		this.x = parts[0];
		this.y = parts[1];
	}
})

// enheiratence    





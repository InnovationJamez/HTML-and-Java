/*
Each row has a string of safe and not safe spaces
and a speed in which it moves
s: safe d: danger
*/

gameBoard = [
	"ddddddddssssssssddddddddssssssssddddddddssssssssdddddddddddddddddddddddd",
	"wwwwwwwwllllllllwwwwwwwwllllllllwwwwwwwwllllllllwwwwwwwwllllllllwwwwwwww",
	"llllllllllllllllwwwwwwwwwwwwwwwwllllllllllllllllwwwwwwwwwwwwwwwwllllllll",
	"wwwwwwwwllllllllwwwwwwwwllllllllwwwwwwwwllllllllwwwwwwwwlllllllswwwwwwww",
	"llllllllllllllllwwwwwwwwwwwwwwwwllllllllllllllllwwwwwwwwwwwwwwwwllllllll",
	"llllllllwwwwwwwwllllllllwwwwwwwwllllllllwwwwwwwwllllllllwwwwwwwwllllllll",
	"ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
	"ddddddddddddddddssssssssssssssssddddddddddddddddssssssssssssssssssssssss",
	"ddddddddssssssssddddddddssssssssddddddddssssssssddddddddssssssssdddddddd",
	"ssssssssddddddddssssssssddddddddssssssssddddddddssssssssddddddddssssssss",
	"ddddddddssssssssddddddddssssssssddddddddssssssssddddddddssssssssdddddddd",
	"ddddddddssssssssssssssssssssssssddddddddssssssssssssssssssssssssssssssss",
	"ddddddddddddddddssssssssssssssssddddddddddddddddssssssssssssssssssssssss",
	"ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
];

speed = [0, -1, 1, -1, 0, -2, 1, 1, 1, 2, 1, 0.3, -0.5, 0.25, -0.5, 0];

// object

function Frogger() {
	// canvas stuff
	this.canvas = document.getElementById("game");
	this.context = this.canvas.getContext("2d");

	// set the dimensions of the canvas
	this.canvas.width = 700;
	this.canvas.height = 700;

	// canvas dimentsions 
	this.width = this.canvas.width;
	this.height = this.canvas.height;

	// for drawing tiles
	this.baordWidth = 60;
	this.boardHeight = 14;

	// tile dimensions
	this.tileWidth = this.width / this.baordWidth;
	this.tileHeight = this.height / this.boardHeight;

	// for making the background scroll
	this.dist = 0;

	// for storing time
	this.start;
	this.end;
	this.dist = 0;

	// character
	var xPos = 300;
	var yPos = 300;

	// draw a squeare depending on x, y and dimensions
	this.drawSpace = function(x, y, w, h, c){
		this.context.fillStyle = c;
		this.context.fillRect(x, y, w, h);
	}

	// drawing the field
	this.drawField = function(){ 

		for(var j = 0; j < this.boardHeight; j++){


			for(var i = 0; i < this.baordWidth; i++){
				this.drawSpace(i * this.tileWidth, j * this.tileHeight, 
					this.tileWidth, this.tileHeight, this.getColor(gameBoard[j][(i + Math.floor(this.dist)) % 72]));
			}	
		}
	}

	this.drawCharacter = function(){
		this.drawSpace(this.xPos, this.yPos, 
			this.tileWidth, this.tileHeight, "red");
	}

	// get character return color
	this.getColor = function(ch){
		switch(ch){
			case 's':
				return "green";
				break;
			case 'd':
				return "red";
				break;
			case 'w':
				return "blue";
				break;
			case 'l':
				return "brown";
				break;
			default:
				return "grey";
				break;
		}
	}

	this.main = function(){
		this.context.clearRect(0, 0, this.width, this.height);
		this.start = new Date();

		this.drawField();

		this.end = new Date();

		this.dist  += (this.end.getMilliseconds() + this.end.getSeconds() / 1000) - 
			(this.start.getMilliseconds() + this.start.getSeconds() / 1000);
	}

}

var frogGame = new Frogger;
frogGame.drawField();


animate();



function animate(){
	frogGame.main();
	window.requestAnimationFrame(animate);
}


// canvas object handler
canvasId = document.getElementById("game");
//context
c = canvasId.getContext("2d");
// variables to store dimensions
var width = window.innerWidth * 0.9;
var height = window.innerHeight * 0.9;
var vertical = 8;
var horizontal = 32;
// size of each tile
var blockWidth = width / horizontal;
var blockHeight = height / vertical;
//set the size of the canvas
canvasId.width = width;
canvasId.height = height;
// game board
board = [
	"....wwww....wwww....wwww....wwww....wwww....wwww....wwww....wwww",
	"........rrrrrrrr........rrrrrrrr........rrrrrrrr........rrrrrrrr",
	"....rr....rr....rr....rr....rrrr....rr....rr....rr....rr....rrrr",
	"....cccc....cccc....cccc....cccc....cccc....cccc....cccc....cccc",
	"........cccccccc........cccccccc........cccccccc........cccccccc",
	"....cccc....cccc....cccc....cccc....cccc....cccc....cccc....cccc",
	"cccc....cccc....cccc....cccc....cccc....cccc....cccc....cccc....",
	"....wwww....wwww....wwww....wwww....wwww....wwww....wwww....wwww"
];
// speeds
speed = [0,-1,-1,1,-1,1,-1,0];
// varriable to shift view
var view = 0;
// function to draw the board
function drawBoard(){
	for(var i = 0; i < horizontal; i++){
		for(var j = 0; j < vertical; j++){
			c.fillStyle = getColor(board[j][Math.abs((i + view * speed[j]) % board[0].length)]);
			c.fillRect(i * blockWidth, j * blockHeight, blockWidth, blockHeight);
		}
	}
}
// get color from board
function getColor(color){
	switch(color){
		case '.':
			return "grey";
		case 'r':
			return "blue";
		case 'w':
			return "red";
		case 'c':
			return "green";
		default:
			return "pink";
	}
}
// main loop
function mainLoop(){
	c.clearRect(0,0,width,height);
	view = (view + 1) % horizontal;
	drawBoard();
}



drawBoard();

window.setInterval(mainLoop, 800);
console.log(-5%10);


var canvasId = document.getElementById("canvas");
var c = canvasId.getContext("2d");
var canvasHeight = window.innerHeight * 0.9;
var canvasWidth = canvasHeight * 0.5;
// tetromino height and width
var tetroWidth = 4;
var tetroHeight = 4;
// tetrominos
var tetromino = [
	[0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,1], // L - Block
	[0,0,0,0,4,0,0,0,4,0,0,0,4,4,0,0], // Reverse L - Block
	[0,0,0,0,0,2,2,0,0,2,2,0,0,0,0,0], // Square
	[0,0,0,0,0,3,0,0,0,3,3,0,0,0,3,0], // Z - Block
	[0,0,0,0,0,0,5,0,0,5,5,0,0,5,0,0], // Reverse Z - Block
	[0,0,0,6,0,0,0,6,0,0,0,6,0,0,0,6], // Line piece
	[0,4,4,4,0,0,4,0,0,0,0,0,0,0,0,0], // T block
	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // blank
];

// selector for the current piece
var piece = 5;

// these values control the board width and height
var vertical = 16;
var horizontal = 8;

// position of the falling piece
var yPos = -4;
var xPos = 5;

// current rotation
var rotation = 0;

// find the height and width of each block
var blockWidth = canvasWidth / horizontal;
var blockHeight = canvasHeight / vertical;

// set the canvas width and height
canvasId.width = canvasWidth;
canvasId.height = canvasHeight;

var colors = ['black', 'red', 'green', 'blue','yellow','purple','orange','gold'];
var board = [];

// score 
var score = 0;

// functions

function populateBoard(){
	board = [];
	for(var j = 0; j < vertical; j++){
		var temp = [];
		for(var i = 0; i < horizontal; i++){
			//temp.push(Math.floor(Math.random() * colors.length));
			temp.push(0);
		}
		board.push(temp);
	}
}

function drawRect(i, j, color){
	c.fillStyle = color;
	c.fillRect(i * blockWidth, j * blockHeight,
		blockWidth, blockHeight);
}

// draw the board
function drawBoard(){
	for(var j = 0; j < vertical; j++){
		for(var i = 0; i < horizontal; i++){
			drawRect(i, j, colors[board[j][i]]);
		}
	}
}

// translate piece rotation
function translatePiece(i, j, r){
	switch(r){
		case 0:
			return tetroWidth * j + i;
		case 90:
			return (tetroHeight * 3 + j) - (tetroWidth * i);
		case 180:
			return 15 - 4 * j - i;
		case 270:
			return (3 - j) + (i * 4);
		default:
			return tetroWidth * j + i;
	}
}

// check collision
function checkCollision(x, y, r){
	var tetroPiece;
	for(var i = 0; i < tetroWidth; i++){
		for(var j = 0; j < tetroHeight; j++){
			tetroPiece = tetromino[piece][translatePiece(i, j, r)];
			if(j + y < 0 && tetroPiece != 0){
				continue;
			}
			if(j + y >= vertical && tetroPiece != 0){
				return 0;
			}
			if(tetroPiece != 0 && board[j + y][i + x] != 0){
				return 0;
			}
		}
	}
	return 1;
}

// draw each piece
function drawPiece(){
	var color;
	for(var i = 0; i < tetroWidth; i++){
		for(var j = 0; j < tetroHeight; j++){
			color = colors[tetromino[piece][translatePiece(i, j, rotation)]];
			if(color !== colors[0]){
				drawRect(i + xPos, j + yPos, color);
			}
		}
	}
}

//place current piece on the board
function graftPiece(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var block = tetromino[piece][translatePiece(i,j,rotation)];
			if(block != 0){
				board[j + yPos][i + xPos] = block;
			}
		}
	}
}

function drop(){
	console.log("drop");
}

function gameLoop(){
	if(checkCollision(xPos, yPos + 1, rotation)){
		yPos+=1;
	}
	else{
		if(yPos < 0){
			score = 0;
			scoreBox.innerHTML = score;
			console.log("you lose"); 
			piece = 7;
			yPos = -4;
			xPos = 0;
			piece = Math.floor(Math.random() * 6);
			populateBoard();		
		}
		else{
			graftPiece();
			checkLines();
			piece = 7;
			setTimeout(function(){
				piece = Math.floor(Math.random() * (tetromino.length - 1));
				yPos = -4;
				xPos = 0;
			}, (lineList.length > 0 ? 800 : 0));
		}

	}
	drawStep();
}

// draw stuff
function drawStep(){
	c.clearRect(0,0,canvasWidth, canvasHeight);
	drawBoard();
	drawPiece();
}

var lineList = [];

// check lines
function checkLines(){
	lineList = [];
	 for(var j = 0; j < 4; j++){
 		if(j+yPos >= vertical){
 			continue;
 		}
	 	for(var i = 0; i < horizontal; i++){
	 		if(board[j+yPos][i] == 0){
	 			break;
	 		}
	 		else if(i == (horizontal - 1)){
	 			lineList.push(j + yPos);
	 		}
	 	}
	}

	for(var i = 0; i < lineList.length; i++){
		board[lineList[i]] = [7,7,7,7,7,7,7,7];
	}
 
 	if(lineList.length > 0){
 		setTimeout(removeLines, 800);
 	}
}

var scoreBox = document.getElementById("score");
scoreBox.innerHTML = "score: ";

function removeLines(){
	score+=100*Math.pow(2,lineList.length);
	console.log(score);
	scoreBox.innerHTML = "score: " + score;
	for(var i = 0; i < lineList.length; i++){
		board.splice(lineList[i], 1);
		board.unshift([0,0,0,0,0,0,0,0]);
	}
}

// initial steps
yPos = -4;
xPos = 0;
piece = Math.floor(Math.random() * (tetromino.length - 1));
console.log(piece);
populateBoard();
drawStep();
window.setInterval(gameLoop, 1000);


// event listeners
document.addEventListener("keydown", function(event){
	if(event.key == 'c'){
		piece = (piece + 1) % (tetromino.length - 1);
	}
	if(event.key == 'r'){
		var nxtRotation = (rotation + 90) % 360;
		rotation = (checkCollision(xPos, yPos, nxtRotation)) ? nxtRotation : rotation;
	}
	if(event.key == "ArrowRight"){
		xPos+=(checkCollision(xPos + 1, yPos, rotation)) ? 1 : 0;
	}
	if(event.key == "ArrowLeft"){
		xPos-=(checkCollision(xPos - 1, yPos, rotation)) ? 1 : 0;
	}
	if(event.key == "ArrowUp"){
		//console.log(checkCollision(xPos, yPos - 1, rotation));
		//yPos-=1;
		yPos-=(checkCollision(xPos, yPos - 1, rotation)) ? 1 : 0;
	}
	if(event.key == "ArrowDown"){
		yPos+=(checkCollision(xPos, yPos + 1, rotation)) ? 1 : 0;
	}
	if(event.key == "g"){
		graftPiece();
		xPos = 0;
		yPos = 0;
	}
	if(event.key == "f"){
		board.pop();
		board.unshift([0,0,0,0,0,0,0,0]);
	}

	drawStep();
});

// canvas holder
var canvasId = document.getElementById("can");
var c = canvasId.getContext("2D");

// inputs and button
var inputOne = document.getElementById("inputOne");
var inputTwo = document.getElementById("inputTwo");
var enterButton = document.getElementById("enterButton");

// variable that holds the maze array
var maze = [];

// dimensions
var width;
var height;

// position of the mazebuilder
var posX = 0;
var posY = 0;

// function that initializes the array
function initArray(w, h){
	maze = [];
	var len = w * h;
	for(var i = 0; i < len; i++){
		maze.push(0);
	}
}

// check directions
function checkDirections(x, y){
	var moveList = [];

	if(maze[y * ]){

	}
	if(){

	}
	if(){

	}
	if(){

	}

	return moveList;
}



// maze
function mazeBuilder(){
	width = inputOne.value;
	height = inputTwo.value;

	initArray(width, height);

	var posistionList = [];

	var moveList = [];

	posX = Math.ceil(Math.random() * width);
	posY = Math.ceil(Math.random() * height);

	while(positionList.length > 0){
		var moveList = checkDirections(x, y);


	}
}

// even listener for button
enterButton.addEventListener("click", function(){
	mazeBuilder();
});


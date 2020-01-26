// for generating maze
function pos(xPos, yPos){
    this.x = xPos,
    this.y = yPos
}

var player = new pos(0, 0);

maze = [];

positionList = [];

// height and width of the maze
var width = 0;
var height = 0;

// html hendlers
var input = document.getElementById("input");
var canvasId = document.getElementById("canvas");
var c = canvasId.getContext("2d");
var button = document.getElementById("button");

// width and height of the camvas
var canvasHeight = window.innerWidth;
var canvasWidth = window.innerWidth;

// alter canvas height and width
canvasId.width = canvasWidth;
canvasId.height = canvasHeight;

// vertical piece dimension
var xPos;
var yPos;

// line width
var vertWidth;
var horWidth;

// populate the maze
function populateMaze(){
    var len = width * height;
    for(var i = 0; i < len; i++){
        maze.push(false);
    }
}

// check surounding cells and return list of available options
function checkCells(){
    var posList = [];
    // up
    if(player.y < height - 1 && !maze[(player.y + 1) * width + player.x]){
        posList.push(1);
    }
    // down
    if(player.y > 0 && !maze[(player.y - 1) * width + player.x]){
        posList.push(2);
    }
    //left 
    if(player.x > 0 && !maze[player.y * width + player.x - 1]){
        posList.push(3);
    }
    // rgiht
    if(player.x < width - 1 && !maze[player.y * width + player.x + 1]){
        posList.push(4);
    }
    return posList;
}

// draw line
function drawLine(x, y, x1, y1){
	c.strokeStyle = "white";
	c.beginPath();
	c.lineWidth = (x == x1) ? vertWidth : horWidth;
	c.moveTo((x + 1) * xPos, (y + 1) * yPos);
	c.lineTo((x1 + 1) * xPos, (y1 + 1) * yPos);
	c.stroke();
}

function walk(){
    var posList = checkCells();
    
    if(posList.length == 0){
        positionList.pop();
        if(positionList.length > 0){
        	player = positionList[positionList.length - 1];
        }
    }
    else{
        var dir = posList[Math.floor(Math.random() * posList.length)];
        switch(dir){
            // Up
            case 1:
            	drawLine(player.x, player.y, player.x, player.y + 1);
                player.y++;
                break;
            // down
            case 2:
            	drawLine(player.x, player.y, player.x, player.y - 1);
                player.y--;
                break;
            // left
            case 3:
            	drawLine(player.x - 1, player.y, player.x, player.y);
                player.x--;
                break;
            // right
            case 4:
            	drawLine(player.x + 1, player.y, player.x, player.y);
                player.x++;
                break;
            default:
                break;
        }
        maze[player.y * width + player.x] = true;
        positionList.push(new pos(player.x, player.y));
    }
}

// buildMaze
function buildMaze(){
    // reset the board
    c.fillStyle = "black";
    c.fillRect(0,0,canvasWidth, canvasHeight);
    
    // draw new maze
    player.x = Math.floor(Math.random() * width);
    player.y = Math.floor(Math.random() * height);
    maze[player.y * width + player.x] = true;
    positionList.push(player);
    
    while(positionList.length > 0){
    	walk();
    }
    
    console.log("maze completed");
}

// event handler
button.addEventListener("click", function(){
	width = parseInt(input.value);
	height = width;

	if(width != "" && width != 0){
	    maze = [];

	   	xPos = canvasWidth / (width + 1);
	   	yPos = canvasHeight / (height + 1);

	   	vertWidth = canvasHeight / (height * 2 + 1);
	   	horWidth = canvasWidth / (width * 2 + 1);

	    populateMaze();
	    buildMaze();	            
	}
});
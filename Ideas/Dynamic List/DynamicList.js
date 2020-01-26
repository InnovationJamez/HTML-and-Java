// html object handlers
var addButton = document.getElementById("addButton");
var removeButton = document.getElementById("removeButton");
var list = document.getElementById("list");
var input = document.getElementById("input");
// list variable
var listVar = [];
var optionIdList = [];
var listString = "";

// function to draw the list
function drawString(){
	var len = listVar.length;
	listString = "\n";
	optionIdList = [];
	for(var i = 0; i < len; i++){
		listString += "<input id=\"" + i + "\"name=\"option\" type=\"radio\">" + listVar[i] + "<br>";
		optionIdList.push("" + i);
	}
	list.innerHTML = listString;
}

// remove if selected
function removeSelected(){
	var len = optionIdList.length;
	for(var i = 0; i < len; i++){
		if(document.getElementById(optionIdList[i]).checked){
			listVar.splice(i, 1);
		}
	}
}

// event handlers
addButton.addEventListener("click", function(){
	var text = input.value;
	input.value = "";
	listVar.push(text);
	drawString();
});

removeButton.addEventListener("click", function(){
	removeSelected();
	drawString();
});
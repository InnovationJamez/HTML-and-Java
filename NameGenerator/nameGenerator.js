var button = document.getElementById("genName");
var output = document.getElementById("output");

var saveList = document.getElementById("saveList");
var saveButton = document.getElementById("saveName");

var listOne = 
[
"Sugar",
"Sweet",
"Candy",
"Dextrin",
"Sugar Mon",
"Glucose",
"Sugary",
"Candied",
"Fructose"
];

var listTwo = 
[
"Hunt",
"Destruction",
"Crush",
"Pursuit",
"Fight",
"Elimination",
"Brawl",
"War",
"Battle",
"Punch",
"Combat",
"Charge",
"Strike",
"Rush",
"Action",
"Shooting",
"Shoot",
"Defence",
"Defender"
];

// min inclusive
// max exclusive
function genRandom(string){
	return Math.floor(Math.random() * string.length);
}

button.addEventListener("click", function(){
	var wordOne = listOne[genRandom(listOne)];
	var wordTwo = listTwo[genRandom(listTwo)];

	output.innerHTML = wordOne + " " + wordTwo + "\n";
});

saveButton.addEventListener("click", function(){
	saveList.innerHTML += "<li>" + output.innerHTML + "</li>";
});
var person = {
	firstName: "James",
	lastName: "Lehoe",
	age: 21,
	idNumber: "W00364946",
	fullName : function(){
		return this.firstName + " " + this.lastName;
	}
};

dec = 32;
bin = dec.toString(2);
hex = dec.toString(16);

cars = ["Audi","Ford","Hummer","Buick"];
listLen = cars.length;
sortedCars = cars.sort();
lastElement = listLen - 1;

var alphabet = "ABCDEFGHIJKLM" + 
"NOPQRSTUVWXYZ";
var numOfLetters = alphabet.length;

var x = "We are the so-called \"Vikings\" From the north";

function changeTxt(){
	document.getElementById("txt").innerHTML = cars[lastElement];
}

function changeColor(){
	document.getElementById("txt").style.color = "red";
}

function printSum(num1, num2){
	document.getElementById("txt").innerHTML = getSum(num1, num2);
}

function getSum(num1, num2){
	return num1 + num2;
}

function getTime(){
	document.getElementById("time").innerHTML = Date();
}

var fruits, textFruit, fruitLen, i, foods, text;
fruits = ["banana", "Orange", "Apple", "Mango", "Pinnapple"];

function fruitList(){
	fruitLen = fruits.length;

	textFruit = "<ul><br/>";
	for(i=0;i<fruitLen;i++){
		textFruit += "<li>" + fruits[i] + "</li><br/>";
	}
	textFruit += "</ul>";
	document.getElementById("fruit").innerHTML = textFruit;
}

function getVal(value){
	text += "<li>" + value + "</li><br/>";
}

function foodList(){
	foods = ["pizza", "salad", "chips", "pasta"];
	text = "<ul>";
	foods.forEach(getVal)
	text += "</ul>";
	document.getElementById("food").innerHTML = text;
}

function addFruit(value){
	fruits.push(value);
	fruitList();
}

function removeFruit(){
	fruits.shift();
	fruitList();
}
// input
var textInput = document.getElementById("textInput");

// radio select
var eSelect = document.getElementById("eSelect");
var dSelect = document.getElementById("dSelect");

// submitt button
var btn = document.getElementById("btn");

// output
var outPut = document.getElementById("outPut");

// key
var key = document.getElementById("key");

// letter list
letters = [
			'a','b','c','d','e','f','g','h','i','j',
			'k','l','m','n','o','p','q','r','s','t',
			'u','v','w','x','y','z','A','B','C','D',
			'E','F','G','H','I','J','K','L','M','N',
			'O','P','Q','R','S','T','U','V','W','Y',
			'Z','1','2','3','4','5','6','7','8','9',
			'0','~','!','@','#','$',' ',';',':','\'',
			'\"',',','.','/','<','>','?','[',']','{',
			'}','+','=','|'
];

// letterKey
letterKey = [
			'a','b','c','d','e','f','g','h','i','j',
			'k','l','m','n','o','p','q','r','s','t',
			'u','v','w','x','y','z','A','B','C','D',
			'E','F','G','H','I','J','K','L','M','N',
			'O','P','Q','R','S','T','U','V','W','Y',
			'Z','1','2','3','4','5','6','7','8','9',
			'0','~','!','@','#','$',' ',';',':','\'',
			'\"',',','.','/','<','>','?','[',']','{',
			'}','+','=','|'
];

function createKey(count){
	var a,b,c;
	for(var i = 0; i < count; i++){
		a = Math.floor(Math.random() * letterKey.length);
		b = Math.floor(Math.random() * letterKey.length);
		c = letterKey[a];
		letterKey[a] = letterKey[b];
		letterKey[b] = c;
	}
	key.value = letterKey;
}

createKey(60);

// function find index of a letter
function getLetterIndex(letter, list){
	for(var i = 0; i < list.length; i++){
		if(letter === list[i]){
			return i;
		}
	}

	return -1;
}

// encrypt function multiply
function useKey(direction){
	var text = textInput.value;
	var outPutText = "";
	for(var i = 0; i < text.length; i++){
		if(direction){
			outPutText += letterKey[getLetterIndex(text[i], letters)];
		}
		else{
			outPutText += letters[getLetterIndex(text[i], letterKey)];
		}
	}
	outPut.value = (direction ? "Encrypted Message: " : "Decrypted Message: ") + outPutText;
}

// event listener
btn.addEventListener("click", function(){
	if(eSelect.checked){
		useKey(true);
	}
	else{
		useKey(false);
	}
});


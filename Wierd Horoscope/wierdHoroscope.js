var hText = document.getElementById("hText");
var dateOption = document.getElementById("dateOption");
var dayOption = document.getElementById("dayOption");
var monthOption = document.getElementById("monthOption");
var select = document.getElementById("select");

var horoscopes = {
	"Aquarius":"There's travel in your future when your tongue freezes to the back of a speeding bus. Fill that void in your pathetic life by playing Whack-A-Mole seventeen hours a day.",
	"Pisces":"Try to avoid any Virgos or Leos with the Ebola virus. You are the true Lord of the Dance, no matter what those idiots at work say.",
	"Aries":"The look on your face will be priceless when you find that forty pound watermelon in your colon. Trade toothbrushes with an albino dwarf, then give a hickey to Meryl Streep.",
	"Taurus":"You will never find true happiness - what you gonna do, cry about it? The stars predict tomorrow you'll wake up, do a bunch of stuff, and then go back to sleep.",
	"Gemini":"Your birthday party will be ruined once again by your explosive flatulence. Your love life will run into trouble when your fiancée hurls a javelin through your chest.",
	"Cancer":"The position of Jupiter says that you should spend the rest of the week face down in the mud. Try not to shove a roll of duct tape up your nose while taking your driver's test.",
	"Leo":"Now is not a good time to photocopy your butt and staple it to your boss's face, oh no. Eat a bucket of tuna-flavored pudding, then wash it down with a gallon of strawberry Quik.",
	"Virgo":"All Virgos are extremely friendly and intelligent - except for you. Expect a big surprise today when you wind up with your head impaled upon a stick.",
	"Libra":"A big promotion is just around the corner for someone much more talented than you. Laughter is the very best medicine, remember that when your appendix bursts next week.",
	"Scorpio":"Get ready for an unexpected trip when you fall screaming from an open window. Work a little bit harder on improving your low self-esteem, you stupid freak.",
	"Sagittarius":"All your friends are laughing behind your back (kill them). Take down all those naked pictures of Ernest Borgnine you've got hanging in your den.",
	"Capricorn":"The stars say that you're an exciting and wonderful person, but you know they're lying. If I were you, I'd lock my doors and windows and never never never never never leave my house again.",
};

select.addEventListener("change", function(){
	console.log(select.value);
	hText.innerHTML = horoscopes[select.value];
});

function getSign(){
	var month = parseInt(monthOption.value);
	var day = parseInt(dayOption.value);
	var sign = "none";
	switch(month){
		case 1:
			if(day > 19){
				sign = "Aquarius";
			}
			else{
				sign = "Capricorn";
			}
			break;
		case 2:
			if(day > 18){
				sign = "Pisces";
			}
			else{
				sign = "Aquarius"
			}
			break;
		case 3:
			if(day > 20){
				sign = "Aries";
			}
			else{
				sign = "Pisces"
			}
			break;
		case 4:
			if(day > 19){
				sign = "Taurus";
			}
			else{
				sign = "Aries";
			}
			break;
		case 5:
			if(day > 20){
				sign = "Gemini";
			}
			else{
				sign = "Taurus";
			}
			break;
		case 6:
			if(day > 20){
				sign = "Cancer";
			}
			else{
				sign = "Gemini";
			}
			break;
		case 7:
			if(day > 22){
				sign = "Leo";
			}
			else{
				sign = "Cancer";
			}
			break;
		case 8:
			if(day > 22){
				sign = "Virgo";
			}
			else{
				sign = "Leo";
			}
			break;
		case 9:
			if(day > 22){
				sign = "Libra";
			}
			else{
				sign = "Virgo";
			}
			break;
		case 10:
			if(day > 22){
				sign = "Scorpio";
			}
			else{
				sign = "Libra";
			}
			break;
		case 11:
			if(day > 21){
				sign = "Sagittarius";
			}
			else{
				sign = "Scorpio";
			}
			break;
		case 12:
			if(day > 21){
				sign = "Capricorn";
			}
			else{
				sign = "Sagittarius";
			}
			break;		
		default:
			break;	
	}
	hText.innerHTML = sign + "<br><br>" + horoscopes[sign];
}

dateOption.addEventListener("click", function(){
	if(monthOption.value != 0 && dayOption.value != 0){
		getSign();
	}
});

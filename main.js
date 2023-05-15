var navLink = document.getElementById("navLink");
var notes = document.getElementById("notes-text");
var submitNotes = document.getElementById('textButton');

var numFlashcards=0;
var stringCompare;
var tempString;
var charChecker = 0;
var tempChar;
var aCounter;
var slideIndex;

//when user submits notes, generate the flashcards
submitNotes.onclick = function getInput(){
	notes = document.getElementsByTagName("textarea")[0].value;

	//add two spaces to the end of the program to signal that it is done
	notes =notes+"~~~||";
	//go through each char and count the number of flashcards to make if first char = index 0
	for (let i = 0; i < notes.length-3;i++){
		//var to count spaces between Q: and A: 
		aCounter = 3;
		if (notes.charAt(i).localeCompare("Q")===0){
			if (notes.charAt(i+1).localeCompare(":")===0){
				if (notes.charAt(i+2).localeCompare(" ")===0){
					while (notes.charAt(i+aCounter).localeCompare("A")!=0||notes.charAt(i+aCounter+1).localeCompare(":")!=0||notes.charAt(i+aCounter+2).localeCompare(" ")!=0){
						aCounter++;
						//if no answer to a question, alert and then break out of function
						if (i+aCounter>notes.length-3){
							alert("An answer was not provided to a question. You may need to check formatting.");
							return false;
							break;
						}
					}
					numFlashcards ++;
				}
			}
		}
	}
	console.log(numFlashcards);
	//if no flashcards to make, alert and then break out of function
	if (numFlashcards==0){
		alert("No flashcards were made. Check proper formatting.");
		return false;
	}
	
	//make an array to store the questions and one to store the answers
	let questions = [];
	let answers = [];
 
	//set charchecker to the first question
	while(notes.charAt(charChecker).localeCompare("Q")!=0||notes.charAt(charChecker+1).localeCompare(":")!=0||notes.charAt(charChecker+2).localeCompare(" ")!=0){
		charChecker++;
		if (charChecker>notes.length){
			break;
		}
	}
	charChecker+=3;

	//use a for loop to fill the arrays with each question and answer
	for (let j = 0;j<numFlashcards;j++){
		//question string
		tempString = "";
		while(notes.charAt(charChecker).localeCompare("A")!=0||notes.charAt(charChecker+1).localeCompare(":")!=0||notes.charAt(charChecker+2).localeCompare(" ")!=0){
			tempChar=notes.charAt(charChecker);
			tempString =tempString.concat(tempChar);
			charChecker++;
		}
		charChecker+=3;	
		questions.push("Q: "+tempString);
		
		//answer string
		tempString = "";


		//if we aren't on the final flashcard, then read chars until Q: shows up
		if (j != numFlashcards-1){
			while(notes.charAt(charChecker).localeCompare("Q")!=0||notes.charAt(charChecker+1).localeCompare(":")!=0||notes.charAt(charChecker+2).localeCompare(" ")!=0){
				tempChar=notes.charAt(charChecker);
				tempString =tempString.concat(tempChar);
				charChecker++;
			}
			charChecker+=3;	
			answers.push("A: "+tempString);  
		}

		//if on final flashcard, read the final chars and put it into answer. We know to stop when we have 5 consecutive spaces
		else{
			do{
				tempChar=notes.charAt(charChecker);
				tempString =tempString.concat(tempChar);
				charChecker++;
			}
			//while notes don't equal to the signal to finish reading
			while(notes.charAt(charChecker).localeCompare("~")!=0 ||notes.charAt(charChecker+1).localeCompare("~")!=0||notes.charAt(charChecker+2).localeCompare("~")!=0||notes.charAt(charChecker+3).localeCompare("|")!=0||notes.charAt(charChecker+4).localeCompare("|")!=0);
			answers.push("A: "+tempString);
		}
		       
	}

	//TEMP
	for (let z = 0; z< numFlashcards;z++){
		console.log(questions[z]);
		console.log(answers[z]);
	}
}

// Background
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var css = document.querySelector(".cssGrad");
var body = document.getElementById('gradient');

function setGradient() {
  body.style.background =
  "linear-gradient(to right,"
  + color1.value
  + ","
  + color2.value
  + ")";
  css.textContent = body.style.background + ";";
}

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);


// To Do list
  // check off selected todos
$("ul").on("click", "li", function(){
	$(this).toggleClass("completed");
});

  // Delete Todo
$("ul").on("click", "span", function(){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

  //Add new Todo
$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		var todoText = $(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	}
});

  //Click the plus icon to remove input area
$(".fa-minus").click(function(){
	$("#listInput").fadeToggle();
  $(this).toggleClass("fa-minus fa-plus");
});


//Score keeper
var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var resetBtn = document.getElementById("reset");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var numInput = document.querySelector(".scoreInput");
var winnerScoreDisplay = document.querySelector("p span");
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function() {
	if(!gameOver){
	p1Score++;
	if(p1Score === winningScore){
		p1Display.classList.add("winner");
		alert("Gamer Over!");
		gameOver = true;
	}
	console.log(p1Score);
	p1Display.textContent = p1Score;
	}
});

p2Button.addEventListener("click", function(){
	if(!gameOver){
		p2Score++;
		if(p2Score === winningScore) {
			p2Display.classList.add("winner");
			alert("Gamer Over!");
			gameOver = true;
		}
	}
	console.log(p2Score);
	p2Display.textContent = p2Score;
});

resetBtn.addEventListener("click", function(){
	reset();
  $('.scoreInput').val('');
});

function reset() {
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = 0;
	p2Display.textContent = 0;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
	gameOver = false;
}

numInput.addEventListener("change", function(){
	winnerScoreDisplay.textContent = numInput.value;
	winningScore = Number(numInput.value);
	reset();
})


// Color Games
var numSquares = 6;
var colors = [];
var pickedColor;
var h1 = document.querySelector("#colorH1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#colorsReset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	setupModeButtons();
	setupSquares();
	newGame();
}

function setupModeButtons(){
		for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			newGame();
		});
	}
}

function setupSquares(){
	for(var i = 0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				resetButton.textContent ="Play Again?";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function newGame(){
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
	newGame();
})

function changeColors(color) {
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	var arr = []
	for(var i = 0; i < num; i++){
		arr.push(randomColor())
	}
	return arr;
}

function randomColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b +")";
}

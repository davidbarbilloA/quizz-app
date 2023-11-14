// Referencias
const quizdisplay = document.getElementById("display");
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let wrapper = document.getElementById("wrapper");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//matriz de preguntas y opciones
const quizArray = [
	{
		id: "0",
		question: "What does HTML stand for?",
		options: ["Hypertext Markup Language", "High Tech Modern Language", "Hypertext and Text Markup Language", "Home Tools Markup Language"],
		correct: "Hypertext Markup Language"
	},
	{
		id: "1",
		question: "Which HTML tag is used to create a hyperlink?",
		options: ["li", "a", "p", "hr"],
		correct: "a"
	},
	{
		id: "2",
		question: "Which tag is used to define the structure of an image in HTML?",
		options: ["img", "picture", "image", "src"],
		correct: "img"
	},
	{
		id: "3",
		question: "Which element is used to define the largest heading?",
		options: ["head", "h6", "heading", "h1"],
		correct: "h1"
	},
	{
		id: "4",
		question: "What is the correct HTML element for creating an unordered list?",
		options: ["ol", "list", "ul", "li"],
		correct: "ul"
	}
];
// reiniciar el juego
restart.addEventListener("click", () => {
	inital(); //llamado function inicial
	wrapper.classList.remove("hide");
	scoreContainer.classList.add("hide");
});
// Next button
nextBtn.addEventListener(
	"click",
	(displayNext = () => {
		//inccremento questionCount
		questionCount += 1;
		//if siguiente question
		if (questionCount == quizArray.length) {
			//ocultar el contenedor de preguntas y mostrar la puntuación
			wrapper.classList.add("hide");
			scoreContainer.classList.remove("hide");
			// user score
			userScore.innerHTML =
				"You score is " + scoreCount + " out of " + questionCount;
		} else {
			//display questionCount
			countOfQuestion.innerHTML =
				questionCount + 1 + " of " + quizArray.length + " Question";
			//display Quiz
			quizDisplay(questionCount);
			//count=11 (para que empiece con 10)
			count = 11;
			clearInterval(countdown);
			//display timer (inicio countdown)
			timerDisplay();
		}
	})
);
// Tiempo
const timerDisplay = () => {
	countdown = setInterval(() => {
		count--;
		timeLeft.innerHTML = `${count}s`;
		if (count == 0) {
			//cuando la cuenta regresiva llega a 0, clearInterval y pasa a la siguiente pregunta
			clearInterval(countdown);
			displayNext();
		}
	}, 1000);
};
//display quiz
const quizDisplay = (questionCount) => {
	let quizCards = document.querySelectorAll(".container_mid");
	//ocultar otras cartas
	quizCards.forEach((card) => {
		card.classList.add("hide");
	});
	//mostrar la tarjeta de preguntas actual
	quizCards[questionCount].classList.remove("hide");
};
// Quiz creation
function quizCreator() {
	//ordenar preguntas aleatoriamente
	quizArray.sort(() => Math.random() - 0.5);
	//generate quiz
	for (let i of quizArray) {
		//ordenar ajustes aleatoriamente
		i.options.sort(() => Math.random() - 0.5);
		//quiz card creacion
		let div = document.createElement("div");
		div.classList.add("container_mid", "hide");
		//question numero
		countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
		//question
		let question_DIV = document.createElement("p");
		question_DIV.classList.add("question");
		question_DIV.innerHTML = i.question;
		div.appendChild(question_DIV);
		//opciones
		div.innerHTML += `
<button class="option-div" onclick="checker(this)">${i.options[0]}</button>
<button class="option-div" onclick="checker(this)">${i.options[1]}</button>
<button class="option-div" onclick="checker(this)">${i.options[2]}</button>
<button class="option-div" onclick="checker(this)">${i.options[3]}</button>

`;
		quizContainer.appendChild(div);
	}
}
// revisa si la opcion es correcta
function checker(userOption) {
	let userSolution = userOption.innerText;
	let question = document.getElementsByClassName("container_mid")[questionCount];
	let options = question.querySelectorAll(".option-div");
	//si el usuario hizo clic en una respuesta == opción correcta almacenada en el objeto
	if (userSolution === quizArray[questionCount].correct) {
		//fondo verde e incremento de puntuación
		userOption.classList.add("correct");
		scoreCount++;
	} else {
		//fondo rojo
		userOption.classList.add("inCorrect");
		//Para marcar verde (correcto)
		options.forEach((element) => {
			if (element.innerText == quizArray[questionCount].correct) {
				element.classList.add("correct");
			}
		});
	}
	//clear interval(stop timer)
	clearInterval(countdown);
	//deshabilita todas las opciones
	options.forEach((element) => {
		element.disabled = true;
	});
}
//initial setup
function inital() {
	quizContainer.innerHTML = "";
	questionCount = 0;
	scoreCount = 0;
	clearInterval(countdown);
	count = 11;
	timerDisplay();
	quizCreator();
	quizDisplay(questionCount);
}
//Start Button Code
startButton.addEventListener("click", () => {
	startScreen.classList.add("hide");
	wrapper.classList.remove("hide");
	inital();
});

window.onload = () => {
	startScreen.classList.remove("hide");
	wrapper.classList.add("hide");
};

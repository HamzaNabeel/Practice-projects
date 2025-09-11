const quesctions = [
    {
        quesction: "Which is largest animal in the world",
        answers:[
            {text: "shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephent", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
         quesction: "Which is the smallest country in the world?",
        answers:[
            {text: "Vatican City", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri Lanka", correct: false},
        ]
    },
    {
         quesction: "Which is the Smallest continent in the world?",
        answers:[
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
         quesction: "Which is the largest desert in the world",
        answers:[
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antarctica", correct: true},
        ]
    }
];

const quesctionElement = document.getElementById("quesction");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuesctionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuesctionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = quesctions[currentQuesctionIndex];
    let questionNo = currentQuesctionIndex + 1;
    quesctionElement.innerHTML = questionNo + ". " + currentQuestion.quesction;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    quesctionElement.innerHTML = `You scroed ${score} out of ${quesctions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuesctionIndex++;
    if(currentQuesctionIndex < quesctions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuesctionIndex < quesctions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();     
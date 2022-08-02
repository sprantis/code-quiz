// define variables
let main = document.querySelector("#main");
let intro = document.querySelector("#intro");
let start = document.querySelector("#start");
let time = document.querySelector("#time");
let timeRemaining = 61;
let timerInterval = null;
let totalScore = 0;
let index = 0;
let scoresArray = []; 
let section = document.createElement("section");
let row = document.createElement("section");
let space = document.createElement("section");
let field = document.createElement("input");
let button = document.createElement("input");
let resetScoreButton = document.createElement("input");
let getStorage = localStorage.getItem("savedScores") || "[]";
let result = document.createElement('div');
let postedScoreContainer = document.createElement('div');
let questionDiv = document.querySelector("#question");
let possibleAnswersDiv = document.querySelector("#possibleAnswers");
let correctAnswerDiv = document.querySelector("#correctAnswer");

let questions = [
    "What symbols represent an array in code?", 
    "What is JavaScript?", 
    "What does HTML stand for?", 
    "True and false are what data type?", 
    "What does API stand for?"
];

let possibleAnswers = [
    [
        '<>',
        '{}',
        '[]'
    ],
    [
        'A scripting language for web development',
        'Coffee Font',
        'A tool for optimizing computer memory'
    ],
    [
        'Hypertext Markup Language',
        'Hot Tamales',
        'How To Make Lemonade'
    ],
    [
        'String',
        'Boolean',
        'Bouillon'
    ],
    [
        'Apples, Pears, & Igloos',
        'Application Programming Interface',
        'Alternative Pattern Interpretation'
    ]
];

let correctAnswers = [
    '[]',
    'A scripting language for web development', 
    'Hypertext Markup Language',
    'Boolean',
    'Application Programming Interface'
];

// trigger when quiz starts
function hideIntro() {
    intro.remove();
    start.remove();
  };

function startTime() {
    timerInterval = setInterval(countdown, 1000);
};

function displayCard() {
    questionDiv.textContent = "";
    possibleAnswersDiv.textContent = "";
    correctAnswerDiv.textContent = "";    
    //Prompt question
    if (document.querySelector("#question") !== null){
        document.querySelector("#question").textContent = questions[index];
    }
    
    //Generate buttons for all possibleAnswers per question
    for (let i = 0; i < 3; i++) {
        let answerButton = document.createElement("button");
        answerButton.setAttribute("class", "button-choice");
        answerButton.textContent = possibleAnswers[index][i];
        answerButton.onclick = checkResults;
        document.querySelector("#possibleAnswers").append(answerButton);
    };
};

// verified answer is correct or incorrect
function checkResults() {
  // Using alerts to check for correct answer: https://getbootstrap.com/docs/4.0/components/alerts/
    if (this.textContent == correctAnswers[index]) {
        result.textContent = "Correct!";
        result.setAttribute('class', 'alert alert-success');
        result.setAttribute('role', 'alert');
        totalScore++;
    } else {
        result.textContent = "Incorrect!";
        result.setAttribute('class', 'alert alert-danger');
        result.setAttribute('role', 'alert');
        loseTime();
    };

    index++;
  
    // If user moves proceeds passed the number of questions, the game is over
    if (index > questions.length - 1) {
        gameOver();
    };
  
    displayCard();
};

// timer countdown that stops game when it reaches zero
function countdown() {
    timeRemaining--;
    time.textContent = timeRemaining + "s";
  
    if (timeRemaining <= 0) {
        gameOver();
    };
};
// player loses 10 seconds for every incorrect answer
function loseTime() {
    timeRemaining -= 10;
    time.textContent = timeRemaining + "s";

    if (timeRemaining <= 0) {
        gameOver();
    };
};

// set array of answers into local storage
function setStorage(array) {
    localStorage.setItem("savedScores", JSON.stringify(array));
};

// ability to submit score by player
function submitScore() {
    let currentScore = {
        name: document.getElementById("field").value + " : ",
        points: totalScore
    }

    const newScore = {
        score: currentScore.name + currentScore.points
    };
    // parse local storage values to string
    scoresArray = JSON.parse(getStorage);
    scoresArray.push(newScore);
  
    time.textContent = "SCORES";
    section.textContent = currentScore.name + currentScore.points;
    
    resetScoreButton.setAttribute("id", "resetScore");
    resetScoreButton.setAttribute("type", "submit");
    resetScoreButton.setAttribute("value", "Reset Score")
    resetScoreButton.setAttribute("class", "d-flex justify-content-center");
    main.appendChild(resetScoreButton);

    
    main.append(postedScoreContainer);

    for (let i = 0; i < scoresArray.length; i++){
        let postedScore = document.createElement('div');
        // source for removing quotation marks from beginning and end of string: https://stackoverflow.com/questions/19156148/i-want-to-remove-double-quotes-from-a-string
        postedScore.textContent = String(JSON.stringify(scoresArray[i].score).replace(/['"]+/g, ''));
        postedScore.setAttribute("class", "posted-score");
        postedScoreContainer.append(postedScore)
    };

    setStorage(scoresArray);

    // Reconfigure submit score page
    field.remove();
    button.setAttribute("id", "startOver");
    button.setAttribute("value", "Start Over");
    
    document.getElementById("startOver").addEventListener("click", startOver);
    document.getElementById("resetScore").addEventListener("click", resetScore);
};

// function to stop game and display results
function gameOver() {
    clearInterval(timerInterval);
    questionDiv.remove();
    possibleAnswersDiv.remove();
  
    time.textContent = "GAME OVER";
    time.setAttribute("class", "col-md-12 d-flex justify-content-center");

    section.textContent = "Your Score: " + totalScore;
    section.setAttribute("class", "col-md-12 d-flex justify-content-center");
    main.appendChild(section);

    row.setAttribute("class", "row justify-content-center");
    main.appendChild(row);

    space.setAttribute("class", "d-flex justify-content-center");
    row.appendChild(space);

    field.setAttribute("type", "text");
    field.setAttribute("placeholder", "Enter Initials");
    field.setAttribute("id", "field");
    field.setAttribute("class", "d-flex justify-content-center");
    row.appendChild(field);

    button.setAttribute("type", "submit");
    button.setAttribute("id", "submitButton");
    button.setAttribute("class", "d-flex justify-content-center");
    row.appendChild(button);

    document.getElementById("submitButton").addEventListener("click", submitScore);
};

function startOver() {
    location.reload();
};

function resetScore() {
    localStorage.clear();
    postedScoreContainer.remove();
};

result.setAttribute("id", "result");
document.body.prepend(result);
intro.textContent = "Press Start Quiz to begin.";
start.addEventListener("click", displayCard);
start.addEventListener("click", hideIntro);
start.addEventListener("click", startTime);



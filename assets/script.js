// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

let main = document.querySelector("#main");
let start = document.querySelector("#start");
let intro = document.querySelector("#intro");
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


function hideIntro() {
    intro.remove();
    start.remove();
  };

function startTime() {
    timerInterval = setInterval(countdown, 1000);
};

function displayCard() {
    document.querySelector("#question").textContent= "";
    document.querySelector("#possibleAnswers").textContent= "";
    document.querySelector("#correctAnswer").textContent= "";
    
    //Prompt question
    document.querySelector("#question").textContent = questions[index];
    
    //Generate buttons for all possibleAnswers per question
    for (let i = 0; i < possibleAnswers[index].length; i++) {
        let answerButton = document.createElement("button");
        answerButton.setAttribute("class", "button-choice");
        answerButton.textContent = possibleAnswers[index][i];
        answerButton.onclick = checkResults;
        document.querySelector("#possibleAnswers").append(answerButton);
    };
};

function checkResults() {
  // Using alerts to check for correct answer: https://getbootstrap.com/docs/4.0/components/alerts/
    if (this.textContent == correctAnswers[index]) {
        let success = document.createElement('div');
        success.textContent = "Correct!";
        success.setAttribute('class', 'alert alert-success');
        success.setAttribute('role', 'alert');
        document.body.appendChild(success);
        totalScore++;
    } else {
        let failure = document.createElement('div');
        failure.textContent = "Incorrect!";
        failure.setAttribute('class', 'alert alert-danger');
        failure.setAttribute('role', 'alert');
        document.body.appendChild(failure);
        loseTime();
    };

    index++;
  
    // If user moves proceeds passed the number of questions, the game is over
    if (index > questions.length - 1) {
        gameOver();
    };
  
    displayCard();
};

function countdown() {
    timeRemaining--;
    time.textContent = timeRemaining + "s";
  
    if (timeRemaining <= 0) {
        gameOver();
    };
};

function loseTime() {
    timeRemaining -= 10;
    time.textContent = timeRemaining + "s";

    if (timeRemaining <= 0) {
        gameOver();
    };
};

function setStorage(array) {
    localStorage.setItem("savedScores", JSON.stringify(array));
};

function submitScore() {
    let currentScore = document.getElementById("field").value + ": " + totalScore;

    const newScore = {
        score: currentScore
    };

    scoresArray = JSON.parse(getStorage);
    scoresArray.push(newScore);
  
    time.textContent = "SCORES";
    section.textContent = currentScore;
    
    // Need to work on this
    for (let i = 0; i < scoresArray.length; i++){
        main.append(JSON.stringify(scoresArray[i].score.split('"')));
    };

    setStorage(scoresArray);

    // Reconfigure submit score page
    field.remove();
    button.setAttribute("id", "startOver");
    button.setAttribute("value", "Start Over");
    
    //resetScoreButton clears localStorage, but score still remains on page until reload.
    resetScoreButton.setAttribute("id", "resetScore");
    resetScoreButton.setAttribute("type", "submit");
    resetScoreButton.setAttribute("value", "Reset Score")
    resetScoreButton.setAttribute("class", "d-flex justify-content-center");
    main.appendChild(resetScoreButton);
    
    document.getElementById("startOver").addEventListener("click", startOver);
    document.getElementById("resetScore").addEventListener("click", resetScore);
};

function gameOver() {
    clearInterval(timerInterval);
  
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

// Reload page to start over
function startOver() {
    location.reload();
};

function resetScore() {
    localStorage.clear();
};

intro.textContent = "Press Start Quiz to begin.";
start.addEventListener("click", displayCard);
start.addEventListener("click", hideIntro);
start.addEventListener("click", startTime);



// --- Mood Slider Logic ---
const moodSlider = document.getElementById('mood-slider');
const moodValue = document.getElementById('mood-value');

moodSlider.addEventListener('input', function() {
    moodValue.innerText = this.value;
});

// --- Mini Quiz Logic ---
const questions = [
    {
        question: "What was the exact date of our very first phone call?",
        answers: [
            { text: "September 28, 2024", correct: true },
            { text: "October 15, 2024", correct: false },
            { text: "September 1, 2024", correct: false },
            { text: "August 28, 2024", correct: false }
        ]
    },
    {
        question: "If Toby could talk, who would he say is his favorite human?",
        answers: [
            { text: "Me (I feed him!)", correct: false },
            { text: "River", correct: true },
            { text: "The mailman", correct: false },
            { text: "He hates everyone equally", correct: false }
        ]
    },
    {
        question: "If I could only eat one meal for the rest of my life, what would it be?",
        answers: [
            { text: "Pizza", correct: false },
            { text: "Tacos", correct: false },
            { text: "Panda Express", correct: true },
            { text: "Burgers", correct: false }
        ]
    },
    {
        question: "Which video game could I spend absolutely hours playing without getting bored?",
        answers: [
            { text: "World of Warcraft", correct: false },
            { text: "Call of Duty", correct: true },
            { text: "Ilo and Milo", correct: false },
            { text: "Minecraft", correct: false }
        ]
    },
    {
        question: "What is the one place I would drop everything to travel to right now?",
        answers: [
            { text: "Six Flags", correct: false },
            { text: "Wherever my girlfriend happens to be", correct: true },
            { text: "A cabin in the mountains", correct: false },
            { text: "Europe", correct: false }
        ]
    },
    {
        question: "Who is officially the most likely to fall asleep first while watching a movie?",
        answers: [
            { text: "Me", correct: false },
            { text: "River", correct: true },
            { text: "Toby", correct: false },
            { text: "We both fall asleep at the same time", correct: false }
        ]
    },
    {
        question: "What do I consider to be our best adventure so far?",
        answers: [
            { text: "The first day we ever messaged", correct: true },
            { text: "Our first road trip", correct: false },
            { text: "Moving in together", correct: false },
            { text: "Getting Toby", correct: false }
        ]
    },
    {
        question: "Where are we heading for our next big trip together?",
        answers: [
            { text: "The beach", correct: false },
            { text: "Together at home", correct: true },
            { text: "A big city", correct: false },
            { text: "Disney World", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreContainer = document.getElementById("score-container");
const scoreText = document.getElementById("score-text");
const restartBtn = document.getElementById("restart-btn");
const quizContainer = document.getElementById("quiz-container");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add("hide");
    restartBtn.classList.add("hide");
    quizContainer.classList.remove("hide");
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        score++;
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    quizContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    
    if (score === questions.length) {
        scoreText.innerText = `You scored ${score} out of ${questions.length}! You know me perfectly 💜`;
    } else {
        scoreText.innerText = `You scored ${score} out of ${questions.length}! 💜`;
    }
    
    restartBtn.classList.remove("hide");
}

restartBtn.addEventListener("click", startQuiz);

// Start the quiz when the page loads
startQuiz();

// --- Journal Logic (Optional placeholder for saving) ---
const saveBtn = document.getElementById('save-btn');
const journalEntry = document.getElementById('journal-entry');

saveBtn.addEventListener('click', function() {
    if(journalEntry.value.trim() !== "") {
        alert("Entry saved successfully!");
        journalEntry.value = ""; // Clear after saving
    } else {
        alert("Please write something before saving.");
    }
});

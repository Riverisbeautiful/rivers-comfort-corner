(function(){ emailjs.init("RETQEL0saMrVGt7oV"); })();

const SHEETDB_URL = "https://sheetdb.io/api/v1/xb51jgx377pa0";

document.addEventListener('DOMContentLoaded', () => {
    
    loadJournalEntries();

    // Diary/Send Logic with Safety Checks
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const noteInput = document.getElementById('riverNote');
            if (!noteInput) {
                alert("Error: Could not find text box.");
                return;
            }
            
            const note = noteInput.value;
            if(!note.trim()) { 
                alert("Please write something first!"); 
                return; 
            }

            const currentDate = new Date().toLocaleString();
            console.log("Saving entry:", note);

            // 1. Send Email Notification
            emailjs.send("service_xac90mk", "template_q4hqvuc", { 
                message: "New Journal Entry: " + note 
            }).catch(err => console.error("EmailJS Error:", err));

            // 2. Save to Google Sheet Database
            fetch(SHEETDB_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: [
                        { date: currentDate, message: note }
                    ]
                })
            })
            .then(response => response.json())
            .then(data => {
                alert("Your thoughts have been saved to our journal. I'm listening.");
                noteInput.value = "";
                loadJournalEntries();
            })
            .catch(error => {
                console.error('SheetDB Error:', error);
                alert("Saved to email, but had trouble updating the visual journal list.");
            });
        });
    } else {
        console.error("Could not find element with id 'sendBtn'");
    }

    // Function to fetch and display past entries (Case-Insensitive Fix)
    function loadJournalEntries() {
        const entriesContainer = document.getElementById('entriesList');
        if (!entriesContainer) return;

        fetch(SHEETDB_URL)
            .then(response => response.json())
            .then(data => {
                if (!data || data.length === 0) {
                    entriesContainer.innerHTML = "<p style='font-size:12px; color:#888; text-align:center;'>No entries yet. Write the first one!</p>";
                    return;
                }
                
                entriesContainer.innerHTML = "";
                data.reverse().forEach(entry => {
                    const keys = Object.keys(entry);
                    const dateKey = keys.find(k => k.toLowerCase() === 'date') || keys[0];
                    const messageKey = keys.find(k => k.toLowerCase() === 'message' || k.toLowerCase() === 'note' || k.toLowerCase() === 'text') || keys[1];
                    
                    const entryDate = entry[dateKey] || 'Recent';
                    const entryMessage = entry[messageKey] || entry[keys[1]] || '';

                    const card = document.createElement('div');
                    card.className = 'entry-card';
                    card.innerHTML = `<span class="entry-date">${entryDate}</span>${entryMessage}`;
                    entriesContainer.appendChild(card);
                });
            })
            .catch(() => {
                entriesContainer.innerHTML = "<p style='font-size:12px; color:#888; text-align:center;'>Could not load past entries.</p>";
            });
    }

    // Mood Slider Logic
    const sendMoodBtn = document.getElementById('sendMoodBtn');
    if (sendMoodBtn) {
        sendMoodBtn.addEventListener('click', () => {
            const slider = document.getElementById('moodSlider');
            const moodMap = { 1: "Low", 2: "A bit down", 3: "Okay", 4: "Good", 5: "Great!" };
            const moodText = slider ? moodMap[slider.value] : "Okay";
            
            emailjs.send("service_xac90mk", "template_q4hqvuc", { 
                message: "River's mood update: " + moodText 
            }).then(() => {
                alert("Mood updated! Thanks for sharing, love.");
            });
        });
    }

    // Hug Logic
    const hugBtn = document.getElementById('hugBtn');
    const hugOverlay = document.getElementById('hugOverlay');
    const closeHugBtn = document.getElementById('closeHugBtn');

    if (hugBtn && hugOverlay) {
        hugBtn.addEventListener('click', () => { hugOverlay.style.display = 'flex'; });
    }
    if (closeHugBtn && hugOverlay) {
        closeHugBtn.addEventListener('click', () => { hugOverlay.style.display = 'none'; });
    }

    // Game/Reminder Logic
    const gameBtn = document.getElementById('gameBtn');
    const gameOverlay = document.getElementById('gameOverlay');
    const closeGameBtn = document.getElementById('closeGameBtn');

    if (gameBtn && gameOverlay) {
        gameBtn.addEventListener('click', () => {
            const msgs = [
                "You're the best thing that ever happened to me.",
                "I'm counting down the days until I see you.",
                "Remember that you are so deeply loved.",
                "Toby and I are sending you the biggest hugs!",
                "You make my world so much brighter."
            ];
            const affirmText = document.getElementById('affirmationText');
            if (affirmText) {
                affirmText.innerText = msgs[Math.floor(Math.random() * msgs.length)];
            }
            gameOverlay.style.display = 'flex';
        });
    }
    if (closeGameBtn && gameOverlay) {
        closeGameBtn.addEventListener('click', () => { gameOverlay.style.display = 'none'; });
    }

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
        if (!questionElement || !answerButtonsElement) return;
        currentQuestionIndex = 0;
        score = 0;
        if (scoreContainer) scoreContainer.classList.add("hide");
        if (restartBtn) restartBtn.classList.add("hide");
        if (quizContainer) quizContainer.classList.remove("hide");
        showQuestion();
    }

    function showQuestion() {
        resetState();
        let currentQuestion = questions[currentQuestionIndex];
        if (questionElement) questionElement.innerText = currentQuestion.question;

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
        while (answerButtonsElement && answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const isCorrect = selectedButton.dataset.correct === "true";
        
        if (isCorrect) score++;

        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }

    function showScore() {
        resetState();
        if (quizContainer) quizContainer.classList.add("hide");
        if (scoreContainer) scoreContainer.classList.remove("hide");
        
        if (scoreText) {
            if (score === questions.length) {
                scoreText.innerText = `You scored ${score} out of ${questions.length}! You know me perfectly 💜`;
            } else {
                scoreText.innerText = `You scored ${score} out of ${questions.length}! 💜`;
            }
        }
        
        if (restartBtn) restartBtn.classList.remove("hide");
    }

    if (restartBtn) {
        restartBtn.addEventListener("click", startQuiz);
    }
    
    // Initialize the quiz if elements exist on the page
    if (questionElement) {
        startQuiz();
    }
});

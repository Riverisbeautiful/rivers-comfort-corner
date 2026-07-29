// --- Quiz Data Definition ---
const quizQuestions = [
    {
        question: "1. The Origin Story: When was our first call?",
        options: [
            { text: "August 14, 2023", correct: false },
            { text: "September 28, 2023", correct: true },
            { text: "October 5, 2023", correct: false }
        ]
    },
    {
        question: "2. The Pet Parent: Who does Toby the cat consider his absolute favorite?",
        options: [
            { text: "River", correct: true },
            { text: "Antonio", correct: false },
            { text: "The delivery driver", correct: false }
        ]
    },
    {
        question: "3. The Favorites: What is our go-to food choice?",
        options: [
            { text: "Fancy Italian Bistro", correct: false },
            { text: "Panda Express", correct: true },
            { text: "Homemade sushi", correct: false }
        ]
    },
    {
        question: "4. The Gamer/Hobbyist: What game could be played for hours?",
        options: [
            { text: "Call of Duty", correct: true },
            { text: "World of Warcraft", correct: false },
            { text: "Snake", correct: false }
        ]
    },
    {
        question: "5. The Travel Bug: Where is the best place to travel?",
        options: [
            { text: "A tropical island beach", correct: false },
            { text: "Wherever my girlfriend happens to be", correct: true },
            { text: "The sun", correct: false }
        ]
    },
    {
        question: "6. The Habits: Who is always right?",
        options: [
            { text: "Antonio", correct: false },
            { text: "She is", correct: true },
            { text: "Toby", correct: false }
        ]
    },
    {
        question: "7. The Inside Joke: What's our signature humor style?",
        options: [
            { text: "Dad jokes", correct: false },
            { text: "Bullyism", correct: true },
            { text: "Sarcastic cat quotes", correct: false }
        ]
    },
    {
        question: "8. The Sweetest Memory: What moment stands out the most?",
        options: [
            { text: "The first day we ever messaged", correct: true }
        ]
    },
    {
        question: "9. The Future: What does looking ahead look like?",
        options: [
            { text: "Living out of a suitcase", correct: false },
            { text: "Right where we're supposed to be, right next to each other 💜", correct: true },
            { text: "Always traveling", correct: false }
        ]
    }
];

const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/xb51jgx377pa0';

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    // --- Quiz Logic ---
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizStartScreen = document.getElementById('quizStartScreen');
    const quizPlayScreen = document.getElementById('quizPlayScreen');
    const quizResultScreen = document.getElementById('quizResultScreen');
    const quizCounter = document.getElementById('quizCounter');
    const quizQuestionText = document.getElementById('quizQuestionText');
    const quizOptionsContainer = document.getElementById('quizOptionsContainer');
    const quizResultText = document.getElementById('quizResultText');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const restartQuizBtn = document.getElementById('restartQuizBtn');
    const quizFinalScore = document.getElementById('quizFinalScore');
    const quizCuteMessage = document.getElementById('quizCuteMessage');
    const prizeOverlay = document.getElementById('prizeOverlay');
    const closePrizeBtn = document.getElementById('closePrizeBtn');
    const prizeSelectionResult = document.getElementById('prizeSelectionResult');

    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', () => {
            if (quizStartScreen) quizStartScreen.style.display = 'none';
            if (quizPlayScreen) quizPlayScreen.style.display = 'block';
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion();
        });
    }

    function loadQuestion() {
        if (quizResultText) quizResultText.textContent = '';
        if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
        const q = quizQuestions[currentQuestionIndex];
        if (quizCounter) quizCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
        if (quizQuestionText) quizQuestionText.textContent = q.question;
        if (quizOptionsContainer) {
            quizOptionsContainer.innerHTML = '';

            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'action-btn quiz-btn';
                btn.textContent = opt.text;
                btn.addEventListener('click', () => selectAnswer(opt.correct, btn));
                quizOptionsContainer.appendChild(btn);
            });
        }
    }

    function selectAnswer(isCorrect, selectedBtn) {
        const allButtons = quizOptionsContainer.querySelectorAll('button');
        allButtons.forEach(b => b.disabled = true);

        if (isCorrect) {
            score++;
            selectedBtn.style.backgroundColor = '#82c91e';
            if (quizResultText) {
                quizResultText.textContent = 'Correct! 💜';
                quizResultText.style.color = '#ffd1dc';
            }
        } else {
            selectedBtn.style.backgroundColor = '#e03131';
            if (quizResultText) {
                quizResultText.textContent = 'Not quite, but I still love you! 🥰';
                quizResultText.style.color = '#ffd1dc';
            }
            
            allButtons.forEach(b => {
                const optData = quizQuestions[currentQuestionIndex].options.find(o => o.text === b.textContent);
                if (optData && optData.correct) {
                    b.style.backgroundColor = '#82c91e';
                }
            });
        }

        if (nextQuestionBtn) nextQuestionBtn.style.display = 'inline-block';
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
    }

    function showResults() {
        if (quizPlayScreen) quizPlayScreen.style.display = 'none';
        if (quizResultScreen) quizResultScreen.style.display = 'block';
        if (quizFinalScore) quizFinalScore.textContent = `You scored ${score} out of ${quizQuestions.length}!`;

        let cuteMsg = "";
        if (score === quizQuestions.length) {
            cuteMsg = "A perfect score! You know our story by heart. Fireball is so proud of you! 🐱💜";
            setTimeout(() => {
                if (prizeOverlay) prizeOverlay.style.display = 'flex';
            }, 500);
        } else if (score >= 7) {
            cuteMsg = "Amazing job! You remember almost every little detail of our journey together. 🥰";
        } else {
            cuteMsg = "Not bad at all! Every day with you is a new favorite memory to make. 💫";
        }
        if (quizCuteMessage) quizCuteMessage.textContent = cuteMsg;
    }

    if (restartQuizBtn) {
        restartQuizBtn.addEventListener('click', () => {
            if (quizResultScreen) quizResultScreen.style.display = 'none';
            if (quizStartScreen) quizStartScreen.style.display = 'block';
        });
    }

    // Prize Selection Handling
    const prizeBtns = document.querySelectorAll('.prize-btn');
    prizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const prizeName = btn.getAttribute('data-prize');
            if (prizeSelectionResult) {
                prizeSelectionResult.textContent = `Yay! You selected: ${prizeName} 🎉 Let Antonio know!`;
                prizeSelectionResult.style.color = '#ffd1dc';
            }
        });
    });

    if (closePrizeBtn) {
        closePrizeBtn.addEventListener('click', () => {
            if (prizeOverlay) prizeOverlay.style.display = 'none';
            if (prizeSelectionResult) prizeSelectionResult.textContent = '';
        });
    }

    // --- Resilient Journal History Logic ---
    const saveJournalBtn = document.getElementById('saveJournalBtn');
    const journalInput = document.getElementById('journalInput');
    const journalHistoryList = document.getElementById('journalHistoryList');

    function renderEntries(entries) {
        if (!journalHistoryList) return;
        
        if (!entries || entries.length === 0) {
            journalHistoryList.innerHTML = '<p style="color: #ffd1dc; text-shadow: 0 1px 2px rgba(0,0,0,0.8); font-size: 13px;">No journal entries yet. Write one above! 💜</p>';
            return;
        }

        journalHistoryList.innerHTML = '';
        entries.forEach(entry => {
            const card = document.createElement('div');
            card.className = 'entry-card';
            
            const entryText = entry.text || entry.content || entry.entry || entry.message || Object.values(entry)[1] || 'No content';
            const entryDate = entry.date || entry.timestamp || entry.created_at || Object.values(entry)[0] || 'Recent entry';
            
            card.innerHTML = `
                <span class="entry-date" style="display: block; font-weight: bold; margin-bottom: 4px; color: #ffd1dc;">${entryDate}</span>
                <p style="margin: 0; white-space: pre-wrap; color: #fff;">${entryText}</p>
            `;
            journalHistoryList.appendChild(card);
        });
    }

    function loadJournalEntries() {
        if (!journalHistoryList) return;

        let localEntries = [];
        try {
            localEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
        } catch (e) {
            localEntries = [];
        }
        renderEntries(localEntries);

        fetch(SHEETDB_API_URL)
            .then(res => res.json())
            .then(data => {
                if (data && Array.isArray(data) && data.length > 0) {
                    const formattedData = data.reverse().map(entry => ({
                        date: entry.date || entry.timestamp || entry.created_at || Object.values(entry)[0] || 'Recent entry',
                        text: entry.text || entry.content || entry.entry || entry.message || Object.values(entry)[1] || ''
                    }));
                    localStorage.setItem('journalEntries', JSON.stringify(formattedData));
                    renderEntries(formattedData);
                }
            })
            .catch(err => {
                console.log('Using local storage fallback due to network/API block.');
            });
    }

    if (saveJournalBtn && journalInput) {
        saveJournalBtn.addEventListener('click', () => {
            const text = journalInput.value.trim();
            if (!text) return;

            const newEntry = {
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                text: text
            };

            let localEntries = [];
            try {
                localEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];
            } catch (e) {
                localEntries = [];
            }
            localEntries.unshift(newEntry);
            localStorage.setItem('journalEntries', JSON.stringify(localEntries));
            journalInput.value = '';
            renderEntries(localEntries);

            fetch(SHEETDB_API_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: [newEntry] })
            }).catch(err => {
                console.error('Background SheetDB sync failed:', err);
            });
        });
    }

    loadJournalEntries();

    // --- Mood Update Button Logic ---
    const sendMoodBtn = document.getElementById('sendMoodBtn');
    const moodRange = document.getElementById('moodRange');
    if (sendMoodBtn) {
        sendMoodBtn.addEventListener('click', () => {
            alert(`Mood update (${moodRange ? moodRange.value : '3'}/5) saved! 💜`);
        });
    }

    // --- Snake Game Modal Logic ---
    const snakeBtn = document.getElementById('snakeBtn');
    const snakeOverlay = document.getElementById('snakeOverlay');
    const closeSnakeBtn = document.getElementById('closeSnakeBtn');
    if (snakeBtn && snakeOverlay) {
        snakeBtn.addEventListener('click', () => snakeOverlay.style.display = 'flex');
    }
    if (closeSnakeBtn && snakeOverlay) {
        closeSnakeBtn.addEventListener('click', () => snakeOverlay.style.display = 'none');
    }
});

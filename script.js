(function(){ emailjs.init("RETQEL0saMrVGt7oV"); })();

const SHEETDB_URL = "https://sheetdb.io/api/v1/xb51jgx377pa0";

document.addEventListener('DOMContentLoaded', () => {
    
    loadJournalEntries();

    // --- Mini Quiz Logic ---
    const quizButtons = document.querySelectorAll('.quiz-btn');
    const quizResult = document.getElementById('quizResult');
    if (quizButtons.length > 0 && quizResult) {
        quizButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const answerType = btn.getAttribute('data-answer');
                if (answerType === 'correct') {
                    quizResult.style.color = '#5b9279';
                    quizResult.innerText = "Correct! River is definitely his favorite human 💜";
                } else {
                    quizResult.style.color = '#c26d90';
                    quizResult.innerText = "Nice try, but you know who rules the house! Try again. 😉";
                }
            });
        });
    }

    // --- Journal Entry / Save Logic ---
    const saveJournalBtn = document.getElementById('saveJournalBtn');
    if (saveJournalBtn) {
        saveJournalBtn.addEventListener('click', () => {
            const noteInput = document.getElementById('journalInput');
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
    }

    // --- Function to fetch and display past entries with clean date formatting ---
    function loadJournalEntries() {
        const entriesContainer = document.getElementById('journalHistoryList');
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
                    
                    let rawDate = entry[dateKey];
                    let entryDate = 'Recent';

                    if (rawDate) {
                        if (!isNaN(rawDate) && Number(rawDate) > 40000) {
                            const excelEpoch = new Date(1899, 11, 30);
                            const jsDate = new Date(excelEpoch.getTime() + rawDate * 86400000);
                            entryDate = jsDate.toLocaleString();
                        } else {
                            entryDate = rawDate;
                        }
                    }

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

    // --- Mood Slider Logic ---
    const sendMoodBtn = document.getElementById('sendMoodBtn');
    if (sendMoodBtn) {
        sendMoodBtn.addEventListener('click', () => {
            const slider = document.getElementById('moodRange');
            const moodMap = { 1: "Low", 2: "A bit down", 3: "Okay", 4: "Good", 5: "Great!" };
            const moodText = slider ? moodMap[slider.value] : "Okay";
            
            emailjs.send("service_xac90mk", "template_q4hqvuc", { 
                message: "Mood update: " + moodText 
            }).then(() => {
                alert("Mood updated! Thanks for sharing, love.");
            });
        });
    }

    // --- Snake Game Logic ---
    const snakeBtn = document.getElementById('snakeBtn');
    const snakeOverlay = document.getElementById('snakeOverlay');
    const closeSnakeBtn = document.getElementById('closeSnakeBtn');
    const startSnakeBtn = document.getElementById('startSnakeBtn');
    
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const scoreElement = document.getElementById('snakeScore');

    const upBtn = document.getElementById('upBtn');
    const leftBtn = document.getElementById('leftBtn');
    const downBtn = document.getElementById('downBtn');
    const rightBtn = document.getElementById('rightBtn');

    let snake = [];
    let food = {};
    let dx = 15;
    let dy = 0;
    let score = 0;
    let gameLoop;
    let changingDirection = false;
    const gridSize = 15;

    if (snakeBtn && snakeOverlay) {
        snakeBtn.addEventListener('click', () => { 
            snakeOverlay.style.display = 'flex'; 
        });
    }

    if (closeSnakeBtn && snakeOverlay) {
        closeSnakeBtn.addEventListener('click', () => { 
            snakeOverlay.style.display = 'none'; 
            clearInterval(gameLoop);
            window.removeEventListener("keydown", handleKeyDirection);
        });
    }

    if (startSnakeBtn) {
        startSnakeBtn.addEventListener('click', initGame);
    }

    function initGame() {
        clearInterval(gameLoop);
        snake = [
            {x: 135, y: 135},
            {x: 120, y: 135},
            {x: 105, y: 135}
        ];
        dx = 15;
        dy = 0;
        score = 0;
        if (scoreElement) scoreElement.innerText = `Score: ${score}`;
        spawnFood();
        
        window.removeEventListener("keydown", handleKeyDirection);
        window.addEventListener("keydown", handleKeyDirection);
        
        if (upBtn) { upBtn.onpointerdown = (e) => { e.preventDefault(); changeVel('UP'); }; }
        if (downBtn) { downBtn.onpointerdown = (e) => { e.preventDefault(); changeVel('DOWN'); }; }
        if (leftBtn) { leftBtn.onpointerdown = (e) => { e.preventDefault(); changeVel('LEFT'); }; }
        if (rightBtn) { rightBtn.onpointerdown = (e) => { e.preventDefault(); changeVel('RIGHT'); }; }

        gameLoop = setInterval(main, 110);
    }

    function main() {
        if (hasGameEnded()) {
            clearInterval(gameLoop);
            if (scoreElement) scoreElement.innerText = `Game Over! Score: ${score}`;
            window.removeEventListener("keydown", handleKeyDirection);
            return;
        }
        changingDirection = false;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
    }

    function clearCanvas() {
        if (!ctx) return;
        ctx.fillStyle = "#fdf8fa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawSnake() {
        if (!ctx) return;
        snake.forEach(part => {
            ctx.fillStyle = "#d680a1";
            ctx.strokeStyle = "#ffffff";
            ctx.fillRect(part.x, part.y, gridSize, gridSize);
            ctx.strokeRect(part.x, part.y, gridSize, gridSize);
        });
    }

    function advanceSnake() {
        const head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);
        
        const hasEatenFood = snake[0].x === food.x && snake[0].y === food.y;
        if (hasEatenFood) {
            score += 10;
            if (scoreElement) scoreElement.innerText = `Score: ${score}`;
            spawnFood();
        } else {
            snake.pop();
        }
    }

    function drawFood() {
        if (!ctx) return;
        ctx.fillStyle = "#333";
        ctx.fillRect(food.x, food.y, gridSize, gridSize);
    }

    function randomGridPos(min, max) {
        return Math.round((Math.random() * (max - min) + min) / gridSize) * gridSize;
    }

    function spawnFood() {
        if (!canvas) return;
        food.x = randomGridPos(0, canvas.width - gridSize);
        food.y = randomGridPos(0, canvas.height - gridSize);
        snake.forEach(part => {
            if (part.x === food.x && part.y === food.y) spawnFood();
        });
    }

    function changeVel(direction) {
        if (changingDirection) return;

        const goingUp = dy === -gridSize;
        const goingDown = dy === gridSize;
        const goingRight = dx === gridSize;
        const goingLeft = dx === -gridSize;

        if (direction === 'LEFT' && !goingRight) { dx = -gridSize; dy = 0; changingDirection = true; }
        if (direction === 'UP' && !goingDown) { dx = 0; dy = -gridSize; changingDirection = true; }
        if (direction === 'RIGHT' && !goingLeft) { dx = gridSize; dy = 0; changingDirection = true; }
        if (direction === 'DOWN' && !goingUp) { dx = 0; dy = gridSize; changingDirection = true; }
    }

    function handleKeyDirection(event) {
        if (!snakeOverlay || snakeOverlay.style.display === 'none') return;
        const keyPressed = event.keyCode;
        if (keyPressed === 37 || keyPressed === 65) { event.preventDefault(); changeVel('LEFT'); }
        if (keyPressed === 38 || keyPressed === 87) { event.preventDefault(); changeVel('UP'); }
        if (keyPressed === 39 || keyPressed === 68) { event.preventDefault(); changeVel('RIGHT'); }
        if (keyPressed === 40 || keyPressed === 83) { event.preventDefault(); changeVel('DOWN'); }
    }

    function hasGameEnded() {
        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
        }
        return snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height;
    }
});

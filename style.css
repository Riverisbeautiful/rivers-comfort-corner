// --- Snake Game Logic (Fully Mobile & Keyboard Friendly) ---
document.addEventListener('DOMContentLoaded', () => {
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
        
        if (upBtn) {
            upBtn.onpointerdown = (e) => { e.preventDefault(); changeVel('UP'); };
        }
        if (downBtn) {
            downBtn.onpointerdown = (e) => { e.preventDefault(); changeVel('DOWN'); };
        }
        if (leftBtn) {
            leftBtn.onpointerdown = (e) => { e.preventDefault(); changeVel('LEFT'); };
        }
        if (rightBtn) {
            rightBtn.onpointerdown = (e) => { e.preventDefault(); changeVel('RIGHT'); };
        }

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

        if (direction === 'LEFT' && !goingRight) {
            dx = -gridSize; dy = 0; changingDirection = true;
        }
        if (direction === 'UP' && !goingDown) {
            dx = 0; dy = -gridSize; changingDirection = true;
        }
        if (direction === 'RIGHT' && !goingLeft) {
            dx = gridSize; dy = 0; changingDirection = true;
        }
        if (direction === 'DOWN' && !goingUp) {
            dx = 0; dy = gridSize; changingDirection = true;
        }
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

document.addEventListener('DOMContentLoaded', () => {
    (function(){ emailjs.init("RETQEL0saMrVGt7oV"); })();

    // --- Email Logic ---
    const sendBtn = document.getElementById('sendBtn');
    if(sendBtn) {
        sendBtn.addEventListener('click', () => {
            const note = document.getElementById('riverNote').value;
            if(!note) { alert("Please write something first!"); return; }
            emailjs.send("service_xac90mk", "template_q4hqvuc", { message: note }).then(() => {
                alert("Sent to you!");
                document.getElementById('riverNote').value = "";
            });
        });
    }

    // --- Game Logic ---
    const gameBtn = document.getElementById('gameBtn');
    if(gameBtn) {
        gameBtn.addEventListener('click', () => {
            const messages = [
                "You make the world brighter just by being in it.",
                "I'm so lucky to have you in my life.",
                "Your feelings matter and you are doing great.",
                "Take a deep breath, you've got this!",
                "Everything will be okay, and I'm right here with you."
            ];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            const messageArea = document.getElementById('messageArea');
            if(messageArea) {
                messageArea.innerText = randomMsg;
                setTimeout(() => { messageArea.innerText = ""; }, 8000);
            }
        });
    }

    // --- Hello Kitty Hug Logic ---
    const hugOverlay = document.getElementById('hugOverlay');
    const hugBtn = document.getElementById('hugBtn');
    const closeHugBtn = document.getElementById('closeHugBtn');
    const helloKittyHeartSvg = `<svg viewBox="0 0 64 64" width="40" height="40"><path fill="#FFB6C1" d="M32 58.9l-3.9-3.5C14.7 42.3 5.2 33.7 5.2 23.3 5.2 14.8 11.7 8.4 20.1 8.4c4.7 0 9.3 2.2 11.9 5.8 2.6-3.6 7.2-5.8 11.9-5.8 8.4 0 14.9 6.4 14.9 14.9 0 10.4-9.5 19-22.9 32.1L32 58.9z"/><path fill="white" d="M41.2 23.7c0 3.3-2.2 6-5 6s-5-2.7-5-6 2.2-6 5-6 5 2.7 5 6zM27.7 23.7c0 3.3-2.2 6-5 6s-5-2.7-5-6 2.2-6 5-6 5 2.7 5 6z"/><circle fill="black" cx="36.2" cy="23.7" r="1.5"/><circle fill="black" cx="22.7" cy="23.7" r="1.5"/><path fill="black" d="M29.2 31.3c1.4 0 2.4 1.3 2.4 2.9 0 1.6-1 2.9-2.4 2.9s-2.4-1.3-2.4-2.9c0-1.6 1-2.9 2.4-2.9z"/><path fill="black" d="M30.2 36.3c-0.7 0-1.2-0.7-1.2-1.5h2.3c0 0.8-0.5 1.5-1.3 1.5z"/><path fill="#FF6699" d="M25.9 15.1c-1.6 0.3-2.4 1.6-1.8 3.1 0.5 1.5 2.1 2.2 3.7 1.8 1.6-0.3 2.4-1.6 1.8-3.1-0.5-1.5-2.1-2.2-3.7-1.8z"/><path fill="#FF6699" d="M27.7 14.9c0.4 0 0.8 0.1 1.1 0.1 2.2 0.6 4.3 1.8 6 3.6 1.7 1.8 3 4 3.6 6.4 0.2 0.9 0.1 1.9-0.2 2.8 -0.2 0.7-0.5 1.4-0.8 2.1 -0.2 0.5-0.5 1-0.9 1.5 -0.6 0.8-1.3 1.6-2.2 2.1 -0.1 0-0.3 0-0.4 0.1 -0.1 0-0.1 0-0.2 0 -2.4-0.3-4.8-1.2-6.9-2.7 -2.1-1.5-3.9-3.3-5.4-5.5 -1.5-2.2-2.5-4.7-2.9-7.4 -0.2-1.3-0.1-2.5 0.3-3.7C21.2 15.8 24.4 14.9 27.7 14.9z"/><path fill="#FF6699" d="M30.6 18.6c1.2 0.2 1.8 1.2 1.4 2.3s-1.6 1.6-2.8 1.4-1.8-1.2-1.4-2.3c0.4-1.1 1.6-1.6 2.8-1.4z"/></svg>`;

    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = helloKittyHeartSvg;
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        hugOverlay.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 6000);
    }

    if(hugBtn) {
        hugBtn.addEventListener('click', () => {
            hugOverlay.classList.remove('hidden');
            hugBtn.dataset.intervalId = setInterval(createHeart, 400);
        });
    }

    if(closeHugBtn) {
        closeHugBtn.addEventListener('click', () => {
            hugOverlay.classList.add('hidden');
            clearInterval(hugBtn.dataset.intervalId);
            hugOverlay.querySelectorAll('.heart').forEach(h => h.remove());
        });
    }
});

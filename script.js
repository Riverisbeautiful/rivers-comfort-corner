document.addEventListener('DOMContentLoaded', () => {
    (function(){ emailjs.init("RETQEL0saMrVGt7oV"); })();

    // Logic for Send
    document.getElementById('sendBtn').addEventListener('click', () => {
        const note = document.getElementById('riverNote').value;
        if(!note) return;
        emailjs.send("service_xac90mk", "template_q4hqvuc", { message: note }).then(() => {
            alert("Sent to you!");
            document.getElementById('riverNote').value = "";
        });
    });

    // Logic for Hugs
    const hugOverlay = document.getElementById('hugOverlay');
    document.getElementById('hugBtn').addEventListener('click', () => {
        hugOverlay.style.display = 'flex';
        hugBtn.dataset.intervalId = setInterval(() => {
            const h = document.createElement('div');
            h.innerHTML = '❤️'; h.classList.add('heart');
            h.style.left = Math.random() * 100 + 'vw';
            hugOverlay.appendChild(h);
            setTimeout(() => h.remove(), 5000);
        }, 400);
    });

    document.getElementById('closeHugBtn').addEventListener('click', () => {
        hugOverlay.style.display = 'none';
        clearInterval(hugBtn.dataset.intervalId);
    });

    // NEW Logic for Game
    const gameOverlay = document.getElementById('gameOverlay');
    document.getElementById('gameBtn').addEventListener('click', () => {
        const msgs = ["You're amazing!", "Keep shining!", "You're doing great!", "I'm so proud of you!"];
        document.getElementById('affirmationText').innerText = msgs[Math.floor(Math.random() * msgs.length)];
        gameOverlay.style.display = 'flex';
    });

    document.getElementById('closeGameBtn').addEventListener('click', () => {
        gameOverlay.style.display = 'none';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    (function(){ emailjs.init("RETQEL0saMrVGt7oV"); })();

    // Diary/Send Logic
    document.getElementById('sendBtn').addEventListener('click', () => {
        const note = document.getElementById('riverNote').value;
        if(!note) { alert("Please write something first!"); return; }
        emailjs.send("service_xac90mk", "template_q4hqvuc", { 
            message: "Diary Entry: " + note,
            date: new Date().toLocaleString()
        }).then(() => {
            alert("Your thoughts have been saved to our journal. I'm listening.");
            document.getElementById('riverNote').value = "";
        });
    });

    // Mood Slider Logic
    document.getElementById('sendMoodBtn').addEventListener('click', () => {
        const moodMap = { 1: "Low", 2: "A bit down", 3: "Okay", 4: "Good", 5: "Great!" };
        const moodText = moodMap[document.getElementById('moodSlider').value];
        emailjs.send("service_xac90mk", "template_q4hqvuc", { 
            message: "River's mood update: " + moodText 
        }).then(() => {
            alert("Mood updated! Thanks for sharing, love.");
        });
    });

    // Hugs Logic
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

    // Game Logic
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

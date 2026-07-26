(function(){ emailjs.init("RETQEL0saMrVGt7oV"); })();

document.addEventListener('DOMContentLoaded', () => {
    
    // Diary/Send Logic
    document.getElementById('sendBtn').addEventListener('click', () => {
        const note = document.getElementById('riverNote').value;
        if(!note) { alert("Please write something first!"); return; }
        emailjs.send("service_xac90mk", "template_q4hqvuc", { 
            message: "Diary Entry: " + note
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

    // Hug Logic
    document.getElementById('hugBtn').addEventListener('click', () => {
        document.getElementById('hugOverlay').style.display = 'flex';
    });
    document.getElementById('closeHugBtn').addEventListener('click', () => {
        document.getElementById('hugOverlay').style.display = 'none';
    });

    // Game/Reminder Logic
    document.getElementById('gameBtn').addEventListener('click', () => {
        const msgs = [
            "You're the best thing that ever happened to me.",
            "I'm counting down the days until I see you.",
            "River you are my disney princess.",
            "I am sending you and toby the biggest hugs!",
            "You make my world so much brighter."
        ];
        document.getElementById('affirmationText').innerText = msgs[Math.floor(Math.random() * msgs.length)];
        document.getElementById('gameOverlay').style.display = 'flex';
    });
    document.getElementById('closeGameBtn').addEventListener('click', () => {
        document.getElementById('gameOverlay').style.display = 'none';
    });
});

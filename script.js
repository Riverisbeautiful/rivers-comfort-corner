(function(){ emailjs.init("RETQEL0saMrVGt7oV"); })();

document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded and ready");

    // Diary/Send Logic
    const sendBtn = document.getElementById('sendBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const note = document.getElementById('riverNote').value;
            if(!note) { alert("Please write something first!"); return; }
            emailjs.send("service_xac90mk", "template_q4hqvuc", { 
                message: "Diary Entry: " + note,
                date: new Date().toLocaleString()
            }).then(() => {
                alert("Your thoughts have been saved to our journal. I'm listening my love.");
                document.getElementById('riverNote').value = "";
            }).catch(err => console.error("Diary Error:", err));
        });
    }

    // Mood Slider Logic
    const sendMoodBtn = document.getElementById('sendMoodBtn');
    if (sendMoodBtn) {
        sendMoodBtn.addEventListener('click', () => {
            console.log("Mood button clicked!"); // This will confirm the button is working
            const slider = document.getElementById('moodSlider');
            const moodMap = { 1: "Low", 2: "A bit down", 3: "Okay", 4: "Good", 5: "Great!" };
            const moodText = moodMap[slider.value];
            
            emailjs.send("service_xac90mk", "template_q4hqvuc", { 
                message: "River's mood update: " + moodText 
            }).then(() => {
                alert("Mood updated! Thanks for sharing, love.");
            }).catch(err => {
                console.error("Mood Error:", err);
                alert("Oops! Something went wrong sending the mood.");
            });
        });
    }

    // Overlays
    const hugBtn = document.getElementById('hugBtn');
    const hugOverlay = document.getElementById('hugOverlay');
    if (hugBtn) {
        hugBtn.addEventListener('click', () => {
            hugOverlay.style.display = 'flex';
        });
    }

    const closeHugBtn = document.getElementById('closeHugBtn');
    if (closeHugBtn) {
        closeHugBtn.addEventListener('click', () => {
            hugOverlay.style.display = 'none';
        });
    }
});

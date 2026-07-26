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
});

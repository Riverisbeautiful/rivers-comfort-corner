(function(){ emailjs.init("RETQEL0saMrVGt7oV"); })();

// Your connected SheetDB API URL
const SHEETDB_URL = "https://sheetdb.io/api/v1/xb51jgx377pa0";

document.addEventListener('DOMContentLoaded', () => {
    
    // Load existing journal entries when page opens
    loadJournalEntries();

    // Diary/Send Logic (Saves to Google Sheet + Sends Email)
    document.getElementById('sendBtn').addEventListener('click', () => {
        const note = document.getElementById('riverNote').value;
        if(!note) { alert("Please write something first!"); return; }

        const currentDate = new Date().toLocaleString();

        // 1. Send Email Notification to You
        emailjs.send("service_xac90mk", "template_q4hqvuc", { 
            message: "New Journal Entry: " + note
        });

        // 2. Save to Google Sheet Database via SheetDB
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
            document.getElementById('riverNote').value = "";
            loadJournalEntries(); // Refresh the list instantly
        })
        .catch(error => {
            console.error('Error saving entry:', error);
            alert("Saved to email, but had trouble updating the visual journal list.");
        });
    });

    // Function to fetch and display past entries
    function loadJournalEntries() {
        const entriesContainer = document.getElementById('entriesList');
        fetch(SHEETDB_URL)
            .then(response => response.json())
            .then(data => {
                if (!data || data.length === 0) {
                    entriesContainer.innerHTML = "<p style='font-size:12px; color:#888; text-align:center;'>No entries yet. Write the first one!</p>";
                    return;
                }
                
                // Clear container and show newest entries at the top
                entriesContainer.innerHTML = "";
                data.reverse().forEach(entry => {
                    const card = document.createElement('div');
                    card.className = 'entry-card';
                    card.innerHTML = `<span class="entry-date">${entry.date || 'Recent'}</span>${entry.message}`;
                    entriesContainer.appendChild(card);
                });
            })
            .catch(() => {
                entriesContainer.innerHTML = "<p style='font-size:12px; color:#888; text-align:center;'>Could not load past entries.</p>";
            });
    }

    // Mood Slider Logic
    document.getElementById('sendMoodBtn').addEventListener('click', () => {
        const moodMap = { 1: "Low", 2: "A bit down", 3: "Okay", 4: "Good", 5: "Great!" };
        const moodText = moodMap[document.getElementById('moodSlider'].value];
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
            "Remember that you are so deeply loved.",
            "Toby and I are sending you the biggest hugs!",
            "You make my world so much brighter."
        ];
        document.getElementById('affirmationText').innerText = msgs[Math.floor(Math.random() * msgs.length)];
        document.getElementById('gameOverlay').style.display = 'flex';
    });
    document.getElementById('closeGameBtn').addEventListener('click', () => {
        document.getElementById('gameOverlay').style.display = 'none';
    });
});

// --- SheetDB Journal History Logic ---
const saveJournalBtn = document.getElementById('saveJournalBtn');
const journalInput = document.getElementById('journalInput');
const journalHistoryList = document.getElementById('journalHistoryList');

function loadJournalEntries() {
    if (!journalHistoryList) return;
    journalHistoryList.innerHTML = '<p style="color: #ffd1dc; text-shadow: 0 1px 2px rgba(0,0,0,0.8); font-size: 13px;">Loading entries... 💜</p>';

    fetch(SHEETDB_API_URL)
        .then(res => res.json())
        .then(data => {
            if (!data || data.length === 0) {
                journalHistoryList.innerHTML = '<p style="color: #ffd1dc; text-shadow: 0 1px 2px rgba(0,0,0,0.8); font-size: 13px;">No journal entries yet. Write one above! 💜</p>';
                return;
            }

            journalHistoryList.innerHTML = '';
            data.reverse().forEach(entry => {
                const card = document.createElement('div');
                card.className = 'entry-card';
                
                // Check all common variants of column headers from your sheet
                const entryText = entry.text || entry.content || entry.entry || entry.message || entry.journal || Object.values(entry)[1] || 'No content';
                const entryDate = entry.date || entry.timestamp || entry.created_at || Object.values(entry)[0] || 'Recent entry';
                
                card.innerHTML = `
                    <span class="entry-date" style="display: block; font-weight: bold; margin-bottom: 4px;">${entryDate}</span>
                    <p style="margin: 0; white-space: pre-wrap;">${entryText}</p>
                `;
                journalHistoryList.appendChild(card);
            });
        })
        .catch(err => {
            console.error('Error loading entries:', err);
            journalHistoryList.innerHTML = '<p style="color: #ffd1dc; text-shadow: 0 1px 2px rgba(0,0,0,0.8); font-size: 13px;">Could not load entries. Check API URL! 💜</p>';
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

        fetch(SHEETDB_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [newEntry] })
        })
        .then(res => res.json())
        .then(res => {
            journalInput.value = '';
            loadJournalEntries();
        })
        .catch(err => {
            console.error('Error saving entry:', err);
            alert('Failed to save entry. Check your connection or SheetDB URL!');
        });
    });
}

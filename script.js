(function(){ emailjs.init("RETQEL0saMrVGt7oV"); })();

// Email logic
document.getElementById('sendBtn').addEventListener('click', () => {
    const note = document.getElementById('riverNote').value;
    if(!note) { alert("Please write something first!"); return; }
    emailjs.send("service_xac90mk", "template_q4hqvuc", { message: note }).then(() => {
        alert("Sent to you!");
        document.getElementById('riverNote').value = "";
    });
});

// Digital Hug logic
document.getElementById('hugBtn').addEventListener('click', () => {
    alert("Sending you a big hug! I'm always here for you.");
});

// Simple Game: Affirmation Picker
document.getElementById('gameBtn').addEventListener('click', () => {
    const messages = [
        "You make the world brighter just by being in it.",
        "I'm so lucky to have you in my life.",
        "Your feelings matter and you are doing great.",
        "Take a deep breath, you've got this!",
        "Everything will be okay, and I'm right here with you."
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('gameOutput').innerText = randomMsg;
});

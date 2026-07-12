(function(){
    // Keys configured for your comfort site
    emailjs.init("RETQEL0saMrVGt7oV");
})();

document.getElementById('sendBtn').addEventListener('click', () => {
    const note = document.getElementById('riverNote').value;
    
    if(!note) {
        alert("Please write something first!");
        return;
    }
    
    emailjs.send("service_xac90mk", "template_q4hqvuc", {
        message: note
    }).then(() => {
        alert("Sent to you!");
        document.getElementById('riverNote').value = ""; // Clear input after sending
    }).catch((err) => {
        alert("Oops, something went wrong.");
        console.error(err);
    });
});

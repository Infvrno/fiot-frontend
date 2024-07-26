function setMotivationalMessage(latestResult) {
    
    // Array of motivational messages
    var motivationalMessages = [
        "Don't give up! Keep trying and you'll improve!",
        "Good effort! Keep practicing and you'll get there!",
        "Nice work! You're getting better each time!",
        "Great job! You're improving steadily!",
        "Excellent progress! Keep up the fantastic work!"        
    ];

    var motivationalText = motivationalMessages[0]; // Default message
    if (latestResult) {
        // Choose a different motivational message based on the user's latest score
        if (latestResult.score < 30) {
            motivationalText = motivationalMessages[0]; 
        } else if (latestResult.score < 50) {
            motivationalText = motivationalMessages[1];
        } else if (latestResult.score < 70) {
            motivationalText = motivationalMessages[2];
        } else if (latestResult.score < 90) {
            motivationalText = motivationalMessages[3];
        } else {
            motivationalText = motivationalMessages[4];
        }
    }

    // Update the the HTML element to set the chosen motivational message
    document.getElementById('motivation').textContent = motivationalText;
}
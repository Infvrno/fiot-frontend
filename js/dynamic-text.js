function setMotivationalMessage(latestResult) {
    var motivationalMessages = [
        "Don't give up! Keep trying and you'll improve!",
        "Good effort! Keep practicing and you'll get there!",
        "Nice work! You're getting better each time!",
        "Great job! You're improving steadily!",
        "Excellent progress! Keep up the fantastic work!"        
    ];

    var motivationalText = motivationalMessages[0]; // Default message
    if (latestResult) {
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
    document.getElementById('motivation').textContent = motivationalText;
}
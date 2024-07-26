document.addEventListener("DOMContentLoaded", function() {
    // Fetch data from the given URL
    fetch('http://20.189.112.252/getscore')
        .then(response => response.json())
        .then(data => {
            // Sort data by date
            data.sort((a, b) => new Date(a.added_date) - new Date(b.added_date));

            // Get the latest result
            var latestResult = data[data.length - 1];
            var latestResultText = latestResult ? `Latest result: Score: ${latestResult.score}, Difficulty: ${latestResult.difficulty}` : "Latest result: No data available";

            // Function to filter data by difficulty
            function filterDataByDifficulty(difficulty) {
                return data.filter(entry => entry.difficulty === difficulty).slice(-7);
            }

            // Function to create chart
            function createChart(ctx, scores, dates) {
                return new Chart(ctx, {
                    type: 'line',       // Specify chart type as 'line' (line chart)
                    data: {
                        labels: dates,  // Set x-axis labels as dates
                        datasets: [{
                            label: 'Accuracy',                               // Set dataset label
                            data: scores,                                    // Set dataset values as scores
                            borderColor: 'rgba(75, 192, 192, 1)',            // Set border color
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',      // Set background color
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,               // Make the chart responsive
                        scales: {
                            y: {
                                beginAtZero: true       // Make the y-axis start at zero
                            }
                        }
                    }
                });
            }

            // Filter the data for Difficulty 1
            const dataDifficulty1 = filterDataByDifficulty(1);
            const scores1 = dataDifficulty1.map(entry => entry.score);
            const dates1 = dataDifficulty1.map(entry => new Date(entry.added_date).toLocaleDateString());

            // Filter the data for Difficulty 2
            const dataDifficulty2 = filterDataByDifficulty(2);
            const scores2 = dataDifficulty2.map(entry => entry.score);
            const dates2 = dataDifficulty2.map(entry => new Date(entry.added_date).toLocaleDateString());

            // Filter the data for Difficulty 3
            const dataDifficulty3 = filterDataByDifficulty(3);
            const scores3 = dataDifficulty3.map(entry => entry.score);
            const dates3 = dataDifficulty3.map(entry => new Date(entry.added_date).toLocaleDateString());

            // Initiliaze the default values for highest and lowest accuracy
            var highestAccuracy = 0;
            var lowestAccuracy = 0;

            if (data.length > 0) {
                highestAccuracy = Math.max(...data.map(entry => entry.score));
                lowestAccuracy = Math.min(...data.map(entry => entry.score));
            }

            // Update the HTML elements with the calculated values
            document.getElementById('highest-accuracy').textContent = `Highest accuracy this week: ${highestAccuracy}%`;
            document.getElementById('lowest-accuracy').textContent = `Lowest accuracy this week: ${lowestAccuracy}%`;
            document.getElementById('latest-result').textContent = latestResultText;

            // Create charts for each difficulty level (1 to 3)
            const ctx1 = document.getElementById('chart-difficulty-1').getContext('2d');
            createChart(ctx1, scores1, dates1);

            const ctx2 = document.getElementById('chart-difficulty-2').getContext('2d');
            createChart(ctx2, scores2, dates2);

            const ctx3 = document.getElementById('chart-difficulty-3').getContext('2d');
            createChart(ctx3, scores3, dates3);

            // Set dynamic motivational message
            setMotivationalMessage(latestResult);
        })
        .catch(error => console.error('Error fetching data:', error));
});

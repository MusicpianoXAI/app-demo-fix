
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['TEMPO(Time)', 'TONE & PEDAL', 'INTENSITY', 'MUSIC MAKING', 'EMOTION'],
        datasets: [{
            axis:'y',
            label: 'Score',
            data: [65, 77, 89, 95, 73],
            backgroundColor: 'rgba(244, 218, 78, 0.7)',
            borderColor: 'rgba(244, 218, 78, 1)',
            borderWidth: 1
        }]
    },
    options: {
        indexAxis:'y',
        legend: {
        display: false,
      },
        scales: {
            xAxes: [{
                gridLines: { 
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  beginAtZero: true,
                  fontSize: 0,
                  fontColor: '#FFFFFF',
                  autoSkip: false
                }
              }],
            yAxes: [{
                gridLines: {
                  drawBorder: false,
                  display: false,
                },
                ticks: {
                  autoSkip: false,
                  fontSize: 15,
                  fontColor: '#FFFFFF',
                  maxTicksLimit: 5,
                  padding: 25,
                }
              }]
        }
    }
});
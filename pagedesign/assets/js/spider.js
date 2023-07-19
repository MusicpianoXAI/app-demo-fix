var spch = document.getElementById('Spider').getContext("2d");

var data = {
    labels: [
      'Stable Beat',
      'Articulation Length',
      'Balance',
      'Pessimistic Mood',
      'Energy',
      'Imagination'
    ],
    datasets: [{
      label: 'My',
      data: [7, 6, 4, 3.2, 1.4, 5.5],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
      label: 'Ideal',
      data: [6.8, 4.8, 4.0, 1.9, 6.9, 5.4],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
  };

  var Spider = new Chart(spch, {
    type: 'radar',
    data: data,
    options: {
        responsive: false,
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                ticks: {
                    display: false
                }}
        },
        elements: {
        line: {
          borderWidth: 3
        },
        plugins:{
            legend: {
                display: false
            },
            filler: {
                propagate: false
              },
        }
      }
    },
  });
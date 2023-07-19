function addZero(i) {
    var rtn = i + 100;
    return rtn.toString().substr(1, 3);
}

var monthList = [];
var monthData = [50,60,70,45,50,66];

var dt = new Date();
var year = dt.getFullYear();
var mon = addZero(eval(dt.getMonth()+1));		
var now = year+mon;

for(var i = (now - 5); i <= now; i++){
    var format =  i;
    monthList.push(format);
}

var data = {
  labels: monthList,
  datasets: [{
    label: 'My',
    data: monthData,
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#ffffff',
    pointHoverBackgroundColor: '#ffffff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  },{
    label: 'Ideal',
    data: monthData,
    fill: true,
    backgroundColor: 'rgb(244, 218, 78, 0.2)',
    borderColor: 'rgb(244, 218, 78)',
    pointBackgroundColor: 'rgb(244, 218, 78)',
    pointBorderColor: '#ffffff',
    pointHoverBackgroundColor: '#ffffff',
    pointHoverBorderColor: 'rgb(244, 218, 78)'
  }]
};

const ch1 = document.getElementById('linechart1').getContext('2d');
const linechart1 = new Chart(ch1, {
    type: 'line',
    data: data,

    options: {
      maintainAspectRatio :false,
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
});

const ch2 = document.getElementById('linechart2').getContext('2d');
const linechart2 = new Chart(ch2, {
    type: 'line',
    data: data,

    options: {
      maintainAspectRatio :false,
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
});

const ch3 = document.getElementById('linechart3').getContext('2d');
const linechart3 = new Chart(ch3, {
    type: 'line',
    data: data,

    options: {
      maintainAspectRatio :false,
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }
});
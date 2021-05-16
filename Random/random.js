document.addEventListener('DOMContentLoaded', function() {
    let amount = 20;
    let total = 0;
    let tries = 500

    function random_number(x) {
        return Math.floor(Math.random() * x) +  1
    };

    function setup(n) {
        x = {};
        for(i=0;i<n;i++){
            x[i + 1] = 0;
        };
        return x;
    };
    
    document.querySelector('#myButton').onclick = () => {
        let counter = 0;
        
        while(counter < tries) {
            let new_number = random_number(amount);
            numbers[new_number]++;
            counter++;
        };
        option['series'][0]['data'] = Object.values(numbers);
        myChart.setOption(option);

        total = total + tries;
        document.querySelector('#n').innerHTML = 'Total tries: ' + total;
    };

    document.querySelector('#myRange').onchange = () => {
        tries = parseInt(document.querySelector('#myRange').value);
        document.querySelector('#myButton').innerHTML = 'Add ' + tries + ' random numbers'
    };

    let numbers = setup(amount)

    var myChart = echarts.init(document.getElementById('main'));
    
    // specify chart configuration item and data
    var option = {
        title: {
            text: 'random number distribution'
        },
        tooltip: {},
        legend: {
            data:['Numbers']
        },
        xAxis: {
            data: Object.keys(numbers)
        },
        yAxis: {},
        series: [{
            name: 'Numbers',
            type: 'bar',
            data: Object.values(numbers)
        }]
    };

    myChart.setOption(option);



});
import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
 
const options = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false
},
title: {
    text: 'Graphe <br/>Participation',
    align: 'center',
    verticalAlign: 'middle',
    y: 60
},
tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
},
accessibility: {
    point: {
        valueSuffix: '%'
    }
},
plotOptions: {
    pie: {
        dataLabels: {
            enabled: true,
            distance: -50,
            style: {
                fontWeight: 'bold',
                color: 'white'
            }
        },
        startAngle: -90,
        endAngle: 90,
        center: ['50%', '75%'],
        size: '110%'
    }
},
series: [{
    type: 'pie',
    name: 'Browser share',
    innerSize: '50%',
    data: [
        ['Entreprise', 58.9],
        ['Candidats', 13.29],
        
    ]
}]
}
 

const ChartComponent2 = () =>{ 

    return  (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                allowChartUpdate = { true }
                immutable = { false }
                updateArgs = { [true, true, true] }
            />
        </div>

)}

export default ChartComponent2
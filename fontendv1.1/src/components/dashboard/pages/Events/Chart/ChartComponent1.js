import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
 
const options = {
//   title: {
//     text: 'My chart'
//   },
//   series: [{
//     data: [1, 2, 3]
//   }]


  title: {
    text: "Graphe d'activité"
  },

  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },

  series: [{
    type: 'pie',
    allowPointSelect: true,
    keys: ['name', 'y', 'selected', 'sliced'],
    data: [
      ['Formations', 176.0, false],
      ['Stands', 176.0, false],
      ['Conférences', 135.6, true, true],
      ['Offres', 135.6, false],
    ],
    showInLegend: true
  }]
}
 

const ChartComponent1 = () =>{ 

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

export default ChartComponent1
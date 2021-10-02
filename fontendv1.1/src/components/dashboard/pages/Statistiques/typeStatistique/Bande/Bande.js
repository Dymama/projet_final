
import React, { useState,useEffect } from 'react';
import { render } from 'react-dom';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

// fonction declassement des entreprise
function trierEvent(data){
    var dataItem;

    return data.map((item,index)=>{
     
        dataItem= {
          "label": item.titre,
          "value": item._id,
        }
        return dataItem;
      
    })
    .filter((item,index)=> item !== undefined)
    
  }

  // fonction declassement des entreprise
function nomEvent(data){
    return data.map((item,index)=>item.titre)
    .filter((item,index)=> item !== undefined)
    
  }

  
// fonction declassement des entreprise
function trierEventParticipant(data){

    return data.map((item,index)=>{
        var dataCandidat = [];
        var dataEntreprise = [];  

        item.participants.map((item,index)=>{
           if(item.type_compte ==="candidat"){
            dataCandidat.push(item)
           }
           else{
            dataEntreprise.push(item)
           }
        })
        
        return [dataCandidat.length,dataEntreprise.length];
      
    })
    .filter((item,index)=> item !== undefined)
    
  }

  
  // fonction declassement des entreprise
function paticipantCandidat(data){
    return data.map((item,index)=>item[0])
    .filter((item,index)=> item !== undefined)
    
  }

  // fonction declassement des entreprise
function paticipantEntreprise(data){
    return data.map((item,index)=>item[1])
    .filter((item,index)=> item !== undefined)
    
  }

  

const Bande = (props) => {
  const [hoverData, setHoverData] = useState(null);
  const [eventList, setEventList] = useState(props.eventList);
  const [chartOptions, setChartOptions] = useState(
   
    {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Le nombre de participants par événement'
        },
    
        xAxis: {
          categories: nomEvent(eventList),
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: "Participants"
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [ {
          name: 'Entreprises',
          data: paticipantEntreprise(trierEventParticipant(eventList))
      
        }, {
          name: 'Candidats',
          data:paticipantCandidat(trierEventParticipant(eventList))
      
        }]
      }

  );

//   const updateSeries = () => {
//     setChartOptions({ 
//       series: [
//           { data: [Math.random() * 5, 2, 1]}
//         ]
//     });
//   }

useEffect(() => {
    console.log(eventList,'eventList')
}, [])


  return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
        {/* <h3>Hovering over {hoverData}</h3>
        <button onClick={updateSeries}>Update Series</button> */}
      </div>
    )
}

export default Bande;

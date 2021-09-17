import React,{useState,useEffect} from 'react'
import { Table } from 'rsuite';
import { withRouter,Redirect } from 'react-router';
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

// import {apiOffreGet} from '../../../../redux/entreprise/getOffres/getOffreAction'
// import postes from '../../../../api/poste'
const { Column, HeaderCell, Cell, Pagination,ButtonToolbar,Icon,IconButton,Loader } = Table;


function dataDebut(date){
  var m = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  var d =  new Date(date)
  
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`
}

function dataMinute(date){
  
  var d =  new Date(date)
  var min =`${d.getMinutes()}`
  
  return `${d.getHours()} h ${min.length === 1 ? '0'+min :min}`
}


function constitueData(data){
  return data.map((item,index)=>{
    return {
      ...item,
      heure_debut: dataMinute(item.heure_debut),
      date_debut: dataDebut(item.date_debut),
      heure_fin: dataMinute(item.heure_debut),
      date_fin: dataDebut(item.date_debut),
   
  }})
}

 function EventTable(props) {
   
    const [data, setData] = useState(constitueData(props.listEvent))
    


     useEffect(()=>{
    
        setData(constitueData(props.listEvent))
     },[props.listEvent])



      return (
        <div>
          <Table
            height={400}
            data={data}
            onRowClick={data => {
              console.log(data);
              props.handleActionShowDetail(data)
            }}
          >
            
            <Column width={200} fixed>
              <HeaderCell>Titre</HeaderCell>
              <Cell dataKey="titre" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>Date début</HeaderCell>
              <Cell dataKey="date_debut" />
            </Column>

            <Column width={200}>
              <HeaderCell>Heure début</HeaderCell>
              <Cell dataKey="heure_debut" />
            </Column>
  
            <Column width={120} fixed="right">
              <HeaderCell>Action</HeaderCell>
  
              <Cell>
                {rowData => {
                //   function handleAction() {
                //     alert(`titre:${rowData._id}`);
                //     console.log(`titre:${rowData._id}`);
                   
                //     if(rowData._id){
                //       history.push({
                //           pathname: '/dashboard/edition',
                //           search: '?query=abc',
                //           state: {idOffre: rowData._id}
                //       });
                //     }
                //   }
                  
                //   function handleAction2() {
                //     {/* alert(`titre delete:${rowData.titre}`); */}
                //     postes.deletePosteById(rowData._id)
                //         .then((res)=>{
                //             console.log(res.data,'data deleted')
                //         })
                //         .catch(err=>{
                //             console.log(err)
                //         })

                //   }
                  return (

                      <>

                        <span>      
                        <a > Editer </a> |{' '}
                        <a> Supprimer </a>
                        </span>
                     </>
                  
                  );
                }}
              </Cell>
            </Column>
          </Table>
        </div>
      );
    
  }
  
  
  export default EventTable;
  
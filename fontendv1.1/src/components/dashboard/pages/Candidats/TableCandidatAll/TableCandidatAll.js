import React,{useState,useEffect} from 'react'
import { Table } from 'rsuite';

import { useHistory } from "react-router-dom";
import './TableCandidatAll.css'

const { Column, HeaderCell, Cell } = Table;


function dataDebut(date){
  var m = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  var d =  new Date(date)
  
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`
}


function structedData(data){

  return data.map((item,index) => {
     return {
      id: item._id,
      nom: item.nom,
      prenom: item.prenom,
      email: item.email,
      date_naissance: dataDebut(item.date_naissance),
      civilite: item.civilite,
    }
  })
}


 function TableCandidatAll(props) {
     const [data, setData] = useState([])
 
      useEffect(() => {
        setData(structedData(props.listCandidat))
       
      }, [props.listCandidat])

      return (
        <div> <Table
          rowHeight={55}
        
          height={400}
          data={data}
          onRowClick={data => {
            props.dataClickCandidat(data)
           
          }}
        >

          <Column width={200} fixed>
            <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Nom</HeaderCell>
            <Cell dataKey="nom" />
          </Column>

          <Column width={200}>
            <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Prenom</HeaderCell>
            <Cell dataKey="prenom" />
          </Column>

          <Column width={200}>
            <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Civilité</HeaderCell>
            <Cell dataKey="civilite" />
          </Column>
          
          <Column width={200}>
            <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Date de naissance</HeaderCell>
            <Cell dataKey="date_naissance" />
          </Column>

          <Column width={200}>
            <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Email</HeaderCell>
            <Cell dataKey="email" />
          </Column>

         
          <Column width={150} fixed="right">
            <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Action</HeaderCell>

            <Cell>
              {/* {rowData => {
                function handleAction() {
                  alert(`id:${rowData.id}`);
                }
                return (
                  
                  <ButtonToolbar className="mx-auto text-center row ">
                     <div className="col-6 mx-auto " >
                       
                  <IconButton  icon={<Icon icon="edit" />} color="blue" circle />
                      </div>

                  {/* <IconButton icon={<Icon icon="warning" />} color="orange" circle /> 
                  <div className="col-6 mx-auto " >
                       
                  <IconButton icon={<Icon icon="trash" />} color="red" circle />
                  </div>

                  </ButtonToolbar>
                               
                );
              }} */}
            </Cell>
          </Column>
        </Table>
        </div>
      );
    
  }
  
  
  export default TableCandidatAll;
  
import React,{useState,useEffect} from 'react';

import { 
    Table,
    ButtonToolbar,
    InputGroup,
    Input,
    Icon,
    IconButton,
    Badge,
    InputPicker,
    Button

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';


const { Column, HeaderCell, Cell, Pagination } = Table;



function structedData(data){

    return data.map((item,index) => {
       return {
        id: item._id,
        nom: item.nom,
        prenom: item.prenom,
        email: item.email,
        civilite: item.civilite,
      }
    })
  }
  
export default function TableListCollaborateurs(props){
  
       const [data, setData] = useState(props.listCollaborateurs)
       const [loadTable, setLoadTable] = useState(false)
   
        useEffect(() => {
          setLoadTable(true)
          var timer = setTimeout(() => {
            setData(props.listCollaborateurs)
            setLoadTable(false)
            
          }, 1000);

            return () => {
              clearTimeout(timer)
            }
      
        }, [props.listCollaborateurs])
  
        return (
          <> 
          <Table
            cellBordered
            loading={loadTable}
            height={400}
            data={data}
            onRowClick={data => {
              props.dataClickerCollaborateur(data)
             
            }}
          >
  
            <Column width={300} >
              <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Nom</HeaderCell>
              <Cell dataKey="nom" />
            </Column>
  
            <Column width={200}>
              <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Prenom</HeaderCell>
              <Cell dataKey="prenom" />
            </Column>
  
            <Column width={300}>
              <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>
  
            <Column width={200}>
              <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Civilité</HeaderCell>
              <Cell dataKey="civilite" />
            </Column>
            
            <Column width={200}>
              <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Pays résidence</HeaderCell>
              <Cell dataKey="pays" />
            </Column>

            <Column width={200}>
              <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Vile résidence</HeaderCell>
              <Cell dataKey="ville" />
            </Column>
  
            <Column width={200}>
              <HeaderCell style={{backgroundColor: 'rgb(0, 0, 0)',color:"#fff"}} className="tab-valide-header" >Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>
  
          </Table>
          </>
        );
      
    }
    
    
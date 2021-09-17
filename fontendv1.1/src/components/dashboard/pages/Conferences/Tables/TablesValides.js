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

import './TablesValides.css';
const { Column, HeaderCell, Cell, Pagination } = Table;


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
      _id: item._id,
      theme: item.titre,
      description: item.description,
      heure_debut: dataMinute(item.heure_debut),
      date_debut: dataDebut(item.heure_debut),
      statut: item.statut,
      evenement: item.evenement
  }})
}


export default function TablesValides(props){
    const [data,setData] = useState(props.conference);
    const [load,setLoad]=useState(true);
   
    useEffect(()=>{
      setData(constitueData(props.conference))
    
    },[props.conference])

    useEffect(()=>{
      var timer = setTimeout(() => {
        
        setLoad(false)

      }, 1000);

      return ()=>{
        clearTimeout(timer)
      }
    },[])



      return (
        <div>
          <Table
          rowHeight={55}
          loading ={load}
            height={400}
            data={data}
            onRowClick={data => {
              props.dataClickConf(data)
              // props.openModal()
            }}
          >
          
  
            <Column width={200} fixed>
              <HeaderCell className="tab-valide-header" >Theme</HeaderCell>
              <Cell dataKey="theme" />
            </Column>
  
            <Column width={200}>
              <HeaderCell className="tab-valide-header" >Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>
  
            <Column width={200}>
              <HeaderCell className="tab-valide-header" >Date début</HeaderCell>
              <Cell dataKey="date_debut" />
            </Column>

            <Column width={200}>
              <HeaderCell className="tab-valide-header" >Heure début</HeaderCell>
              <Cell dataKey="heure_debut" />
            </Column>
  
            <Column width={200}>
              <HeaderCell className="tab-valide-header" >Statut</HeaderCell>
              <Cell dataKey="statut" />
            </Column>

            <Column width={200}>
              <HeaderCell className="tab-valide-header" >Evénement</HeaderCell>
              <Cell dataKey="evenement" />
            </Column>
  
           
            <Column width={150} fixed="right">
              <HeaderCell className="tab-valide-header" >Action</HeaderCell>
  
              <Cell>
                {rowData => {
                  function handleAction() {
                    alert(`id:${rowData.id}`);
                  }
                  return (
                    
                    <ButtonToolbar>
                    <IconButton icon={<Icon icon="edit" />} color="blue" circle />

                    <IconButton icon={<Icon icon="warning" />} color="orange" circle />

                    <IconButton icon={<Icon icon="trash" />} color="red" circle />

                    </ButtonToolbar>
                                
                  );
                }}
              </Cell>
            </Column>
          </Table>
        </div>
      );
    
  }

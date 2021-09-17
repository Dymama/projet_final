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
      titre: item.titre,
      description: item.description,
      concerner: item.concerner,
      heure_debut: dataMinute(item.heure_debut),
      date_debut: dataDebut(item.date_debut),
      type: item.type,
      entreprise_demandeur : item.entreprise_demandeur,
      statut: item.statut
  }})
}


export default function EntretienTable(props){
    const [data,setData] = useState(constitueData(props.entretien));
    const [load,setLoad]=useState(false);
   
    useEffect(()=>{
    
      setData(constitueData(props.entretien))
      props.handleTextIndication(props.etat==="attente" ?"en attentes" : "validés")
      
    },[props.entretien])


      return (
        <div>
          <Table
          rowHeight={55}
          loading ={load}
            height={400}
            data={data}
            onRowClick={data => {
              props.dataClickConf(data)
             props.etat === "valide" && props.handleCall()
             props.etat === "attente" &&(  props.openModal(data))
             
            }}
          >
            {/* <Column width={70} align="center" fixed>
              <HeaderCell className="tab-valide-header" >Id</HeaderCell>
              <Cell dataKey="_id" />
            </Column> */}
  
            <Column width={200} fixed>
              <HeaderCell className="tab-valide-header" >Titre</HeaderCell>
              <Cell dataKey="titre" />
            </Column>
  
            <Column width={200}>
              <HeaderCell className="tab-valide-header" >Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>
  
            <Column width={200}>
              <HeaderCell className="tab-valide-header" >Heure début</HeaderCell>
              <Cell dataKey="heure_debut" />
            </Column>
            
            <Column width={200}>
              <HeaderCell className="tab-valide-header" >Date début</HeaderCell>
              <Cell dataKey="date_debut" />
            </Column>
  
            <Column width={200}>
              <HeaderCell className="tab-valide-header" >Statut</HeaderCell>
              <Cell dataKey="statut" />
            </Column>
  
           
            <Column width={150} fixed="right">
              <HeaderCell className="tab-valide-header" >Action</HeaderCell>
  
              <Cell>
                {rowData => {
                  function handleAction() {
                    alert(`id:${rowData.id}`);
                  }
                  return (
                    
                    <ButtonToolbar className="mx-auto text-center row ">
                       <div className="col-6 mx-auto " >
                         
                    <IconButton  icon={<Icon icon="edit" />} color="blue" circle />
                        </div>

                    {/* <IconButton icon={<Icon icon="warning" />} color="orange" circle /> */}
                    <div className="col-6 mx-auto " >
                         
                    <IconButton icon={<Icon icon="trash" />} color="red" circle />
                    </div>

                    </ButtonToolbar>
                                 
                  );
                }}
              </Cell>
            </Column>
          </Table>
        </div>
      );
    
  }

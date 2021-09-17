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



export default function TablesValides(props){
    const [data,setData] = useState(props.conference);
    const [load,setLoad]=useState(false);
   
    useEffect(()=>{
      setData(props.conference)
      console.log(props)
    },[props.conference])


      return (
        <div>
          <Table
          rowHeight={55}
          loading ={load}
            height={400}
            data={data}
            onRowClick={data => {
              props.dataClickConf(data)
              props.openModal()
            }}
          >
            <Column width={70} align="center" fixed>
              <HeaderCell className="tab-valide-header" >Id</HeaderCell>
              <Cell dataKey="_id" />
            </Column>
  
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

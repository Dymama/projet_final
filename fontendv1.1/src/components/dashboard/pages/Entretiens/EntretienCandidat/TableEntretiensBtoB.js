import React,{useState,useEffect} from 'react';
import { Table,Col,Row,Panel,ButtonToolbar,IconButton,Icon } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import utilisateurs from '../../../../../api/utilisateur';
import configureStore from '../../../../../redux/store';
import { dataDebut,dataMinute } from '../../../../../services/_modules';

// import './TablesValides.css';
const { Column, HeaderCell, Cell, Pagination } = Table;
const {store} =configureStore()


function constitueData(data){
  return data.map((item,index)=>{
    
    return {

      ...item,
      heure_debut: dataMinute(item.heure_debut),
      date_debut: dataDebut(item.date_debut),
      heure_fin: dataMinute(item.heure_fin),
      date_fin: dataDebut(item.date_fin),

  }})
}



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



export default function TableEntretiensBtoB(props){

  
    const [data,setData] = useState([{}]);
    const [loadTable, setLoadTable] = useState(false)
    

    useEffect(()=>{
      setLoadTable(true)

        setTimeout(() => {

            setData(props.entretien ? constitueData(props.entretien): [{}])
            setLoadTable(false)
        }, 2000);

       
    },[])


    useEffect(()=>{
      
      const dataTable = props.entretien ;
    //   setAllData(props.entretien)
      setData(dataTable ? constitueData(dataTable): [{}])
     
   },[props.entretien])

   

      return (
         
        <>
        <Row >
          <Col className="pb-3"  md={24} sm={24}>
          <ButtonToolbar className="float-md-right mx-auto">
              <IconButton onClick={()=>props.handleActionNewEntretien()}   appearance="ghost" icon={<Icon icon="plus" />} placement="right">
                                  Nouvel Entretien
              </IconButton>
          </ButtonToolbar>

          </Col>

        </Row>
        <Panel shaned bordered className="mx-2">
          <Table
          loading={loadTable}
          fluid
          virtualized={true}
            height={400}
            data={data}
            onRowClick={data => {
              props.handleActionShowDetail(data._id);
            }}
          >
            
            <Column width={200} fixed>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Titre</HeaderCell>
              <Cell dataKey="titre" />
            </Column>
  
            <Column width={200}>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>
  
            <Column width={200}>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Date de début</HeaderCell>
              <Cell dataKey="date_debut" />
            </Column>

            <Column width={200}>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Heure de début</HeaderCell>
              <Cell dataKey="heure_debut" />
            </Column>

            <Column width={200}>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Date de fin</HeaderCell>
              <Cell dataKey="date_fin" />
            </Column>

            <Column width={200}>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Heure de fin</HeaderCell>
              <Cell dataKey="heure_fin" />
            </Column>

  
           
          </Table>
          </Panel>
        </>
      );
    
  }

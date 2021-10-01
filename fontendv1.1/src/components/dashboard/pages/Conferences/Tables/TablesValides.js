import React,{useState,useEffect} from 'react';
import { Table,SelectPicker,Col,Row,FormGroup,ControlLabel,ButtonToolbar,IconButton,Icon } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import utilisateurs from '../../../../../api/utilisateur';
import configureStore from '../../../../../redux/store';
import { dataDebut,dataMinute } from '../../../../../services/_modules';

import './TablesValides.css';
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


const proprioConferenceData=[
  {
  "label":"Mes conférences",
  "value":"own",
  },
  {
    "label":"Toutes les conférences",
    "value":"all",
    }
]


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





  // fonction search data table
  function constitueDataChanged(data,value){

    return data.filter((item,index)=> item.evenement === value )
    
  }

  function filterOwnConference(data,value){

    return data.filter((item,index)=> item.entreprise === value )
    
  }


export default function TablesValides(props){

  
  const user = store.getState().getInfoUser.user.data
    const [data,setData] = useState([{}]);
    // const [load,setLoad]=useState(true);
   


    const [dataChanged, setDataChanged] = useState([{}])
    const [entrepriseData, setEntrepriseData] = useState([{}])
    const [loadTable, setLoadTable] = useState(false)
    const [selectEventValue, setSelectEventValue] = useState('')
    const [etatPropio, setEtatPropio] = useState('own')
    const [allData, setAllData] = useState([{}])
    

    useEffect(()=>{
      setLoadTable(true)

      utilisateurs.getUserEntreprise(user._id)
       .then(res=>{
         setEntrepriseData(res.data.data)
          setTimeout(() => {

            setData(props.conference ? filterOwnConference(constitueData(props.conference),res.data.data._id): [{}])
            setLoadTable(false)
        }, 2000);

       })
       
    },[])


    useEffect(()=>{
      
      const dataTable = props.conference ;
      setAllData(props.conference)
      setData(dataTable ? filterOwnConference(constitueData(dataTable),entrepriseData._id): [{}])
      
      if(etatPropio ==="own"){
        setData(dataTable ? filterOwnConference(constitueData(dataTable),entrepriseData._id): [{}])
      }
      if(etatPropio ==="all"){
        setData(dataTable ?constitueData(dataTable): [{}])
      }
      
   },[props.conference])

   

    const selectEvent = (value,e)=>{
      setLoadTable(true)
      setSelectEventValue(value)
      
      setTimeout(() => {
        setDataChanged(constitueDataChanged(data,value))
        setLoadTable(false)
        
      }, 1000);
    }

    const selectProprioConference = (value,e)=>{
    setLoadTable(true)
    setEtatPropio(value)

    setTimeout(() => {
      setLoadTable(false)

      if(value ==="own"){
        setData(allData ? filterOwnConference(constitueData(allData),entrepriseData._id): [])
      }
      if(value ==="all"){
        setData(allData ?constitueData(allData): [])
      }

      
    }, 1000);
    }




      return (
        <div>
        <Row >
          {user.admin && (<Col className="pb-3"  md={8} sm={24}>
          <FormGroup  className="float-md-left mx-auto">
            <ControlLabel> Selectionner un propriétaire </ControlLabel>
              <SelectPicker
              onChange={(value,e)=>selectProprioConference(value,e)}
              size="lg"
              placeholder="Mes conférences"
              data={proprioConferenceData}
              style={{ width: 300, display: 'block', }}
              />
          </FormGroup>
          </Col>)
          }
          <Col className="pb-3"  md={user.admin?8:12} sm={24}>
          <FormGroup  className="float-md-left mx-auto">
            <ControlLabel> Selectionner un événement </ControlLabel>
              <SelectPicker
              onChange={(value,e)=>selectEvent(value,e)}
              size="lg"
              placeholder="Selectionner"
              data={trierEvent(store.getState().listEvent.listEvent.data)}
              style={{ width: 300, display: 'block', }}
              />
          </FormGroup>
          </Col>
          <Col className="pb-3"  md={user.admin?8:12} sm={24}>
          <ButtonToolbar className="float-md-right mx-auto">
              <IconButton onClick={()=>props.handleActionNewConference()}   appearance="ghost" icon={<Icon icon="plus" />} placement="right">
                                  Nouvelle conférence
              </IconButton>
          </ButtonToolbar>

          </Col>

        </Row>
          <Table
          loading={loadTable}
          fluid
          virtualized={true}
            height={400}
            data={selectEventValue? dataChanged :data}
            onRowClick={data => {
              props.handleActionShowDetail(data);
            }}
          >
            
            <Column width={200} fixed>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Theme</HeaderCell>
              <Cell dataKey="theme" />
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
        </div>
      );
    
  }

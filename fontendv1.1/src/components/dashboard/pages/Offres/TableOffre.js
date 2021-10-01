import React,{useState,useEffect} from 'react'
import { Table,SelectPicker,Col,Row,FormGroup,ControlLabel,ButtonToolbar,IconButton,Icon } from 'rsuite';
import { withRouter,Redirect } from 'react-router';
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

import parse from 'html-react-parser';
import {apiOffreGet} from '../../../../redux/entreprise/getOffres/getOffreAction'
import postes from '../../../../api/poste'
import evenements from '../../../../api/evenement'

import 'rsuite/dist/styles/rsuite-default.css';
import configureStore from '../../../../redux/store';
import utilisateurs from '../../../../api/utilisateur';




const {store} =configureStore()


const { Column, HeaderCell, Cell, } = Table;


const proprioOffreData=[
  {
  "label":"Mes offres",
  "value":"own",
  },
  {
    "label":"Toutes les offres",
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


function getEnvent(data){
  evenements.getEvenementById(data)
  .then( res => {

      return(res.data.data,'reposkj')

  })
  .catch(err => {
    return ''
  })
}


function constitueData(data){
  return data.map((item,index)=>{
    return {
      ...item,
      description: parse(item.description),
  }

})
}

  // fonction search data table
  function constitueDataChanged(data,value){

    return data.filter((item,index)=> item.evenement === value )
    
  }

  function filterOwnPostes(data,value){

    return data.filter((item,index)=> item.entreprise === value )
    
  }


 function TableOffre(props) {

    let history = useHistory();
    const user = store.getState().getInfoUser.user.data
     const [data, setData] = useState([{}])
     const [dataChanged, setDataChanged] = useState([{}])
     const [entrepriseData, setEntrepriseData] = useState([{}])
     const [loadTable, setLoadTable] = useState(false)
     const [selectEventValue, setSelectEventValue] = useState('')
     const [etatPropio, setEtatPropio] = useState('')
     const [allData, setAllData] = useState([{}])
     

     useEffect(()=>{
       
      props.apiOffreGetFunc();
      setLoadTable(true)
      utilisateurs.getUserEntreprise(user._id)
        .then(res=>{
          setEntrepriseData(res.data.data)
          
          setTimeout(() => {

            setData(props.apiOffreGetData.offre.data ? filterOwnPostes(constitueData(props.apiOffreGetData.offre.data),res.data.data._id): [{}])
            setLoadTable(false)
        }, 2000);

        })
        
   },[])

  
     useEffect(()=>{
        props.apiOffreGetFunc();
        const dataTable = props.apiOffreGetData.offre.data ;
        setAllData(dataTable)
        setData(dataTable ? filterOwnPostes(constitueData(dataTable),entrepriseData._id): [])
        
        if(etatPropio ==="own"){
          setData(dataTable ? filterOwnPostes(constitueData(dataTable),entrepriseData._id): [])
        }
        if(etatPropio ==="all"){
          setData(dataTable ?constitueData(dataTable): [])
        }
        
     },[props.apiOffreGetData.offre.data])

    
  function handleActionShowDetail(data) {
    history.push({
        pathname: '/dashboard/detail_offre_row_table',
        search: '?query=abc',
        state: {offreRowData: data._id}
    });

  }
  
  const selectEvent = (value,e)=>{
    setLoadTable(true)
    setSelectEventValue(value)
    
    setTimeout(() => {
      setDataChanged(constitueDataChanged(data,value))
      setLoadTable(false)
      
    }, 1000);
 }
 
 const selectProprioOffre = (value,e)=>{
  setLoadTable(true)
  setEtatPropio(value)
  
  setTimeout(() => {
    setLoadTable(false)

    if(value ==="own"){
      setData(allData ? filterOwnPostes(constitueData(allData),entrepriseData._id): [])
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
              onChange={(value,e)=>selectProprioOffre(value,e)}
              size="lg"
              placeholder="Mes offres"
              data={proprioOffreData}
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
              <IconButton onClick={()=>props.handleActionNewOffre()}   appearance="ghost" icon={<Icon icon="plus" />} placement="right">
                                  Nouvelle offre
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
              handleActionShowDetail(data);
            }}
          >
            
            <Column width={200} fixed>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Titre</HeaderCell>
              <Cell dataKey="titre" />
            </Column>
  
            <Column width={200}>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Type contrat</HeaderCell>
              <Cell dataKey="type_emplois" />
            </Column>
  
            <Column width={200}>
              <HeaderCell style={{background:'#000',color:'#fff'}} >pays</HeaderCell>
              <Cell dataKey="pays" />
            </Column>

            <Column width={200}>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Ville</HeaderCell>
              <Cell dataKey="ville" />
            </Column>

            <Column width={200}>
              <HeaderCell style={{background:'#000',color:'#fff'}} >Description</HeaderCell>
              <Cell dataKey="description" />
            </Column>
  
           
          </Table>
        </div>
      );
    
  }
  
const mapStateToProps = state => {
    return {
      apiOffreGetData : state.getOffres
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      apiOffreGetFunc : () => dispatch(apiOffreGet())
    }
  }
  
  
  export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TableOffre));
  
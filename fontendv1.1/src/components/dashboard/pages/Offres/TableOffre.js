import React,{useState,useEffect} from 'react'
import { Table } from 'rsuite';
import { withRouter,Redirect } from 'react-router';
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";

import {apiOffreGet} from '../../../../redux/entreprise/getOffres/getOffreAction'
import postes from '../../../../api/poste'
const { Column, HeaderCell, Cell, Panel,Pagination,ButtonToolbar,Icon,IconButton,Loader } = Table;

 function TableOffre(props) {
    let history = useHistory();

     const [data, setData] = useState([{}])
  

     useEffect(()=>{
        props.apiOffreGetFunc();
        const dataTable = props.apiOffreGetData.offre.data ;
        setData(dataTable)
     },[props.apiOffreGetData.offre.data])

     
   
    
  function handleActionShowDetail(data) {
    history.push({
        pathname: '/dashboard/detail_offre_row_table',
        search: '?query=abc',
        state: {offreRowData: data._id}
    });

  }

      return (
        <div>
         
          <Table
            
            
            height={400}
            data={data}
            onRowClick={data => {
              handleActionShowDetail(data);
            }}
          >
            
            <Column width={200} fixed>
              <HeaderCell>Titre</HeaderCell>
              <Cell dataKey="titre" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>Type contrat</HeaderCell>
              <Cell dataKey="type_emplois" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>pays</HeaderCell>
              <Cell dataKey="pays" />
            </Column>

            <Column width={200}>
              <HeaderCell>Ville</HeaderCell>
              <Cell dataKey="ville" />
            </Column>
  
            <Column width={120} fixed="right">
              <HeaderCell>Action</HeaderCell>
  
              <Cell>
                {rowData => {
                  function handleAction() {
                    alert(`titre:${rowData._id}`);
                    console.log(`titre:${rowData._id}`);
                   
                    if(rowData._id){
                      history.push({
                          pathname: '/dashboard/edition',
                          search: '?query=abc',
                          state: {idOffre: rowData._id}
                      });
                    }
                  }
                  
                  function handleAction2() {
                    {/* alert(`titre delete:${rowData.titre}`); */}
                    postes.deletePosteById(rowData._id)
                        .then((res)=>{
                            console.log(res.data,'data deleted')
                        })
                        .catch(err=>{
                            console.log(err)
                        })

                  }
                  return (

                      <>

                        <span>      
                        <a onClick={handleAction}> Editer </a> |{' '}
                        <a onClick={handleAction2}> Supprimer </a>
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
  
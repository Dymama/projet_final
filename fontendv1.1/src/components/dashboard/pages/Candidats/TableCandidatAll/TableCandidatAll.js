import React,{useState,useEffect} from 'react'
import { Table } from 'rsuite';

import { useHistory } from "react-router-dom";
import './TableCandidatAll.css'
// import {apiOffreGet} from '../../../../redux/entreprise/getOffres/getOffreAction'
// import postes from '../../../../api/poste'
import utilisateurs from '../../../../../api/utilisateur'

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

function recupererDataCandidat(data){
  return data.map((item,index)=>{
    
    if(item.utilisateur){
      var dataUser = []
     utilisateurs.getUtilisateurById(item.utilisateur)
      .then(res =>{
        // dataUser.push(item,res.data.data )
        return res.data.data 
        
      })
      .catch(err =>{
        console.log(err)
      })

      return dataUser
    }
  }).filter((item,index) => item !== undefined)
}


function structedData(data){
  // data.forEach(function(val, index, array) {
  // console.log(val[0],'data')

  // });
  // console.log(data,'data')
  return data.map((item,index) => {
    console.log(item[1],'data')
    if(item.length !=0){
      console.log(item,'data')

    //  return {
    //   nom: item[1].nom,
    //   prenom: item[1].prenom,
    //   photo: item[1].photo,
    //   photo: item[1].date_naissance,
    //   salaire: item[0].salaire_actuel,
    //   poste: item[0].poste_actuel,
    //   cv: item[0].cv,
    //   experience: item[0].annee_experience,
    //   niveau: item[0].niveau_etude,
    //   civilite: item[1].civilite,

    // }
      }
  })
}


 function TableCandidatAll(props) {
     const [data, setData] = useState(props.listCandidat)
    //  const [tabledata, setTableData] = useState(structedData(data))
  

     useEffect(()=>{
      props.listCandidat.map((item,index)=>{
    
        if(item.utilisateur){
          var dataUser = []
         utilisateurs.getUtilisateurById(item.utilisateur)
          .then(res =>{

            // dataUser.push(item,res.data.data )
            setData(res.data.data )
            
          })
          .catch(err =>{
            console.log(err)
          })
    
        }
      })

        setData(recupererDataCandidat(props.listCandidat))
        console.log(recupererDataCandidat(props.listCandidat),'dattttt')
     },[props.listCandidat])


   
     let history = useHistory();
    

      return (
        <div>
          <Table
            height={400}
            data={data}
            onRowClick={data => {
              console.log(data);
            }}
          >
            
            <Column width={200} fixed>
              <HeaderCell>Titre</HeaderCell>
              <Cell dataKey="nom" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>Description</HeaderCell>
              <Cell dataKey="prenom" />
            </Column>
  
            <Column width={200}>
              <HeaderCell>Date début</HeaderCell>
              <Cell dataKey="civilite" />
            </Column>

            <Column width={200}>
              <HeaderCell>Heure début</HeaderCell>
              <Cell dataKey="date_naissance" />
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
  
  
  export default TableCandidatAll;
  
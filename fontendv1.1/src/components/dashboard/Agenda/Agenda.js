import React,{useState,useEffect} from 'react';
import {useSelector, useDispatch,useStore} from 'react-redux'
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import './Agenda.css'
import { apiGetAgenda } from '../../../redux/agenda/agendaGet.js/agendaGetAction';
import admins from '../../../api/administrateur';
require('moment/locale/fr.js'); // this is important for traduction purpose
 
var colors= {
  'color-1':"rgba(102, 195, 131 , 1)" ,
  "color-2":"rgba(242, 177, 52, 1)" ,
  "color-3":"rgba(235, 85, 59, 1)"
}
 
var now = new Date();
 
var itemsData = [
  {
   _id            :guid(),
    name          : 'REUNION  , DEV!',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
    classes       : 'color-1'
  },
  {
   _id            :guid(),
    name          : 'REASTAURATION ',
    startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 13, 0),
    classes       : 'color-2 color-3'
  }, 
  {
    _id            :guid(),
     name          : 'REPOS',
     startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 11, 0),
     endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 13, 0),
     classes       : 'color-3'
   },
 
];


function setDataForItems(data){
 return data.map((item,index)=>{
    return {
       name          : item.name,
       startDateTime : new Date(item.startDateTime),
       endDateTime   : new Date(item.endDateTime),
       classes       : 'color-3'
     }
     
  })
}
 
function Agenda (props) {
  
  const store = useStore();
  const ownAgenda = useSelector(state => state.getAgenda)
  const dispatch = useDispatch();

  const [items, setItems] = useState(itemsData)
  const [selected, setSelected] = useState([])
  const [cellHeight, setCellHeight] = useState(30)
  const [showModal, setShowModal] = useState(false)
  const [locale, setLocale] = useState("fr")
  const [rowsPerHour, setRowsPerHour] = useState(2)
  const [numberOfDays, setNumberOfDays] = useState(4)
  const [startDate, setStartDate] = useState(new Date())

  
  useEffect(()=>{
    var dataUser;
    const user = store.getState().getInfoUser.user.data

    if(user && user.type_compte === "entreprise"){
      const admin = store.getState().getAdmin.admin.data
      dispatch(apiGetAgenda(admin.entreprise))
    }
    
    if(user && user.type_compte === "candidat"){

      dispatch(apiGetAgenda(user._id))

    }

    
  },[dispatch])


  useEffect(()=>{
    console.log(ownAgenda.agenda.data,'ownagenda trueru')
    // console.log(setDataForItems(agenda.items),'ownagenda trueru')
    if(ownAgenda.agenda.data){

      var agenda = ownAgenda.agenda.data
  
    console.log(setDataForItems(agenda.items),'iitems tur')

      setItems(setDataForItems(agenda.items))
      // setSelected(agenda.selected)
      // setCellHeight(agenda.cellHeight)
      // setShowModal(agenda.showModal)
      // setLocale(agenda.locale)
      // setRowsPerHour(agenda.rowsPerHour)
      // setNumberOfDays(agenda.numberOfDays)
      // setStartDate(new Date(2021, 8, 29, 13, 0))
    }


  },[ownAgenda])



  const handleCellSelection = (item)=>{
    console.log('handleCellSelection',item)
  }

  const handleItemEdit = (item)=>{
    console.log('handleItemEdit', item)
  }

  const handleRangeSelection = (item)=>{
    console.log('handleRangeSelection', item)
  }

 
    return (
      <div>
        <ReactAgenda
          classNane="agenda"
          minDate={now}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          disablePrevButton={false}
          startDate={startDate}
          cellHeight={cellHeight}
          locale={locale}
          items={items}
          numberOfDays={numberOfDays}
          rowsPerHour={rowsPerHour}
          itemColors={colors}
          autoScale={false}
          fixedHeader={true}
          onItemEdit={(e)=>handleItemEdit(e)}
          onCellSelect={(e)=>handleCellSelection(e)}
          onRangeSelection={()=>handleRangeSelection()}/>
         {/* <ReactAgendaCtrl
          items={this.state.items}
          itemColors={colors}
          selectedCells={this.state.selected}
          Addnew={this.addNewEvent}
          edit={this.editEvent}  /> */}

      </div>
    );
  
}

export default Agenda;
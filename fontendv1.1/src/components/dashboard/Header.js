import './Header.css';
import React,{useEffect,useState} from 'react'
import {
    Dropdown,
    Icon,
    Sidenav,
    IconButton,
    Button,
    Avatar,
    Badge,
    Whisper,
    ButtonToolbar,
    Modal,
    Tooltip
  } from 'rsuite'
  
  import 'rsuite/dist/styles/rsuite-default.css';
  
  
  import {useSelector, useDispatch,useStore } from 'react-redux'
import {Link} from 'react-router-dom';
import {
    Nav,
    NavItem,
    Media,
  } from 'reactstrap';
import AgendaModal from './Agenda/Agendamodal';
import DrawerProfile from './pages/generiques/DrawerProfile';
import ProfileModal from './ProfileUser/ProfilModal';
import utilisateurs from '../../api/utilisateur';


const tooltipAgenda = (
    <Tooltip>
      <i>Agenda</i>
    </Tooltip>
  );

  const tooltipConver = (
    <Tooltip>
      <i>Conversations</i>
    </Tooltip>
  );

  const tooltipNotif = (
    <Tooltip>
      <i>Notifications</i>
    </Tooltip>
  );

  const tooltipScreen = (
    <Tooltip>
      <i>Plein Ecran</i>
    </Tooltip>
  );


  const tooltipProf = (
    <Tooltip>
      <i>Profil</i>
    </Tooltip>
  );


export default function Header() {
  
  const store = useStore();
  
  
 
  const [userData,setUserData]= useState(store.getState().getInfoUser.user.data)
  const [entreprise,setEntreprise]= useState([])
  const [candidat,setCandidat]= useState([])
  const [iconChange,setIconChange]= useState('left')

  const [show, setShow] = useState(false)
  const [rows, setRows] = useState(0)
  const [showProfile, setShowProfile] = useState(false)
  
  const [showUserModal, setShowUserModal] = useState(false)
  const [rowsUserModal, setRowsUserModal] = useState(0)

  const closeUserModal = ()=> {
    setShowUserModal(false);
  }
  
  
  const openUserModal = ()=>  {
    setShowUserModal (true);
    setTimeout(() => {
      setRowsUserModal(80);

    }, 1000);
  }


  const close = ()=> {
    setShow(false);
  }
  
  
  const resetRows = ()=>  {
    setRows(0);
  }

  const open = ()=>  {
    setShow (true);
    setTimeout(() => {
      setRows(80);

    }, 4000);
  }

  const closeProfile = ()=> {
    setShowProfile(false);
  }
  
  const toggleDrawer=()=>{
    setShowProfile( true );
  }
 
  const changeIconToggler=()=>{
    if(iconChange === 'left')setIconChange('right')
    if(iconChange === 'right')setIconChange('left')
  }

  
  
 useEffect( ()=> {
  utilisateurs.getUserEntreprise(userData._id)
    .then( res => {
      setEntreprise(res.data.data)
    })
    .catch( err => {
      console.log(err,'error data')
    })


    utilisateurs.getInfoUSerCandidat(userData._id)
    .then( res => {
      setCandidat(res.data.data.candidat)
    })
    .catch( err => {
      console.log(err,'error data')
    })


  },[])
  
 useEffect( ()=> {
  utilisateurs.getUserEntreprise(userData._id)
    .then( res => {
      setEntreprise(res.data.data)
    })
    .catch( err => {
      console.log(err,'error data')
    })

    utilisateurs.getInfoUSerCandidat(userData._id)
    .then( res => {
      setCandidat(res.data.data.candidat)
    })
    .catch( err => {
      console.log(err,'error data')
    })

  },[userData])
  


  return (
            <>
            <nav className="main-header navbar navbar-expand navbar-white">

                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" role="button">
                        <IconButton onClick={()=>{changeIconToggler()}}  appearance="ghost" className="text-center mt-n2" icon={<Icon icon={`angle-double-${iconChange}`} />}   circle size="lg" />
                    </a>

                    </li>
                    
                    <NavItem className="mx-3">
                    <Button className="hidden-md"  appearance="ghost" componentClass={Link} to="/"><Icon icon="home" className="mr-2" /> Retour Accueil</Button>
               
                    </NavItem>


                  
                </ul>


                
                <ul className="navbar-nav ml-auto">
                

                    
                    <li className="nav-item dropdown">
                        <Whisper placement="bottom" trigger="hover" speaker={tooltipAgenda}>
                        <a className="nav-link" data-toggle="dropdown">
                            <IconButton appearance="ghost" className="text-center mt-n2" icon={<Icon icon="calendar" />}  onClick={()=>open()} circle size="lg" />
                            
                        </a>
                        </Whisper>
                        
                    </li>
                    
                    <li className="nav-item dropdown">
                        <Whisper placement="bottom" trigger="hover" speaker={tooltipConver}>
                        <a className="nav-link" data-toggle="dropdown">
                        
                            <Badge content={ 0}>
                                <Icon icon="comments" />
                            </Badge>
                        </a>
                        </Whisper>
                        
                    </li>
                    
                    <li className="nav-item dropdown">
                    <Whisper placement="bottom" trigger="hover" speaker={tooltipNotif}>
                    <a className="nav-link" data-toggle="dropdown">
                        <Badge content={ 0}>
                                <Icon icon="bell" />
                        </Badge>
                    </a>
                    </Whisper>
                  
                    </li>
                    <li className="nav-item">
                    <Whisper placement="bottom" trigger="hover" speaker={tooltipScreen}>
                    <a className="nav-link" data-widget="fullscreen" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                    </Whisper>
                    </li>
                    
                    <li className="nav-item">
                    <Whisper placement="bottom" trigger="hover" speaker={tooltipProf}>
                    <a className="nav-link" role="button">
                        <Avatar className="mt-n2"
                         onClick={()=>openUserModal()} 
                            circle
                            src={userData.photo}
                        />      
                    </a>
                    </Whisper>
                    </li>

                    
                </ul>

            </nav>

            <AgendaModal rows={rows} show={show} open={open} close={close} resetRows={resetRows} />
            <ProfileModal userData={userData} entrepriseData={entreprise} candidatData={candidat} showUserModal={showUserModal}  closeUserModal={closeUserModal} />
            <DrawerProfile toggleDrawer={toggleDrawer} show={showProfile} close={closeProfile} />

            </>
)
}
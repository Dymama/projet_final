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
    Tooltip
  } from 'rsuite'
  
  import 'rsuite/dist/styles/rsuite-default.css';
import {Link} from 'react-router-dom';
import {
    Nav,
    NavItem,
    Media,
  } from 'reactstrap';
import AgendaModal from './Agenda/Agendamodal';
import DrawerProfile from './pages/generiques/DrawerProfile';


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
  const [show, setShow] = useState(false)
  const [rows, setRows] = useState(0)
  const [showProfile, setShowProfile] = useState(false)

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


  return (
            <>
            <nav className="main-header navbar navbar-expand navbar-white">

                <ul className="navbar-nav">
                    <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" role="button">
                        <IconButton appearance="ghost" className="text-center mt-n2" icon={<Icon icon="bars" />}   circle size="lg" />
                    </a>

                    </li>
                    
                    <NavItem className="mx-3">
                    <Button className="" componentClass={Link} to="/"><Icon icon="home" className="mr-2" /> Retour Accueil</Button>
               
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
                         onClick={()=>toggleDrawer()} 
                            circle
                            src="https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"
                        />      
                    </a>
                    </Whisper>
                    </li>

                    
                </ul>

            </nav>
            <AgendaModal rows={rows} show={show} open={open} close={close} resetRows={resetRows} />
            <DrawerProfile toggleDrawer={toggleDrawer} show={showProfile} close={closeProfile} />

            </>
)
}
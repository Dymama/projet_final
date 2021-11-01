import './SideBar.css';
import {
  Dropdown,
  Icon,
  Sidenav,
  Nav,
  IconButton,
  Button,
  Avatar,
  Badge

} from 'rsuite'
import {Link} from 'react-router-dom';


import 'rsuite/dist/styles/rsuite-default.css';
import { useState,useEffect } from 'react';

import {useSelector, useDispatch,useStore } from 'react-redux'
import { apiGetInfoUser } from '../../redux/getInfo/getInfoAction';
import utilisateurs from '../../api/utilisateur';
import { apiGetAdmin } from '../../redux/admin/adminAction';
import { apiGetInfoEntreprise } from '../../redux/entreprise/getInfo/getInfoAction';



const NavLink = props => <Nav.Item componentClass={Link} {...props} />;




export default function SideBar({ ...props }) {
  const store = useStore();
  const admin = useSelector(state => state.getAdmin)
  
 
  const [userData,setUserData]= useState(store.getState().getInfoUser.user.data)
  const [adminData,setAdminData]= useState(userData.type_compte === "entreprise"?admin.admin.data:[])
  

  const dispatch = useDispatch();

  useEffect(() => {
      if(userData.type_compte === "entreprise"){
        dispatch(apiGetAdmin(userData._id))
      }
    
  },[dispatch])



  useEffect(() => {
    var timer = setTimeout(() => {

      setAdminData(admin.admin.data)
     
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
    
  },[admin.admin.data])


  useEffect(() => {
    var timer = setTimeout(() => {
      setUserData(store.getState().getInfoUser.user.data)
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
    
  },[store.getState().getInfoUser.user.data])



    return (
      
        <aside className="main-sidebar">

          <div href="#" className="brand-link-my row m-auto ">
          <div className="col-3 m-auto">
           <Avatar alt="Logo" 
                  circle
                  src={ userData ? userData.photo: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"}
                />
              </div>
          
           <div className="col-9 m-auto"><span className="text-white text-uppercase font-weight-bold">Empower</span></div>
          </div>
       
        
        <div className="sidebar mt-3">
        
    
         
          <div className="">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
              <Sidenav {...props} className="ml-2"  style={{backgroundColor:'white',overflowX:'hidden',height:"38em"}}>
              <Sidenav.Body>
                <Nav>
                 
             <NavLink eventKey="1" icon={<Icon icon="home"/>} componentClass={Link} to="/dashboard/">Accueil</NavLink>)
               
               
                {userData && userData.admin ===true && userData.type_compte ==="entreprise" 
                &&
                (<Dropdown eventKey="2" title="Evénements" icon={<Icon icon="signing" />}>

                    <Dropdown.Item eventKey="2-1" componentClass={Link} to="/dashboard/new_event">Nouvel événement</Dropdown.Item>
                    <Dropdown.Item eventKey="2-2" componentClass={Link} to="/dashboard/list_events">Liste événement</Dropdown.Item>

                  </Dropdown>)
                // : ( <NavLink eventKey="2" icon={<Icon icon="signing"/>} componentClass={Link} to="/dashboard/events">Evénements</NavLink>
                // )
                }

                
                  <Dropdown eventKey="3" title="Offres" icon={<Icon icon="magic" />}>
                    {userData && userData.type_compte ==="entreprise" 
                    ? 
                    (<> <Dropdown.Item eventKey="3-1" componentClass={Link} to="/dashboard/new_offre">Nouvelle offre</Dropdown.Item>
                    <Dropdown.Item eventKey="3-2" componentClass={Link} to="/dashboard/ownoffres">Liste offres</Dropdown.Item> </>)
                    : ""
                    }
                    {userData && userData.type_compte ==="candidat" 
                    ? 
                    (<> <Dropdown.Item eventKey="3-4" componentClass={Link} to="/dashboard/own_offres_candidat">Mes  offre</Dropdown.Item>
                    <Dropdown.Item eventKey="3-3" componentClass={Link} to="/dashboard/offres">Liste offres</Dropdown.Item>
                     </>)
                    : ""
                    }
                    

                  </Dropdown>


                  {/* start_conference */}
                  <Dropdown eventKey="4" title="Conférences" icon={<Icon icon="group" />}>
                  {userData && userData.type_compte ==="entreprise" 
                    ? 
                    (<>
                    <Dropdown.Item eventKey="4-1" componentClass={Link} to="/dashboard/new_conference">Nouvelle conférence</Dropdown.Item>
                    <Dropdown.Item eventKey="4-2" componentClass={Link} to="/dashboard/conferences">Liste conférences</Dropdown.Item> </>)
                    : ""
                    }
                    
                    {userData && userData.type_compte ==="candidat" 
                    ? 
                    (<> <Dropdown.Item eventKey="4-1" componentClass={Link} to="/dashboard/own_conferences_candidat">Mes  conferences</Dropdown.Item>
                    <Dropdown.Item eventKey="4-3" componentClass={Link} to="/dashboard/allconferences">Toutes les conférences</Dropdown.Item>
                     </>)
                    : ""
                    }

                  </Dropdown>

                  <Dropdown eventKey="5" title="Formations" icon={<Icon icon="mortar-board" />}>
                  {userData && userData.type_compte ==="entreprise" 
                    ? 
                    (<>
                    <Dropdown.Item eventKey="5-1"  componentClass={Link} to="/dashboard/new_formation">Nouvelle formation</Dropdown.Item>
                    <Dropdown.Item eventKey="5-2" componentClass={Link} to="/dashboard/formations">Liste formations</Dropdown.Item></>)
                    : ""
                    }

                    {userData && userData.type_compte ==="candidat" 
                    ? 
                    (<> <Dropdown.Item eventKey="5-1" componentClass={Link} to="/dashboard/own_formations_candidat">Mes  formations</Dropdown.Item>
                    
                    <Dropdown.Item eventKey="5-3"  componentClass={Link} to="/dashboard/new_formation">Toutes les formation</Dropdown.Item>
                     </>)
                    : ""
                    }

                  </Dropdown>


                  <Dropdown eventKey="6" title="Entretiens" icon={<Icon icon="exchange" />}>
                  {userData && userData.type_compte ==="entreprise" 
                    ? 
                    (<>
                    <Dropdown.Item eventKey="6-1" componentClass={Link} to="/dashboard/new_entretien">Nouvel entretien</Dropdown.Item>
                    <Dropdown.Item eventKey="6-2" componentClass={Link} to="/dashboard/entretiens_b_to_b">Liste B2B</Dropdown.Item>
                    <Dropdown.Item eventKey="6-3" componentClass={Link} to="/dashboard/entretiens_candidats">Liste entretiens candidat</Dropdown.Item>
                    <Dropdown.Item eventKey="6-4" componentClass={Link} to="/dashboard/entretiens_demandes">Liste demandes</Dropdown.Item>
                    </>)
                    : ""
                    }

                    {userData && userData.type_compte ==="candidat" 
                    ? 
                    (<>
                      <Dropdown.Item eventKey="6-5" componentClass={Link} to="/dashboard/own_entretiens">Mes  entretiens</Dropdown.Item>
                      </>)
                    : ""
                    }

                    

                  </Dropdown>
                  {userData && userData.admin ===true && userData.type_compte ==="entreprise" 
                  ? 
                  (<>
                    <Dropdown eventKey="7" title="Candidats" icon={<Icon icon="people-group" />}>

                      <Dropdown.Item eventKey="7-1" componentClass={Link} to="/dashboard/new_candidat">Nouveau candidat</Dropdown.Item>
                      <Dropdown.Item eventKey="7-2" componentClass={Link} to="/dashboard/list_candidats">Liste candidats</Dropdown.Item>

                    </Dropdown>
                    
                    <Dropdown eventKey="8" title="Entreprise" icon={<Icon icon="briefcase" />}>

                      <Dropdown.Item eventKey="8-1" componentClass={Link} to="/dashboard/new_entreprise">Nouvel entreprise</Dropdown.Item>
                      <Dropdown.Item eventKey="8-2" componentClass={Link} to="/dashboard/list_entreprises">Liste entreprises</Dropdown.Item>

                    </Dropdown>
                  </>)
                    : ""
                    }

                  {userData && userData.type_compte ==="entreprise" 
                  ? 
                  (<>
                    <Dropdown eventKey="9" title="Collaborateurs" icon={<Icon icon="peoples-map" />}>

                      <Dropdown.Item eventKey="9-1" componentClass={Link} to="/dashboard/new_collaborateur">Nouveau Collaborateur</Dropdown.Item>
                      <Dropdown.Item eventKey="9-2" componentClass={Link} to="/dashboard/list_collaborateurs">Liste collaborateurs</Dropdown.Item>

                    </Dropdown>
                   
                  </>)
                    : ""
                    }
                  {userData && userData.type_compte ==="entreprise" 
                    ? 
                    (<>
                      <NavLink eventKey="10" icon={<Icon icon="line-chart"/>} componentClass={Link} to="/dashboard/statistiques">Statistique</NavLink> 
                      
                       </>)
                    : ""
                    }

                </Nav>
              </Sidenav.Body>
            </Sidenav>

            </ul>
          </div>
          
        </div>

        <div className="card py-3">
          
        </div>
        
      </aside>
    
    )
}
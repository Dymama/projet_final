import React, { lazy } from 'react';
import {Route } from 'react-router-dom';

import Header from '../../components/dashboard/Header';
import SideBar from '../../components/dashboard/SideBar';

import 'react-jquery-plugin';
import NewOffres from '../../components/dashboard/pages/Offres/NewOffres';
import EventDetailsDash from '../../components/dashboard/pages/Events/EventDetailsDash';
import ConferenceDetail from '../../components/dashboard/pages/Conferences/ConferenceDetails';
import EditOffre from '../../components/dashboard/pages/Offres/EditOffre';
import VideoConference1 from '../../components/dashboard/pages/Conferences/Video/VideoConference1'
import NewConference from './../../components/dashboard/pages/Conferences/NewConference';
import Page from './Voir';




// importation des components dynamiquement
const Home = lazy(() => import('../../components/dashboard/pages/Home/Home'));
const Events = lazy(() => import('../../components/dashboard/pages/Events/Events'));
const Conferences = lazy(() => import('../../components/dashboard/pages/Conferences/Conferences'));
const AllConferences = lazy(() => import('../../components/dashboard/pages/Conferences/AllConferences'));
const Entretiens = lazy(() => import('../../components/dashboard/pages/Entretiens/Entretiens'));
const Offres = lazy(() => import('../../components/dashboard/pages/Offres/Offres'));
const OwnOffres = lazy(() => import('../../components/dashboard/pages/Offres/OwnOffres'));
const NewEntretien = lazy(() => import('../../components/dashboard/pages/Entretiens/NewEntretien'));
const OwnEntretien = lazy(() => import('../../components/dashboard/pages/Entretiens/OwnEntretien'));
const NewEvent = lazy(() => import('../../components/dashboard/pages/Events/NewEvent/NewEvent'));
const ListEvent = lazy(() => import('../../components/dashboard/pages/Events/ListEvent/ListEvent'));
const CandidatOffres = lazy(() => import('../../components/dashboard/pages/Offres/CandidatOffres/CandidatOffres'));
const ListCandidatAll = lazy(() => import('../../components/dashboard/pages/Candidats/ListCandidatAll/ListCandidatAll'));
const DetailEventTable = lazy(() => import( '../../components/dashboard/pages/Events/DetailEventTable/DetailEventTable'));
const EditEvent = lazy(() => import( '../../components/dashboard/pages/Events/EditEvent/EditEvent'));
const DetailOffreTable = lazy(() => import('../../components/dashboard/pages/Offres/DetailOffreTable/DetailOffreTable'));

const DetailConferenceTable = lazy(() => import('../../components/dashboard/pages/Conferences/DetailConferenceTable/DetailConferenceTable'));


export default function Dashboard({match}){
  


  
    return(
        <div className="wrapper"  >
        

          <SideBar data-aos="zoom-in-down" />
          <Header data-aos="fade-down-left"/>
          <div className="content-wrapper" data-aos="fade-down-left"  style={{overflowX:'auto'}}>

            <Route exact path={`${match.url}`} component={Home}/>

            <Route path={`${match.url}/events`} component={Events}/>

            <Route path={`${match.url}/conferences`} component={Conferences}/>

            <Route path={`${match.url}/allconferences`} component={AllConferences}/>

            <Route path={`${match.url}/allconferences_details`} component={ConferenceDetail}/>

            <Route path={`${match.url}/entretiens`} component={Entretiens}/>

            <Route path={`${match.url}/offres`} component={Offres}/>

            <Route path={`${match.url}/new_offre`} component={NewOffres}/>

            <Route path={`${match.url}/ownoffres`} component={OwnOffres}/>

            <Route path={`${match.url}/edition`}  component={EditOffre} />

            <Route path={`${match.url}/event_detail`} component={EventDetailsDash}/>

            <Route path={`${match.url}/start_conference`} component={VideoConference1}/ >

            <Route path={`${match.url}/new_conference`} component={NewConference}/ >
            <Route path={`${match.url}/detail_conference`} component={DetailConferenceTable}/ >

            <Route path={`${match.url}/new_entretien`} component={NewEntretien}/ >

            <Route path={`${match.url}/own_entretiens`} component={OwnEntretien}/ >
            
            <Route path={`${match.url}/new_event`} component={NewEvent}/ >
            <Route path={`${match.url}/detail_event_row_table`} component={DetailEventTable}/ >
            <Route path={`${match.url}/list_events`} component={ListEvent}/ >
            <Route path={`${match.url}/edit_event`} component={EditEvent}/ >

            <Route path={`${match.url}/own_offres_candidat`} component={CandidatOffres}/ >
            <Route path={`${match.url}/detail_offre_row_table`} component={DetailOffreTable}/ >

            <Route path={`${match.url}/list_candidats`} component={ListCandidatAll}/ >
            
            {/* <Route path={`${match.url}/voir`} component={Page}/ > */}
            
            

          </div>
      </div>
    )
}
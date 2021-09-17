
import {Loader,Placeholder} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import React, { Suspense, lazy } from 'react';
import {Route, Switch } from 'react-router-dom';
import OffreDetails from './pages/Offres/OffreDetails';

const { Paragraph } = Placeholder;

// importation des components dynamiquement
const Home = lazy(() => import('./pages/Home/Home'));
const Events = lazy(() => import('./pages/Events/Events'));
const Conferences = lazy(() => import('./pages/Conferences/Conferences'));
const Entretiens = lazy(() => import('./pages/Entretiens/Entretiens'));
const Offres = lazy(() => import('./pages/Offres/Offres'));
const OwnOffres = lazy(() => import('./pages/Offres/OwnOffres'));


const RoutageDash = () => (
        <>
        <Route exact path="/dashboard" component={Home}/>
        <Route path="/dashboard/events" component={Events}/>
        <Route path="/dashboard/conferences" component={Conferences}/>
        <Route path="/dashboard/entretiens" component={Entretiens}/>
        <Route path="/dashboard/offres" component={Offres}/>
        <Route path="/dashboard/ownoffres" component={OwnOffres}/>
        <Route path="/dashboard/offres_details" component={OffreDetails}/>
        </>
    

);

export default RoutageDash;
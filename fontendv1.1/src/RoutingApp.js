import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//importation dynamique des components
const Accueil = lazy(() => import('./views/Accueil'));
const Login = lazy(() => import('./views/Login/login'));
const Signup = lazy(() => import( './views/Signup/Signup'));
const NavbarHeader = lazy(() => import('./components/Navbar/Navbar'));
const EventDetails = lazy(() => import('./views/EventsDetails/EventDetails'));
const EntrepriseDetail = lazy(() => import('./views/Entreprise/EntrepriseDetails'));
const Dashboard = lazy(() => import('./views/Dashboard/Dashboard'));


// importation des components dynamiquement dashbord
const Home = lazy(() => import('./components/dashboard/pages/Home/Home'));
const Events = lazy(() => import('./components/dashboard/pages/Events/Events'));
const Conferences = lazy(() => import('./components/dashboard/pages/Conferences/Conferences'));
const Entretiens = lazy(() => import('./components/dashboard/pages/Entretiens/Entretiens'));
const Offres = lazy(() => import('./components/dashboard/pages/Offres/Offres'));

const RoutingApp = () => (

  <Router>
    <Suspense fallback={<div>Chargement...</div>}>
      <Switch>

        {/* routing autres components */}
        <Route path="/" exact component={Accueil} />
        <Route path="/connexion" component={Login} />
        <Route path="/inscription" component={Signup} />
        <Route path="/event_details" component={EventDetails} />
        <Route path="/entreprise_details" component={EntrepriseDetail} />
        <Route path="/dashboard" component={Home} />

        {/* routing dashBoard */}
        <Route path="/dashboard/events" component={Events}/>
        <Route path="/dashboard/conferences" component={Conferences}/>
        <Route path="/dashboard/entretiens" component={Entretiens}/>
        <Route path="/dashboard/offres" component={Offres}/>




      </Switch>
    </Suspense>
  </Router>

);

export default RoutingApp;
import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { connectReducer } from './connexion/connectReducer';

import {loginReducer} from './utilisateur/login/loginReducer'
import {offreReducer} from './entreprise/offres/offreReducer';
import { getOffreReducer } from './entreprise/getOffres/getOffreReducer';
import { editOffreReducer } from './entreprise/editOffres/editOffreReducer';
import { newConferenceReducer } from './entreprise/newConference/newConferenceReducer';
import { getConferenceReducer } from './entreprise/getConference/getConferenceReducer';
import { CandGetConferenceReducer } from './candidats/getConference/candGetConferenceReducer';
import { getInfoReducer } from './getInfo/getInfoReducer';
import { entretienReducer } from './entretiens/entretienReducer';
import { getOwnEntretienReducer } from './entretiens/getOwnEntretien/getOwnEntretienReducer';
import { getMesEntretienReducer } from './entretiens/getMesEntretiens/getMesEntretienReducer';
import { updateStatutReducer } from './entretiens/updateStatut/updateStatutReducer';
import { agendaGetReducer } from './agenda/agendaGet.js/agendaGetReducer';
import { getInfoEntrepriseReducer } from './entreprise/getInfo/getInfoEntrepriseReducer';
import { getAdminReducer } from './admin/adminReducer';
import { newEventReducer } from './events/newEvents/newEventReducer';
import { listEventReducer } from './events/listEvent/listEventReducer';
import { participateEventReducer } from './events/participateEvent/participateEventReducer';
import { participateVerifyReducer } from './events/participateVerify/participateVerifyReducer';
import { postulerOffreReducer } from './offres/postulerOffre/postulerOffreReducer';
import { listCandidatReducer } from './candidats/listCandidat/listCandidatReducer';
import { getAllUserByTypeReducer } from './utilisateur/getAllUserByType/getAllUserByTypeReducer';
import { newFormationReducer } from './entreprise/formation/newFormation/newFormationReducer';
import { getFormationReducer } from './entreprise/formation/getFormation/getFormationReducer';


const rootReducer = combineReducers(
    {
        login: loginReducer,
        connected: connectReducer,
        getInfoUser: getInfoReducer,
        offres: offreReducer,
        getOffres: getOffreReducer,
        editOffre: editOffreReducer,
        conference: newConferenceReducer,
        getConferences: getConferenceReducer,
        CandidatGetConferences: CandGetConferenceReducer,
        newEntretien: entretienReducer,
        getOwnEntretien: getOwnEntretienReducer,
        getMesEntretiens: getMesEntretienReducer,
        updateStatutEntretien: updateStatutReducer,
        getAgenda: agendaGetReducer,
        getInfoEntreprise:getInfoEntrepriseReducer,
        getAdmin: getAdminReducer,
        newEvent: newEventReducer,
        
        listEvent: listEventReducer,
        participateEvent: participateEventReducer,
        participateVerify: participateVerifyReducer,
        postulerOffre: postulerOffreReducer,
        listCandidat: listCandidatReducer,
        getAllUserByType: getAllUserByTypeReducer,

        formation: newFormationReducer,
        getFormations: getFormationReducer,

    }
)


const persistConfig = {
    key: 'userConnected',
    storage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)


 function configureStore () {
    let store = createStore(persistedReducer,applyMiddleware(thunk))
    let persistor = persistStore(store, null, () => {


              // if you want to get restoredState
              console.log("restoredState", store.getState())
            })

    return { store, persistor }
  }

export default configureStore
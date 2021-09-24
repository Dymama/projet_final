import axios from 'axios';
import authHeader from './../services/authHeader';
import store from '../redux/store';

// const state = store.getState().connected.user;

const userC = localStorage.getItem('userConnected');
const user = JSON.parse(userC)
var token ='';
if(user && user.token)
{
    token = user.token;
    
}

const utilisateur = axios.create({
    baseURL: 'http://localhost:5000/utilisateur/',
    headers: {Authorization:`Bearer ${token}`},
    withCredentials: true,
})

const insertUtilisateur = payload => utilisateur.post(`/signup`, payload)
const login = async payload => await utilisateur.post(`/login`, payload)
const getLogin = (id) => utilisateur.get(`/getlogin/${id}`)

const logout = () => utilisateur.get(`/logout`)

const getAllUtilisateurs = () => utilisateur.get(`/`)
const updateUtilisateurById = (id, payload) => utilisateur.put(`/${id}`, payload)
const deleteUtilisateurById = id => utilisateur.delete(`/${id}`)
const getUtilisateurById = id => utilisateur.get(`/${id}`)
const getUserEntreprise = id => utilisateur.get(`/getentreprise/${id}`)
const getInfoUSerCandidat = id => utilisateur.get(`/get_info_user_candidat/${id}`)


const getAllUserByType = type => utilisateur.get(`/get_all_user_by_type/${type}`)



const utilisateurs = {
    insertUtilisateur,
    getAllUtilisateurs,
    login,
    updateUtilisateurById,
    deleteUtilisateurById,
    getUtilisateurById,
    getLogin,
    logout,
    getUserEntreprise,
    getInfoUSerCandidat,
    getAllUserByType,
    

}

export default utilisateurs
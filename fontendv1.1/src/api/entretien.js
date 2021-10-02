import axios from 'axios'

// const userC = localStorage.getItem('userConnected');
// const user = JSON.parse(userC)
// var token ='';
// if(user && user.token)
// {
//     token = user.token;
    
// }

// const entretien = axios.create({
//     baseURL: 'http://localhost:5000/entretien',
//     headers: {Authorization:`Bearer ${token}`},
//     withCredentials: true,
// })

const entretien = axios.create({
    baseURL: 'http://localhost:5000/entretien',
    withCredentials: true,
})

const insertEntretien = payload => entretien.post(`/`, payload)
const getAllEntretien = () => entretien.get(`/`)
const updateEntretienById = (id, payload) => entretien.put(`/${id}`, payload)
const updateStatutEntretienById = (id, payload) => entretien.put(`/updatestatut/${id}`, payload)
const getEntretienById = id => entretien.get(`/${id}`)
const deleteEntretienById = id => entretien.delete(`/${id}`)
const getAllOwnEntretien = id => entretien.get(`/ownentretien/${id}`)
const getAllMesEntretien = id => entretien.get(`/mesentretien/${id}`)
const getAllEntrepriseEntretien = id => entretien.get(`/entreprise_entretien/${id}`)
const getAllCandidatEntretien = id => entretien.get(`/candidat_list_entretien/${id}`)
const getAllDemandeEntretien = id => entretien.get(`/demande_entretien/${id}`)




const entretiens = {
    insertEntretien,
    getAllEntretien,
    getEntretienById,
    updateEntretienById,
    deleteEntretienById,
    getAllOwnEntretien,
    getAllMesEntretien,
    updateStatutEntretienById,
    getAllEntrepriseEntretien,
    getAllCandidatEntretien,
    getAllDemandeEntretien,
    

}

export default entretiens;

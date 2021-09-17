import axios from 'axios'

const userC = localStorage.getItem('userConnected');
const user = JSON.parse(userC)
var token ='';
if(user && user.token)
{
    token = user.token;
    
}

const entretien = axios.create({
    baseURL: 'http://localhost:5000/entretien',
    headers: {Authorization:`Bearer ${token}`},
    withCredentials: true,
})

export const insertEntretien = payload => entretien.post(`/`, payload)
export const getAllEntretien = () => entretien.get(`/`)
export const updateEntretienById = (id, payload) => entretien.put(`/${id}`, payload)
export const updateStatutEntretienById = (id, payload) => entretien.put(`/updatestatut/${id}`, payload)
export const getEntretienById = id => entretien.get(`/${id}`)
export const deleteEntretienById = id => entretien.delete(`/${id}`)
export const getAllOwnEntretien = id => entretien.get(`/ownentretien/${id}`)
export const getAllMesEntretien = id => entretien.get(`/mesentretien/${id}`)




const entretiens = {
    insertEntretien,
    getAllEntretien,
    getEntretienById,
    getEntretienById,
    deleteEntretienById,
    getAllOwnEntretien,
    getAllMesEntretien,
    updateStatutEntretienById,
}

export default entretiens;

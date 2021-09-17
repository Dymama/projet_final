import axios from 'axios'

const poste = axios.create({
    baseURL: 'http://localhost:5000/poste',
    withCredentials: true,
})

const insertPoste = payload => poste.post(`/`, payload)
const getAllPostes = () => poste.get(`/`)
const updatePosteById = (id, payload) => poste.put(`/${id}`, payload)
const deletePosteById = id => poste.delete(`/${id}`)
const getPosteById = id => poste.get(`/${id}`)
const addPostulant = (id, payload) => poste.put(`/add_postulant/${id}`, payload)
const deletePostulant = (id, payload) => poste.put(`/delete_postulant/${id}`, payload)
const getEventPostes = id => poste.get(`/get_event_poste/${id}`)


const postes = {
    insertPoste,
    getAllPostes,
    updatePosteById,
    deletePosteById,
    getPosteById,
    addPostulant,
    deletePostulant,
    getEventPostes,

}

export default postes
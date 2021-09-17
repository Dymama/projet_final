import axios from 'axios'

const evenement = axios.create({
    baseURL: 'http://localhost:5000/evenement',
    withCredentials: true,
})

const insertEvenement = payload => evenement.post(`/`, payload)
const getAllEvenement = () => evenement.get(`/`)
const updateEvenementById = (id, payload) => evenement.put(`/${id}`, payload)
const addParticipant = (id, payload) => evenement.put(`/add_participant/${id}`, payload)
const deleteParticipant = (id, payload) => evenement.put(`/delete_participant/${id}`, payload)
const getEvenementById = id => evenement.get(`/${id}`)
const deleteEvenementById = id => evenement.delete(`/${id}`)



const evenements = {
    insertEvenement,
    getAllEvenement,
    getEvenementById,
    updateEvenementById,
    deleteEvenementById,
    addParticipant,
    deleteParticipant,
}

export default evenements;

import axios from 'axios'

const formation = axios.create({
    baseURL: 'http://localhost:5000/formation',
    withCredentials: true,
})

const insertFormation = payload => formation.post(`/`, payload)
const getAllFormation = () => formation.get(`/`)
const updateFormationById = (id, payload) => formation.put(`/${id}`, payload)
const getFormationById = id => formation.get(`/${id}`)
const deleteFormationById = id => formation.delete(`/${id}`)



const formations = {
    insertFormation,
    getAllFormation,
    getFormationById,
    updateFormationById,
    deleteFormationById,
}

export default formations;

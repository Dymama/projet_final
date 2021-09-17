import axios from 'axios'

const formation = axios.create({
    baseURL: 'http://localhost:5000/formation',
    withCredentials: true,
})

export const insertFormation = payload => formation.post(`/`, payload)
export const getAllFormation = () => formation.get(`/`)
export const updateFormationById = (id, payload) => formation.put(`/${id}`, payload)
export const getFormationById = id => formation.get(`/${id}`)
export const deleteFormationById = id => formation.delete(`/${id}`)



const formations = {
    insertFormation,
    getAllFormation,
    getFormationById,
    getFormationById,
    deleteFormationById,
}

export default formations;

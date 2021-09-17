import axios from 'axios'

const participateFormation = axios.create({
    baseURL: 'http://localhost:5000/participateFormation',
    withCredentials: true,
})

export const insertParticipateFormation = payload => participateFormation.post(`/`, payload)
export const getAllParticipateFormations = () => participateFormation.get(`/`)
export const updateParticipateFormationById = (id, payload) => participateFormation.put(`/${id}`, payload)
export const deleteParticipateFormationById = id => participateFormation.delete(`/${id}`)
export const getParticipateFormationById = id => participateFormation.get(`/${id}`)



const participateFormations = {
    insertParticipateFormation,
    getAllParticipateFormations,
    updateParticipateFormationById,
    deleteParticipateFormationById,
    getParticipateFormationById,
}

export default participateFormations
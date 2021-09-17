import axios from 'axios'

const participateEntreprise = axios.create({
    baseURL: 'http://localhost:5000/participateEntreprise',
})

export const insertParticipateEntreprise = payload => participateEntreprise.post(`/`, payload)
export const getAllParticipateEntreprises = () => participateEntreprise.get(`/`)
export const updateParticipateEntrepriseById = (id, payload) => participateEntreprise.put(`/${id}`, payload)
export const deleteParticipateEntrepriseById = id => participateEntreprise.delete(`/${id}`)
export const getParticipateEntrepriseById = id => participateEntreprise.get(`/${id}`)



const participateEntreprises = {
    insertParticipateEntreprise,
    getAllParticipateEntreprises,
    updateParticipateEntrepriseById,
    deleteParticipateEntrepriseById,
    getParticipateEntrepriseById,
}

export default participateEntreprises
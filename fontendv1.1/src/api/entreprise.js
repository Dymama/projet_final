import axios from 'axios'

const entreprise = axios.create({
    baseURL: 'http://localhost:5000/entreprise',
    withCredentials: true,
})

export const insertEntreprise = payload => entreprise.post(`/`, payload)
export const getAllEntreprise = () => entreprise.get(`/`)
export const updateEntrepriseById = (id, payload) => entreprise.put(`/${id}`, payload)
export const getEntrepriseById = id => entreprise.get(`/${id}`)
export const deleteEntrepriseById = id => entreprise.delete(`/${id}`)



const entreprises = {
    insertEntreprise,
    getAllEntreprise,
    getEntrepriseById,
    getEntrepriseById,
    deleteEntrepriseById,
}

export default entreprises;

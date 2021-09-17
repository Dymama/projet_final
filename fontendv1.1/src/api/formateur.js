import axios from 'axios'

const formateur = axios.create({
    baseURL: 'http://localhost:5000/formateur',
    withCredentials: true,
})

export const insertFormateur = payload => formateur.post(`/`, payload)
export const getAllFormateur = () => formateur.get(`/`)
export const updateFormateurById = (id, payload) => formateur.put(`/${id}`, payload)
export const getFormateurById = id => formateur.get(`/${id}`)
export const deleteFormateurById = id => formateur.delete(`/${id}`)



const formateurs = {
    insertFormateur,
    getAllFormateur,
    getFormateurById,
    getFormateurById,
    deleteFormateurById,
}

export default formateurs;

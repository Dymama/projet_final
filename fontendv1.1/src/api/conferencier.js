import axios from 'axios'

const conferencier = axios.create({
    baseURL: 'http://localhost:5000/conferencier',
})

export const insertConferencier = payload => conferencier.post(`/`, payload)
export const getAllConferencier = () => conferencier.get(`/`)
export const updateConferencierById = (id, payload) => conferencier.put(`/${id}`, payload)
export const getConferencierById = id => conferencier.get(`/${id}`)
export const deleteConferencierById = id => conferencier.delete(`/${id}`)



const conferenciers = {
    insertConferencier,
    getAllConferencier,
    getConferencierById,
    getConferencierById,
    deleteConferencierById,
}

export default conferenciers;

import axios from 'axios'

const conferencier = axios.create({
    baseURL: 'http://localhost:5000/conferencier',
})

const insertConferencier = payload => conferencier.post(`/`, payload)
const getAllConferencier = () => conferencier.get(`/`)
const updateConferencierById = (id, payload) => conferencier.put(`/${id}`, payload)
const getConferencierById = id => conferencier.get(`/${id}`)
const deleteConferencierById = id => conferencier.delete(`/${id}`)

const conferenciers = {
    insertConferencier,
    getAllConferencier,
    getConferencierById,
    getConferencierById,
    deleteConferencierById,
    

}

export default conferenciers;

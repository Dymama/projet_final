import axios from 'axios'

const conference = axios.create({
    baseURL: 'http://localhost:5000/conference',
    withCredentials: true,
})

export const insertConference = payload => conference.post(`/`, payload)
export const getAllConference = () => conference.get(`/`)
export const updateConferenceById = (id, payload) => conference.put(`/${id}`, payload)
export const getConferenceById = id => conference.get(`/${id}`)
export const deleteConferenceById = id => conference.delete(`/${id}`)



const conferences = {
    insertConference,
    getAllConference,
    updateConferenceById,
    getConferenceById,
    deleteConferenceById,
}

export default conferences;

import axios from 'axios'

const conference = axios.create({
    baseURL: 'http://localhost:5000/conference',
    withCredentials: true,
})

const insertConference = payload => conference.post(`/`, payload)
const getAllConference = () => conference.get(`/`)
const updateConferenceById = (id, payload) => conference.put(`/${id}`, payload)
const getConferenceById = id => conference.get(`/${id}`)
const deleteConferenceById = id => conference.delete(`/${id}`)
const getEventConference = id => conference.get(`/get_event_conference/${id}`)



const conferences = {
    insertConference,
    getAllConference,
    updateConferenceById,
    getConferenceById,
    deleteConferenceById,
    getEventConference,

}

export default conferences;

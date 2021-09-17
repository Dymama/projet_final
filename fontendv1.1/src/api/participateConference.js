import axios from 'axios'

const participateConference = axios.create({
    baseURL: 'http://localhost:5000/participateConference',
    withCredentials: true,
})

export const insertParticipateConference = payload => participateConference.post(`/`, payload)
export const getAllParticipateConferences = () => participateConference.get(`/`)
export const updateParticipateConferenceById = (id, payload) => participateConference.put(`/${id}`, payload)
export const deleteParticipateConferenceById = id => participateConference.delete(`/${id}`)
export const getParticipateConferenceById = id => participateConference.get(`/${id}`)



const participateConferences = {
    insertParticipateConference,
    getAllParticipateConferences,
    updateParticipateConferenceById,
    deleteParticipateConferenceById,
    getParticipateConferenceById,
}

export default participateConferences
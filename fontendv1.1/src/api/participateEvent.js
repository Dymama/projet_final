import axios from 'axios'

const participateEvent = axios.create({
    baseURL: 'http://localhost:5000/participateevent',
    withCredentials: true,
})


export const insertParticipateEvent = payload => participateEvent.post(`/`, payload)
export const getAllParticipateEvents = () => participateEvent.get(`/`)
export const updateParticipateEventById = (id, payload) => participateEvent.put(`/${id}`, payload)
export const deleteParticipateEventById = id => participateEvent.delete(`/${id}`)
export const getParticipateEventById = id => participateEvent.get(`/${id}`)
export const participateVerify = payload => participateEvent.post(`/participateverify`,payload)



const participateEvents = {
    insertParticipateEvent,
    getAllParticipateEvents,
    updateParticipateEventById,
    deleteParticipateEventById,
    getParticipateEventById,
    participateVerify,

}

export default participateEvents
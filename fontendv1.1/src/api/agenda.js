import axios from 'axios'

const agenda = axios.create({
    baseURL: 'http://localhost:5000/agenda',
    withCredentials: true,
})

export const insertAgenda = payload => agenda.post(`/`, payload)
export const getAllAgenda = () => agenda.get(`/`)
export const updateAgendaById = (id, payload) => agenda.put(`/${id}`, payload)
export const getAgenda = (id) => agenda.get(`/getAgenda/${id}`)
export const getAgendaById = id => agenda.get(`/${id}`)
export const deleteAgendaById = id => agenda.delete(`/${id}`)

export const modifAgenda = (id, payload) => agenda.put(`/modifagenda/${id}`, payload)



const agendas = {
    insertAgenda,
    getAllAgenda,
    updateAgendaById,
    getAgendaById,
    deleteAgendaById,
    getAgenda,
    modifAgenda
}

export default agendas


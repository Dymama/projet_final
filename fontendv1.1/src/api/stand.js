import axios from 'axios'

const stand = axios.create({
    baseURL: 'http://localhost:5000/stand',
    withCredentials: true,
})

export const insertStand = payload => stand.post(`/`, payload)
export const getAllStands = () => stand.get(`/`)
export const updateStandById = (id, payload) => stand.put(`/${id}`, payload)
export const deleteStandById = id => stand.delete(`/${id}`)
export const getStandById = id => stand.get(`/${id}`)



const stands = {
    insertStand,
    getAllStands,
    updateStandById,
    deleteStandById,
    getStandById,
}

export default stands
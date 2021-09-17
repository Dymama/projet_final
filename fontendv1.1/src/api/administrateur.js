import axios from 'axios'

const admin = axios.create({
    baseURL: 'http://localhost:5000/administrateur',
    withCredentials: true,
})

export const insertAdmin = payload => admin.post(`/`, payload)
export const getAllAdmin = () => admin.get(`/`)
export const updateAdminById = (id, payload) => admin.put(`/${id}`, payload)
export const getAdminById = id => admin.get(`/${id}`)
export const getAdminByUser = id => admin.get(`/getbyuser/${id}`)
export const deleteAdminById = id => admin.delete(`/${id}`)



const admins = {
    insertAdmin,
    getAllAdmin,
    updateAdminById,
    getAdminById,
    deleteAdminById,
    getAdminByUser,
}

export default admins
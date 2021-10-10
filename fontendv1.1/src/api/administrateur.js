import axios from 'axios'

const admin = axios.create({
    baseURL: 'http://localhost:5000/administrateur',
    withCredentials: true,
})

const insertAdmin = payload => admin.post(`/`, payload)
const getAllAdmin = () => admin.get(`/`)
const updateAdminById = (id, payload) => admin.put(`/${id}`, payload)
const getAdminById = id => admin.get(`/${id}`)
const getAdminByUser = id => admin.get(`/getbyuser/${id}`)
const deleteAdminById = id => admin.delete(`/${id}`)
const getCollaborateur = id => admin.get(`/get_collaborateurs/${id}`)



const admins = {
    insertAdmin,
    getAllAdmin,
    updateAdminById,
    getAdminById,
    deleteAdminById,
    getAdminByUser,
    getCollaborateur,

}

export default admins
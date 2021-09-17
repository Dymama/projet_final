import axios from 'axios'

const postuler = axios.create({
    baseURL: 'http://localhost:5000/postuler',
    withCredentials: true,
})

export const insertPostuler = payload => postuler.post(`/`, payload)
export const getAllPostulers = () => postuler.get(`/`)
export const updatePostulerById = (id, payload) => postuler.put(`/${id}`, payload)
export const deletePostulerById = id => postuler.delete(`/${id}`)
export const getPostulerById = id => postuler.get(`/${id}`)



const postulers = {
    insertPostuler,
    getAllPostulers,
    updatePostulerById,
    deletePostulerById,
    getPostulerById,
}

export default postulers
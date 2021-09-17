import axios from 'axios'

const candidat = axios.create({
    baseURL: 'http://localhost:5000/candidat',
    withCredentials: true,
})

 const insertCandidat = payload => candidat.post(`/`, payload)
 const getAllCandidat = () => candidat.get(`/`)
 const getAllCandidatUser = () => candidat.get(`/get_all_candidat_user/`)
 const updateCandidatById = (id, payload) => candidat.put(`/${id}`, payload)
 const getCandidatById = id => candidat.get(`/${id}`)
 const getCandidatByUser = id => candidat.get(`/get_by_user/${id}`)
 const deleteCandidatById = id => candidat.delete(`/${id}`)
 


const candidats = {
    insertCandidat,
    getAllCandidat,
    updateCandidatById,
    getCandidatById,
    deleteCandidatById,
    getCandidatByUser,
    
}

export default candidats;

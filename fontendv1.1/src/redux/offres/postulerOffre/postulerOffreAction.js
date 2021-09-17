
import postes from '../../../api/poste';
import * as types from './postulerOffreType';


export const loadPostulerOffre = ()=>{
    return {
        type: types.LOAD_POSTULER_OFFRE,
    }
}

export const postulerOffreSuccess = (data)=>{
    return {
        type: types.POSTULER_OFFRE_SUCCESS,
        payload : data
    }
}

export const postulerOffreError = (error)=>{
    return {
        type: types.POSTULER_OFFRE_ERROR,
        payload: error
    }
}



export const apiPostulerOffre = (id,data)=>{
    return (dispatch) => {

        dispatch(loadPostulerOffre())

        console.log(data,'formData postulerOffre redux')

        postes.addPostulant(id,data)
            .then( res =>{
                dispatch(postulerOffreSuccess(res.data))
            })
            .catch( res =>{
                dispatch(postulerOffreError(res.data))
            })

    }
}

import * as types from './editOffreType';
import postes from '../../../api/poste';



export const loadOffre = ()=>{
    return {
        type: types.LOAD_OFFRE,
    }
}

export const offresEditionSuccess = (data)=>{
    return {
        type: types.OFFRE_EDITION_SUCCESS,
        payload : data
    }
}

export const offreEditionError = (error)=>{
    return {
        type: types.OFFRE_EDITION_FAIL,
        payload: error
    }
}


export const apiOffreEdition = (id,data)=>{
    return (dispatch) => {

        dispatch(loadOffre())

        postes.updatePosteById(id,data)
            .then( res =>{
                dispatch(offresEditionSuccess(res.data))
                console.log(res.data)
            })
            .catch( res =>{
                dispatch(offreEditionError(res.message))
                
            })

    }
}
import * as types from './getOffreType';
import postes from '../../../api/poste';



export const loadOffre = ()=>{
    return {
        type: types.LOAD_OFFRE,
    }
}

export const getOffresCreateSuccess = (data)=>{
    return {
        type: types.GET_OFFRE_CREATE_SUCCESS,
        payload : data
    }
}

export const getOffreCreateError = (error)=>{
    return {
        type: types.GET_OFFRE_CREATE_FAIL,
        payload: error
    }
}


export const apiOffreGet = (data)=>{
    return (dispatch) => {

        dispatch(loadOffre())

        postes.getAllPostes()
            .then( res =>{
                dispatch(getOffresCreateSuccess(res.data))
            })
            .catch( res =>{
                dispatch(getOffreCreateError(res.message))
                
            })

    }
}
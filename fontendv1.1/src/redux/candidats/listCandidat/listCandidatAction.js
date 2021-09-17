import * as types from './listCandidatType';

import candidats from '../../../api/candidat';


export const loadListCandidat = ()=>{
    return {
        type: types.LOAD_LIST_CANDIDAT,
    }
}

export const listCandidatSuccess = (data)=>{
    return {
        type: types.LIST_CANDIDAT_SUCCESS,
        payload : data
    }
}

export const listCandidatError = (error)=>{
    return {
        type: types.LIST_CANDIDAT_ERROR,
        payload: error
    }
}




export const apiListCandidatAll = ()=>{
    return (dispatch) => {

        dispatch(loadListCandidat())

            candidats.getAllCandidat()
            .then( res =>{
                dispatch(listCandidatSuccess(res.data))
            })
            .catch( res =>{
                dispatch(listCandidatError(res.data))
            })

    }
}


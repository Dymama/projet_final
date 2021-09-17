import * as types from './getInfoEntrepriseType';
import entreprise from '../../../api/entreprise';



export const load = ()=>{
    return {
        type: types.LOAD_ENTREPRISE,
    }
}

export const getSuccess = (data)=>{
    return {
        type: types.GET_ENTREPRISE_SUCCESS,
        payload : data
    }
}

export const getError = (error)=>{
    return {
        type: types.GET_ENTREPRISE_FAIL,
        payload: error
    }
}


export const apiGetInfoEntreprise = (id)=>{
    return (dispatch) => {

        dispatch(load())
console.log(id,'id entre')
        entreprise.getEntrepriseById(id)
            .then( res =>{
                dispatch(getSuccess(res.data))
                console.log(res.data,'all entreprise aad')
            })
            .catch( res =>{
                dispatch(getError(res.message))
                
            })

    }
}
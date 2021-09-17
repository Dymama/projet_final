import * as types from './offreType';
import postes from '../../../api/poste';



export const loadOffre = ()=>{
    return {
        type: types.LOAD_OFFRE,
    }
}

export const offresCreateSuccess = (data)=>{
    return {
        type: types.OFFRE_CREATE_SUCCESS,
        payload : data
    }
}

export const offreCreateError = (error)=>{
    return {
        type: types.OFFRE_CREATE_FAIL,
        payload: error
    }
}


export const apiOffreAdd = (data)=>{
    return (dispatch) => {

        dispatch(loadOffre())

        postes.insertPoste(data)
            .then( res =>{
                dispatch(offresCreateSuccess(res.data))
                console.log(res.data)
            })
            .catch( res =>{
                dispatch(offreCreateError(res.message))
                
            })

    }
}
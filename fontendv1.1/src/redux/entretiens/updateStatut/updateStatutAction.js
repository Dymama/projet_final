import * as types from './updateStatutType';
import entretien from '../../../api/entretien';



export const loadEntretien = ()=>{
    return {
        type: types.LOAD_ENTRETIEN,
    }
}

export const entretienGetSuccess = (data)=>{
    return {
        type: types.ENTRETIEN_SUCCESS,
        payload : data
    }
}

export const entretienGetError = (error)=>{
    return {
        type: types.ENTRETIEN_FAIL,
        payload: error
    }
}


export const apiUpdateStatutEntretien = (data)=>{
    return (dispatch) => {
        
        dispatch(loadEntretien())
        console.log(data,'fdaata uui')
        entretien.updateStatutEntretienById(data.id,data.statut)
            .then( res =>{
                dispatch(entretienGetSuccess(res.data))
                console.log(res.data,'entretien statut')
            })
            .catch( res =>{
                dispatch(entretienGetError(res.message))
                
            })

    }
}
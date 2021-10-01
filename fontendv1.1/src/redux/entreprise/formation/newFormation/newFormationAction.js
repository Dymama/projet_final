import * as types from './newFormationType';
import formation from '../../../../api/formation';



export const loadFormation = ()=>{
    return {
        type: types.LOAD_FORMATION,
    }
}

export const formationCreateSuccess = (data)=>{
    return {
        type: types.FORMATION_CREATE_SUCCESS,
        payload : data
    }
}

export const formationCreateError = (error)=>{
    return {
        type: types.FORMATION_CREATE_FAIL,
        payload: error
    }
}


export const apiNewFormation = (data)=>{
    return (dispatch) => {

        dispatch(loadFormation())

        formation.insertFormation(data)
            .then( res =>{
                dispatch(formationCreateSuccess(res.data))
               
            })
            .catch( res =>{
                dispatch(formationCreateError(res.message))
                
            })

    }
}
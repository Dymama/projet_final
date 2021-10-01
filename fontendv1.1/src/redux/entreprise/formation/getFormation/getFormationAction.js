import * as types from './getFormationType';
import formation from '../../../../api/formation';



export const loadFormation = ()=>{
    return {
        type: types.LOAD_FORMATION,
    }
}

export const formationGetSuccess = (data)=>{
    return {
        type: types.FORMATION_SUCCESS,
        payload : data
    }
}

export const formationGetError = (error)=>{
    return {
        type: types.FORMATION_FAIL,
        payload: error
    }
}


export const apiGetFormation = ()=>{
    return (dispatch) => {

        dispatch(loadFormation())

        formation.getAllFormation()
            .then( res =>{
                dispatch(formationGetSuccess(res.data))
                console.log(res.data,'all formations')
            })
            .catch( res =>{
                dispatch(formationGetError(res.message))
                
            })

    }
}
import * as types from './getAllUserByTypeType';
import utilisateurs from '../../../api/utilisateur';



export const getAllUserByTypeLoad = ()=>{
    return {
        type: types.GET_ALL_USER_BY_TYPE_LOAD,
    }
}

export const getAllUserByTypeSuccess = (data)=>{
    return {
        type: types.GET_ALL_USER_BY_TYPE_SUCCESS,
        payload : data
    }
}

export const getAllUserByTypeError = (error)=>{
    return {
        type: types.GET_ALL_USER_BY_TYPE_FAIL,
        payload: error
    }
}


export const apiGetAllUserByType = (type)=>{
    return (dispatch) => {

        dispatch(getAllUserByTypeLoad())

        utilisateurs.getAllUserByType(type)
            .then( res =>{
                dispatch(getAllUserByTypeSuccess(res.data))
                console.log(res.data,"response all ")
                          
            })
            .catch( res =>{
                dispatch(getAllUserByTypeError(res.data))
                
            })

    }
}
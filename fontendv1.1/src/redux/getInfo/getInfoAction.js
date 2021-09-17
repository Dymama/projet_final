import * as types from './getInfoType';
import utilisateurs from '../../api/utilisateur';



export const loadGetInfo = ()=>{
    return {
        type: types.LOAD_CONNECTED,
    }
}

export const getInfoSuccess = (data)=>{
    return {
        type: types.USER_CONNECTED_SUCCESS,
        payload : data
    }
}

export const getInfoError = (error)=>{
    return {
        type: types.USER_CONNECTED_ERROR,
        payload: error
    }
}


export const apiGetInfoUser = (data)=>{
    return (dispatch) => {

        dispatch(loadGetInfo())

        utilisateurs.getUtilisateurById(data)
            .then( res =>{
                dispatch(getInfoSuccess(res.data))

            })
            .catch( res =>{
                dispatch(getInfoError(res.data))
            })

    }
}
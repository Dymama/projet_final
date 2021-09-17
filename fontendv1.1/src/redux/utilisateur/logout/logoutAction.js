import * as types from './logoutType';
import utilisateurs from '../../../api/utilisateur';



export const loadLogout = ()=>{
    return {
        type: types.LOAD_LOGOUT,
    }
}

export const logoutSuccess = (data)=>{
    return {
        type: types.LOGOUT_SUCCESS,
        payload : data
    }
}

export const logoutError = (error)=>{
    return {
        type: types.LOGOUT_FAIL,
        payload: error
    }
}


export const apiLogout = ()=>{
    return (dispatch) => {

        dispatch(loadLogout())

        utilisateurs.logout()
            .then( res =>{
                dispatch(logoutSuccess(res.data))
                localStorage.clear()
                          
            })
            .catch( res =>{
                dispatch(logoutError(res.data))
                
            })

    }
}
import * as types from './loginType';
import utilisateurs from '../../../api/utilisateur';
import { history } from '../../../services/_helpers';


export const loadLoagin = ()=>{
    return {
        type: types.LOAD_LOGIN,
    }
}

export const loaginSuccess = (data)=>{
    return {
        type: types.LOGIN_SUCCESS,
        payload : data
    }
}

export const loaginError = (error)=>{
    return {
        type: types.LOGIN_FAIL,
        payload: error
    }
}


export const apiLogin = (data)=>{
    return (dispatch) => {

        dispatch(loadLoagin())

        utilisateurs.login(data)
            .then( res =>{
                dispatch(loaginSuccess(res.data)) 
                
                console.log('usd')
            })
            .catch( res =>{
                dispatch(loaginError(res.response.data.error))
            })

    }
}
import * as types from './connectType';
import utilisateurs from '../../api/utilisateur';



export const loadConnect = ()=>{
    return {
        type: types.LOAD_CONNECTED,
    }
}

export const connectSuccess = (data)=>{
    return {
        type: types.USER_CONNECTED_SUCCESS,
        payload : data
    }
}

export const connectError = (error)=>{
    return {
        type: types.USER_CONNECTED_ERROR,
        payload: error
    }
}


export const apiConnect = (id)=>{
    return (dispatch) => {

        dispatch(loadConnect())

        utilisateurs.getLogin(id)
            .then( res =>{
                dispatch(connectSuccess(res.data))
                console.log(res.data,'connceting user data')
            })
            .catch( res =>{
                dispatch(connectError(res.data))
            })

    }
}
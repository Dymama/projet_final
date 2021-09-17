import * as types from './adminType';
import administrateur from '../../api/administrateur';



export const load = ()=>{
    return {
        type: types.LOAD_ADMIN,
    }
}

export const adminSuccess = (data)=>{
    return {
        type: types.ADMIN_SUCCESS,
        payload : data
    }
}

export const adminError = (error)=>{
    return {
        type: types.ADMIN_ERROR,
        payload: error
    }
}


export const apiGetAdmin = (id)=>{
    return (dispatch) => {

        dispatch(load())

        administrateur.getAdminByUser(id)
            .then( res =>{
                dispatch(adminSuccess(res.data))
                console.log(res.data,'admin data')
            })
            .catch( res =>{
                dispatch(adminError(res.data))
            })

    }
}
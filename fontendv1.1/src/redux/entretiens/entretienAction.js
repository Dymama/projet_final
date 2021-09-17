import * as types from './entretienType';
import entretiens from '../../api/entretien';



export const loadEntretiens = ()=>{
    return {
        type: types.LOAD_DATA,
    }
}

export const entretienSuccess = (data)=>{
    return {
        type: types.ENTRETIEN_SUCCESS,
        payload : data
    }
}

export const entretienError = (error)=>{
    return {
        type: types.ENTRETIEN_ERROR,
        payload: error
    }
}




export const apiCreateEntretien = (data)=>{
    return (dispatch) => {

        dispatch(loadEntretiens())

        console.log(data,'formData entretien redux')
        entretiens.insertEntretien(data)
            .then( res =>{
                dispatch(entretienSuccess(res.data))
            })
            .catch( res =>{
                dispatch(entretienError(res.data))
            })

    }
}


// export const apiGetAllEntretien = ()=>{
//     return (dispatch) => {

//         dispatch(loadConnect())

//         utilisateurs.getLogin()
//             .then( res =>{
//                 dispatch(connectSuccess(res.data))

//             })
//             .catch( res =>{
//                 dispatch(connectError(res.data))
//             })

//     }
// }


// export const apiGetOwnEntretien = ()=>{
//     return (dispatch) => {

//         dispatch(loadConnect())

//         utilisateurs.getLogin()
//             .then( res =>{
//                 dispatch(connectSuccess(res.data))

//             })
//             .catch( res =>{
//                 dispatch(connectError(res.data))
//             })

//     }
// }
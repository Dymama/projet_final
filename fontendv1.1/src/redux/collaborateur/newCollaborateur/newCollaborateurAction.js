import * as types from './newCollaborateurType';
import utilisateurs from '../../../api/utilisateur'


export const loadCollaborateurs = ()=>{
    return {
        type: types.LOAD_SAVE_COLLABORATEUR,
    }
}

export const newCollaborateurSuccess = (data)=>{
    return {
        type: types.COLLABORATEUR_SUCCESS,
        payload : data
    }
}

export const newCollaborateurError = (error)=>{
    return {
        type: types.COLLABORATEUR_ERROR,
        payload: error
    }
}




export const apiCreateCollaborateur = (data)=>{
    return (dispatch) => {

        dispatch(loadCollaborateurs())

        utilisateurs.insertCollaborateur(data)
            .then( res =>{
            console.log(data,'formData newCollaborateur redux')
                dispatch(newCollaborateurSuccess(res.data))
            })
            .catch( res =>{
                dispatch(newCollaborateurError(res.data))
            })

    }
}


// export const apiGetAllCollaborateur = ()=>{
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


// export const apiGetOwnCollaborateur = ()=>{
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
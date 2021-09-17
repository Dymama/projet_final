import * as types from './listEventType';

import evenements from '../../../api/evenement';


export const loadListEvent = ()=>{
    return {
        type: types.LOAD_LIST_EVENT,
    }
}

export const listEventSuccess = (data)=>{
    return {
        type: types.LIST_EVENT_SUCCESS,
        payload : data
    }
}

export const listEventError = (error)=>{
    return {
        type: types.LIST_EVENT_ERROR,
        payload: error
    }
}




export const apiListEvent = ()=>{
    return (dispatch) => {

        dispatch(loadListEvent())

        evenements.getAllEvenement()
            .then( res =>{
                dispatch(listEventSuccess(res.data))
            })
            .catch( res =>{
                dispatch(listEventError(res.data))
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
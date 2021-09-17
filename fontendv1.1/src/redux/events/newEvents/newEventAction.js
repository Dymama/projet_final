import evenements from '../../../api/evenement';
import * as types from './newEventType';


export const loadNewEvent = ()=>{
    return {
        type: types.LOAD_NEW_EVENT,
    }
}

export const newEventSuccess = (data)=>{
    return {
        type: types.NEW_EVENT_SUCCESS,
        payload : data
    }
}

export const newEventError = (error)=>{
    return {
        type: types.NEW_EVENT_ERROR,
        payload: error
    }
}




export const apiNewEvent = (data)=>{
    return (dispatch) => {

        dispatch(loadNewEvent())

        console.log(data,'formData event redux')

        evenements.insertEvenement(data)
            .then( res =>{
                dispatch(newEventSuccess(res.data))
            })
            .catch( res =>{
                dispatch(newEventError(res.data))
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
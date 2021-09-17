
import evenements from '../../../api/evenement';
import * as types from './participateEventType';


export const loadParticipateEvent = ()=>{
    return {
        type: types.LOAD_PARTICIPATE_EVENT,
    }
}

export const participateEventSuccess = (data)=>{
    return {
        type: types.PARTICIPATE_EVENT_SUCCESS,
        payload : data
    }
}

export const participateEventError = (error)=>{
    return {
        type: types.PARTICIPATE_EVENT_ERROR,
        payload: error
    }
}



export const apiParticipateEvent = (id,data)=>{
    return (dispatch) => {

        dispatch(loadParticipateEvent())

        console.log(data,'formData participateEvent redux')

        evenements.addParticipant(id,data)
            .then( res =>{
                dispatch(participateEventSuccess(res.data))
            })
            .catch( res =>{
                dispatch(participateEventError(res.data))
            })

    }
}

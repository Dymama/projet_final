
import participateEvents from '../../../api/participateEvent';
import * as types from './participateVerifyType';


export const loadParticipateVerify = ()=>{
    return {
        type: types.LOAD_PARTICIPATE_VERIFY_EVENT,
    }
}

export const participateVerifySuccess = (data)=>{
    return {
        type: types.PARTICIPATE_EVENT_VERIFY_SUCCESS,
        payload : data
    }
}

export const participateVerifyError = (error)=>{
    return {
        type: types.PARTICIPATE_EVENT_VERIFY_ERROR,
        payload: error
    }
}



export const apiParticipateVerify = (data)=>{
    return (dispatch) => {

        dispatch(loadParticipateVerify())

        console.log(data,'formData participateVerify redux')

        participateEvents.participateVerify(data)
            .then( res =>{
                dispatch(participateVerifySuccess(res.data))
            })
            .catch( res =>{
                dispatch(participateVerifyError(res.data))
            })

    }
}

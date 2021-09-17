import * as types from './newConferenceType';
import conference from '../../../api/conference';



export const loadConference = ()=>{
    return {
        type: types.LOAD_CONFERENCE,
    }
}

export const conferenceCreateSuccess = (data)=>{
    return {
        type: types.CONFERENCE_CREATE_SUCCESS,
        payload : data
    }
}

export const conferenceCreateError = (error)=>{
    return {
        type: types.CONFERENCE_CREATE_FAIL,
        payload: error
    }
}


export const apiNewConference = (data)=>{
    return (dispatch) => {

        dispatch(loadConference())

        conference.insertConference(data)
            .then( res =>{
                dispatch(conferenceCreateSuccess(res.data))
                console.log(res.data)
            })
            .catch( res =>{
                dispatch(conferenceCreateError(res.message))
                
            })

    }
}
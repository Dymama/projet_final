import * as types from './candGetConferenceType';
import conference from '../../../api/conference';



export const loadConference = ()=>{
    return {
        type: types.LOAD_CONFERENCE,
    }
}

export const conferenceGetSuccess = (data)=>{
    return {
        type: types.CONFERENCE_SUCCESS,
        payload : data
    }
}

export const conferenceGetError = (error)=>{
    return {
        type: types.CONFERENCE_FAIL,
        payload: error
    }
}


export const apiGetAllConference = ()=>{
    return (dispatch) => {

        dispatch(loadConference())

        conference.getAllConference()
            .then( res =>{
                dispatch(conferenceGetSuccess(res.data))
                
            })
            .catch( res =>{
                dispatch(conferenceGetError(res.message))
                
            })

    }
}
import * as types from './getOwnEntretienType';
import entretien from '../../../api/entretien';



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


export const apiGetOwnEntretien = (data)=>{
    return (dispatch) => {

        dispatch(loadConference())

        entretien.getAllOwnEntretien(data)
            .then( res =>{
                dispatch(conferenceGetSuccess(res.data))
                console.log(res.data,'entretien own')
            })
            .catch( res =>{
                dispatch(conferenceGetError(res.message))
                
            })

    }
}
import * as types from './getMesEntretienType';
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


export const apiGetMesEntretien = (data)=>{
    return (dispatch) => {

        dispatch(loadConference())

        entretien.getAllMesEntretien(data)
            .then( res =>{
                dispatch(conferenceGetSuccess(res.data))
                console.log(res.data,'entretien Mes')
            })
            .catch( res =>{
                dispatch(conferenceGetError(res.message))
                
            })

    }
}
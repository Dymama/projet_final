import * as types from './agendaGetType';
import agendas from '../../../api/agenda';



export const loadAgenda = ()=>{
    return {
        type: types.LOAD_AGENDA,
    }
}

export const agendaGetSuccess = (data)=>{
    return {
        type: types.AGENDA_SUCCESS,
        payload : data
    }
}

export const agendaGetError = (error)=>{
    return {
        type: types.AGENDA_FAIL,
        payload: error
    }
}


export const apiGetAgenda = (data)=>{
    return (dispatch) => {

        dispatch(loadAgenda())
console.log(data,"data agenda")
        agendas.getAgenda(data)
            .then( res =>{
                dispatch(agendaGetSuccess(res.data))
                
            })
            .catch( res =>{
                dispatch(agendaGetError(res.message))
                
            })

    }
}
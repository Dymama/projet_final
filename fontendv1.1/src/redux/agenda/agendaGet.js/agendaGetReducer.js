import * as types from './agendaGetType';


const initialStateAgenda = {
    loading : false,
    agenda : [],
    error : '',
    success:false
}

export const agendaGetReducer = (state = initialStateAgenda ,action) => {
    switch (action.type) {
        case types.LOAD_AGENDA:
            return {
                ...state,
                loading :true
            }
            
        case types.AGENDA_SUCCESS:
            return {
                ...state,
                loading :false,
                agenda : action.payload,
                success : true
            }
            
        case types.AGENDA_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

        default: return state ;
    }
}



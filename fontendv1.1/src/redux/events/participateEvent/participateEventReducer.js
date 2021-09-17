import * as types from './participateEventType';


const initialStateParticipateEvent = {
    loading : false,
    event : {},
    error : '',
}

export const participateEventReducer = (state = initialStateParticipateEvent ,action) => {
    switch (action.type) {
        case types.LOAD_PARTICIPATE_EVENT:
            return {
                ...state,
                loading :true
            }
            
        case types.PARTICIPATE_EVENT_SUCCESS:
            return {
                ...state,
                loading :false,
                event : action.payload
                
            }
            
        case types.PARTICIPATE_EVENT_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload

            }

    
        default: return state ;
    }
}



import * as types from './newEventType';


const initialStateNewEvent = {
    loading : false,
    event : {},
    error : '',
}

export const newEventReducer = (state = initialStateNewEvent ,action) => {
    switch (action.type) {
        case types.LOAD_NEW_EVENT:
            return {
                ...state,
                loading :true
            }
            
        case types.NEW_EVENT_SUCCESS:
            return {
                ...state,
                loading :false,
                event : action.payload
                
            }
            
        case types.NEW_EVENT_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload

            }

    
        default: return state ;
    }
}



import * as types from './listEventType';


const initialStateListEvent = {
    loading : false,
    listEvent : {},
    error : '',
}

export const listEventReducer = (state = initialStateListEvent ,action) => {
    switch (action.type) {
        case types.LOAD_LIST_EVENT:
            return {
                ...state,
                loading :true
            }
            
        case types.LIST_EVENT_SUCCESS:
            return {
                ...state,
                loading :false,
                listEvent : action.payload
                
            }
            
        case types.LIST_EVENT_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload

            }

    
        default: return state ;
    }
}



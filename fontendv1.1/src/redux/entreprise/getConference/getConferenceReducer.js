import * as types from './getConferenceType';


const initialStateConference = {
    loading : false,
    conference : {},
    error : '',
    success:false
}

export const getConferenceReducer = (state = initialStateConference ,action) => {
    switch (action.type) {
        case types.LOAD_CONFERENCE:
            return {
                ...state,
                loading :true
            }
            
        case types.CONFERENCE_SUCCESS:
            return {
                ...state,
                loading :false,
                conference : action.payload,
                success : true
                
            }
            
        case types.CONFERENCE_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



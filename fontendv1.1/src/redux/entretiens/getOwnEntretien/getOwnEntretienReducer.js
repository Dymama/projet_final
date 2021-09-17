import * as types from './getOwnEntretienType';


const initialStateConference = {
    loading : false,
    ownEntretien : [],
    error : '',
    success:false
}

export const getOwnEntretienReducer = (state = initialStateConference ,action) => {
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
                ownEntretien : action.payload,
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



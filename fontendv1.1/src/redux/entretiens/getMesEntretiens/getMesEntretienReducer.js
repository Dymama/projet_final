import * as types from './getMesEntretienType';


const initialStateConference = {
    loading : false,
    entretien : [],
    error : '',
    success:false
}

export const getMesEntretienReducer = (state = initialStateConference ,action) => {
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
                entretien : action.payload,
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



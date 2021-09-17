import * as types from './participateVerifyType';


const initialStateParticipateVerify = {
    loading : false,
    event : {},
    error : '',
}

export const participateVerifyReducer = (state = initialStateParticipateVerify ,action) => {
    switch (action.type) {
        case types.LOAD_PARTICIPATE_VERIFY_EVENT:
            return {
                ...state,
                loading :true
            }
            
        case types.PARTICIPATE_EVENT_VERIFY_SUCCESS:
            return {
                ...state,
                loading :false,
                event : action.payload
                
            }
            
        case types.PARTICIPATE_EVENT_VERIFY_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload

            }

    
        default: return state ;
    }
}



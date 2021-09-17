import * as types from './connectType';


const initialStateConnect = {
    loading : false,
    user : [],
    error : '',
    connected:false
}

export const connectReducer = (state = initialStateConnect ,action) => {
    switch (action.type) {
        case types.LOAD_CONNECTED:
            return {
                ...state,
                loading :true
            }
            
        case types.USER_CONNECTED_SUCCESS:
            return {
                ...state,
                loading :false,
                user : action.payload,
                connected: true
                
            }
            
        case types.USER_CONNECTED_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload,
                connected: false

            }

    
        default: return state ;
    }
}



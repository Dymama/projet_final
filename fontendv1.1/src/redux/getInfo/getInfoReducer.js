import * as types from './getInfoType';


const initialStateConnect = {
    loading : false,
    user : [],
    error : '',
    success: false
}

export const getInfoReducer = (state = initialStateConnect ,action) => {
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
                success:true
                
            }
            
        case types.USER_CONNECTED_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload,

            }

    
        default: return state ;
    }
}



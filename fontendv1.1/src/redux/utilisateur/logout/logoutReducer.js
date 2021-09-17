import * as types from './logoutType';


const initialStateLogout = {
    loading : false,
    user : {},
    error : '',
    success:false
}

export const logoutReducer = (state = initialStateLogout ,action) => {
    switch (action.type) {
        case types.LOAD_LOGOUT:
            return {
                ...state,
                loading :true
            }
            
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                loading :false,
                user : action.payload,
                success : true
                
            }
            
        case types.LOGOUT_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



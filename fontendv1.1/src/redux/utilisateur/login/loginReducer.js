import * as types from './loginType';


const initialStateLogin = {
    loading : false,
    user : {},
    error : '',
    success:false
}

export const loginReducer = (state = initialStateLogin ,action) => {
    switch (action.type) {
        case types.LOAD_LOGIN:
            return {
                ...state,
                loading :true
            }
            
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading :false,
                user : action.payload,
                success : true,
                error : "",
                
            }
            
        case types.LOGIN_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



import * as types from './adminType';


const initialStateConnect = {
    loading : false,
    admin : [],
    error : '',
    connected:false
}

export const getAdminReducer = (state = initialStateConnect ,action) => {
    switch (action.type) {
        case types.LOAD_ADMIN:
            return {
                ...state,
                loading :true
            }
            
        case types.ADMIN_SUCCESS:
            return {
                ...state,
                loading :false,
                admin : action.payload,
                connected: true
                
            }
            
        case types.ADMIN_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload,
                connected: false

            }

    
        default: return state ;
    }
}



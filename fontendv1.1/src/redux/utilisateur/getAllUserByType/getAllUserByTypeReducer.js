import * as types from './getAllUserByTypeType';


const initialStateGetAllUserByType = {
    loading : false,
    user : {},
    error : '',
    success:false
}

export const getAllUserByTypeReducer = (state = initialStateGetAllUserByType ,action) => {
    switch (action.type) {
        case types.GET_ALL_USER_BY_TYPE_LOAD:
            return {
                ...state,
                loading :true
            }
            
        case types.GET_ALL_USER_BY_TYPE_SUCCESS:
            return {
                ...state,
                loading :false,
                user : action.payload,
                success : true
                
            }
            
        case types.GET_ALL_USER_BY_TYPE_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



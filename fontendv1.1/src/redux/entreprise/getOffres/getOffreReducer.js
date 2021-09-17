import * as types from './getOffreType';


const initialStateGetOffre = {
    loading : false,
    offre : {},
    error : '',
    success:false
}

export const getOffreReducer = (state = initialStateGetOffre ,action) => {
    switch (action.type) {
        case types.LOAD_OFFRE:
            return {
                ...state,
                loading :true
            }
            
        case types.GET_OFFRE_CREATE_SUCCESS:
            return {
                ...state,
                loading :false,
                offre : action.payload,
                success : true
                
            }
            
        case types.GET_OFFRE_CREATE_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



import * as types from './offreType';


const initialStateLogin = {
    loading : false,
    offre : {},
    error : '',
    success:false
}

export const offreReducer = (state = initialStateLogin ,action) => {
    switch (action.type) {
        case types.LOAD_OFFRE:
            return {
                ...state,
                loading :true
            }
            
        case types.OFFRE_CREATE_SUCCESS:
            return {
                ...state,
                loading :false,
                offre : action.payload,
                success : true
                
            }
            
        case types.OFFRE_CREATE_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



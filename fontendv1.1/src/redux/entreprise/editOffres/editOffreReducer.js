import * as types from './editOffreType';


const initialStateLogin = {
    loading : false,
    offre : {},
    error : '',
    success:false
}

export const editOffreReducer = (state = initialStateLogin ,action) => {
    switch (action.type) {
        case types.LOAD_OFFRE:
            return {
                ...state,
                loading :true
            }
            
        case types.OFFRE_EDITION_SUCCESS:
            return {
                ...state,
                loading :false,
                offre : action.payload,
                success : true
                
            }
            
        case types.OFFRE_EDITION_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



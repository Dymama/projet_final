import * as types from './getInfoEntrepriseType';


const initialStateEntreprise = {
    loading : false,
    entreprise : {},
    error : '',
    success:false
}

export const getInfoEntrepriseReducer = (state = initialStateEntreprise ,action) => {
    switch (action.type) {
        case types.LOAD_ENTREPRISE:
            return {
                ...state,
                loading :true
            }
            
        case types.GET_ENTREPRISE_SUCCESS:
            return {
                ...state,
                loading :false,
                entreprise : action.payload,
                success : true
                
            }
            
        case types.GET_ENTREPRISE_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



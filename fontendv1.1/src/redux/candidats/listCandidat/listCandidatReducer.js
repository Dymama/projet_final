import * as types from './listCandidatType';


const initialStateListCandidat = {
    loading : false,
    listCandidat : {},
    error : '',
}

export const listCandidatReducer = (state = initialStateListCandidat ,action) => {
    switch (action.type) {
        case types.LOAD_LIST_CANDIDAT:
            return {
                ...state,
                loading :true
            }
            
        case types.LIST_CANDIDAT_SUCCESS:
            return {
                ...state,
                loading :false,
                listCandidat : action.payload
                
            }
            
        case types.LIST_CANDIDAT_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload

            }

    
        default: return state ;
    }
}



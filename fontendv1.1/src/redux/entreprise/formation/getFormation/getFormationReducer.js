import * as types from './getFormationType';


const initialStateFormation = {
    loading : false,
    formation : {},
    error : '',
    success:false
}

export const getFormationReducer = (state = initialStateFormation ,action) => {
    switch (action.type) {
        case types.LOAD_FORMATION:
            return {
                ...state,
                loading :true
            }
            
        case types.FORMATION_SUCCESS:
            return {
                ...state,
                loading :false,
                formation : action.payload,
                success : true
                
            }
            
        case types.FORMATION_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



import * as types from './entretienType';


const initialStateEntretienCreate = {
    loading : false,
    entretien : {},
    error : '',
}

export const entretienReducer = (state = initialStateEntretienCreate ,action) => {
    switch (action.type) {
        case types.LOAD_DATA:
            return {
                ...state,
                loading :true
            }
            
        case types.ENTRETIEN_SUCCESS:
            return {
                ...state,
                loading :false,
                entretien : action.payload
                
            }
            
        case types.ENTRETIEN_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload

            }

    
        default: return state ;
    }
}



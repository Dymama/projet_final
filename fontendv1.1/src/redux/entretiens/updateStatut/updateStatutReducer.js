import * as types from './updateStatutType';


const initialStateUpdateStatut = {
    loading : false,
    entretien : [],
    error : '',
    success:false
}

export const updateStatutReducer = (state = initialStateUpdateStatut ,action) => {
    switch (action.type) {
        case types.LOAD_ENTRETIEN:
            return {
                ...state,
                loading :true
            }
            
        case types.ENTRETIEN_SUCCESS:
            return {
                ...state,
                loading :false,
                entretien : action.payload,
                success : true
                
            }
            
        case types.ENTRETIEN_FAIL:
            return {
                ...state,
                loading :false,
                error : action.payload,
                success : false
            }

    
        default: return state ;
    }
}



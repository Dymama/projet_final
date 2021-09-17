import * as types from './postulerOffreType';


const initialStatePostulerOffre = {
    loading : false,
    poste : {},
    error : '',
}

export const postulerOffreReducer = (state = initialStatePostulerOffre ,action) => {
    switch (action.type) {
        case types.LOAD_POSTULER_OFFRE:
            return {
                ...state,
                loading :true
            }
            
        case types.POSTULER_OFFRE_SUCCESS:
            return {
                ...state,
                loading :false,
                poste : action.payload
                
            }
            
        case types.POSTULER_OFFRE_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload

            }

    
        default: return state ;
    }
}



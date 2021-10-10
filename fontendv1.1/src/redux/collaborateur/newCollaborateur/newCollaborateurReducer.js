import * as types from './newCollaborateurType';


const initialStateCollaborateurCreate = {
    loading : false,
    newCollaborateur : {},
    error : '',
}

export const newCollaborateurReducer = (state = initialStateCollaborateurCreate ,action) => {
    switch (action.type) {
        case types.LOAD_SAVE_COLLABORATEUR:
            return {
                ...state,
                loading :true
            }
            
        case types.COLLABORATEUR_SUCCESS:
            return {
                ...state,
                loading :false,
                newCollaborateur : action.payload
                
            }
            
        case types.COLLABORATEUR_ERROR:
            return {
                ...state,
                loading :false,
                error : action.payload

            }

    
        default: return state ;
    }
}



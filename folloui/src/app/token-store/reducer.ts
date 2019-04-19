import { TokenActionTypes, TokenActions } from "./actions";



export let initialToken = null;

export function reducer(state=initialToken, action: TokenActions){
    switch (action.type){
        case TokenActionTypes.ADD_TOKEN:
            return action.payload;
        
            case TokenActionTypes.REMOVE_TOKEN:
                return null;
            
            default:
                return state;
    }
}
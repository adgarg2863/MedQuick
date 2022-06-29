import { GET_LIST , GET_STORES} from "../actions/types";

const initialState= {
    
    medicines: [],
    stores:[]
}

function search (state = initialState , action){
    const {type , payload} = action;
    switch(type){
        case GET_LIST :
            return {
                ...state,
                medicines: payload
            }
        case GET_STORES :
            return {
                ...state,
                stores: payload
            }
        default:
            return state;
    }
}
export default search;
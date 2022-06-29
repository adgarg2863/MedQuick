import { GET_LIST } from "../actions/types";

const initialState= {
    list:[]
}

function bed (state = initialState , action){
    const {type , payload} = action;
    switch(type){
        case GET_LIST:
            return {
                ...state,
                list:payload
            }

        default:
            return state;
    }
}
export default bed;
import {REGISTER_USERNAME} from "../actions/RegisterUserAction";

const initialState = {
    username : ""
}

const registerUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USERNAME :
            return {
                ...state,
                username: action.payload
            }

        default: return state;
    }
}

export default registerUserReducer;
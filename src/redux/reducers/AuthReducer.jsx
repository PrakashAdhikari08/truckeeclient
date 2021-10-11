import {FETCH_CLIENT_CREDENTIALS, LOGOUT_USER} from "../actions/AuthAction";
import {FETCH_PASSWORD} from "../actions/AuthAction";
import {FETCH_FAILURE} from "../actions/AuthAction";


const initialState = {
    isLoading: false,
    tokenClientCredentials: "",
    tokenPassword: "",
    refreshToken : "",
    userLoggedIn: false,
    error: ""

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLIENT_CREDENTIALS :
            return {
                ...state,
                tokenClientCredentials: action.payload,

            }
        case FETCH_PASSWORD :
            return {
                ...state,
                tokenPassword: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                userLoggedIn: true

            }
        case FETCH_FAILURE :
            return {
                ...state,
                error: action.payload

            }
        case LOGOUT_USER :
            return  {
                ...state,
                tokenPassword: "",
                userLoggedIn: false
            }


        default:
            return state
    }

}
export default authReducer;
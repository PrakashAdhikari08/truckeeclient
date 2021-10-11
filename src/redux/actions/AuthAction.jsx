export const FETCH_CLIENT_CREDENTIALS = 'FETCH_CLIENT_CREDENTIALS';
export const FETCH_PASSWORD = 'FETCH_PASSWORD';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const LOGOUT_USER =  "LOGOUT_USER";

//actions
export const fetchClientCredentialsToken = (token) => {
    return {
        type: FETCH_CLIENT_CREDENTIALS,
        payload: token
    }
}

export const fetchPasswordLoginToken = (response) => {
    return {
        type: FETCH_PASSWORD,
        payload: response
    }
}

export const fetchFailure = (error) => {
    return {
        type: FETCH_FAILURE,
        payload: error
    }

//reducer

};
export const logoutUser = () => {
    return {
        type : LOGOUT_USER
    }
}

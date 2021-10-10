export const REGISTER_USERNAME = "REGISTER_USERNAME";
export const registeredUsernameAction = (username) => {
    return {
        type: REGISTER_USERNAME,
        payload: username
    }
}
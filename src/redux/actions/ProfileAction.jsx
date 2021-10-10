
export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";

//actions
export const fetchUserProfileData = (data) => {
    return {
        type: FETCH_USER_PROFILE,
        payload: data
    }
}
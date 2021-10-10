import {FETCH_USER_PROFILE} from "../actions/ProfileAction";


const initialState = {
    id : "",
    username : "",
    fullName : "",
    role : "",
    phoneNumber : "",
    profileImageUrl : "",
    active : false,
    dotNumber : "",
    isProfileCompleted : false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_PROFILE :
            return {
                ...state,
                id : action.payload.id,
                fullName: action.payload.fullName,
                role : action.payload.role,
                phoneNumber : action.payload.phoneNumber,
                profileImageUrl : action.payload.profileImageUrl,
                active : action.payload.active,
                dotNumber : action.payload.dotNumber,
                isProfileCompleted : action.payload.isProfileCompleted
            }

        default :
            return state;
    }
}

export default profileReducer;
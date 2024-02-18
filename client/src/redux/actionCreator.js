import { LOGIN, LOGOUT, SIGNUP, UPDATE_EDUCATION, UPDATE_EXPERIENCE, SET_PROFILE, UNSET_PROFILE, UPDATE_PROFILE } from "./actions";

export function LoginUser(data) {
    return ({
        type: LOGIN,
        payload: data,
    })
}


export function LogoutUser() {
    return ({
        type: LOGOUT,
    })
}

export function sigupUser(data) {
    return ({
        type: SIGNUP,
        payload: data,
    })
}


export function setProfile(data) {
    return ({
        type: SET_PROFILE,
        payload: data,
    })
}

export function unsetProfile() {
    return ({
        type: UNSET_PROFILE,
    })
}

export function updateProfile(data) {
    return ({
        type: UPDATE_PROFILE,
        payload: data,
    })
}

export function updateEducation(data) {
    return ({
        type: UPDATE_EDUCATION,
        payload: data,
    })
}

export function updateExperience(data) {
    return ({
        type: UPDATE_EXPERIENCE,
        payload: data,
    })
}

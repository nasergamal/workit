import { LOGIN, LOGOUT, SIGNUP } from "./actions";

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

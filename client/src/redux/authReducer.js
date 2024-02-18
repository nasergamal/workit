import { LOGIN, LOGOUT } from "./actions";

const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
const auth = token ? true: false
const initialState = {
  token: token,
  isAuthenticated: auth,
};

function authReducer(state=initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
            }
        case LOGOUT:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            }
        default:
            return state;

    }
}

export default authReducer;

import { SET_PROFILE, UNSET_PROFILE, UPDATE_EDUCATION, UPDATE_EXPERIENCE, UPDATE_PROFILE } from './actions'

const initialState = {
    ready: false,
    userName: '',
    email: '',
    profile: {},
    education: [],
    experience: [],
}

function userReducer(state=initialState, action) {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                ready: true,
                userName: action.payload.userName,
                email: action.payload.email,
                profile: action.payload.profile,
                education: action.payload.education,
                experience: action.payload.experience,
            }
        case UPDATE_EDUCATION:
            return {
                ...state,
                education: action.payload,
            }
        case UPDATE_EXPERIENCE:
            return {
                ...state,
                experience: action.payload,
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
            }
        case UNSET_PROFILE:
            return{
                ...initialState
            }
        default:
            return state
    }

}

export default userReducer;

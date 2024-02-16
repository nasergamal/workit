import { useSelector } from "react-redux";

export const isAuthenticated = (state) => state.auth.isAuthenticated
export const token = (state) => state.auth.token

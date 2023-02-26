import {
    AUTH_START_LOADING, AUTH_START_LOADING_CHANGE_CHURCH,
    AUTH_STOP_LOADING, AUTH_STOP_LOADING_CHANGE_CHURCH, CHANGE_CHURCH_REQUEST, CHANGE_CHURCH_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    UPDATE_PASSWORD_FIRST_LOGIN_REQUEST,
    UPDATE_PASSWORD_FIRST_LOGIN_SUCCESS
} from "../types";

export const loginRequest = (payload) => {
    return {
        type: LOGIN_REQUEST,
        payload
    }
}

export const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}

export const updatePasswordFirstLoginRequest = (payload) => {
    return {
        type: UPDATE_PASSWORD_FIRST_LOGIN_REQUEST,
        payload
    }
}

export const updatePasswordFirstLoginSuccess = (payload) => {
    return {
        type: UPDATE_PASSWORD_FIRST_LOGIN_SUCCESS,
        payload
    }
}

export const changeChurchRequest = (churchId) => {
    return {
        type: CHANGE_CHURCH_REQUEST,
        churchId
    }
}

export const changeChurchSuccess = () => {
    return {
        type: CHANGE_CHURCH_SUCCESS
    }
}

export const startLoadingChangeChurch = () =>{
    return {
        type: AUTH_START_LOADING_CHANGE_CHURCH
    }
}
export const stopLoadingChangeChurch = () =>{
    return {
        type: AUTH_STOP_LOADING_CHANGE_CHURCH
    }
}

export function startAuthLoading(){
    return {
        type: AUTH_START_LOADING
    }
}

export function stopAuthLoading(){
    return {
        type: AUTH_STOP_LOADING
    }
}
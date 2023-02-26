import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    AUTH_STOP_LOADING,
    AUTH_START_LOADING, AUTH_START_LOADING_CHANGE_CHURCH, AUTH_STOP_LOADING_CHANGE_CHURCH
} from '../types';

const initialState = {
    authLoading: true,
    isLogged: false,
    error: null,
    messageSuccessLogin: null,
    auth: null,
    itemsMenu: [],
    loadingChangeChuch: false,
};

export function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case AUTH_STOP_LOADING:
            return {
                ...state,
                authLoading: false
            }
        case AUTH_START_LOADING:
            return {
                ...state,
                authLoading: true
            }
        case LOGIN_REQUEST:
            return {
                ...state,
                isLogged: false,
                messageSuccessLogin: null,
                auth: null
            }
        case AUTH_START_LOADING_CHANGE_CHURCH:
            return {
                ...state,
                loadingChangeChuch: true
            }
        case AUTH_STOP_LOADING_CHANGE_CHURCH:
            return {
                ...state,
                loadingChangeChuch: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                messageSuccessLogin: "Usuário logado com sucesso!",
                auth: { ...payload },
                isLogged: true,
            }
        default:
            return state;
    }
}
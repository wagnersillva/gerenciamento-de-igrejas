import {
    GLOBAL_AUTH_START_LOADING, GLOBAL_AUTH_STOP_LOADING,
    GLOBAL_ERROR, GLOBAL_ERROR_CLEAR, GLOBAL_START_LOADING, GLOBAL_STOP_LOADING
} from '../types';

export function errorAlertHandler(message){
    return {
        type: GLOBAL_ERROR,
        payload: { message }
    }
}

export function errorSagaClear(){
    return {
        type: GLOBAL_ERROR_CLEAR
    }
}

export function startLoading(){
    return {
        type: GLOBAL_START_LOADING
    }
}

export function stopLoading(){
    return {
        type: GLOBAL_STOP_LOADING
    }
}

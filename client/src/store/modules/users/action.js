import {
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_PREPARE_EDIT_REQUEST,
    USER_PREPARE_EDIT_SUCCESS,
    USER_PREPARE_SAVE_REQUEST,
    USER_PREPARE_SAVE_SUCCESS,
    USER_SAVE_REQUEST,
    USER_SAVE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
} from '../types';

export function listUserRequest(params){
    return {
        type: USER_LIST_REQUEST,
        payload: params
    }
}

export function listUserSuccess(payload){
    return {
        type: USER_LIST_SUCCESS,
        payload
    }
}

export function prepareEditRequest(id){
    return {
        type: USER_PREPARE_EDIT_REQUEST,
        id
    }
}

export function prepareEditSuccess(payload){
    return {
        type: USER_PREPARE_EDIT_SUCCESS,
        payload
    }
}

export function prepareSaveRequest(){
    return {
        type: USER_PREPARE_SAVE_REQUEST
    }
}

export function prepareSaveSuccess(data){
    return {
        type: USER_PREPARE_SAVE_SUCCESS,
        payload: data
    }
}

export function saveRequest(values){
    return {
        type: USER_SAVE_REQUEST,
        values
    }
}

export function saveSuccess(){
    return {
        type: USER_SAVE_SUCCESS
    }
}

export function updateRequest(values){
    return {
        type: USER_UPDATE_REQUEST,
        values
    }
}

export function updateSuccess(){
    return {
        type: USER_UPDATE_SUCCESS
    }
}

export function destroyRequest(id){
    return {
        type: USER_DELETE_REQUEST,
        id
    }
}

export function destroySuccess(data){
    return {
        type: USER_DELETE_SUCCESS,
        data
    }
}
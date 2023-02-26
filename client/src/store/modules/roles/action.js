import {
    ROLE_DELETE_REQUEST,
    ROLE_DELETE_SUCCESS,
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS,
    ROLE_PREPARE_EDIT_REQUEST,
    ROLE_PREPARE_EDIT_SUCCESS,
    ROLE_PREPARE_SAVE_REQUEST,
    ROLE_PREPARE_SAVE_SUCCESS,
    ROLE_SAVE_REQUEST,
    ROLE_SAVE_SUCCESS,
    ROLE_UPDATE_REQUEST,
    ROLE_UPDATE_SUCCESS,
} from '../types';

export function listRoleRequest(params){
    return {
        type: ROLE_LIST_REQUEST,
        payload: params
    }
}

export function listRoleSuccess(payload){
    return {
        type: ROLE_LIST_SUCCESS,
        payload
    }
}

export function prepareEditRequest(id){
    return {
        type: ROLE_PREPARE_EDIT_REQUEST,
        id
    }
}

export function prepareEditSuccess(payload){
    return {
        type: ROLE_PREPARE_EDIT_SUCCESS,
        payload
    }
}

export function prepareSaveRequest(){
    return {
        type: ROLE_PREPARE_SAVE_REQUEST
    }
}

export function prepareSaveSuccess(data){
    return {
        type: ROLE_PREPARE_SAVE_SUCCESS,
        payload: data
    }
}

export function saveRequest(values){
    return {
        type: ROLE_SAVE_REQUEST,
        values
    }
}

export function saveSuccess(data){
    return {
        type: ROLE_SAVE_SUCCESS,
        data
    }
}

export function updateRequest(values){
    return {
        type: ROLE_UPDATE_REQUEST,
        values
    }
}

export function updateSuccess(data){
    return {
        type: ROLE_UPDATE_SUCCESS,
        data
    }
}

export function destroyRequest(id){
    return {
        type: ROLE_DELETE_REQUEST,
        id
    }
}

export function destroySuccess(data){
    return {
        type: ROLE_DELETE_SUCCESS,
        data
    }
}
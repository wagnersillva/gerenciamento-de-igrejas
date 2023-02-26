import {
    CHURCH_DELETE_REQUEST,
    CHURCH_DELETE_SUCCESS,
    CHURCH_LIST_REQUEST,
    CHURCH_LIST_SUCCESS,
    CHURCH_PREPARE_EDIT_REQUEST,
    CHURCH_PREPARE_EDIT_SUCCESS,
    CHURCH_PREPARE_SAVE_REQUEST,
    CHURCH_PREPARE_SAVE_SUCCESS,
    CHURCH_SAVE_REQUEST,
    CHURCH_SAVE_SUCCESS,
    CHURCH_UPDATE_REQUEST,
    CHURCH_UPDATE_SUCCESS,
} from '../types';

export function listChurchesRequest(params){
    return {
        type: CHURCH_LIST_REQUEST,
        payload: params
    }
}

export function listChurchSuccess(payload){
    return {
        type: CHURCH_LIST_SUCCESS,
        payload
    }
}

export function prepareEditRequest(id){
    return {
        type: CHURCH_PREPARE_EDIT_REQUEST,
        id
    }
}

export function prepareEditSuccess(payload){
    return {
        type: CHURCH_PREPARE_EDIT_SUCCESS,
        payload
    }
}

export function prepareSaveRequest(){
    return {
        type: CHURCH_PREPARE_SAVE_REQUEST
    }
}

export function prepareSaveSuccess(data){
    return {
        type: CHURCH_PREPARE_SAVE_SUCCESS,
        payload: data
    }
}

export function saveRequest(values){
    return {
        type: CHURCH_SAVE_REQUEST,
        values
    }
}

export function saveSuccess(){
    return {
        type: CHURCH_SAVE_SUCCESS
    }
}

export function updateRequest(values){
    return {
        type: CHURCH_UPDATE_REQUEST,
        values
    }
}

export function updateSuccess(){
    return {
        type: CHURCH_UPDATE_SUCCESS
    }
}

export function destroyRequest(id){
    return {
        type: CHURCH_DELETE_REQUEST,
        id
    }
}

export function destroySuccess(data){
    return {
        type: CHURCH_DELETE_SUCCESS,
        data
    }
}
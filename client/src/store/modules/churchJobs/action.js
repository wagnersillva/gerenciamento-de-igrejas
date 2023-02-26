import {
    CHURCH_JOB_DELETE_REQUEST,
    CHURCH_JOB_DELETE_SUCCESS,
    CHURCH_JOB_LIST_REQUEST,
    CHURCH_JOB_LIST_SUCCESS,
    CHURCH_JOB_PREPARE_EDIT_REQUEST,
    CHURCH_JOB_PREPARE_EDIT_SUCCESS,
    CHURCH_JOB_PREPARE_SAVE_REQUEST,
    CHURCH_JOB_PREPARE_SAVE_SUCCESS,
    CHURCH_JOB_SAVE_REQUEST,
    CHURCH_JOB_SAVE_SUCCESS,
    CHURCH_JOB_UPDATE_REQUEST,
    CHURCH_JOB_UPDATE_SUCCESS,
} from '../types';

export function listChurchJobRequest(params){
    return {
        type: CHURCH_JOB_LIST_REQUEST,
        payload: params
    }
}

export function listChurchJobSuccess(payload){
    return {
        type: CHURCH_JOB_LIST_SUCCESS,
        payload
    }
}

export function prepareEditRequest(id){
    return {
        type: CHURCH_JOB_PREPARE_EDIT_REQUEST,
        id
    }
}

export function prepareEditSuccess(payload){
    return {
        type: CHURCH_JOB_PREPARE_EDIT_SUCCESS,
        payload
    }
}

export function prepareSaveRequest(){
    return {
        type: CHURCH_JOB_PREPARE_SAVE_REQUEST
    }
}

export function prepareSaveSuccess(data){
    return {
        type: CHURCH_JOB_PREPARE_SAVE_SUCCESS,
        payload: data
    }
}

export function saveRequest(values){
    return {
        type: CHURCH_JOB_SAVE_REQUEST,
        values
    }
}

export function saveSuccess(data){
    return {
        type: CHURCH_JOB_SAVE_SUCCESS,
        data
    }
}

export function updateRequest(values){
    return {
        type: CHURCH_JOB_UPDATE_REQUEST,
        values
    }
}

export function updateSuccess(data){
    return {
        type: CHURCH_JOB_UPDATE_SUCCESS,
        data
    }
}

export function destroyRequest(id){
    return {
        type: CHURCH_JOB_DELETE_REQUEST,
        id
    }
}

export function destroySuccess(data){
    return {
        type: CHURCH_JOB_DELETE_SUCCESS,
        data
    }
}
import {
    GET_CEP_INFO_REQUEST,
    GET_CEP_INFO_SUCCESS,
    GET_CITY_LIST_REQUEST,
    GET_CITY_LIST_SUCCESS,
    GET_STATES_REQUEST,
    GET_STATES_SUCCESS

} from '../types';

export const getCepInfoRequest = (payload) =>{
    return {
        type: GET_CEP_INFO_REQUEST,
        payload
    }
}

export const getCepInfoSuccess = (payload) =>{
    return {
        type: GET_CEP_INFO_SUCCESS,
        payload
    }
}

export const getStatesRequest = (payload) =>{
    return {
        type: GET_STATES_REQUEST,
        payload
    }
}

export const getStatesSuccess = (payload) =>{
    return {
        type: GET_STATES_SUCCESS,
        payload
    }
}

export const getCityListRequest = (payload) =>{
    return {
        type: GET_CITY_LIST_REQUEST,
        payload
    }
}

export const getCityListSuccess = (payload) =>{
    return {
        type: GET_CITY_LIST_SUCCESS,
        payload
    }
}
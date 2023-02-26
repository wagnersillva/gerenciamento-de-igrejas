import {
    GET_CEP_INFO_REQUEST,
    GET_CEP_INFO_SUCCESS, GET_CITY_LIST_REQUEST, GET_CITY_LIST_SUCCESS, GET_STATES_REQUEST, GET_STATES_SUCCESS
} from '../types';

const initialState = {
    cepInfo: null,
    listState: [],
    listCity: [],
    utilsLoading: false
};

export function utilsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_CEP_INFO_REQUEST:
            return {
                ...state,
                cepInfo: null,
                utilsLoading: true
            }
        case GET_STATES_REQUEST:
            return {
                ...state, listState: [], listCity: []
            }
        case GET_CITY_LIST_REQUEST:
            return {
                ...state, listCity: []
            }
        case GET_CEP_INFO_SUCCESS:
            return {
                ...state,
                cepInfo: payload?.data,
                utilsLoading: false
            };
        case GET_STATES_SUCCESS:
            return {
                ...state,
                listState: payload?.data
            }
        case GET_CITY_LIST_SUCCESS:
            return {
                ...state,
                listCity: payload?.data
            }
        default:
            return state;
    }
}
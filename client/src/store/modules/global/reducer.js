import {
    GLOBAL_ERROR, GLOBAL_ERROR_CLEAR, GLOBAL_START_LOADING, GLOBAL_STOP_LOADING,
} from '../types';

const initialState = {
    loading: false,
    global_errors: null,
    data: []
};

export function globalReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GLOBAL_ERROR:
            return {
                ...state,
                global_errors: payload.message,
            };
        case GLOBAL_ERROR_CLEAR:
            return {
                ...state,
                global_errors: "",
            };
        case GLOBAL_START_LOADING:
            return {
                ...state,
                loading: true,
            };
        case GLOBAL_STOP_LOADING:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
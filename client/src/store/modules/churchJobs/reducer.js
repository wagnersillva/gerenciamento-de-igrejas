import {
    CHURCH_JOB_LIST_SUCCESS,
    CHURCH_JOB_LIST_REQUEST,
    CHURCH_JOB_PREPARE_EDIT_SUCCESS,
    CHURCH_JOB_PREPARE_SAVE_SUCCESS
} from '../types';

const initialState = {
    loading: false,
    error: null,
    total: null,
    churchJob: {},
    data: []
};

export function churchJobReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHURCH_JOB_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                data: []
            };

        case CHURCH_JOB_LIST_SUCCESS:
            const { data, total } = payload;
            return {
                ...state, data, total, loading: false,
            };

        case CHURCH_JOB_PREPARE_SAVE_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case CHURCH_JOB_PREPARE_EDIT_SUCCESS:
            return {
                ...state,
                churchJob: payload?.data?.churchJob,
                loading: false,
            };
        default:
            return state;
    }
}
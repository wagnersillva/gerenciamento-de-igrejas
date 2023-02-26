import {
    CHURCH_LIST_REQUEST,
    CHURCH_LIST_SUCCESS, CHURCH_PREPARE_EDIT_SUCCESS,
    CHURCH_PREPARE_SAVE_SUCCESS, CHURCH_SAVE_REQUEST, CHURCH_SAVE_SUCCESS
} from '../types';

const initialState = {
    toResetFields: false,
    loading: false,
    error: null,
    total: null,
    church: {},
    data: [],
};

export function churchReducer(state = initialState, { type, payload }) {
    switch (type) {
        case CHURCH_SAVE_REQUEST:
            return {
                ...state,
                toResetFields: false
            }
        case CHURCH_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                data: []
            };

        case CHURCH_LIST_SUCCESS:
            const { data, total } = payload;
            return {
                ...state, data, total, loading: false,
            };

        case CHURCH_PREPARE_SAVE_SUCCESS:
            return {
                ...state,
                loading: false,
            };

        case CHURCH_PREPARE_EDIT_SUCCESS:
            return {
                ...state,
                church: payload?.data?.church,
                loading: false,
            };
        case CHURCH_SAVE_SUCCESS:
            return {
                ...state,
                toResetFields: true
            }
        default:
            return state;
    }
}
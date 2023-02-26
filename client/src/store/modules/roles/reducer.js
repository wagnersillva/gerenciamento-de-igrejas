import {
    ROLE_LIST_REQUEST,
    ROLE_LIST_SUCCESS, ROLE_PREPARE_EDIT_SUCCESS,
    ROLE_PREPARE_SAVE_SUCCESS
} from '../types';

const initialState = {
    loading: false,
    error: null,
    permissions: [],
    role: {},
    data: []
};

export function roleReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ROLE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                data: []
            };

        case ROLE_LIST_SUCCESS:
            const { data, total } = payload;
            return {
                ...state, data, total, loading: false,
            };

        case ROLE_PREPARE_SAVE_SUCCESS:
            return {
                ...state,
                permissions: payload?.data?.permissions,
                loading: false,
            };

        case ROLE_PREPARE_EDIT_SUCCESS:
            return {
                ...state,
                role: payload?.data?.role,
                permissions: payload?.data?.permissions,
                loading: false,
            };
        default:
            return state;
    }
}
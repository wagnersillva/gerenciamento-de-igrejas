import {
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS, USER_PREPARE_EDIT_SUCCESS,
    USER_PREPARE_SAVE_SUCCESS, USER_SAVE_REQUEST, USER_SAVE_SUCCESS
} from '../types';

const initialState = {
    toResetFields: false,
    loading: false,
    error: null,
    churchJobs: [],
    maritalStatus: [],
    roles: [],
    total: null,
    user: {},
    data: [],
};

export function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_SAVE_REQUEST:
            return {
                ...state,
                toResetFields: false
            }
        case USER_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                data: []
            };

        case USER_LIST_SUCCESS:
            const { data, total } = payload;
            return {
                ...state, data, total, loading: false,
            };

        case USER_PREPARE_SAVE_SUCCESS:
            return {
                ...state,
                maritalStatus: payload?.data?.marital_status,
                roles: payload?.data?.roles,
                churchJobs: payload?.data?.church_jobs,
                loading: false,
            };

        case USER_PREPARE_EDIT_SUCCESS:
            return {
                ...state,
                user: payload?.data?.user,
                roles: payload?.data?.roles,
                maritalStatus: payload?.data?.marital_status,
                churchJobs: payload?.data?.church_jobs,
                loading: false,
            };
        case USER_SAVE_SUCCESS:
            return {
                ...state,
                toResetFields: true
            }
        default:
            return state;
    }
}
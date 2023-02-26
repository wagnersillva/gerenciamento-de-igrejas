import {call, put, takeLatest, all} from 'redux-saga/effects';

import {
    ROLE_DELETE_REQUEST,
    ROLE_LIST_REQUEST, ROLE_PREPARE_EDIT_REQUEST, ROLE_PREPARE_SAVE_REQUEST, ROLE_SAVE_REQUEST, ROLE_UPDATE_REQUEST
} from '../types';

import {
    listRoleSuccess,
    prepareEditSuccess,
    prepareSaveSuccess,
    saveSuccess,
    listRoleRequest
} from './action';
import {roleServices} from "../../../services/roles";
import {errorAlertHandler, startLoading, stopLoading} from "../global/action";

export function* list({ payload }) {
    try {
        yield put(startLoading())
        const data = yield call(roleServices.list, payload);
        yield put(listRoleSuccess(data))
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}

export function* prepareEdit({ id }) {
    try {
        yield put(startLoading())
        const data = yield call(roleServices.prepareEdit, id);
        yield put(prepareEditSuccess(data))
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}

export function* prepareSave() {
    try {
        yield put(startLoading())
        const data = yield call(roleServices.prepareSave);
        yield put(prepareSaveSuccess(data))
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}

export function* save({ values }) {
    try {
        yield put(startLoading())

        const data = yield call(roleServices.save, values);
        yield put(saveSuccess({data}))
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}

export function* update({ values }) {
    try {
        yield put(startLoading())

        const data = yield call(roleServices.update, values);
        yield put(saveSuccess({data}))
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}
export function* destroy({ id }) {
    try {
        yield put(startLoading())
        yield call(roleServices.destroy, id);
        yield put(listRoleRequest())
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}

export default all([
    takeLatest(ROLE_LIST_REQUEST, list),
    takeLatest(ROLE_PREPARE_EDIT_REQUEST, prepareEdit),
    takeLatest(ROLE_PREPARE_SAVE_REQUEST, prepareSave),
    takeLatest(ROLE_SAVE_REQUEST, save),
    takeLatest(ROLE_UPDATE_REQUEST, update),
    takeLatest(ROLE_DELETE_REQUEST, destroy),
])

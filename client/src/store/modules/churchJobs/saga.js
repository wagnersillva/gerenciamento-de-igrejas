import {call, put, takeLatest, all} from 'redux-saga/effects';

import {
    CHURCH_JOB_DELETE_REQUEST,
    CHURCH_JOB_LIST_REQUEST,
    CHURCH_JOB_PREPARE_EDIT_REQUEST,
    CHURCH_JOB_PREPARE_SAVE_REQUEST,
    CHURCH_JOB_SAVE_REQUEST,
    CHURCH_JOB_UPDATE_REQUEST
} from '../types';

import {
    listChurchJobRequest,
    prepareEditSuccess,
    prepareSaveSuccess,
    saveSuccess,
    listChurchJobSuccess
} from './action';
import {errorAlertHandler, startLoading, stopLoading} from "../global/action";
import {churchJobServices} from "../../../services/churchJob";

export function* list({ payload }) {
    try {
        yield put(startLoading())
        const data = yield call(churchJobServices.list, payload);
        yield put(listChurchJobSuccess(data))
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}

export function* prepareEdit({ id }) {
    try {
        yield put(startLoading())
        const data = yield call(churchJobServices.prepareEdit, id);
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
        const data = yield call(churchJobServices.prepareSave);
        yield put(prepareSaveSuccess(data))
    } catch (err) {
        console.log({ err })
    } finally {
        yield put(stopLoading())
    }
}

export function* save({ values }) {
    try {
        yield put(startLoading())

        const data = yield call(churchJobServices.save, values);
        yield put(saveSuccess({data}))
    } catch (err) {
        console.log({ err })
    } finally {
        yield put(stopLoading())
    }
}

export function* update({ values }) {
    try {
        yield put(startLoading())

        const data = yield call(churchJobServices.update, values);
        yield put(saveSuccess({data}))
    } catch (err) {
        console.log({ err })
    } finally {
        yield put(stopLoading())
    }
}
export function* destroy({ id }) {
    try {
        yield put(startLoading())
        yield call(churchJobServices.destroy, id);
        yield put(listChurchJobRequest())
    } catch (err) {
        console.log({ err })
    } finally {
        yield put(stopLoading())
    }
}

export default all([
    takeLatest(CHURCH_JOB_LIST_REQUEST, list),
    takeLatest(CHURCH_JOB_PREPARE_EDIT_REQUEST, prepareEdit),
    takeLatest(CHURCH_JOB_PREPARE_SAVE_REQUEST, prepareSave),
    takeLatest(CHURCH_JOB_SAVE_REQUEST, save),
    takeLatest(CHURCH_JOB_UPDATE_REQUEST, update),
    takeLatest(CHURCH_JOB_DELETE_REQUEST, destroy),
])

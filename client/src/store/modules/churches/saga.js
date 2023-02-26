import {call, put, takeLatest, all} from 'redux-saga/effects';

import {
    CHURCH_DELETE_REQUEST,
    CHURCH_LIST_REQUEST,
    CHURCH_PREPARE_EDIT_REQUEST,
    CHURCH_PREPARE_SAVE_REQUEST,
    CHURCH_SAVE_REQUEST,
    CHURCH_UPDATE_REQUEST
} from '../types';

import {
    listChurchSuccess,
    prepareEditSuccess,
    prepareSaveSuccess,
    saveSuccess,
    listChurchesRequest,
    updateSuccess
} from './action';
import {churchServices} from "../../../services/churches";
import {errorAlertHandler, startLoading, stopLoading} from "../global/action";
import {dateToString} from "../../../utils/format";

export function* list({ payload }) {
    try {
        yield put(startLoading())
        const data = yield call(churchServices.list, payload);
        yield put(listChurchSuccess(data))
    } catch (err) {
        console.log({ err })
    } finally {
        yield put(stopLoading())
    }
}

export function* prepareEdit({ id }) {
    try {
        yield put(startLoading())
        const data = yield call(churchServices.prepareEdit, id);
        yield put(prepareEditSuccess(data))
    } catch (err) {
        console.log({ err })
    } finally {
        yield put(stopLoading())
    }
}

export function* prepareSave() {
    try {
        yield put(startLoading())
        const data = yield call(churchServices.prepareSave);
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

        values.birth = dateToString(values?.birth);
        values.baptism_date = dateToString(values?.baptism_date);

        yield call(churchServices.save, values);
        yield put(saveSuccess())
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}

export function* update({ values }) {
    try {
        yield put(startLoading())

        yield call(churchServices.update, values);
        yield put(updateSuccess())
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}
export function* destroy({ id }) {
    try {
        yield put(startLoading())
        yield call(churchServices.destroy, id);
        yield put(listChurchesRequest())
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}

export default all([
    takeLatest(CHURCH_LIST_REQUEST, list),
    takeLatest(CHURCH_PREPARE_EDIT_REQUEST, prepareEdit),
    takeLatest(CHURCH_PREPARE_SAVE_REQUEST, prepareSave),
    takeLatest(CHURCH_SAVE_REQUEST, save),
    takeLatest(CHURCH_UPDATE_REQUEST, update),
    takeLatest(CHURCH_DELETE_REQUEST, destroy),
])

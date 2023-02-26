import {call, put, takeLatest, all} from 'redux-saga/effects';

import {
    USER_DELETE_REQUEST,
    USER_LIST_REQUEST, USER_PREPARE_EDIT_REQUEST, USER_PREPARE_SAVE_REQUEST, USER_SAVE_REQUEST, USER_UPDATE_REQUEST
} from '../types';

import {
    destroySuccess,
    listUserSuccess,
    prepareEditSuccess,
    prepareSaveSuccess,
    saveSuccess,
    listUserRequest, updateRequest, updateSuccess
} from './action';
import {userServices} from "../../../services/user";
import {errorAlertHandler, startLoading, stopLoading} from "../global/action";
import moment from "moment";
import {dateToString} from "../../../utils/format";

export function* list({ payload }) {
    try {
        yield put(startLoading())
        const data = yield call(userServices.list, payload);
        yield put(listUserSuccess(data))
    } catch (err) {
        console.log({ err })
    } finally {
        yield put(stopLoading())
    }
}

export function* prepareEdit({ id }) {
    try {
        yield put(startLoading())
        const data = yield call(userServices.prepareEdit, id);
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
        const data = yield call(userServices.prepareSave);
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

        yield call(userServices.save, values);
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

        values.birth = dateToString(values?.birth);
        values.baptism_date = dateToString(values?.baptism_date);

        yield call(userServices.update, values);
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
        yield call(userServices.destroy, id);
        yield put(listUserRequest())
    } catch (err) {
        yield put(errorAlertHandler(err))
    } finally {
        yield put(stopLoading())
    }
}

export default all([
    takeLatest(USER_LIST_REQUEST, list),
    takeLatest(USER_PREPARE_EDIT_REQUEST, prepareEdit),
    takeLatest(USER_PREPARE_SAVE_REQUEST, prepareSave),
    takeLatest(USER_SAVE_REQUEST, save),
    takeLatest(USER_UPDATE_REQUEST, update),
    takeLatest(USER_DELETE_REQUEST, destroy),
])

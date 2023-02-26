import {call, put, takeLatest, all} from 'redux-saga/effects';

import {
    CHANGE_CHURCH_REQUEST,
    LOGIN_REQUEST, UPDATE_PASSWORD_FIRST_LOGIN_REQUEST
} from '../types';

import {authServices} from "../../../services/auth";
import {errorAlertHandler, startLoading, stopLoading} from "../global/action";
import {changeChurchSuccess, loginSuccess, startLoadingChangeChurch, updatePasswordFirstLoginSuccess} from "./action";

function* login({ payload }) {
    try {
        yield put(startLoading())
        const data = yield call(authServices.login, payload);
        yield put(loginSuccess(data));
    } catch (err) {
        yield put(errorAlertHandler(err));
    } finally {
        yield put(stopLoading())
    }
}

function* updatePasswordFirstLogin({ payload }) {
    try {
        yield put(startLoading())
        const data = yield call(authServices.updatePasswordFirstLogin, payload);
        window.location = '/';
        yield put(updatePasswordFirstLoginSuccess(data));
    } catch (err) {
        yield put(errorAlertHandler(err));
    } finally {
        yield put(stopLoading())
    }
}

function* changeChurch({ churchId }) {
    try {
        yield put(startLoadingChangeChurch())
        const data = yield call(authServices.changeChurch, churchId);
        yield put(changeChurchSuccess());
    } catch (err) {
        yield put(errorAlertHandler(err));
    } finally {
        yield put(startLoadingChangeChurch())
    }
}

export default all([
    takeLatest(LOGIN_REQUEST, login),
    takeLatest(UPDATE_PASSWORD_FIRST_LOGIN_REQUEST, updatePasswordFirstLogin),
    takeLatest(CHANGE_CHURCH_REQUEST, changeChurch),
])

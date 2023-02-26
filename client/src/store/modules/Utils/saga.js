import {call, put, takeLatest, all} from 'redux-saga/effects';

import {
    GET_CEP_INFO_REQUEST, GET_CITY_LIST_REQUEST, GET_STATES_REQUEST
} from '../types';

import {
    getCepInfoSuccess, getCityListSuccess, getStatesSuccess
} from './action';
import {utilsService} from "../../../services/others";

export function* getCepInfo({ payload }) {
    try {
        const data = yield call(utilsService.getCepInfo, payload);
        yield put(getCepInfoSuccess(data))
    } catch (err) {
        console.log({ err })
    }
}

export function* getSates() {
    try {
        const data = yield call(utilsService.getStates);
        yield put(getStatesSuccess(data))
    } catch (err) {
        console.log({ err })
    }
}

export function* getCityList({ payload }) {
    try {
        const data = yield call(utilsService.getCityList, payload);
        yield put(getCityListSuccess(data))
    } catch (err) {
        console.log({ err })
    }
}


export default all([
    takeLatest(GET_CEP_INFO_REQUEST, getCepInfo),
    takeLatest(GET_STATES_REQUEST, getSates),
    takeLatest(GET_CITY_LIST_REQUEST, getCityList),
])

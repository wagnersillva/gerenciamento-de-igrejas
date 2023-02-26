import { all } from "redux-saga/effects";
import userSaga from './users/saga';
import authSaga from './auth/saga';
import churchJobSaga from './churchJobs/saga';
import roleSaga from './roles/saga';
import utilsSaga from './Utils/saga';
import churchSaga from './churches/saga';

export default function* rootSaga() {
    yield all([
        userSaga,
        authSaga,
        roleSaga,
        utilsSaga,
        churchJobSaga,
        churchSaga
    ])
}
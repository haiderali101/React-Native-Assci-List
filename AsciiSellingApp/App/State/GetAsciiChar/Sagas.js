import { GET_ASCII_LIST } from '../ActionTypes'
import { put, takeLatest, call } from 'redux-saga/effects'
import API from '../../Services/baseApi'
import * as AsciiListActions from './Actions'

function* getAsciiList(action) {
  try {
    const response = yield call(API.get, '/products')
    yield put(AsciiListActions.getAsciiListSuccess(response))
  } catch (e) {
    yield put(AsciiListActions.getAsciiListError(e.message))
  }
}

export default function* root() {
  yield [yield takeLatest(GET_ASCII_LIST, getAsciiList)]
}

import { takeLatest, put, call, fork, select, all } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as actions from '../actions';
import { selectedSymbolSelector } from '../reducers/selectors';

const baseURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={symbol}&apikey=OFYUOGWKSUHOOO65';

export function fetchDataApi(symbol) {
  const url = baseURL.replace('{symbol}', symbol);
  return fetch(url).then(response => response.json());
}

export function* fetchData() {
  yield put(actions.requestingData());
  const symbol = yield select(selectedSymbolSelector);
  const data = yield call(fetchDataApi, symbol);
  if (data['Time Series (Daily)']) {
    yield put(actions.receiveData(data['Time Series (Daily)']));
  } else {
    yield put(actions.receiveDataFailed(data));
  }
}

export function* watchFetchData() {
  yield takeLatest(actions.SELECTED_SYMBOL, fetchData)
}

export default function* root() {
  yield all([fork(watchFetchData)]);
}

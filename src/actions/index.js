export const SELECTED_SYMBOL = 'SELECTED_SYMBOL';
export const FETCH_DATA_REQUESTING = 'FETCH_DATA_REQUESTING';
export const FETCH_DATA_SUCCESSED = 'FETCH_DATA_SUCCESSED';
export const FETCH_DATA_FAILED = 'FETCH_DATA_FAILED';

export function selectSymbol(symbol) {
  return {
    type: SELECTED_SYMBOL,
    symbol,
  }
}

export function requestingData() {
  return {
    type: FETCH_DATA_REQUESTING,
  }
}

export function receiveData(data) {
  return {
    type: FETCH_DATA_SUCCESSED,
    data,
  }
}

export function receiveDataFailed(error) {
  return {
    type: FETCH_DATA_FAILED,
    error,
  }
}
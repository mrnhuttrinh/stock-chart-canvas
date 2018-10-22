import { combineReducers } from 'redux';
import { SELECTED_SYMBOL, FETCH_DATA_SUCCESSED, FETCH_DATA_REQUESTING, FETCH_DATA_FAILED } from '../actions';
import { getItem, setItem } from '../utils';

const initialState = {
  symbol: getItem('symbol') || 'MSFT',
}

function selectedSymbol(state = initialState, action) {
  switch (action.type) {
    case SELECTED_SYMBOL:
      setItem('symbol', action.symbol);
      return {
        ...state,
        symbol: action.symbol,
      };
    default:
      return state
  }
}


function fetchData(state = { data: [] }, action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESSED:
      return {
        ...state,
        data: action.data,
        requesting: false,
        error: null,
      };
    case FETCH_DATA_REQUESTING:
      return {
        ...state,
        requesting: true,
        error: null,
      };
    case FETCH_DATA_FAILED:
      return {
        ...state,
        data: [],
        error: action.error,
        requesting: false,
      };
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedSymbol,
  fetchData,
})

export default rootReducer

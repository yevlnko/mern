// Core
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import { itemsActions } from "redux/items/actions";

export function* callGetItemsWorker () {
  
  try {
    
    const res = yield call(axios, {
      url: 'http://localhost:5000/api/items',
      method:'get',
    });
  
    const {data} = yield res;
    yield put(itemsActions.fetchItemsSuccess(data));
    
  } catch (err) {
  
    yield put(itemsActions.fetchItemsFail(err));
    
  } finally {
    console.log('finally fetchItems');
  }
  
}


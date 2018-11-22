// Core
import {call, put} from 'redux-saga/effects';
import axios from 'axios';

import { itemsActions } from "redux/items/actions";

export function* callCreateItemWorker({ payload: item }) {
	
	try {
		
		console.log('callCreateItemWorker');
		
		const res = yield call(axios, {
			url: 'http://localhost:5000/api/items',
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			data: JSON.stringify(item),
		});
		
		const data = yield res;
		
		console.log(data);
		
		yield put(itemsActions.fetchItems());
		
	} catch (err) {
		
		// yield put(itemsActions.fetchItemsFail(err));
		
	} finally {
		// console.log('finally fetchItems');
	}
	
}


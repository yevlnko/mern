import {takeEvery} from 'redux-saga/effects';

// Instruments
import {types} from "redux/items/types";
import {callGetItemsWorker} from "./workers/items";
import {callCreateItemWorker} from "./workers/createItem";


export const itemsWatchers = Object.freeze({
	* watchGetItems() {
		yield takeEvery(types.FETCH_ITEMS, callGetItemsWorker);
	},
	* watchCreateItem() {
		yield takeEvery(types.CREATE_ITEM, callCreateItemWorker);
	},
});

// Core
import { all } from 'redux-saga/effects';

import { itemsWatchers } from 'redux/items/saga';

export function* rootSaga() {
	yield all([
		itemsWatchers.watchGetItems(),
		itemsWatchers.watchCreateItem(),
	]);
}

import {routerReducer as router} from 'react-router-redux';
import {combineReducers} from 'redux-immutable';

// Instruments
import {localeReducer as lang} from 'redux/locale/reducer';
import {itemsReducer as items} from 'redux/items/reducer';

export const rootReducer = combineReducers({
	router,
	lang,
	items,
});

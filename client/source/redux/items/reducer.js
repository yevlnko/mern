import { Map, List, fromJS } from 'immutable';

import { types } from './types';

const initialState = List();

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ITEMS_SUCCESS:
		return fromJS(action.payload);
    
    // case types.CREATE_ITEM:
    //   return state;
    //
    //
    // case types.REMOVE_ITEM:
    //   return state.filter((post) => {
    //     return post.get('id') !== action.payload;
    //   });
    
    default:
      return state;
  }
};

import { fromJS } from 'immutable';

import { types } from './types';

export const initialState = fromJS('en');

export const localeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_LOCALE:
      return fromJS(action.payload);
    default:
      return state;
  }
};

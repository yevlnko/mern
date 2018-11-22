import { types } from './types';

export const itemsActions = Object.freeze({
  fetchItems: () => ({
    type: types.FETCH_ITEMS,
  }),
  fetchItemsFail: (error) => ({
    type:    types.FETCH_ITEMS_FAIL,
    payload: error,
    error:   true,
  }),
  fetchItemsSuccess: (items) => ({
    type:    types.FETCH_ITEMS_SUCCESS,
    payload: items,
  }),
  createItem: (item) => ({
    type:    types.CREATE_ITEM,
    payload: item,
  }),
  removeItem: (id) => ({
    type:    types.REMOVE_ITEM,
    payload: id,
  }),
});

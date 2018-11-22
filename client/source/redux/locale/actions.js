import { types } from './types';

export const localeActions = Object.freeze({
  changeLocale: lang => ({
    type: types.CHANGE_LOCALE,
    payload: lang,
  }),
});

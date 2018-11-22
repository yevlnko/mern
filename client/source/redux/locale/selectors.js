import { createSelector } from 'reselect';
// import { initialState } from './reducer';

const selectLanguage = state => state.get('lang');

const makeSelectLocale = () => createSelector(selectLanguage, state => state);

export { selectLanguage, makeSelectLocale };

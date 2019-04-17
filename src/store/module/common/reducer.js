import {
  fromJS
} from 'immutable';
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  page_title: '',
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PAGETITLE:
      return state.merge({
        page_title: action.title
      });
    default:
      return state;
  }
}
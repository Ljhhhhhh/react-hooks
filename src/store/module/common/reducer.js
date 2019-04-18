import {
  fromJS
} from 'immutable';
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  page_title: '',
  userinfo: {
    name: 'ljh'
  }
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PAGETITLE:
      return state.merge({
        page_title: action.title
      });
    case actionTypes.USERINFO:
      return state.merge({
        userinfo: fromJS(action.userinfo)
      });
    default:
      return state;
  }
}
import * as actionTypes from "./actionTypes";


const setTitle = (title) => ({
  type: actionTypes.PAGETITLE,
  title
})

export const setPageTitle = (title) => {
  return dispatch => {
    dispatch(setTitle(title))
  }
}
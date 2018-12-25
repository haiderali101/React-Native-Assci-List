import * as ActionTypes from '../ActionTypes'

export const getAsciiList = () => ({
  type: ActionTypes.GET_ASCII_LIST,
})

export const getAsciiListSuccess = data => ({
  type: ActionTypes.GET_ASCII_LIST_SUCCESS,
  data,
})

export const getAsciiListError = error => ({
  type: ActionTypes.GET_ASCII_LIST_ERROR,
  error,
})

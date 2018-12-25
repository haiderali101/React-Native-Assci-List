// @flow

import { GET_ASCII_LIST, GET_ASCII_LIST_SUCCESS, GET_ASCII_LIST_ERROR } from '../ActionTypes'
import Immutable from 'seamless-immutable'
import { createReducer } from '../CreateReducer'

const INITIAL_STATE = Immutable({
  asciiListData: null,
  isFetching: false,
  error: null,
})

const reducers = {
  [GET_ASCII_LIST]: (state, action) => {
    return Immutable.merge(state, { asciiListData: null, isFetching: true })
  },
  [GET_ASCII_LIST_SUCCESS]: (state, { data }) => {
    return Immutable.merge(state, { asciiListData: data, isFetching: false, error: null })
  },
  [GET_ASCII_LIST_ERROR]: (state, { error }) => {
    return Immutable.merge(state, { error, isFetching: false })
  },
}

export const reducer = createReducer(INITIAL_STATE, reducers)

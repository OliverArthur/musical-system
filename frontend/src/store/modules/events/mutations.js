const SET_EVENT = (state, { payload }) => {
  console.log('MUTATIONS', state.payload)
  state.events = payload
}

const GET_EVENT = (state, payload) => {
  state.event = payload
}

const GET_EVENTS = (state, payload) => {
  state.events = payload
}

const SET_IS_LOADING = (state, status) => {
  state.isLoading = status
}

const SET_ERROR = (state, error) => {
  state.error = error
}

export default {
  SET_EVENT,
  GET_EVENT,
  GET_EVENTS,
  SET_IS_LOADING,
  SET_ERROR
}

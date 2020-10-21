const getEvents = state => state.events
const getEvent = state => state.event
const getError = state => state.error
const isLoading = state => state.isLoading

export default {
  getEvents,
  getEvent,
  getError,
  isLoading
}

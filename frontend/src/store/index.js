import { createStore } from 'vuex'
import eventModule from './modules/events'

export default createStore({
  strict: true,
  modules: {
    events: eventModule
  }
})

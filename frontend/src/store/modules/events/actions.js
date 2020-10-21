import Services from '@/services'

const SET_EVENT = async ({ commit }, data) => {
  commit('SET_IS_LOADING', true)
  try {
    const req = await Services.create(data)
    const payload = req.json()
    commit('SET_EVENT', payload)
    console.log('ACTIONS', payload)
    return payload
  } catch (e) {
    commit('SET_ERROR', e)
  } finally {
    commit('SET_IS_LOADING', false)
  }
}

const GET_EVENTS = async ({ commit }, data) => {
  commit('SET_IS_LOADING', true)
  try {
    const payload = await Services.all(data.a, data.b)
    commit('GET_EVENTS', payload)
  } catch (e) {
    commit('SET_ERROR', e)
  } finally {
    commit('SET_IS_LOADING', false)
  }
}

const GET_EVENT = async ({ commit }, id) => {
  commit('SET_IS_LOADING', true)
  try {
    const req = await Services.get(id)
    const payload = req.json()
    commit('GET_EVENT', payload)
  } catch (e) {
    commit('SET_ERROR', e)
  } finally {
    commit('SET_IS_LOADING', false)
  }
}

const DELETE_EVENT = async ({ commit }, id) => {
  commit('SET_IS_LOADING', true)
  try {
    await Services.remove(id)
  } catch (e) {
    commit('SET_ERROR', e)
  } finally {
    commit('SET_IS_LOADING', false)
  }
}

export default {
  SET_EVENT,
  GET_EVENT,
  GET_EVENTS,
  DELETE_EVENT
}

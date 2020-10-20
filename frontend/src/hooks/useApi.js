import { reactive } from 'vue'
import config from '@/config'

export default function useApi () {
  const state = reactive({
    loading: false,
    hasError: false,
    msg: '',
    data: []
  })
  const addEvent = async (newEvent) => {
    state.loading = true
    const event = {
      title: newEvent.value.title,
      started_at: newEvent.value.start,
      ended_at: newEvent.value.end,
      label: newEvent.value.color,
      description: newEvent.value.description
    }
    try {
      const req = await fetch(`${config.API_BASE}/api/v1/event/create`, {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
          'content-type': 'application/json'
        }
      })
      const payload = await req.json()
      state.data = payload
      return payload
    } catch (error) {
      state.hasError = true
      throw error
    } finally {
      state.loading = false
      state.hasError = false
      window.location.reload(true)
    }
  }

  const getAllEvents = async (page, limit) => {
    state.loading = true
    try {
      const req = await fetch(`${config.API_BASE}/api/v1/event/?page=${page}&limit=${limit}`, {
        mode: 'no-cors'
      })
      console.log(req)
      const payload = await req.json()
      state.data = payload
      return payload
    } catch (error) {
      state.hasError = true
      state.msg = error
      throw error
    } finally {
      state.loading = false
      state.hasError = false
    }
  }

  const deleteOneEvent = async (id) => {
    state.loading = true
    try {
      const req = await fetch(`${config.API_BASE}/api/v1/event/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
      return req
    } catch (error) {
      state.hasError = true
      state.msg = error
      throw error
    } finally {
      state.loading = false
      state.hasError = false
      window.location.reload(true)
    }
  }

  return {
    state,
    addEvent,
    getAllEvents,
    deleteOneEvent
  }
}

import { reactive } from 'vue'
// import config from '@/config'

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
      const req = await fetch('api/v1/event/create', {
        mode: 'no-cors',
        method: 'POST',
        body: JSON.stringify(event),
        headers: {
          'content-type': 'application/json'
        }
      })
      const payload = await req.json()
      return payload
    } catch (error) {
      state.hasError = true
      throw new Error(error)
    } finally {
      state.loading = false
    }
  }

  const getAllEvents = async (page, limit) => {
    state.loading = true
    try {
      const req = await fetch(`api/v1/event/?page=${page}&limit=${limit}`)
      const payload = await req.json()
      state.data = payload
      return req
    } catch (error) {
      state.hasError = true
      state.msg = error
      throw new Error(error)
    } finally {
      state.loading = false
      state.hasError = true
    }
  }

  return {
    state,
    addEvent,
    getAllEvents
  }
}

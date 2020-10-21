import config from '@/config'

export default class Services {
  static async get (id) {
    try {
      const req = await fetch(`${config.API_BASE}/api/v1/event/${id}`)
      const payload = req.json()
      return payload
    } catch (error) {
      console.error(error)
    }
  }

  static async all (page, limit) {
    try {
      const req = await fetch(`${config.API_BASE}/api/v1/event/?page=${page}&limit=${limit}`)
      const payload = req.json()
      return payload
    } catch (error) {
      console.error(error)
    }
  }

  static async create (data) {
    const events = {
      title: data.value.title,
      started_at: data.value.start,
      ended_at: data.value.end,
      label: data.value.color,
      description: data.value.description
    }
    try {
      const req = await fetch(`${config.API_BASE}/api/v1/event/create`, {
        method: 'POST',
        body: JSON.stringify(events),
        headers: {
          'content-type': 'application/json'
        }
      })
      const payload = await req.json()
      return payload
    } catch (error) {
      console.error(error)
    }
  }

  static async remove (id) {
    try {
      await fetch(`${config.API_BASE}/api/v1/event/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}

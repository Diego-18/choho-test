import axios from 'axios'

const api = axios.create({
  //   baseURL: 'https://vacancy-tracking.diegochavez-dc.com',
  baseURL: process.env.BACKEND_URL || 'http://localhost:8000',
  withCredentials: true,
})

export default class BackendServices {
  // Provider
  getProviders(data) {
    return api.post('/api/providers', data).then((res) => res.data)
  }

  addProvider(data) {
    return api.post('/api/provider', data)
  }

  editProvider(id, data) {
    return api.put('/api/provider/' + id, data).then((res) => res.data)
  }

  deleteProvider(id) {
    return api.delete('/api/provider/' + id).then((res) => res.data)
  }
  // End Provider
}

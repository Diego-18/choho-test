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

  // Branch
  getBranches(data) {
    return api.post('/api/branches', data).then((res) => res.data)
  }

  addBranch(data) {
    return api.post('/api/branch', data)
  }

  editBranch(id, data) {
    return api.put('/api/branch/' + id, data).then((res) => res.data)
  }

  deleteBranch(id) {
    return api.delete('/api/branch/' + id).then((res) => res.data)
  }
  // End Branch

  // Departments
  getDepartments() {
    return api.post('/api/departments').then((res) => res.data)
  }

  getCities(data) {
    return api.post('/api/cities', data).then((res) => res.data)
  }
  // End Departments
}

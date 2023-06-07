import axios from 'axios'

const api = axios.create({
  //   baseURL: 'https://vacancy-tracking.diegochavez-dc.com',
  baseURL: process.env.BACKEND_URL || 'http://localhost:8000',
  withCredentials: true,
})

export default class BackendServices {
  // Customers
  getCustomers(data) {
    return api.post('/api/customers', data).then((res) => res.data)
  }

  addCustomer(data) {
    return api.post('/api/customer', data)
  }

  editCustomer(id, data) {
    return api.put('/api/customer/' + id, data).then((res) => res.data)
  }

  deleteCustomer(id) {
    return api.delete('/api/customer/' + id).then((res) => res.data)
  }
  // End Customers

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

  // Departments and Cities
  getDepartments() {
    return api.post('/api/departments').then((res) => res.data)
  }

  getCities(data) {
    return api.post('/api/cities', data).then((res) => res.data)
  }
  // End Departments

  // Products
  getProducts(data) {
    return api.post('/api/products', data).then((res) => res.data)
  }

  addProduct(data) {
    return api.post('/api/product', data)
  }

  editProduct(id, data) {
    return api.put('/api/product/' + id, data).then((res) => res.data)
  }

  deleteProduct(id) {
    return api.delete('/api/product/' + id).then((res) => res.data)
  }
  // End Products

  // Orders
  getOrders(data) {
    return api.post('/api/orders', data).then((res) => res.data)
  }

  addOrder(data) {
    return api.post('/api/order', data)
  }

  editOrder(id, data) {
    return api.put('/api/order/' + id, data).then((res) => res.data)
  }

  deleteOrder(id) {
    return api.delete('/api/order/' + id).then((res) => res.data)
  }
  // End Orders
}

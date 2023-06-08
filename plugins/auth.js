export default function ({ $axios, $auth, redirect }) {
  // Always redirect the user to the login page
  // if he gets a 419 or 401 error
  $axios.onError(async (error) => {
    if (error.response.status === 403) {
      window.location = '/login'
    }
    if (error.response.status === 401) {
      await $auth.logout().then(() => {
        window.location = '/login'
      })
    }
    return Promise.reject(error)
  })
}

<template>
  <div class="d-flex align-center">
    <v-menu offset-y :close-on-content-click="false">
      <template #activator="{ on, attrs }">
        <v-icon v-bind="attrs" large color="white" v-on="on">
          mdi mdi-account-circle
        </v-icon>
      </template>
      <div class="menu-user pa-0">
        <v-sheet elevation="10">
          <v-sheet class="primary pa-3 text-left" dark>
            <v-icon>mdi-account-circle</v-icon>
          </v-sheet>

          <div class="pa-3">
            <p class="pb-0 mb-2">
              <v-icon class="second-font"> mdi-account </v-icon>
              <strong>Usuario: </strong> {{ myStorage['name'] }}
            </p>
            <p class="pb-0 mb-2">
              <v-icon class="second-font"> mdi-email </v-icon>
              <strong>Correo: </strong> {{ myStorage['email'] }}
            </p>
            <v-btn block depressed dark class="my-2 primary" @click="logOut()">
              <v-icon dark> mdi-location-exit </v-icon> Cerrar Sesión
            </v-btn>
          </div>
        </v-sheet>
      </div>
    </v-menu>
  </div>
</template>
<script>
import {
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'InfoProfileComponent',
  setup() {
    /** DATA */
    const router = useRouter()
    const { $auth } = useContext()
    const myStorage = ref({
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('userName'),
      email: localStorage.getItem('userEmail'),
    })

    const logOut = async () => {
      window.localStorage.clear()
      await $auth.logout()
      router.push('/login')
    }

    return {
      logOut,
      myStorage,
    }
  },
})
</script>

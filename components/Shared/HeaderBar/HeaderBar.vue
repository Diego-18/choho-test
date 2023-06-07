<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list class="menu-list">
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon> mdi mdi-arrow-right-bold-circle </v-icon>
          </v-list-item-icon>
          <v-list-item-title class="font-weight-medium">
            Inicio
          </v-list-item-title>
        </v-list-item>
        <v-list-group prepend-icon="mdi mdi-tag">
          <template #activator>
            <v-list-item-title class="font-weight-medium">
              Pedidos
            </v-list-item-title>
          </template>
          <v-list-item class="px-0">
            <v-list-item link to="/orders">
              <v-list-item-icon>
                <v-icon class="ml-5">
                  mdi mdi-package-variant-closed-check
                </v-icon>
              </v-list-item-icon>
              <v-list-item-title> Pedidos </v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list-group>

        <v-list-group prepend-icon="mdi mdi-cog">
          <template #activator>
            <v-list-item-title class="font-weight-medium">
              Configuración
            </v-list-item-title>
          </template>
          <v-list-item class="px-0">
            <v-list-item link to="/customers">
              <v-list-item-icon>
                <v-icon class="ml-5"> mdi mdi-account-tie </v-icon>
              </v-list-item-icon>
              <v-list-item-title> Clientes </v-list-item-title>
            </v-list-item>
          </v-list-item>

          <v-list-item class="px-0" link>
            <v-list-item to="/branches">
              <v-list-item-icon>
                <v-icon class="ml-5"> mdi mdi-city </v-icon>
              </v-list-item-icon>
              <v-list-item-title> Sucursales </v-list-item-title>
            </v-list-item>
          </v-list-item>

          <v-list-item class="px-0" link>
            <v-list-item to="/products">
              <v-list-item-icon>
                <v-icon class="ml-5"> mdi mdi-cog </v-icon>
              </v-list-item-icon>
              <v-list-item-title> Productos </v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list-group>

        <v-list-group prepend-icon="mdi mdi-shield-account">
          <template #activator>
            <v-list-item-title class="font-weight-medium">
              Seguridad
            </v-list-item-title>
          </template>
          <v-list-item class="px-0">
            <v-list-item link to="/users">
              <v-list-item-icon>
                <v-icon class="ml-5"> mdi mdi-account-circle </v-icon>
              </v-list-item-icon>
              <v-list-item-title> Usuario </v-list-item-title>
            </v-list-item>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar height="60" app clipped-left dense flat class="cstm_bar">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-btn v-if="$vuetify.theme.dark == false" icon @click="toggleTheme()">
        <v-icon class="mr-1" color="blue-grey darken-4">
          mdi mdi-lightbulb
        </v-icon>
      </v-btn>
      <v-btn v-if="$vuetify.theme.dark" icon @click="toggleTheme()">
        <v-icon class="mr-1" color="yellow darken-4">
          mdi mdi-lightbulb-outline
        </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'HeaderBar',
  setup() {
    /** DATA */
    const nameApp = ref('Work App')
    const drawer = ref(true)
    const { $vuetify } = useContext()
    const isDarkBrowser = ref()

    const toggleTheme = () => {
      $vuetify.theme.dark = !$vuetify.theme.dark
    }

    return {
      drawer,
      toggleTheme,
      isDarkBrowser,
      nameApp,
    }
  },
})
</script>
<style scoped>
.cstm-footer {
  bottom: 0;
  position: fixed;
  padding: 0.5rem 1rem;
}

.cstm_bar {
  background: #0082eb !important;
  color: #fff !important;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2) !important;
}
</style>

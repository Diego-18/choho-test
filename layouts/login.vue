<template>
  <v-app dark>
    <v-main>
      <v-container fluid style="padding: 0px">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoginLayout',
  components: {},

  setup() {
    return {}
  },
})
</script>

<template>
  <v-app dark>
    <v-main>
      <v-container fluid style="padding: 0px">
        <HeaderBar />
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import HeaderBar from '@/components/Shared/HeaderBar/HeaderBar'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    HeaderBar,
  },

  setup() {},
})
</script>

<style>
.link-oferta {
  color: white !important;
  text-decoration: none !important;
}

.card-search {
  position: absolute !important;
  z-index: 100;
  border: 2px solid #0082eb !important;
  margin-top: 0px !important;
}

.subtitle {
  font-size: 0.8rem;
  font-style: normal !important;
}
</style>

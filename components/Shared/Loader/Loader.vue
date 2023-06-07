<template>
  <v-progress-circular
    :size="90"
    :width="7"
    color="primary"
    indeterminate
    class="d-flex justify-center"
  />
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'LoaderComponent',

  setup() {
    return {}
  },
})
</script>
<style>
.v-progress-circular {
  margin: 5rem auto;
}
</style>

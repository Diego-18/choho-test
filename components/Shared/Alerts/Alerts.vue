<template>
  <v-snackbar :color="color" :value="true" absolute center bottom>
    <v-icon>{{ icon }}</v-icon>
    {{ text }}
  </v-snackbar>
</template>
<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AlertComponent',
  props: {
    text: String,
    type: String,
  },

  setup(props, { emit }) {
    const text = ref('')
    const type = ref('')
    const color = ref('')
    const icon = ref('')

    text.value = ref(props.text)
    type.value = ref(props.type)

    type.value === 'error' ? (color.value = 'error') : (color.value = 'primary')

    type.value === 'primary'
      ? (icon.value = 'mdi-checkbox-marked-circle')
      : (icon.value = 'mdi-cancel')

    return {
      color,
      icon,
    }
  },
})
</script>
<style scoped>
.v-alert {
  width: 50%;
  margin: 2rem auto;
}
</style>

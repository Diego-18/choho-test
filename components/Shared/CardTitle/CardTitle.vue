<template>
  <div>
    <v-card-title class="d-flex justify-space-between">
      <div class="mr-2">
        <span class="pt-1">{{ name }} </span> |
        <span class="subtitle">{{ description }}</span>
      </div>
      <div>
        <v-icon>{{ icon }}</v-icon>
      </div>
    </v-card-title>
  </div>
</template>
<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'CardTitleComponent',
  props: {
    page: [],
  },
  setup(props, { emit }) {
    const name = ref(props.page.name)
    const description = ref(props.page.description)
    const icon = ref(props.page.icon)

    return {
      name,
      description,
      icon,
    }
  },
})
</script>

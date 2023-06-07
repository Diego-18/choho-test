<template>
  <v-bottom-sheet v-model="sheetValue" inset>
    <v-sheet class="text-center">
      <div>
        <v-toolbar color="primary" dark>
          <div class="text-h5 text-center justify-space-between">
            <v-icon class="white--text mr-5">
              {{ icon }}
            </v-icon>
            <span>¿Seguro de eliminar este {{ name }}?</span>
          </div>
        </v-toolbar>
        <v-btn class="ma-6 white--text" color="red" @click="sheetClose">
          Cancelar
        </v-btn>
        <v-btn class="ma-6 white--text" color="primary" @click="sheetDelete">
          Eliminar
        </v-btn>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>
<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SheetAlertComponent',
  props: {
    sheet: Boolean,
    name: String,
    icon: String,
    id: Number,
  },
  emits: ['sheetClosed', 'sheetDelete'],

  setup(props, { emit }) {
    const sheetValue = ref('')
    const name = ref('')
    const icon = ref('')
    const id = ref('')

    sheetValue.value = ref(props.sheet)
    name.value = ref(props.name)
    icon.value = ref(props.icon)
    id.value = ref(props.id)

    const sheetClose = () => {
      emit('sheetClosed')
    }

    const sheetDelete = () => {
      emit('sheetDelete', false, props.id)
    }

    return {
      sheetValue,
      sheetClose,
      sheetDelete,
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

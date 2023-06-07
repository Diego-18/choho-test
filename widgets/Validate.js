import { ref } from 'vue'
const requiredField = ref([(v) => !!v || 'Este campo es requerido.'])

const stringRule = ref([
  (v) => {
    const ExpRegSoloNumeros = '[0-9]'
    const pattern = new RegExp(ExpRegSoloNumeros, 'i')
    if (!v.trim()) return 'Este campo es requerido.'
    if (pattern.test(v)) {
      return 'Campo Invalido.'
    }
    return true
  },
])

export { requiredField, stringRule }

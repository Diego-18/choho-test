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

const phoneRule = ref([
  (v) => {
    const ExpRegPhone =
      '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
    const pattern = new RegExp(ExpRegPhone, 'i')
    if (!v.trim() || v.length < 10) {
      return 'Este campo es requerido.'
    }

    if (pattern.test(v)) {
      return 'Este campo debe tener una longitud de 10 números.'
    }

    return true
  },
])

export { requiredField, stringRule, phoneRule }

<template>
  <div>
    <v-card class="ma-5">
      <div class="d-flex justify-between">
        <v-tooltip bottom color="primary" class="">
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              fab
              x-small
              elevation="2"
              @click="backList(true)"
              v-on="on"
              class="mx-5 my-5"
            >
              <v-icon>mdi mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <span>Volver atras</span>
        </v-tooltip>
        <cardTitle :page="page" />
      </div>
      <v-divider />
      <v-form ref="form" fluid>
        <v-card-text>
          <v-card-subtitle
            class="font-weight-bold"
            :value="'Datos de ' + page.name"
          />
          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="name"
                dense
                outlined
                label="* Nombre"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Nombre del producto.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
        <v-card-actions class="px-3 pb-3">
          <v-flex text-right>
            <v-tooltip bottom color="primary">
              <template #activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  v-bind="attrs"
                  small
                  elevation="2"
                  v-on="on"
                  @click="updateProduct"
                >
                  <v-icon>mdi mdi-content-save</v-icon>
                </v-btn>
              </template>
              <span>Guardar</span>
            </v-tooltip>
          </v-flex>
        </v-card-actions>
      </v-form>
      <alerts v-if="showAlert" :text="textAlert" :type="typeAlert" />
    </v-card>
  </div>
</template>
<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'
import BackendService from '@/services/Services'
import { requiredField } from '@/widgets/Validate'
import alerts from '@/components/Shared/Alerts/Alerts'
import { MESSAGE_TYPES } from '@/widgets/Messages'
import cardTitle from '@/components/Shared/CardTitle/CardTitle'

export default defineComponent({
  name: 'ProductComponent',
  components: {
    cardTitle,
    alerts,
  },
  props: {
    product: [],
  },
  emits: ['backList'],

  setup(props, { emit }) {
    const page = ref({
      name: 'Productos',
      namePl: 'Producto',
      description: 'Editar producto',
      icon: 'mdi mdi-cog',
    })
    const backendService = ref(new BackendService())
    const id = ref(props.product.id)
    const name = ref(props.product.name)
    const textAlert = ref('')
    const showAlert = ref(false)
    const typeAlert = ref('')

    const backList = (value) => {
      emit('backList', value, null)
    }

    const updateProduct = async () => {
      if (name.value === '') {
        textAlert.value = 'Verifica que no existan campos obligatorios vacios.'
        showAlert.value = true
        typeAlert.value = MESSAGE_TYPES.ERROR
      } else {
        const data = {
          name: name.value,
        }
        const currentId = id.value

        await backendService.value
          .editProduct(currentId, data)
          .then((response) => {
            emit('backList', false, 'update')
          })
          .catch((error) => {
            showAlert.value = true
            textAlert.value = error.response.data.message
            typeAlert.value = MESSAGE_TYPES.ERROR
          })
          .finally(() => {
            setTimeout(() => {
              showAlert.value = false
            }, 3000)
          })
      }
    }

    return {
      page,
      id,
      textAlert,
      showAlert,
      requiredField,
      alerts,
      typeAlert,
      name,
      backList,
      updateProduct,
    }
  },
})
</script>

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
                v-model="nit"
                dense
                outlined
                label="* NIT"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>NIT del Cliente</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>

            <v-col class="col-6">
              <v-text-field
                v-model="razonSocial"
                dense
                outlined
                label="* Razón Social"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Razón social del Cliente</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-6">
              <v-select
                v-model="typeSelected"
                dense
                outlined
                label="* Tipo"
                :close-on-click="false"
                :close-on-content-click="false"
                item-value="id"
                item-text="name"
                :items="type"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Tipo de Cliente.</span>
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>

            <v-col class="col-6">
              <v-select
                v-model="statusSelected"
                dense
                outlined
                label="Estado"
                :close-on-click="false"
                :close-on-content-click="false"
                item-value="id"
                item-text="name"
                :items="status"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Estado del Cliente.</span>
                  </v-tooltip>
                </template>
              </v-select>
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
                  @click="updateCustomer"
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
  name: 'CustomerComponent',
  components: {
    cardTitle,
    alerts,
  },
  props: {
    customer: [],
  },
  emits: ['backList'],

  setup(props, { emit }) {
    const page = ref({
      name: 'Clientes',
      namePl: 'Cliente',
      description: 'Editar cliente',
      icon: 'mdi mdi-account-tie',
    })
    const backendService = ref(new BackendService())
    const id = ref(props.customer.id)
    const nit = ref(props.customer.nit)
    const razonSocial = ref(props.customer.razon_social)
    const type = ref([
      {
        id: 1,
        name: 'Nacional',
      },
      {
        id: 2,
        name: 'Internacional',
      },
    ])
    const status = ref([
      {
        id: 1,
        name: 'Activo',
      },
      {
        id: 2,
        name: 'Inactivo',
      },
    ])
    const typeSelected = ref(props.customer.type)
    const statusSelected = ref(props.customer.active)
    const textAlert = ref('')
    const showAlert = ref(false)
    const typeAlert = ref('')

    const backList = (value) => {
      emit('backList', value, null)
    }

    const updateCustomer = async () => {
      if (nit.value === '' || razonSocial.value === '') {
        textAlert.value = 'Verifica que no existan campos obligatorios vacios.'
        showAlert.value = true
        typeAlert.value = MESSAGE_TYPES.ERROR
      } else {
        const data = {
          nit: nit.value,
          razon_social: razonSocial.value,
          type: typeSelected.value,
          active: statusSelected.value,
        }
        const currentId = id.value

        await backendService.value
          .editCustomer(currentId, data)
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
      nit,
      razonSocial,
      type,
      status,
      typeSelected,
      statusSelected,
      backList,
      updateCustomer,
    }
  },
})
</script>

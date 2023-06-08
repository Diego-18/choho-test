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
      <v-form ref="form" v-model="valid" fluid>
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
                    <span>NIT de la sucursal.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>

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
                    <span>Nombre de la sucursal.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="phone"
                dense
                outlined
                label="* Teléfono"
                :rules="phoneRule.concat(requiredField)"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Teléfono de la sucursal.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>

            <v-col class="col-6">
              <v-text-field
                v-model="address"
                dense
                outlined
                label="* Dirección"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Dirección de la sucursal.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="col-6">
              <v-select
                v-model="departmentSelected"
                dense
                outlined
                label="* Departamento"
                :close-on-click="false"
                :close-on-content-click="false"
                item-value="id"
                item-text="name"
                :items="itemsDepartments"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Departamento de la sucursal.</span>
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>

            <v-col class="col-6">
              <v-select
                v-model="citySelected"
                dense
                outlined
                label="* Ciudad"
                :close-on-click="false"
                :close-on-content-click="false"
                item-value="id"
                item-text="name"
                :items="itemsCities"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Ciudad de la sucursal.</span>
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
                  small
                  v-bind="attrs"
                  elevation="2"
                  v-on="on"
                  @click="handleSubmit"
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
import { defineComponent, ref, onMounted, watch } from '@nuxtjs/composition-api'
import BackendService from '@/services/Services'
import { requiredField, phoneRule } from '@/widgets/Validate'
import alerts from '@/components/Shared/Alerts/Alerts'
import { MESSAGE_TYPES } from '@/widgets/Messages'
import cardTitle from '@/components/Shared/CardTitle/CardTitle'

export default defineComponent({
  name: 'BranchComponent',
  components: {
    cardTitle,
    alerts,
  },
  emits: ['backList'],

  setup(context, { emit }) {
    const page = ref({
      name: 'Sucursales',
      namePl: 'Sucursal',
      description: 'Crear sucursal',
      icon: 'mdi mdi-city',
    })

    const valid = ref(true)
    const backendService = ref(new BackendService())
    const nit = ref('')
    const name = ref('')
    const phone = ref('')
    const address = ref('')
    const itemsDepartments = ref([])
    const itemsCities = ref([])
    const departmentSelected = ref('')
    const citySelected = ref('')
    const textAlert = ref('')
    const showAlert = ref(false)
    const typeAlert = ref('')
    const items = ref([])
    const dialogBranches = ref(false)

    watch(departmentSelected, (currentValue) => {
      if (currentValue !== '') {
        getCities(currentValue)
      }
    })

    onMounted(() => {
      getDepartments()
    })

    const backList = (value) => {
      emit('backList', value, null)
    }

    const getDepartments = () => {
      backendService.value
        .getDepartments()
        .then((data) => {
          itemsDepartments.value = []

          for (const item of data.data) {
            itemsDepartments.value.push(item)
          }
        })
        .catch((error) => {
          if (error.response.data.status >= 400) {
            showAlert.value = true
            textAlert.value = error.response.data.message
            typeAlert.value = MESSAGE_TYPES.ERROR
          }
        })
        .finally(() => {
          setTimeout(() => {
            showAlert.value = false
          }, 3000)
        })
    }

    const getCities = (department) => {
      const data = {
        department_id: department,
      }
      backendService.value
        .getCities(data)
        .then((response) => {
          itemsCities.value = []

          for (const item of response.data) {
            itemsCities.value.push(item)
          }
        })
        .catch((error) => {
          if (error.response.data.status >= 400) {
            showAlert.value = true
            textAlert.value = error.response.data.message
            typeAlert.value = MESSAGE_TYPES.ERROR
          }
        })
        .finally(() => {
          setTimeout(() => {
            showAlert.value = false
          }, 3000)
        })
    }

    const handleSubmit = () => {
      if (
        nit.value === '' ||
        name.value === '' ||
        phone.value === '' ||
        address.value === '' ||
        departmentSelected === 0 ||
        citySelected === 0
      ) {
        textAlert.value = 'Verifica que no existan campos obligatorios vacios.'
        showAlert.value = true
        typeAlert.value = MESSAGE_TYPES.ERROR
      } else {
        const data = {
          nit: nit.value,
          name: name.value,
          phone: phone.value,
          address: address.value,
          department_id: departmentSelected.value,
          city_id: citySelected.value,
        }

        backendService.value
          .addBranch(data)
          .then((response) => {
            emit('backList', false, 'create')
          })
          .catch((error) => {
            showAlert.value = true
            textAlert.value = error.response.data.message
            typeAlert.value = MESSAGE_TYPES.ERROR
          })
      }
    }

    const closeDialogBranches = (event) => {
      dialogBranches.value = false
      nit.value = ''
      name.value = ''
      phone.value = ''
      address.value = ''
    }

    return {
      page,
      textAlert,
      showAlert,
      typeAlert,
      dialogBranches,
      items,
      requiredField,
      phoneRule,
      valid,
      alerts,
      nit,
      name,
      phone,
      address,
      itemsDepartments,
      departmentSelected,
      itemsCities,
      citySelected,
      backList,
      handleSubmit,
      closeDialogBranches,
    }
  },
})
</script>

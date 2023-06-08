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
                v-model="dateOrder"
                dense
                outlined
                label="* Fecha del Pedido"
                :rules="requiredField"
                type="date"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Fecha del Pedido.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="numOrder"
                dense
                outlined
                label="* Pedido"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Número del Pedido.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>

            <v-col class="col-6">
              <v-text-field
                v-model="prefix"
                dense
                outlined
                label="* Prefijo"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Prefijo del pedido.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="seller"
                dense
                outlined
                label="* Vendedor"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Nombre de la persona que realizo la venta.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>

            <v-col class="col-6">
              <v-select
                v-model="customerSelected"
                dense
                outlined
                label="* Cliente"
                :close-on-click="false"
                :close-on-content-click="false"
                item-value="id"
                item-text="razon_social"
                :items="itemsCustomers"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Cliente que realizo el pedido.</span>
                  </v-tooltip>
                </template>
              </v-select>
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
                    <span>Departamento.</span>
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
                :disabled="departmentSelected === ''"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Ciudad.</span>
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <!-- Detalle -->
          <v-col class="col-12">
            <span class="font-weight-black">Detalle del Pedido:</span>
          </v-col>
          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="profile"
                dense
                outlined
                label="* Perfil"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Perfil del Pedido.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>

            <v-col class="col-6">
              <v-text-field
                v-model="family"
                dense
                outlined
                label="* Familia"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Familia del Pedido.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="group"
                dense
                outlined
                label="* Grupo"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Grupo del Pedido.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>

            <v-col class="col-6">
              <v-text-field
                v-model="subGroup"
                dense
                outlined
                label="* Sub Grupo"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Sub grupo del Pedido.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="col-12">
              <v-textarea
                v-model="description"
                name="input-7-1"
                filled
                label="Descripción:"
                auto-grow
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Descripción del Pedido.</span>
                  </v-tooltip>
                </template>
              </v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="col-6">
              <v-select
                v-model="productSelected"
                dense
                outlined
                label="* Producto"
                :close-on-click="false"
                :close-on-content-click="false"
                item-value="id"
                item-text="name"
                :items="itemsProducts"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Seleccione un Producto</span>
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>

            <v-col class="col-6">
              <v-select
                v-model="IVA"
                dense
                outlined
                label="* Tasa de IVA"
                :close-on-click="false"
                :close-on-content-click="false"
                item-value="percent"
                item-text="name"
                :items="itemsTax"
                :rules="requiredField"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Porcentaje del iva que se aplicara al subtotal</span>
                  </v-tooltip>
                </template>
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="subTotal"
                dense
                outlined
                label="Sub total"
                :rules="requiredField"
                type="number"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Subtotal del pedido.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>

            <v-col class="col-6">
              <v-text-field
                v-model="mountTax"
                dense
                outlined
                label="IVA"
                :rules="requiredField"
                type="number"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Monto de IVA aplicado al subtotal.</span>
                  </v-tooltip>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-6">
              <v-text-field
                v-model="total"
                dense
                outlined
                label="* Total"
                :rules="requiredField"
                type="number"
              >
                <template #prepend>
                  <v-tooltip bottom color="primary">
                    <template #activator="{ on }">
                      <v-icon v-on="on"> mdi mdi-help-circle-outline </v-icon>
                    </template>
                    <span>Total del pedido.</span>
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
                  small
                  v-bind="attrs"
                  elevation="2"
                  v-on="on"
                  @click="updateOrder"
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
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  useContext,
} from '@nuxtjs/composition-api'
import BackendService from '@/services/Services'
import { requiredField } from '@/widgets/Validate'
import alerts from '@/components/Shared/Alerts/Alerts'
import { MESSAGE_TYPES } from '@/widgets/Messages'
import cardTitle from '@/components/Shared/CardTitle/CardTitle'

export default defineComponent({
  name: 'OrderComponent',
  components: {
    cardTitle,
    alerts,
  },
  props: {
    order: [],
  },
  emits: ['backList'],

  setup(props, { emit }) {
    const page = ref({
      name: 'Pedidos',
      namePl: 'Pedido',
      description: 'Crear pedido',
      icon: 'mdi mdi-package-variant-closed-check',
    })

    const { $moment } = useContext()
    const backendService = ref(new BackendService())
    const id = ref(props.order.id)
    const numOrder = ref(props.order.order_number)
    const prefix = ref(props.order.prefix)
    const itemsDepartments = ref([])
    const itemsCustomers = ref([])
    const itemsCities = ref([])
    const itemsProducts = ref([])
    const departmentSelected = ref(props.order.department[0].id)
    const citySelected = ref(props.order.city[0].id)
    const customerSelected = ref(props.order.customer_id)
    const dateOrder = $moment
      .utc(props.order.order_date)
      .local()
      .format('YYYY-MM-DD')
    const seller = ref(props.order.seller)
    const profile = ref(props.order.details.profile)
    const family = ref(props.order.details.family)
    const group = ref(props.order.details.group)
    const subGroup = ref(props.order.details.subgroup)
    const description = ref(props.order.details.description)
    const productSelected = ref(props.order.details.product_id)
    const IVA = ref(props.order.details.type_tax)
    const subTotal = ref(props.order.details.subtotal)
    const countIVA = ref()
    const total = ref(props.order.details.total)
    const textAlert = ref('')
    const showAlert = ref(false)
    const typeAlert = ref('')
    const items = ref([])
    const dialogOrder = ref(false)
    const menu = ref(false)
    const detailOrder = ref([])
    const mountTax = ref(props.order.details.iva)
    const itemsTax = ref([
      {
        name: 'General',
        percent: '0.19',
      },

      {
        name: 'Reducida',
        percent: '0.5',
      },
    ])

    watch(subTotal, (currentValue) => {
      if (currentValue !== '') {
        mountTax.value = currentValue * IVA.value
        total.value = parseInt(currentValue) + parseInt(mountTax.value)
      }
    })

    watch(IVA, (currentValue) => {
      if (currentValue !== '') {
        mountTax.value = subTotal.value * currentValue
        total.value = parseInt(subTotal.value) + parseInt(mountTax.value)
      }
    })

    watch(departmentSelected, (currentValue) => {
      if (currentValue !== '') {
        getCities(currentValue)
      }
    })

    onMounted(() => {
      getDepartments()
      getCustomers()
      getProducts()
      getCities(props.order.department_id)
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

    const getCustomers = () => {
      const dataSearch = {
        select: true,
      }

      backendService.value
        .getCustomers(dataSearch)
        .then((data) => {
          itemsCustomers.value = []

          for (const item of data.data) {
            itemsCustomers.value.push(item)
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

    const getProducts = () => {
      const dataSearch = {
        select: true,
      }

      backendService.value
        .getProducts(dataSearch)
        .then((data) => {
          itemsProducts.value = []

          for (const item of data.data) {
            itemsProducts.value.push(item)
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

    const updateOrder = () => {
      if (
        numOrder.value === '' ||
        prefix.value === '' ||
        seller.value === '' ||
        departmentSelected === 0 ||
        citySelected === 0
      ) {
        textAlert.value = 'Verifica que no existan campos obligatorios vacios.'
        showAlert.value = true
        typeAlert.value = MESSAGE_TYPES.ERROR
      } else {
        const data = {
          order_date: dateOrder,
          order_number: numOrder.value,
          prefix: prefix.value,
          seller: seller.value,
          customer_id: customerSelected.value,
          department_id: departmentSelected.value,
          city_id: citySelected.value,
          user_id: 1,
          detailOrder: {
            profile: profile.value,
            family: family.value,
            group: group.value,
            subgroup: subGroup.value,
            description: description.value,
            product_id: productSelected.value,
            subtotal: subTotal.value,
            iva: mountTax.value,
            total: total.value,
            type_tax: IVA.value,
          },
        }

        const currentId = id.value

        backendService.value
          .editOrder(currentId, data)
          .then((response) => {
            emit('backList', false, 'update')
          })
          .catch((error) => {
            showAlert.value = true
            textAlert.value = error.response.data.message
            typeAlert.value = MESSAGE_TYPES.ERROR
          })
      }
    }

    const closedialogOrder = (event) => {
      dialogOrder.value = false
      numOrder.value = ''
      prefix.value = ''
    }

    return {
      page,
      textAlert,
      showAlert,
      typeAlert,
      dialogOrder,
      items,
      requiredField,
      alerts,
      numOrder,
      prefix,
      seller,
      itemsDepartments,
      itemsCustomers,
      departmentSelected,
      itemsCities,
      citySelected,
      dateOrder,
      backList,
      updateOrder,
      closedialogOrder,
      customerSelected,
      menu,
      profile,
      family,
      group,
      subGroup,
      description,
      itemsProducts,
      productSelected,
      IVA,
      subTotal,
      countIVA,
      total,
      detailOrder,
      mountTax,
      itemsTax,
      id,
    }
  },
})
</script>

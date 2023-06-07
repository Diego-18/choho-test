<template>
  <div>
    <loader v-if="loader" />
    <div v-else>
      <div v-if="viewList">
        <v-card class="ma-5">
          <cardTitle :page="page" />
          <v-divider />
          <v-card-text>
            <div class="d-flex justify-end">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    small
                    elevation="2"
                    v-on="on"
                    @click="newProvider()"
                  >
                    <v-icon>mdi mdi-plus-box-multiple</v-icon>
                  </v-btn>
                </template>
                <span>Nuevo Registro</span>
              </v-tooltip>
            </div>
            <div class="mx-10">
              <v-text-field
                v-model="search"
                v-debounce:700ms="getSearch"
                dense
                append-icon="mdi mdi-magnify"
                label="Buscar Proveedor"
                single-line
                hide-details
              />
            </div>
            <div v-if="items.length > 0">
              <v-simple-table class="ma-5">
                <template #default>
                  <thead>
                    <tr>
                      <th scope="col" class="text-center">ITEM</th>
                      <th scope="col" class="text-center">NOMBRE</th>
                      <th scope="col" class="text-center">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                      <td class="text-center">
                        {{ item.id }}
                      </td>
                      <td class="text-center">
                        {{ item.razon_social }}
                      </td>
                      <td class="text-center">
                        <v-btn
                          elevation="2"
                          color="primary"
                          class="cstm-button mx-2"
                          small
                          @click="editProvider(item)"
                        >
                          <v-icon> mdi-pencil-circle </v-icon>
                        </v-btn>
                        <v-btn
                          elevation="2"
                          color="error"
                          small
                          class="cstm-button mx-2"
                          @click="openDialogDelete(item.id)"
                        >
                          <v-icon> mdi-delete-circle </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <pagination
                :items="linksPaginate"
                :new-page="currentPage"
                @getPagination="getPagination"
              />
            </div>
            <div v-else class="pa-5 text-center">
              <span class="font-weight-black">No existe registro.</span>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div v-else>
        <createProvider v-if="viewCreate" @backList="backList" />
        <editProvider
          v-if="viewUpdate"
          :provider="providerSelected"
          @backList="backList"
        />
      </div>

      <sheetAlerts
        v-if="sheetOpenDelete"
        :id="idSelected"
        :name="page.namePl"
        :icon="page.icon"
        :sheet="sheetOpenDelete"
        @sheetClosed="sheetClose"
        @sheetDelete="sheetDelete"
      />

      <alerts v-if="showAlert" :text="textAlert" :type="typeAlert" />
    </div>
  </div>
</template>
<script>
import { defineComponent, ref, onMounted } from '@nuxtjs/composition-api'
import BackendService from '@/services/Services'
import alerts from '@/components/Shared/Alerts/Alerts'
import { MESSAGE_TYPES } from '@/widgets/Messages'
import sheetAlerts from '@/components/Shared/SheetAlerts/SheetAlerts'
import loader from '@/components/Shared/Loader/Loader'
import pagination from '@/components/Shared/Pagination/Pagination'
import cardTitle from '@/components/Shared/CardTitle/CardTitle'
import createProvider from '@/components/Provider/Provider'
import editProvider from '@/components/Provider/editProvider'

export default defineComponent({
  name: 'ChargesPage',
  components: {
    alerts,
    sheetAlerts,
    loader,
    pagination,
    cardTitle,
    createProvider,
    editProvider,
  },
  setup() {
    const page = ref({
      name: 'Proveedores',
      namePl: 'Proveedor',
      description: 'Listado de proveedores',
      icon: 'mdi mdi-account-tie',
    })

    const backendService = ref(new BackendService())
    const viewList = ref(true)
    const viewCreate = ref(false)
    const viewUpdate = ref(false)
    const dialogDelete = ref(false)
    const textAlert = ref('')
    const showAlert = ref(false)
    const typeAlert = ref('')
    const search = ref('')
    const items = ref([])
    const idSelected = ref('')
    const providerSelected = ref()
    const loader = ref(false)
    const linksPaginate = ref([])
    const pageSelected = ref(1)
    const totalPages = ref(0)
    const countStart = ref(0)
    const countEnd = ref(0)
    const count = ref(1)
    const sheetOpenDelete = ref(false)
    const currentPage = ref(1)

    /** METHODS */
    onMounted(() => {
      setTimeout(() => {}, 4000)
      getProviders(0)
    })

    const newProvider = () => {
      viewList.value = false
      viewCreate.value = true
      viewUpdate.value = false
      showAlert.value = false
    }

    const editProvider = (item) => {
      providerSelected.value = item
      viewList.value = false
      viewCreate.value = false
      viewUpdate.value = true
      showAlert.value = false
    }

    const backList = (value, status) => {
      viewList.value = true
      viewCreate.value = false
      if (status === 'update') {
        showAlert.value = true
        textAlert.value = 'Proveedor actualizado con éxito.'
        typeAlert.value = MESSAGE_TYPES.INFO
        setTimeout(() => {
          showAlert.value = false
        }, 30000)
      } else if (status === 'create') {
        setTimeout(() => {
          showAlert.value = false
        }, 30000)
        showAlert.value = true
        textAlert.value = 'Proveedor registrado con éxito.'
        typeAlert.value = MESSAGE_TYPES.INFO
      }
      getProviders()
    }

    const getProviders = (page = 0, search = '') => {
      loader.value = true
      const dataSearch = {
        search,
        page,
      }

      backendService.value
        .getProviders(dataSearch)
        .then((data) => {
          items.value = []
          page = data.data.current_page
          currentPage.value = page

          const countItems = data.data.per_page
          countStart.value = countItems * page - countItems
          countEnd.value = data.data.to - 1

          for (let i = 0; i < data.data.data.length; i++) {
            items.value.push(data.data.data[i])
          }
          linksPaginate.value = data.data.links
          totalPages.value = data.data.last_page

          if (count.value === 0) {
            count.value = count.value + 1
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
          loader.value = false
          setTimeout(() => {
            showAlert.value = false
          }, 3000)
        })
    }

    const getPagination = (url) => {
      const link = new URL(url)
      const page = link.searchParams.get('page')
      getProviders(page)
    }

    const getSearch = () => {
      getProviders(0, search.value)
    }

    const openDialogDelete = (value) => {
      idSelected.value = ref(value)
      sheetOpenDelete.value = true
    }

    const sheetClose = () => {
      sheetOpenDelete.value = false
    }

    const sheetDelete = (value, id) => {
      backendService.value
        .deleteProvider(id)
        .then((data) => {
          idSelected.value = ''
          items.value = []
          sheetOpenDelete.value = false
          getProviders(0)
          showAlert.value = true
          textAlert.value = 'Proveedor eliminado con éxito.'
          typeAlert.value = MESSAGE_TYPES.INFO
        })
        .catch((error) => {
          sheetOpenDelete.value = false
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

    return {
      page,
      backendService,
      items,
      viewList,
      viewCreate,
      viewUpdate,
      showAlert,
      textAlert,
      typeAlert,
      dialogDelete,
      search,
      idSelected,
      providerSelected,
      linksPaginate,
      pageSelected,
      sheetOpenDelete,
      loader,
      currentPage,
      newProvider,
      editProvider,
      backList,
      getProviders,
      getPagination,
      getSearch,
      openDialogDelete,
      sheetClose,
      sheetDelete,
    }
  },
})
</script>

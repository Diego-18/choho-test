<template>
  <div>
    <v-layout justify-center>
      <div class="text-center ma-5">
        <v-card-actions class="pagination">
          <v-layout row>
            <v-btn-toggle
              v-for="(item, index) in links"
              :key="index"
              class="transparent"
            >
              <v-flex xs12 sm6 class="py-2">
                <v-btn
                  v-if="item.url !== null"
                  class="pa-2 mx-1 page-btn mb-2 mt-2"
                  small
                  :class="pageSelected === parseInt(item.label) ? 'active' : ''"
                  @click="getPagination(item.url)"
                >
                  <span v-if="item.label === '&laquo; Previous'">
                    <v-icon dark>mdi-chevron-left</v-icon>
                  </span>

                  <span v-if="parseInt(item.label)">
                    {{ item.label }}
                  </span>

                  <span v-if="item.label === 'Next &raquo;'">
                    <v-icon dark>mdi-chevron-right</v-icon>
                  </span>
                </v-btn>
              </v-flex>
            </v-btn-toggle>
          </v-layout>
        </v-card-actions>
      </div>
    </v-layout>
  </div>
</template>
<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PaginationComponent',
  props: {
    items: [],
    newPage: Number,
  },
  emits: ['pagination'],

  setup(props, { emit }) {
    const links = ref(props.items)
    const pageSelected = ref(1)
    const page = ref(props.items.current_page)
    const newPage = ref(props.newPage)

    newPage.value > 1
      ? (pageSelected.value = newPage.value)
      : (pageSelected.value = 1)

    const getPagination = (value) => {
      emit('getPagination', value, null)
    }

    return {
      links,
      pageSelected,
      page,
      getPagination,
    }
  },
})
</script>
<style scoped>
.pagination .active {
  background: #0082eb !important;
  color: #fff;
  border: 1px solid #0082eb;
}
</style>

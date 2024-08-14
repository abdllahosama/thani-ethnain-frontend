<template>

  <div class="container-fluid">
    <div class="row">
      <showHeader class="col-12 mt-3"
                  :image="item.image"
                  :icon="'box-open'"
                  :title="item.name"
                  :subData="[
                            {title: $t('products.show.sellingPrice'), value: this.$moneyFormat(item.price) }
                          ]"
                  :buttons="[
                            {title: $t('products.show.modulation'), icon: 'edit', link: path+'/'+$route.params.id+'/edit', role: $user.admin || $user.role.products_edit},
                          ]" />

      <showCard class="col-12"
                :title="$t('products.show.Background')"
                :cloumns="{
                              firstCloum: [
                                {icon: 'box-open', title: $t('products.show.ProductName'), value: item.name},
                                {icon: 'layer-group', title: $t('products.show.ProductRating'), value: item.section, type: 'link', to:'section', link: false},
                                {icon: 'terminal', title: $t('products.show.ProductCode'), value: item.code},
                              ],
                              scondCloum: [
                                {icon: 'gift', title: $t('products.show.ProductType'), value: item.type == 0 ? $t('products.show.product') : $t('products.show.service')},
                                {icon: 'user-tie', title: $t('products.show.supplier'), value: item.supplier, type: 'link', to:'supplier', link: true},
                                {icon: 'barcode', title: $t('products.show.Barcode'), value: item.barcode},
                              ]
                            }" />

      <showCard class="col-12"
                :title="$t('products.show.AccountsInformation')"
                :cloumns="{
                            firstCloum: [
                              {icon: 'user-tie', title: $t('products.show.supplier'), value: item.supplier, type: 'link', to:'supplier', link: true},
                              {icon: 'dollar-sign', title: $t('products.show.cost'), value: this.$moneyFormat(item.cost) },
                            ],
                            scondCloum: [
                              {icon: 'dollar-sign', title: $t('products.show.sellingPrice'), value: this.$moneyFormat(item.price) },
                              {icon: 'dollar-sign', title: $t('products.show.Profit'), value: this.$moneyFormat(item.price - item.cost) },
                            ]
                          }" />
      <productQuantities class="col-12" :items="item.productQuantities ? item.productQuantities : []" v-if="item.track_quantity"/>
      <storesHistories class="col-12"  v-if="item.track_quantity"/>
    </div>
  </div>

</template>
<script>

  import axios from 'axios'

  import showHeader from '@/elements/show/showHeader.vue'
  import showCard from '@/elements/show/showCard.vue'
  import productQuantities from './components/productQuantities.vue'
  import storesHistories from './components/storesHistories.vue'
  export default {
    data() {
      return {
        path: '/products',
        loaded: false,
        item: {
          supplier: null,
          store: null,
          section: null,
          unit: null
        },
        totalPages: 0,
        params: {}
      }
    },
    mounted() {
      this.getItems()
    },
    methods: {
      getItems() {
        var item = this.$database.products.find(el => el.id == this.$route.params.id)
        if (item) {
          this.item = item
        }
        this.loaded = false
        axios.get(this.$linkGnirator(this.path + '/' + this.$route.params.id), { params: this.params }).then(response => {
          this.item = response.data
          this.totalPages = response.data.storesHistories.last_page
          this.currentPage = response.data.storesHistories.current_page
          this.loaded = true
        })
      }
    },
    components: {
      showHeader,
      showCard,
      productQuantities,
      storesHistories
    }
  }

</script>

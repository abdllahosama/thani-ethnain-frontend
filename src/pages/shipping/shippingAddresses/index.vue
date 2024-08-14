<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('shippingAddresses.shippingAddresses')"
                     :description="$t('shippingAddresses.fromHereYouControlTheShippingAddresses')"
                     />
        <indexTable :searchText="$t('shippingAddresses.searchAddress')"
                    :emptyTableText="$t('customers.index.thereAreNoCustomers')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.admin || $user.role.customers_add"
                    :localData="true"
                    :cloumns="[
                      { column: 'customer_id', title: $t('shippingOperations.customerName'),type: 'link',to:'customer',sort: true, link: true },
                      {column: 'address1',  title:$t('shippingAddresses.theAddress')  ,type: 'text'     , sort: true, icon: 'map-marker-alt' },
                      {column: 'mobile',  title:$t('shippingAddresses.mobile')  ,type: 'text'     , sort: true, icon: 'phone' },
                      {column: 'city_id', title:$t('shippingAddresses.city')      ,type: 'link' ,to:'city'    , sort: true, link: false, icon: 'city' },
                      {column: 'options', title:$t('customers.index.actions'), type: 'options', options: [
                          {name: 'show'},
                          {name: 'edit',   role: $user.admin || $user.role.customers_edit},
                          {name: 'delete', role: $user.admin || $user.role.customers_delete},
                      ]}
                    ]"
                    :deleteText="{
                     attention: $t('allerts.Attention'),
                     areYouReallySureToDeleteTheItem: $t('allerts.areYouReallySureToDeleteTheItem'),
                     close: $t('allerts.close'),
                     confirm: $t('allerts.confirm'),
                     loading: $t('allerts.loading'),
                    }" />
      </div>
    </div>
    <importForm v-if="importShow"/>
  </div>

</template>
<script>
  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'
  import importForm from './components/importForm.vue'

  export default {
    data() {
      return {
        path: '/shippingAddresses',
        importShow: false
      }
    },
    methods: {
      importForm() {
        this.importShow = true
      }
    },
    components: {
      indexHeader,
      indexTable,
      importForm
    }
  }

</script>

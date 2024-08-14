<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('manufacturingWithdrawals.ManufacturingWithdrawals')"
                     :description="$t('manufacturingWithdrawals.FromHereYouCanControlManufacturingWithdrawals')" />
        <indexTable :searchText="$t('manufacturingWithdrawals.SearchForAnOperation')"
                    :emptyTableText="$t('manufacturingWithdrawals.ThereAreNoWithdrawalsWithManufacturingProcesses')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="false"
                    :statusSearch="true"
                    :statusValues="[
                      { title: $t('orders.situation'), value: ''},
                      { title: $t('orders.all'), value: ''},
                      { title: $t('invoices.draft'), value: 0 },
                      { title: $t('invoices.approved'), value: 1 },
                    ]"
                    :cloumns="[
                                  {column: 'code',    title: $t('manufacturingWithdrawals.operation') ,type: 'mainLink' , sort: true },
                                  {column: 'manufacturing_operation_id',    title: $t('manufacturingWithdrawals.TheNameOfTheManufacturingProcess') ,type: 'linkInvoice', to:'manufacturingOperation', sort: true, link: true},
                                  {column: 'store_id',    title: $t('manufacturingWithdrawals.storeName'), type: 'link', to:'store', sort: true, link: true},
                                  {column: 'date',    title: $t('manufacturingWithdrawals.theDateOfTheOperation') ,type: 'text' , sort: true },
                                  {column: 'price',    title: $t('manufacturingWithdrawals.price') ,type: 'text' , sort: true },
                                  {column: 'description',    title: $t('manufacturingWithdrawals.thatAbout') ,type: 'text' , sort: true },
                                  {column: 'status', title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                                      {title: $t('invoices.draft'), value: 0, color: 'dark'},
                                      {title: $t('invoices.approved'), value: 1, color: 'success'},
                                    ]
                                  },
                                  {column: 'options', title: $t('manufacturingWithdrawals.settings'), type: 'options', options: [
                                      {name: 'show'},
                                      {name: 'edit',   role: $user.admin || $user.role.manufacturing_operations_edit},
                                      {name: 'file'},
                                      {name: 'printprojectsWithdrawal',   role: true},
                                      {name: 'delete', role: $user.admin || $user.role.manufacturing_operations_edit},
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
  </div>

</template>
<script>

  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'

  export default {
    data() {
      return {
        path: '/manufacturingWithdrawals',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>

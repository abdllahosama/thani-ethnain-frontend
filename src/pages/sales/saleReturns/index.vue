<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('saleReturns.invoices')"
                     :description="$t('saleReturns.fromHereYouCanControlSalesInvoices')" />
        <indexTable :searchText="$t('saleReturns.searchForAnInvoice')"
                    :emptyTableText="$t('saleReturns.thereAreNoBills')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.role.sale_returns_add"
                    :statusSearch="true"
                    :statusValues="[
                                          {title: $t('quotations.situation'), value: ''},
                                          {title: $t('quotations').all, value: ''},
                                          {title: $t('saleReturns').draft, value: 0},
                                          {title: $t('saleReturns').sent, value: 1},
                                          {title: $t('saleReturns').seen, value: 2},
                                          {title: $t('saleReturns').driven, value: 3},
                                          {title: $t('saleReturns').canceled, value: 4},
                                          ]"
                    :cloumns="[
                                           {column: 'code',    title: $t('saleReturns.invoice') ,type: 'mainLink' , sort: true },
                                           {column: 'date',    title: $t('saleReturns.theDateOfTheInvoice') ,type: 'text' , sort: true },
                                           {
                                             column: 'client_type',
                                             title: $t('invoices.customerName'),
                                             type: 'clintLink',
                                             sort: false,
                                           },
                                           {column: 'total',    title: $t('saleReturns.cost') ,type: 'text' , sort: true },
                                           {column: 'rest',    title: $t('saleReturns.balance') ,type: 'text' , sort: true },
                                           {column: 'status',    title: $t('saleReturns.situation') ,type: 'status' , sort: true ,  values: [
                                             {title: $t('saleReturns.draft'), value: 0, color: 'dark'},
                                             {title: $t('saleReturns.sent'), value: 1, color: 'primary'},
                                             {title: $t('saleReturns.seen'), value: 2, color: 'primary'},
                                             {title: $t('saleReturns.driven'), value: 3, color: 'success'},
                                             {title: $t('saleReturns.canceled'), value: 4, color: 'danger'},
                                           ]},
                                           {column: 'options', title: $t('saleReturns.settings'), type: 'options', options: [
                                               {name: 'show'},
                                               {name: 'edit',   role: $user.admin || $user.role.sale_returns_edit},
                                               {name: 'file'},
                                               {name: 'outLink',   role: true},
                                               {name: 'printSaleReturn',   role: true},
                                               {name: 'download',   role: true},
                                               {name: 'delete', role: $user.admin || $user.role.sale_returns_delete},
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
        path: '/saleReturns',
      }
    },
    components: {
      indexHeader,
      indexTable
    }
  }

</script>

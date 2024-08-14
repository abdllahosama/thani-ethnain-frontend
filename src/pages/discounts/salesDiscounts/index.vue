
<template>

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <indexHeader :title="$t('salesDiscounts.salesDiscounts')"
                       :description="$t('salesDiscounts.fromHereYouCanControlThesalesDiscounts')"/>
           <indexTable :searchText="$t('salesDiscounts.FindADiscount')"
                       :emptyTableText="$t('salesDiscounts.thereAreNosalesDiscounts')"
                       :buttonRole="$user.role.sales_payments_add"
                       :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                       :statusSearch="true"
                       :statusValues="[
                          { title: $t('orders.situation'), value: ''},
                          { title: $t('orders.all'), value: ''},
                          { title: $t('invoices.draft'), value: 0 },
                          { title: $t('invoices.approved'), value: 1 },
                       ]"
                       :cloumns="[
                           {column: 'code',    title: $t('salesDiscounts.Discount') ,type: 'mainLink' , sort: true },
                           {column: 'client_type',    title: $t('salesDiscounts.customerName') ,type: 'clintLink', sort: true},
                           {column: 'date',    title: $t('salesDiscounts.date') ,type: 'text' , sort: true },
                           {column: 'description',    title: $t('salesDiscounts').thatsAbout ,type: 'text' , sort: true },
                           {column: 'cost',    title: $t('salesDiscounts.amount') ,type: 'text' , sort: true },
                           {column: 'status', title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                                {title: $t('invoices.draft'), value: 0, color: 'dark'},
                                {title: $t('invoices.approved'), value: 1, color: 'success'},
                              ]
                           },
                           {column: 'options', title: $t('salesDiscounts.settings'), type: 'options', options: [
                               {name: 'show'},
                               {name: 'printSalesDiscount',   role: true},
                               {name: 'edit',   role: $user.admin || $user.role.sales_payments_edit},
                               {name: 'file'},
                               {name: 'delete', role: $user.admin || $user.role.sales_payments_delete},
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
          path: '/salesDiscounts',
  
        }
      },
      components: {
        indexHeader,
        indexTable,
      }
    }
  
  </script>
  
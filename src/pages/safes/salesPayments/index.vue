<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('salesPayments.salesPayments')"
                     :description="$t('salesPayments.fromHereYouCanControlTheSalesPayments')"/>
         <indexTable :searchText="$t('salesPayments.FindABatch')"
                     :emptyTableText="$t('salesPayments.thereAreNoSalesPayments')"
                     :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                     :buttonRole="$user.role.sales_payments_add"
                     :statusSearch="true"
                     :statusValues="[
                        { title: $t('orders.situation'), value: ''},
                        { title: $t('orders.all'), value: ''},
                        { title: $t('invoices.draft'), value: 0 },
                        { title: $t('invoices.approved'), value: 1 },
                      ]"
                     :cloumns="[
                         {column: 'code',    title: $t('salesPayments.batch') ,type: 'mainLink' , sort: true },
                         {column: 'client_type',    title: $t('salesPayments.customerName') ,type: 'clintLink', sort: true},
                         {column: 'safe_id',    title:$t('salesPayments.Treasury'),      type: 'link', to:'safe', sort: true, link: true},
                         {column: 'date',    title: $t('salesPayments.paymentDate') ,type: 'text' , sort: true },
                         {column: 'invoice_id',    title: $t('salesPayments.invoice') ,type: 'linkInvoice', to:'invoice', sort: true, link: true},
                         {column: 'description',    title: $t('salesPayments.thatsAbout') ,type: 'text' , sort: true },
                         {column: 'cost',    title: $t('salesPayments.amount') ,type: 'text' , sort: true },
                         {column: 'status',             title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                            {title: $t('invoices.draft'), value: 0, color: 'dark'},
                            {title: $t('invoices.approved'), value: 1, color: 'success'},
                          ]
                         },
                         {column: 'options', title: $t('salesPayments.settings'), type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.sales_payments_edit},
                             {name: 'file'},
                             {name: 'printSalesPayment',   role: true},
                             {name: 'download',   role: true},
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

  import axios from 'axios'

  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'

  export default {
    data() {
      return {
        path: '/salesPayments',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>

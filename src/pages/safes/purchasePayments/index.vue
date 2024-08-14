<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('purchasePayments.purchasePayments')"
                     :description="$t('purchasePayments.fromHereYouCanControlThePurchasePayments')"/>
         <indexTable :searchText="$t('purchasePayments.FindABatch')"
                     :emptyTableText="$t('purchasePayments.thereAreNoPurchasePayments')"
                     :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                     :buttonRole="$user.role.purchase_payments_add"
                     :statusSearch="true"
                     :statusValues="[
                        { title: $t('orders.situation'), value: ''},
                        { title: $t('orders.all'), value: ''},
                        { title: $t('invoices.draft'), value: 0 },
                        { title: $t('invoices.approved'), value: 1 },
                      ]"
                     :cloumns="[
                         {column: 'code',    title: $t('purchasePayments.Payment') ,type: 'mainLink' , sort: true },
                         {column: 'client_type',    title: $t('purchasePayments.supplierName') ,type: 'clintLink', sort: true},
                         {column: 'safe_id',    title:$t('purchasePayments.Treasury'),      type: 'link', to:'safe', sort: true, link: true},
                         {column: 'date',    title: $t('purchasePayments.paymentDate') ,type: 'text' , sort: true },
                         {column: 'bill_id',    title: $t('purchasePayments.bill') ,type: 'linkInvoice', to:'bill', sort: true, link: true},
                         {column: 'description',    title: $t('purchasePayments.thatsAbout') ,type: 'text' , sort: true },
                         {column: 'cost',    title: $t('purchasePayments.amount') ,type: 'text' , sort: true},
                         {column: 'status',             title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                            {title: $t('invoices.draft'), value: 0, color: 'dark'},
                            {title: $t('invoices.approved'), value: 1, color: 'success'},
                          ]
                         },
                         {column: 'options', title: $t('purchasePayments.settings'), type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.purchase_payments_edit},
                             {name: 'file'},
                             {name: 'printPurchasePayment',   role: true},
                             {name: 'download',   role: true},
                             {name: 'delete', role: $user.admin || $user.role.purchase_payments_delete},
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
        path: '/purchasePayments',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>

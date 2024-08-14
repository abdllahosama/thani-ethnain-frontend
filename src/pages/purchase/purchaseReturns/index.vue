<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
              <indexHeader :title="$t('purchaseReturns.bills')"
                           :description="$t('purchaseReturns.fromHereYouCanControlPurchaseInvoices')" />
               <indexTable :searchText="$t('purchaseReturns.searchForABill')"
                           :emptyTableText="$t('purchaseReturns.thereAreNoBills')"
                           :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                           :buttonRole="$user.role.purchase_returns_add"
                           :statusSearch="true"
                           :statusValues="[
                                                 {title: $t('quotations.situation'), value: ''},
                                                 {title: $t('quotations.all'), value: ''},
                                                 {title: $t('purchaseReturns.open'), value: 0},
                                                 {title: $t('purchaseReturns.driven'), value: 1},
                                                 {title: $t('purchaseReturns.canceled'), value: 2},
                                                 ]"
                           :cloumns="[

                                                  {column: 'code',    title: $t('purchaseReturns.bill') ,type: 'mainLink' , sort: true },
                                                  {column: 'date',    title: $t('purchaseReturns.theDateOfTheInvoice') ,type: 'text' , sort: true },
                                                  {column: 'client_type',    title: $t('bills.supplierName') ,type: 'clintLink', sort: true},
                                                  {column: 'total',    title: $t('purchaseReturns.cost') ,type: 'text' , sort: true },
                                                  {column: 'rest',    title: $t('purchaseReturns.balance') ,type: 'text' , sort: true },
                                                  {column: 'status',    title: $t('purchaseReturns.situation') ,type: 'status' , sort: true ,  values: [
                                                    {title: $t('purchaseReturns.open'), value: 0, color: 'dark'},
                                                    {title: $t('purchaseReturns.driven'), value: 1, color: 'success'},
                                                    {title: $t('purchaseReturns.canceled'), value: 2, color: 'danger'},
                                                  ]},
                                                  {column: 'options', title: $t('purchaseReturns.settings'), type: 'options', options: [
                                                      {name: 'show'},
                                                      {name: 'edit',   role: $user.admin || $user.role.purchase_returns_edit},
                                                      {name: 'file'},
                                                      {name: 'outLink',   role: true},
                                                      {name: 'printPurchaseReturn',   role: true},
                                                      {name: 'download',   role: true},
                                                      {name: 'delete', role: $user.admin || $user.role.purchase_returns_delete},
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
                path: '/purchaseReturns',
            }
        },
        components: {
          indexHeader,
          indexTable,
        }

    };

</script>

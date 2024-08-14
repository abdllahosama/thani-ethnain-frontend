<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('storesWithdrawals.storesWithdrawalsOperations')"
                     :description="$t('storesWithdrawals.fromHereYouCanControlstoresWithdrawalsOperations')" />
        <indexTable :searchText="$t('storesWithdrawals.searchForAnstoresWithdrawalsOperations')"
                    :emptyTableText="$t('storesWithdrawals.thereAreNostoresWithdrawalsOperations')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.role.stores_withdrawals_add"
                    :statusSearch="true"
                    :statusValues="[
                      { title: $t('orders.situation'), value: ''},
                      { title: $t('orders.all'), value: ''},
                      { title: $t('invoices.draft'), value: 0 },
                      { title: $t('invoices.approved'), value: 1 },
                    ]"
                    :cloumns="[
                                  {column: 'code',    title: $t('storesWithdrawals.operation') ,type: 'mainLink' , sort: true },
                                  {column: 'store_id',    title: $t('storesWithdrawals.storeName'), type: 'link', to:'store', sort: true, link: true},
                                  {column: 'date',    title: $t('storesWithdrawals.theDateOfTheOperation') ,type: 'text' , sort: true },
                                  {column: 'description',    title: $t('storesWithdrawals.description') ,type: 'text' , sort: true },
                                  {column: 'status', title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                                        {title: $t('invoices.draft'), value: 0, color: 'dark'},
                                        {title: $t('invoices.approved'), value: 1, color: 'success'},
                                      ]
                                  },
                                  {column: 'options', title: $t('storesWithdrawals.settings'), type: 'options', options: [
                                      {name: 'show'},
                                      {name: 'edit',   role: $user.admin || $user.role.stores_withdrawals_edit},
                                      {name: 'file'},
                                      {name: 'printStoresWithdrawal',   role: true},
                                      {name: 'delete', role: $user.admin || $user.role.stores_withdrawals_delete},
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
        path: '/storesWithdrawals',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>

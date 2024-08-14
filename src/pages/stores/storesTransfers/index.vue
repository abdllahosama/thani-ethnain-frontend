<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('storesTransfers.storesTransfersOperations')"
                     :description="$t('storesTransfers.fromHereYouCanControlStoresTransfersOperations')" />
        <indexTable :searchText="$t('storesTransfers.searchForAnStoresTransfersOperations')"
                    :emptyTableText="$t('storesTransfers.thereAreNostoresTransfersOperations')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.role.stores_transfers_add"
                    :statusSearch="true"
                    :statusValues="[
                        { title: $t('orders.situation'), value: ''},
                        { title: $t('orders.all'), value: ''},
                        { title: $t('invoices.draft'), value: 0 },
                        { title: $t('invoices.approved'), value: 1 },
                    ]"
                    :cloumns="[
                                  {column: 'code',    title: $t('storesTransfers.operation') ,type: 'mainLink' , sort: true },
                                  {column: 'from_store_id',    title: $t('storesTransfers.fromStoreName'), element:'fromStore', type: 'link', to:'store', sort: true, link: true},
                                  {column: 'to_store_id',    title: $t('storesTransfers.toStoreName'), element:'toStore', type: 'link', to:'store', sort: true, link: true},
                                  {column: 'date',    title: $t('storesTransfers.theDateOfTheOperation') ,type: 'text' , sort: true },
                                  {column: 'description',    title: $t('storesTransfers.description') ,type: 'text' , sort: true },
                                  {column: 'status', title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                                        {title: $t('invoices.draft'), value: 0, color: 'dark'},
                                        {title: $t('invoices.approved'), value: 1, color: 'success'},
                                      ]
                                  },
                                  {column: 'options', title: $t('storesTransfers.settings'), type: 'options', options: [
                                      {name: 'show'},
                                      {name: 'edit',   role: $user.admin || $user.role.stores_transfers_edit},
                                      {name: 'file'},
                                      {name: 'printStoresTransfer',   role: true},
                                      {name: 'delete', role: $user.admin || $user.role.stores_transfers_delete},
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
        path: '/storesTransfers',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>

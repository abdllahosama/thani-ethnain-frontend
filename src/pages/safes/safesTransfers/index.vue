<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('safesTransfers.safesTransfers')"
                     :description="$t('safesTransfers.fromHereYouCanControlSafesTransfers')"/>
         <indexTable :searchText="$t('safesTransfers.searchForTransfer')"
                     :emptyTableText="$t('safesTransfers.thereAreNoWithdrawalsOperations')"
                     :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                     :buttonRole="$user.role.safes_transfers_add"
                     :statusSearch="true"
                     :statusValues="[
                        { title: $t('orders.situation'), value: ''},
                        { title: $t('orders.all'), value: ''},
                        { title: $t('invoices.draft'), value: 0 },
                        { title: $t('invoices.approved'), value: 1 },
                     ]"
                     :cloumns="[
                         {column: 'code',    title: $t('safesTransfers.operation') ,type: 'mainLink' , sort: true },
                         {column: 'from_safe_id',    title: $t('safesTransfers.fromSafeTransefrs'), element:'fromSafe' ,type: 'link', to: 'safe', sort: true, link: true},
                         {column: 'to_safe_id',    title: $t('safesTransfers.toSafeTransefrs'), element:'toSafe' ,type: 'link', to: 'safe', sort: true, link: true},
                         {column: 'date',    title: $t('safesTransfers.transferDate') ,type: 'text' , sort: true },
                         {column: 'description',    title: $t('safesTransfers.thatsAbout') ,type: 'text' , sort: true },
                         {column: 'cost',    title: $t('safesTransfers.amount') ,type: 'text' , sort: true },
                         {column: 'status', title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                              {title: $t('invoices.draft'), value: 0, color: 'dark'},
                              {title: $t('invoices.approved'), value: 1, color: 'success'},
                            ]
                         },
                         {column: 'options', title: $t('safesTransfers.settings'), type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.safes_transfers_edit},
                             {name: 'file'},
                             {name: 'printSafesTransfer',   role: true},
                             {name: 'delete', role: $user.admin || $user.role.safes_transfers_delete},
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
        path: '/safesTransfers',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>

<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('safesWithdrawals.safesWithdrawals')"
                     :description="$t('safesWithdrawals.fromHereYouCanControlSafesWithdrawals')"/>
         <indexTable :searchText="$t('safesWithdrawals.searchForWithdrawals')"
                     :emptyTableText="$t('safesWithdrawals.thereAreNoWithdrawalsOperations')"
                     :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                     :buttonRole="$user.role.safes_withdrawals_add"
                     :statusSearch="true"
                     :statusValues="[
                        { title: $t('orders.situation'), value: ''},
                        { title: $t('orders.all'), value: ''},
                        { title: $t('invoices.draft'), value: 0 },
                        { title: $t('invoices.approved'), value: 1 },
                     ]"
                     :cloumns="[
                         {column: 'code',    title: $t('safesWithdrawals.operation') ,type: 'mainLink' , sort: true },
                         {column: 'safe_id',    title:$t('safesWithdrawals.safe'),      type: 'link', to:'safe', sort: true, link: true},
                         {column: 'date',    title: $t('safesWithdrawals.withdrawalsDate') ,type: 'text' , sort: true },
                         {column: 'description',    title: $t('safesWithdrawals.thatsAbout') ,type: 'text' , sort: true },
                         {column: 'cost',    title: $t('safesWithdrawals.amount') ,type: 'text' , sort: true },
                         {column: 'status', title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                              {title: $t('invoices.draft'), value: 0, color: 'dark'},
                              {title: $t('invoices.approved'), value: 1, color: 'success'},
                            ]
                         },
                         {column: 'options', title: $t('safesWithdrawals.settings'), type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.safes_withdrawals_edit},
                             {name: 'file'},
                             {name: 'printSafesWithdrawal',   role: true},
                             {name: 'delete', role: $user.admin || $user.role.safes_withdrawals_delete},
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
        path: '/safesWithdrawals',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>

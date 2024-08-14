<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('safesDeposits.safesDeposits')"
                     :description="$t('safesDeposits.fromHereYouCanControlThesafesDeposits')"/>
         <indexTable :searchText="$t('safesDeposits.SearchForAProcess')"
                     :emptyTableText="$t('safesDeposits.ThereAreCurrentlyNoDeposits')"
                     :emptyTableSubText="$t('safesDeposits.TryAddingSomeAndTryAgain')"
                     :buttonRole="$user.role.safes_deposits_add"
                     :statusSearch="true"
                     :statusValues="[
                        { title: $t('orders.situation'), value: ''},
                        { title: $t('orders.all'), value: ''},
                        { title: $t('invoices.draft'), value: 0 },
                        { title: $t('invoices.approved'), value: 1 },
                     ]"
                     :cloumns="[
                         {column: 'code',       title: $t('safesDeposits.reference') ,      type: 'mainLink' , sort: true },
                         {column: 'safe_id',    title:$t('safesDeposits.Treasury'),      type: 'link', to:'safe', sort: true, link: true},
                         {column: 'date',       title: $t('safesDeposits.date') ,    type: 'text' , sort: true },
                         {column: 'description',title: $t('safesDeposits.thatAbout') ,   type: 'text' , sort: true },
                         {column: 'cost',       title: $t('safesDeposits.amount') ,     type: 'text' , sort: true },
                         {column: 'status', title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                              {title: $t('invoices.draft'), value: 0, color: 'dark'},
                              {title: $t('invoices.approved'), value: 1, color: 'success'},
                            ]
                         },
                         {column: 'options',    title: $t('safesDeposits.settings'),    type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.safes_deposits_edit},
                             {name: 'file'},
                             {name: 'printSafesDeposit',   role: true},
                             {name: 'delete', role: $user.admin || $user.role.safes_deposits_delete},
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
        path: '/safesDeposits',
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>

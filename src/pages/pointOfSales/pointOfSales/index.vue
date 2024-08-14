<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('pointOfSales.pointOfSales')"
                     :description="$t('pointOfSales.pointOfSalesDescription')"/>
         <indexTable :searchText="$t('pointOfSales.FindAPointOfSale')"
                     :emptyTableText="$t('pointOfSales.thereAreNopointOfSales')"
                     :localData="true"
                     :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                     :buttonRole="$user.role.point_of_sales_add"
                     :cloumns="[
                         {column: 'name',         title: $t('pointOfSales.name') ,type: 'text' , sort: true },
                         {column: 'store_id',     title: $t('pointOfSales.store') ,type: 'link', to:'store', sort: true, link: false},
                         {column: 'safe_id',      title: $t('pointOfSales.safe') ,type: 'link', to:'safe', sort: true, link: false},
                         {column: 'balance',      title: $t('pointOfSales.balance') ,type: 'text' , sort: true , disable: !(this.$user.admin || this.$user.role.point_of_sales_show_balance) ? 1 : 0},
                         {column: 'stat',         title: $t('pointOfSales.active')       ,type: 'stat'     , sort: true },
                         {column: 'password',        title: $t('pointOfSales.DeviceCode') ,type: 'text' , sort: true },
                         {column: 'session_number',   title: $t('pointOfSales.SessionNo') ,type: 'text' , sort: true },

                         {column: 'options', title: $t('pointOfSales.settings'), type: 'options', options: [
                             {name: 'pointOfSale'},
                             {name: 'pointOfSaleReport',   role: $user.admin|| $user.role.reports_show, title: 'تقرير المبيعات', icon: 'chart-pie', link:'/salesByItem?session_number= ' +   + '&point_of_sale_id='},
                             {name: 'newSession',   role: $user.admin || $user.role.point_of_sales_edit},
                             {name: 'posLink', role: $site.safesDeposits_allow && ($user.admin ||$user.role.safes_deposits_add), title: $t('safes.DepositToTheSafe'), icon: 'donate', link: '/safesDeposits/create',},
                             {name: 'posLink', role: $site.safesWithdrawals_allow &&($user.admin ||$user.role.safes_withdrawals_add), title: $t('safes.WithdrawalFromTheTreasury'),icon: 'money-bill-alt',link: '/safesWithdrawals/create' },
                             {name: 'posLinkTransefere', role: $site.safesTransfers_allow &&($user.admin ||$user.role.safes_transfers_add), title: $t('safes.TransferFromTheTreasury'),icon: 'suitcase',link: '/safesTransfers/create' },
                             {name: 'edit',   role: $user.admin || $user.role.point_of_sales_edit},
                             {name: 'delete', role: $user.admin || $user.role.point_of_sales_delete},
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
    <changeSession v-if="changePointOfSale"/>

  </div>

</template>
<script>
  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'

  import changeSession from './components/changeSession.vue'

  export default {
    data() {
      return {
        path: '/pointOfSales',
        changePointOfSale: false
      }
    },
    methods: {
      newSession(id) {
        this.changePointOfSale = id;
      },
    },
    components: {
      indexHeader,
      indexTable,
      changeSession,
    }
  }

</script>

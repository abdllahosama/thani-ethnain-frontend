<template>

  <div class="container-fluid">
    <div class="row">
      <showHeader class="col-12 mt-3"
                  :icon="'treasure-chest'"
                  :title="item.name"
                  :stat="item.stat"
                  :statText="item.stat ? $t('safes.show.active') : $t('safes.show.inactive')"
                  :subData="[
                          {title: $t('safes.show.currentBalance'), value: this.$moneyFormat(item.balance) }
                        ]"
                  :buttons="[
                          {title: $t('safes.show.modulation'), icon: 'edit', link: path+'/'+$route.params.id+'/edit', role: $user.admin || $user.role.safes_edit},
                          {title: $t('safes.show.TreasuryStatement'), icon: 'file-chart-pie', link: '/safesAccounts?safe_id=' + $route.params.id, role: $user.admin || $user.role.reports_show},
                        ]" />
      <showBoxs class="col-12" :boxs="[
                        {icon: 'dollar-sign', title: $t('safes.show.currentBalance'), value: $moneyFormat(item.balance), class: 'col-md-3'},
                        {icon: 'credit-card-front', title: $t('safes.show.invoicesCount'), value: item.salesPaymentsCount, class: 'col-md-3'},
                        {icon: 'credit-card-front', title: $t('safes.show.quotationsCount'), value: item.purchasePaymentsCount, class: 'col-md-3'},
                        {icon: 'usd-square', title: $t('safes.show.ordersCount'), value: item.expensesCount, class: 'col-md-3'},
                      ]" />
      <showCard class="col-12"
                :title="'عنوان الخزينة'"
                :cloumns="{
                       firstCloum: [
                         {icon: 'map-marker-alt', title: $t('safes.show.Address'), value: item.address1},
                         {icon: 'location-arrow', title: $t('safes.show.TheSide'), value: item.entity},
                         {icon: 'map-marked', title: $t('safes.show.ZipCode'), value: item.zip},
                         {icon: 'dollar-sign', title: $t('safes.show.Balance'), value: this.$moneyFormat(item.balance)}
                       ],
                       scondCloum: [
                         {icon: 'map-marker-alt', title: $t('safes.show.TheSequel'), value: item.address2},
                         {icon: 'city', title: $t('safes.show.City'), value: item.city},
                         {icon: 'globe-americas', title: $t('safes.show.State'), value: item.country},
                         {icon: 'dollar-sign', title: $t('safes.show.OpeningBalance'), value: this.$moneyFormat(item.opening_balance)},
                       ]
                     }" />
      <salesPayments class="col-lg-12" v-if="$site.salesPayments_allow && ($user.admin || $user.role.sales_payments_show)"/>
      <purchasepayement class="col-lg-12" v-if="$site.purchasePayments_allow && ($user.admin || $user.role.purchase_payments_show)"/>
      <salesCheques class="col-lg-12" v-if="$site.salesCheques_allow && ($user.admin || $user.role.sales_cheques_show)"/>
      <purchaseCheques class="col-lg-12" v-if="$site.purchaseCheques_allow && ($user.admin || $user.role.purchase_cheques_show)"/>
      <expenses class="col-lg-12" v-if="$site.expenses_allow && ($user.admin || $user.role.expenses_show)"/>
      <safesDeposits class="col-lg-12" v-if="$site.safesDeposits_allow && ($user.admin || $user.role.safes_deposits_show)"/>
      <safesWithdrawals class="col-lg-12" v-if="$site.safesWithdrawals_allow && ($user.admin || $user.role.safes_withdrawals_show)"/>
      <fromSafesTransfers class="col-lg-12" v-if="$site.safesTransfers_allow && ($user.admin || $user.role.safes_transfers_show)"/>
      <toSafesTransfers class="col-lg-12" v-if="$site.safesTransfers_allow && ($user.admin || $user.role.safes_transfers_show)"/>
      <employeesWithdrawals class="col-lg-12" v-if="$site.employeesWithdrawals_allow && ($user.admin || $user.role.employees_withdrawals_show)"/>
      <partnersDeposits class="col-lg-12" v-if="$site.partnersDeposits_allow && ($user.admin || $user.role.partners_deposits_show)"/>
      <partnersWithdrawals class="col-lg-12" v-if="$site.partnersWithdrawals_allow && ($user.admin || $user.role.partners_withdrawals_show)"/>
      <accountsDeposits class="col-lg-12" v-if="$site.accountsDeposits_allow && ($user.admin || $user.role.accounts_deposits_show)"/>
      <accountsWithdrawals class="col-lg-12" v-if="$site.accountsWithdrawals_allow && ($user.admin || $user.role.accounts_withdrawals_show)"/>
    </div>
  </div>

</template>
<script>

  import axios from 'axios'

  import showHeader from '@/elements/show/showHeader.vue'
  import showCard from '@/elements/show/showCard.vue'
  import showBoxs from '@/elements/show/showBoxs.vue'

  

  import purchaseCheques from './components/purchaseCheques.vue'
  import purchasepayement from './components/purchasepayement.vue'
  import salesCheques from './components/salesCheques.vue'
  import salesPayments from './components/salesPayments.vue'
  import expenses from './components/expenses.vue'
  import safesDeposits from './components/safesDeposits.vue'

  import fromSafesTransfers from './components/fromSafesTransfers.vue'
  import toSafesTransfers from './components/toSafesTransfers.vue'

  


  import safesWithdrawals from './components/safesWithdrawals.vue'
  import employeesWithdrawals from './components/employeesWithdrawals.vue'
  import partnersDeposits from './components/partnersDeposits.vue'
  import partnersWithdrawals from './components/partnersWithdrawals.vue'
  import accountsDeposits from './components/accountsDeposits.vue'
  import accountsWithdrawals from './components/accountsWithdrawals.vue'





  export default {
    data() {
      return {
        path: '/safes',
        loaded: false,
        item: {}
      }
    },
    mounted() {
      this.getItem()
    },
    methods: {
      getItem() {
        var item = this.$database.safes.find(el => el.id == this.$route.params.id)
        if (item) {
          this.item = item
        }
        axios.get(this.$linkGnirator(this.path + '/' + this.$route.params.id)).then(response => {
          this.item = response.data
          this.loaded = true
        })
      }
    },
    components: {
      showHeader,
      showCard,
      showBoxs,
      purchaseCheques,
      purchasepayement,
      salesCheques,
      salesPayments,
      expenses,
      safesDeposits,
      safesWithdrawals,
      fromSafesTransfers,
      toSafesTransfers,
      employeesWithdrawals,
      partnersDeposits,
      partnersWithdrawals,
      accountsDeposits,
      accountsWithdrawals,
    }
  }

</script>

<template>

  <div class="container-fluid">
    <div class="row">
      <showHeader class="col-12 mt-3"
                  :image="item.image"
                  :icon="'user'"
                  :title="item.name"
                  :stat="item.stat"
                  :statText="item.stat ? $t('customers.show.active') : $t('customers.show.inactive')"
                  :subData="[
                    {title: $t('customers.form.taxIdentificationNumber'), value: item.tax_number}
                  ]"
                  :buttons="[
                    {title: $t('customers.show.modulation'), icon: 'edit', link: path+'/'+$route.params.id+'/edit', role: $user.admin || $user.role.customers_edit},
                    {title: $t('customers.show.ComprehensiveReport'), icon: 'file-chart-pie', link: '/customersDetailsAccounts?customer_id=' + $route.params.id, role: $user.admin || $user.role.reports_show},
                    {title: $t('customers.show.AddABatch'), icon: 'dollar-sign', link: '/salesPayments/create?customer_id=' + $route.params.id, role:$site.salesPayments_allow && ($user.admin|| $user.role.sales_payments_add)},
                    {title: $t('customers.show.AddABid'), icon: 'calculator', link: '/quotations/create?customer_id='+$route.params.id, role: $site.quotations_allow && ($user.admin|| $user.role.quotations_add)},
                    {title: $t('customers.show.AddASalesBill'), icon: 'file-invoice-dollar', link: '/invoices/create?customer_id='+$route.params.id, role: $site.invoices_allow && ($user.admin || $user.role.invoices_add)},
                    {title: $t('customers.show.AddArequest'), icon: 'briefcase', link: '/orders/create?customer_id='+$route.params.id, role: $site.orders_allow && ($user.admin || $user.role.orders_add)},
                  ]"/>

      <showCard class="col-12"
                :title="$t('customers.show.Background')"
                :cloumns="{
                  firstCloum: [
                    {icon: 'user', title: $t('customers.show.CustomerName'), value: item.name},
                    {icon: 'dollar-sign', title: $t('customers.show.Balance'), value: $moneyFormat(item.balance) }
                  ],
                  scondCloum: [
                    {icon: 'dollar-sign', title: $t('customers.show.OpeningBalance'), value: $moneyFormat(item.opening_balance)},
                    {icon: 'toggle-on', title: $t('customers.show.CustomerStatus'), value: item.stat == 1 ? $t('allerts.effective') : $t('allerts.Ineffective')},
                  ]
                }"/>
                

     <showCard class="col-12"
                :title="$t('customers.show.BillingAddress')"
                :cloumns="{
                  firstCloum: [
                    {icon: 'map-marker-alt', title: $t('customers.show.Address'), value: item.address1},
                    {icon: 'location-arrow', title: $t('customers.show.TheSide'), value: item.entity},
                    {icon: 'map-marked', title: $t('customers.show.ZipCode'), value: item.zip},
                  ],
                  scondCloum: [
                    {icon: 'map-marker-alt', title: $t('customers.show.TheSequel'), value: item.address2},
                    {icon: 'city', title: $t('customers.show.City'), value: item.city},
                    {icon: 'globe-americas', title: $t('customers.show.State'), value: item.country},
                  ]
                }"/>

    <showCard class="col-12"
              :title="$t('customers.show.CommunicationInformation')"
              :cloumns="{
                firstCloum: [
                  {icon: 'phone', title: $t('customers.show.MobileNumber'), value: item.mobile2? item.mobile + ' - ' + item.mobile2 : item.mobile},
                ],
                scondCloum: [
                  {icon: 'at', title: $t('customers.show.Email'), value: item.email },
                ]
              }"/>

      <invoices class="col-12" v-if="$site.invoices_allow && ($user.admin || $user.role.invoices_show)"/>
      <bills class="col-12" v-if="$site.bills_allow && ($user.admin || $user.role.bills_show)"/>
      <salesReturns class="col-12" v-if="$site.saleReturns_allow && ($user.admin || $user.role.sale_returns_show)"/>
      <purchaseReturns class="col-12" v-if="$site.purchaseReturns_allow && ($user.admin || $user.role.purchase_returns_show)"/>
      <salesPayments class="col-12" v-if="$site.salesPayments_allow && ($user.admin || $user.role.sales_payments_show)"/>
      <purchasePayement class="col-12" v-if="$site.purchasePayments_allow && ($user.admin || $user.role.purchase_payments_show)"/>
      <salesCheques class="col-12" v-if="$site.salesCheques_allow && ($user.admin || $user.role.sales_cheques_show)"/>
      <purchaseCheques class="col-12" v-if="$site.purchaseCheques_allow && ($user.admin || $user.role.purchase_cheques_show)"/>
      <salesDiscounts class="col-12" v-if="$site.salesDiscounts_allow && ($user.admin || $user.role.sales_discounts_show)"/>
      <purchaseDiscounts class="col-12" v-if="$site.purchaseDiscounts_allow && ($user.admin || $user.role.purchase_discounts_show)"/>
      <salesInstallments class="col-12" v-if="$site.salesInstallments_allow && ($user.admin || $user.role.sales_installments_show)"/>
      <purchaseInstallments class="col-12" v-if="$site.purchaseInstallments_allow && ($user.admin || $user.role.purchase_installments_show)"/>

      <notes class="col-12 col-xl-7"/>
      <contacts class="col-12 col-lg-5"/>
    </div>
  </div>

</template>
<script>

  import axios from 'axios'

  import showHeader from '@/elements/show/showHeader.vue'
  import showCard from '@/elements/show/showCard.vue'
  import notes from './components/notes.vue'
  import contacts from './components/contacts/index.vue'
  import invoices from './components/invoices.vue'
  import bills from './components/bills.vue'
  import salesReturns from './components/salesReturns.vue'
  import purchaseReturns from './components/purchaseReturns.vue'
  import salesPayments from './components/salesPayments.vue'
  import purchasePayement from './components/purchasepayement.vue'
  import salesCheques from './components/salesCheques.vue'
  import purchaseCheques from './components/purchaseCheques.vue'
  import salesDiscounts from './components/salesDiscounts.vue'
  import purchaseDiscounts from './components/purchaseDiscounts.vue'
  import salesInstallments from './components/salesInstallments.vue'
  import purchaseInstallments from './components/purchaseInstallments.vue'




  export default {
    data() {
      return {
        path: '/customers',
        loaded: false,
        item: {}
      }
    },
    mounted() {
      this.getitem()
    },
    methods: {
      getitem() {
        var item = this.$database.customers.find(el => el.id == this.$route.params.id)
        if (item) {this.item = item}
        axios.get(this.$linkGnirator(this.path + '/' + this.$route.params.id)).then(response => {
          this.item = response.data
          this.loaded = true
        })
      },
    },
    components: {
      showHeader,
      showCard,
      notes,
      contacts,
      invoices,
      bills,
      salesReturns,
      purchaseReturns,
      salesPayments,
      purchasePayement,
      salesCheques,
      purchaseCheques,
      salesDiscounts,
      purchaseDiscounts,
      salesInstallments,
      purchaseInstallments
    }
  }

</script>

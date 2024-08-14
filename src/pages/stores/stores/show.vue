<template>
    <div class="container-fluid">
        <div class="row">
          <showHeader class="col-12 mt-3"
                      :icon="'store-alt'"
                      :title="item.name"
                      :subData="[
                        {title: $t('stores.form.theState'), value: item.country},
                        {title: $t('stores.form.city'), value: item.city},
                      ]"
                      :buttons="[
                        {title: $t('stores.show.modulation'), icon: 'edit', link: path+'/'+$route.params.id+'/edit', role: $user.admin || $user.role.stores_edit},
                        {title: $t('stores.show.InventoryOfTheStore'), icon: 'file-chart-pie', link: '/warehouseInventory?store_id=' + $route.params.id, role: $user.admin || $user.role.reports_show},
                      ]"/>
          <showCard class="col-12"
                    :title="$t('stores.show.StoreAddress')"
                    :cloumns="{
                           firstCloum: [
                             {icon: 'map-marker-alt', title: $t('stores.show.Address'), value: item.address1},
                             {icon: 'location-arrow', title: $t('stores.show.TheSide'), value: item.entity},
                             {icon: 'map-marked', title: $t('stores.show.ZipCode'), value: item.zip},
                           ],
                           scondCloum: [
                             {icon: 'map-marker-alt', title: $t('stores.show.TheSequel'), value: item.address2},
                             {icon: 'city', title: $t('stores.show.City'), value: item.city},
                             {icon: 'globe-americas', title: $t('stores.show.State'), value: item.country},
                           ]
                         }" />
          <invoices class="col-12" v-if="$site.invoices_allow && ($user.admin || $user.role.invoices_show)"/>
          <bills class="col-12" v-if="$site.bills_allow && ($user.admin || $user.role.bills_show)"/>
          <salesReturns        class="col-12" v-if="$site.saleReturns_allow && ($user.admin || $user.role.sale_returns_show)"/>
          <purchaseReturns     class="col-12" v-if="$site.purchaseReturns_allow && ($user.admin || $user.role.purchase_returns_show)"/>
          <storesDeposits      class="col-12" v-if="$site.storesDeposits_allow && ($user.admin || $user.role.stores_deposits_show)"/>
          <storesWithdrawals   class="col-12" v-if="$site.storesWithdrawals_allow && ($user.admin || $user.role.stores_withdrawals_show)"/>
          <fromStoresTransfers class="col-12" v-if="$site.storesTransfers_allow && ($user.admin || $user.role.stores_transfers_show)"/>
          <toStoresTransfers   class="col-12" v-if="$site.storesTransfers_allow && ($user.admin || $user.role.stores_transfers_show)"/>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';

    import showHeader from '@/elements/show/showHeader.vue'
    import showCard from '@/elements/show/showCard.vue'

    import salesReturns from './components/salesReturns.vue';
    import purchaseReturns from './components/purchaseReturns.vue';
    import invoices from './components/invoices.vue';
    import bills from './components/bills.vue';
    import storesWithdrawals from './components/storesWithdrawals.vue';
    import storesDeposits from './components/storesDeposits.vue';
    import fromStoresTransfers from './components/fromStoresTransfers.vue';
    import toStoresTransfers from './components/toStoresTransfers.vue';






    export default {
        data() {
            return {
                path: '/stores',
                item: {},
            }
        },
        mounted() {
            this.getItems();
        },
        methods: {
            getItems() {
              var item = this.$database.stores.find(el => el.id == this.$route.params.id)
              if (item) {
                this.item = item
              }
              axios.get(this.$linkGnirator(this.path + '/' + this.$route.params.id))
                  .then(response => {
                      this.item = response.data;
                  });
            }
        },
        components: {
            showHeader,
            showCard,
            invoices,
            bills,
            salesReturns,
            purchaseReturns,
            storesWithdrawals,
            storesDeposits,
            fromStoresTransfers,
            toStoresTransfers,

        }
    };

</script>
<style>
</style>

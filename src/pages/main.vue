<template>
  <div class="container-fluid main-show">
    <mainLoader v-if="!loaded"></mainLoader>

    <div class="row mt-3" v-if="loaded">
      <billsAndPayment
        class="col-12 col-lg-6"
        :items="data.billsAndPayment"
        :lastYierItems="data.billsAndPaymentLastYier"
        v-if="
          $site.reports_allow &&
          (($option.main_elements.find((el) => el.id == 1) && $user.admin) ||
            $user.role.main_elements.find((el) => el.id == 1))
        "
      />

      <urgentActions
        class="col-12 col-lg-6"
        v-if="
          ($option.main_elements.find((el) => el.id == 8) && $user.admin) ||
          $user.role.main_elements.find((el) => el.id == 8)
        "
      />

      <fastStats
        class="col-12"
        :items="data.fastStats"
        :lastMonthItems="data.fastStatsLastMonth"
        v-if="
          $site.reports_allow &&
          (($option.main_elements.find((el) => el.id == 2) && $user.admin) ||
            $user.role.main_elements.find((el) => el.id == 2))
        "
      />

      <customersBalance
        class="col-12 col-lg-6"
        :items="data.customersBalance"
        v-if="
          $site.customers_allow &&
          (($option.main_elements.find((el) => el.id == 14) && $user.admin) ||
            $user.role.main_elements.find((el) => el.id == 14))
        "
      />

      <storeAlerts
        class="col-12 col-lg-6"
        :items="data.storeAlerts"
        v-if="
          $site.stores_allow &&
          (($option.main_elements.find((el) => el.id == 3) && $user.admin) ||
            $user.role.main_elements.find((el) => el.id == 3))
        "
      />

      <theMostActiveClients
        class="col-12 col-lg-6"
        :items="data.theMostActiveClients"
        v-if="
          $site.customers_allow &&
          (($option.main_elements.find((el) => el.id == 10) && $user.admin) ||
            $user.role.main_elements.find((el) => el.id == 10))
        "
      />

      <theHighestExpenses
        class="col-12 col-lg-6"
        :items="data.theHighestExpenses"
        v-if="
          $site.expenses_allow &&
          (($option.main_elements.find((el) => el.id == 9) && $user.admin) ||
            $user.role.main_elements.find((el) => el.id == 9))
        "
      />

      <unpaidInvoices
        class="col-12 col-lg-6"
        :items="data.unpaidInvoices"
        v-if="
          $site.reports_allow &&
          (($option.main_elements.find((el) => el.id == 6) && $user.admin) ||
            $user.role.main_elements.find((el) => el.id == 6))
        "
      />

      <recentInvoices
        class="col-12 col-lg-6"
        :items="data.recentInvoices"
        v-if="
          $site.invoices_allow &&
          (($option.main_elements.find((el) => el.id == 12) && $user.admin) ||
            $user.role.main_elements.find((el) => el.id == 12))
        "
      />

      <!--overview
        class="col-12"
        :items="data.overview"
        v-if="$user.admin || $user.role.reports_show"
      /--> 
      
            <offers class="col-12 col-lg-6" :items="data.offers"

            v-if="
            $site.reports_allow &&
            (
            ($option.main_elements.find(el => el.id == 4) && $user.admin) ||
            ($user.role.main_elements.find(el => el.id == 4))
            )"

            />

            <invoices class="col-12 col-lg-6" :items="data.invoices"

            v-if="
            $site.reports_allow &&
            (
            ($option.main_elements.find(el => el.id == 11) && $user.admin) ||
            ($user.role.main_elements.find(el => el.id == 11))
            )"

            />
            <recentOffers class="col-12 col-lg-6" :items="data.recentOffers"

            v-if="
            $site.invoices_allow &&
            (
            ($option.main_elements.find(el => el.id == 5) && $user.admin) ||
            ($user.role.main_elements.find(el => el.id == 5))
            )"

            />


            <recentOrders class="col-12 col-lg-6" :items="data.recentOrders"

            v-if="
            $site.orders_allow &&
            (
            ($option.main_elements.find(el => el.id == 7) && $user.admin) ||
            ($user.role.main_elements.find(el => el.id == 7))
            )"
            />
           

      <orders class="col-12 col-lg-6" :items="data.orders"

            v-if="
            $site.reports_allow &&
            (
            ($option.main_elements.find(el => el.id == 13) && $user.admin) ||
            ($user.role.main_elements.find(el => el.id == 13))
            )" />
    </div>
  </div>
</template>
<script>
import axios from "axios";

import billsAndPayment from "@/elements/main/billsAndPayment.vue";
import fastStats from "@/elements/main/fastStats.vue";
import invoices from "@/elements/main/invoices.vue";
import offers from "@/elements/main/offers.vue";
import orders from "@/elements/main/orders.vue";
import recentInvoices from "@/elements/main/recentInvoices.vue";
import recentOffers from "@/elements/main/recentOffers.vue";
import recentOrders from "@/elements/main/recentOrders.vue";
import storeAlerts from "@/elements/main/storeAlerts.vue";
import theHighestExpenses from "@/elements/main/theHighestExpenses.vue";
import theMostActiveClients from "@/elements/main/theMostActiveClients.vue";
import unpaidInvoices from "@/elements/main/unpaidInvoices.vue";
import urgentActions from "@/elements/main/urgentActions.vue";
import mainLoader from "@/elements/main/mainLoader.vue";
import customersBalance from "@/elements/main/customersBalance.vue";
import overview from "@/elements/main/overview.vue";

export default {
  data() {
    return {
      loaded: false,
      data: {
        fastStats: {},
      },
    };
  },
  methods: {
    getData() {
      axios.get(this.$linkGnirator("/home")).then((response) => {
        this.loaded = false;

        setTimeout(() => {
          this.data = response.data;
          this.loaded = true;
        }, 10);

        localStorage.homeCashe = JSON.stringify(response.data);
      });
    },
  },
  mounted() {
    var token = localStorage.getItem("token");
    if (token) {
      this.getData();
    }
    if (localStorage.getItem("homeCashe") !== null) {
      this.loaded = false;
      this.loaded = true;
      var data = JSON.parse(localStorage.getItem("homeCashe"));
      this.data = data;
    }
  },
  components: {
    billsAndPayment,
    fastStats,
    invoices,
    offers,
    orders,
    recentInvoices,
    recentOffers,
    recentOrders,
    storeAlerts,
    theHighestExpenses,
    theMostActiveClients,
    unpaidInvoices,
    urgentActions,
    mainLoader,
    customersBalance,
    overview,
  },
};
</script>
<style></style>

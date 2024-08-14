<template>
  <div class="container-fluid">
    <div class="row">
      <showHeader
        class="col-12 mt-3"
        :icon="'treasure-chest'"
        :title="item.name"
        :stat="item.stat"
        :statText="
          item.stat
            ? $t('bankAccounts.show.active')
            : $t('bankAccounts.show.inactive')
        "
        :subData="[
          {
            title: $t('bankAccounts.show.currentBalance'),
            value: this.$moneyFormat(item.balance),
          },
        ]"
        :buttons="[
          {
            title: $t('bankAccounts.show.modulation'),
            icon: 'edit',
            link: path + '/' + $route.params.id + '/edit',
            role: $user.admin || $user.role.safes_edit,
          },
        ]"
      />
      <showBoxs
        class="col-12"
        :boxs="[
          {
            icon: 'dollar-sign',
            title: $t('bankAccounts.show.currentBalance'),
            value: this.$moneyFormat(item.balance),
            class: 'col-md-3',
          },
          {
            icon: 'credit-card-front',
            title: $t('bankAccounts.show.invoicesCount'),
            value: item.salesPaymentsCount,
            class: 'col-md-3',
          },
          {
            icon: 'credit-card-front',
            title: $t('bankAccounts.show.quotationsCount'),
            value: item.purchasePaymentsCount,
            class: 'col-md-3',
          },
          {
            icon: 'usd-square',
            title: $t('bankAccounts.show.ordersCount'),
            value: item.expensesCount,
            class: 'col-md-3',
          },
        ]"
      />
      <showCard
        class="col-12"
        :title="$t('bankAccounts.show.accountInfo')"
        :cloumns="{
          firstCloum: [
            {
              icon: 'dollar-sign',
              title: $t('bankAccounts.show.Balance'),
              value: this.$moneyFormat(item.balance),
            },
          ],
          scondCloum: [
            {
              icon: 'dollar-sign',
              title: $t('bankAccounts.show.OpeningBalance'),
              value: this.$moneyFormat(item.opening_balance),
            },
          ],
        }"
      />
      <salesPayments class="col-lg-12" v-if="$site.salesPayments_allow && ($user.admin || $user.role.sales_payments_show)"/>
      <purchasepayement class="col-lg-12" v-if="$site.purchasePayments_allow && ($user.admin || $user.role.purchase_payments_show)"/>
      <salesCheques class="col-lg-12" v-if="$site.salesCheques_allow && ($user.admin || $user.role.sales_cheques_show)"/>
      <purchaseCheques class="col-lg-12" v-if="$site.purchaseCheques_allow && ($user.admin || $user.role.purchase_cheques_show)"/>
      <expenses class="col-lg-12" v-if="$site.expenses_allow && ($user.admin || $user.role.expenses_show)"/>
      <safesDeposits class="col-lg-12" v-if="$site.safesDeposits_allow && ($user.admin || $user.role.safes_deposits_show)"/>
      <safesWithdrawals class="col-lg-12" v-if="$site.safesWithdrawals_allow && ($user.admin || $user.role.safes_withdrawals_show)"/>
      <fromSafesTransfers class="col-lg-12" v-if="$site.safesTransfers_allow && ($user.admin || $user.role.safes_transfers_show)"/>
      <toSafesTransfers class="col-lg-12" v-if="$site.safesTransfers_allow && ($user.admin || $user.role.safes_transfers_show)"/>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import showHeader from "@/elements/show/showHeader.vue";
import showCard from "@/elements/show/showCard.vue";
import showBoxs from "@/elements/show/showBoxs.vue";



import salesPayments from "./components/salesPayments.vue";
import purchasepayement from "./components/purchasepayement.vue";
import salesCheques from "./components/salesCheques.vue";
import purchaseCheques from "./components/purchaseCheques.vue";
import expenses from "./components/expenses.vue";
import safesDeposits from "./components/safesDeposits.vue";
import safesWithdrawals from "./components/safesWithdrawals.vue";
import fromSafesTransfers from './components/fromSafesTransfers.vue'
import toSafesTransfers from './components/toSafesTransfers.vue'





export default {
  data() {
    return {
      path: "/bankAccounts",
      loaded: false,
      item: {},
    };
  },
  mounted() {
    this.getItem();
  },
  methods: {
    getItem() {
      var item = this.$database.safes.find((el) => el.id == this.$route.params.id);
      if (item) {
        this.item = item;
      }
      axios
        .get(this.$linkGnirator("/safes/" + this.$route.params.id))
        .then((response) => {
          this.item = response.data;
          this.loaded = true;
        });
    },
  },
  components: {
    showHeader,
    showCard,
    showBoxs,
    salesPayments,
    purchasepayement,
    salesCheques,
    purchaseCheques,
    expenses,
    safesDeposits,
    fromSafesTransfers,
    toSafesTransfers,
    safesWithdrawals,
  },
};
</script>

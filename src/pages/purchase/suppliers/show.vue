<template>
  <div class="container-fluid">
    <div class="row">
      <showHeader
        class="col-12 mt-3"
        :image="item.image"
        :icon="'user'"
        :title="item.name"
        :stat="item.stat"
        :statText="
          item.stat
            ? $t('suppliers.show.active')
            : $t('suppliers.show.inactive')
        "
        :subData="[
          {
            title: $t('suppliers.form.taxIdentificationNumber'),
            value: item.tax_number,
          },
        ]"
        :buttons="[
          {
            title: $t('suppliers.show.modulation'),
            icon: 'edit',
            link: path + '/' + $route.params.id + '/edit',
            role: $t('user.admin') || $t('user.role.customers_edit'),
          },
          {
            title: $t('suppliers.show.ComprehensiveReport'),
            icon: 'file-chart-pie',
            link: '/suppliersDetailsAccounts?supplier_id=' + $route.params.id,
            role: $t('user.admin') || $t('user.role.reports_show'),
          },
          {
            title: $t('suppliers.show.AddABatch'),
            icon: 'dollar-sign',
            link: '/purchasePayments/create?supplier_id=' + $route.params.id,
            role:
              $t('site.purchasePayments_allow') &&
              ($t('user.admin') || $t('user.role.purchase_payments_add')),
          },
          {
            title: $t('suppliers.show.AddApurchaseBill'),
            icon: 'file-invoice-dollar',
            link: '/bills/create?supplier_id=' + $route.params.id,
            role:
              $t('site.bills_allow') &&
              ($t('user.admin') || $t('user.role.bills_add')),
          },
          {
            title: $t('suppliers.show.AddARequest'),
            icon: 'briefcase',
            link: '/purchaseorders/create?supplier_id=' + $route.params.id,
            role:
              $t('site.purchaseOrders_allow') &&
              ($t('user.admin') || $t('user.role.purchase_orders_add')),
          },
        ]"
      />

      <div class="col-12">
        <showFile />
      </div>

      <showCard
        class="col-12"
        :title="$t('suppliers.show.Background')"
        :cloumns="{
          firstCloum: [
            { icon: 'user', title: $t('suppliers.show.SupplierName'), value: item.name },
            {
              icon: 'dollar-sign',
              title: $t('suppliers.show.Balance'),
              value: $moneyFormat(( $option.balance_type == 1 ? item.balance * -1 : item.balance )),
            },
          ],
          scondCloum: [
            {
              icon: 'dollar-sign',
              title: $t('suppliers.show.OpeningBalance'),
              value: $moneyFormat(item.opening_balance),
            },
            {
              icon: 'toggle-on',
              title: $t('suppliers.show.SupplierStatus'),
              value: item.stat == 1 ? $t('suppliers.show.effective') : $t('suppliers.show.Ineffective'),
            },
          ],
        }"
      />
      <showCard
        class="col-12"
        :title="'عنوان تحرير الفواتير'"
        :cloumns="{
          firstCloum: [
            { icon: 'map-marker-alt', title: $t('suppliers.show.Address'), value: item.address1 },
            { icon: 'location-arrow', title: $t('suppliers.show.TheSide'), value: item.entity },
            { icon: 'map-marked', title: $t('suppliers.show.ZipCode'), value: item.zip },
          ],
          scondCloum: [
            { icon: 'map-marker-alt', title: $t('suppliers.show.TheSequel'), value: item.address2 },
            { icon: 'city', title: $t('suppliers.show.City'), value: item.city },
            { icon: 'globe-americas', title: $t('suppliers.show.State'), value: item.country },
          ],
        }"
      />
      <showCard
        class="col-12"
        :title="$t('suppliers.show.CommunicationInformation')"
        :cloumns="{
          firstCloum: [
            { icon: 'phone', title: $t('suppliers.show.MobileNumber'), value: item.mobile },
          ],
          scondCloum: [
            { icon: 'at', title: $t('suppliers.show.Email'), value: item.email },
          ],
        }"
      />

      <invoices class="col-12" v-if="$site.invoices_allow && ($user.admin || $user.role.invoices_show)"/>
      <bills class="col-12" v-if="$site.bills_allow && ($user.admin || $user.role.bills_show)"/>
      <salesReturns class="col-12" v-if="$site.saleReturns_allow && ($user.admin || $user.role.sale_returns_show)"/>
      <purchaseReturns class="col-12" v-if="$site.purchaseReturns_allow && ($user.admin || $user.role.purchase_returns_show)"/>
      <salesPayments class="col-12" v-if="$site.salesPayments_allow && ($user.admin || $user.role.sales_payments_show)"/>
      <purchasepayements class="col-12" v-if="$site.purchasePayments_allow && ($user.admin || $user.role.purchase_payments_show)"/>
      <salesCheques class="col-12" v-if="$site.salesCheques_allow && ($user.admin || $user.role.sales_cheques_show)"/>
      <purchaseCheques class="col-12" v-if="$site.purchaseCheques_allow && ($user.admin || $user.role.purchase_cheques_show)"/>
      <salesDiscounts class="col-12" v-if="$site.salesDiscounts_allow && ($user.admin || $user.role.sales_discounts_show)"/>
      <purchaseDiscounts class="col-12" v-if="$site.purchaseDiscounts_allow && ($user.admin || $user.role.purchase_discounts_show)"/>
      <salesInstallments class="col-12" v-if="$site.salesInstallments_allow && ($user.admin || $user.role.sales_installments_show)"/>
      <purchaseInstallments class="col-12" v-if="$site.purchaseInstallments_allow && ($user.admin || $user.role.purchase_installments_show)"/>

      <notes/>
      <contacts/>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import showHeader from "@/elements/show/showHeader.vue";
import showCard from "@/elements/show/showCard.vue";
import notes from "./components/notes.vue";
import contacts from "./components/contacts/index.vue";
import invoices from "./components/invoices.vue";
import bills from "./components/bills.vue";
import salesReturns from "./components/salesReturns.vue";
import purchaseReturns from "./components/purchaseReturns.vue";
import salesPayments from "./components/salesPayments.vue";
import purchasepayements from "./components/purchasepayements.vue";
import purchaseCheques from "./components/purchaseCheques.vue";
import salesCheques from "./components/salesCheques.vue";
import purchaseDiscounts from "./components/purchaseDiscounts.vue";
import salesDiscounts from "./components/salesDiscounts.vue";
import salesInstallments from './components/salesInstallments.vue'
import purchaseInstallments from './components/purchaseInstallments.vue'

import showFile from '@/elements/show/showFile.vue'


export default {
  data() {
    return {
      path: "/suppliers",
      loaded: false,
      item: {},
    };
  },
  mounted() {
    this.getitem();
  },
  methods: {
    getitem() {
      var item = this.$database.suppliers.find(
        (el) => el.id == this.$route.params.id
      );
      if (item) {
        this.item = item;
      }
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.item = response.data;
          this.loaded = true;
          axios
            .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
            .then((response) => {
              this.item = response.data;
              this.loaded = true;
            });
        });
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
    salesPayments,
    purchaseReturns,
    purchasepayements,
    purchaseCheques,
    salesCheques,
    salesDiscounts,
    purchaseDiscounts,
    salesInstallments,
    purchaseInstallments,
    showFile
  },
};
</script>

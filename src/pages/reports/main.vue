<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('mainReport.Reports')"
          :description="
            $t(
              'mainReport.TheReportingPageGivesYouAGlimpseOfWhatIsGoingOnInYourBusiness'
            )
          "
        />
        <div class="row">
          <!-- تقارير لمحه عامه -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/overview'"
            :icon="'tachometer-alt-fastest'"
            :title="'لمحة عامة'"
            :text="'من هنا يمكنك التحكم بتقارير لمحة عامة الخاصة بك'"
          />
          <!-- تقارير المبيعات -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/sales'"
            :icon="'chart-line'"
            :title="$t('mainReport.sales')"
            :text="$t('mainReport.Fromhereyoucancontrolyoursalesreports')"
            v-if="
              ($site.customers_allow ||
                $site.orders_allow ||
                $site.invoices_allow) &&
              ($user.role.available_reports.find(
                (el) =>
                  el.id == 1 ||
                  el.id == 2 ||
                  el.id == 3 ||
                  el.id == 4 ||
                  el.id == 13 ||
                  el.id == 14 ||
                  el.id == 21 ||
                  el.id == 22 ||
                  el.id == 17 ||
                  el.id == 18
              ) ||
                $user.admin)
            "
          />
          <!-- تقارير المشتريات -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/purchases'"
            :icon="'shopping-cart'"
            :title="$t('mainReport.Purchases')"
            :text="$t('mainReport.Fromhereyoucancontrolyourpurchasereports')"
            v-if="
              ($site.suppliers_allow ||
                $site.orders_allow ||
                $site.bills_allow) &&
              ($user.role.available_reports.find(
                (el) =>
                  el.id == 5 ||
                  el.id == 6 ||
                  el.id == 7 ||
                  el.id == 8 ||
                  el.id == 15 ||
                  el.id == 16 ||
                  el.id == 23 ||
                  el.id == 24 ||
                  el.id == 19 ||
                  el.id == 20
              ) ||
                $user.admin)
            "
          />
          <!-- تقارير الخزائن -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/lockers'"
            :icon="'box-open'"
            :title="$t('mainReport.lockers')"
            :text="$t('mainReport.Fromhereyoucancontrolyourlockersreports')"
            v-if="
              ($site.safes_allow ||
                $site.salesPayments_allow ||
                $site.purchasePayments_allow ||
                $site.expenses_allow ||
                $site.safesDeposits_allow ||
                $site.safesWithdrawals_allow ||
                $site.safesTransfers_allow) &&
              ($user.role.available_reports.find(
                (el) =>
                  el.id == 9 ||
                  el.id == 10 ||
                  el.id == 25 ||
                  el.id == 26 ||
                  el.id == 31 ||
                  el.id == 32 ||
                  el.id == 13 ||
                  el.id == 14
              ) ||
                $user.admin)
            "
          />
          <!-- تقارير المخازن -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/stocks'"
            :icon="'store-alt'"
            :title="$t('mainReport.stores')"
            :text="$t('mainReport.Fromhereyoucancontrolyourstoresreports')"
            v-if="
              ($site.stores_allow ||
                $site.storesDeposits_allow ||
                $site.storesWithdrawals_allow ||
                $site.storesTransfers_allow) &&
              ($user.role.available_reports.find(
                (el) =>
                  el.id == 11 ||
                  el.id == 12 ||
                  el.id == 52 ||
                  el.id == 13 ||
                  el.id == 14
              ) ||
                $user.admin)
            "
          />
          <!-- تقارير الموظفين -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/employee'"
            :icon="'users'"
            :title="$t('mainReport.employees')"
            :text="$t('mainReport.Fromhereyoucancontrolyouremployeesreports')"
            v-if="
              ($site.employees_allow ||
                $site.employeesSalaries_allow ||
                $site.employeesIncentives_allow ||
                $site.employeesDeductions_allow ||
                $site.employeesWithdrawals_allow) &&
              ($user.role.available_reports.find(
                (el) => el.id == 42 || el.id == 43 || el.id == 44 || el.id == 45
              ) ||
                $user.admin)
            "
          />
          <!-- تقارير الحسابات الجاريه -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/accountOperation'"
            :icon="'hand-holding-usd'"
            :title="$t('mainReport.accountOperations')"
            :text="
              $t('mainReport.FromhereyoucancontrolyouraccountOperationsreports')
            "
            v-if="
              ($site.accounts_allow ||
                $site.accountsDeposits_allow ||
                $site.accountsWithdrawals_allow) &&
              ($user.role.available_reports.find(
                (el) =>
                  el.id == 34 ||
                  el.id == 35 ||
                  el.id == 36 ||
                  el.id == 37 ||
                  el.id == 31 ||
                  el.id == 32
              ) ||
                $user.admin)
            "
          />
          <!-- تقارير الخصومات -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/discount'"
            :icon="'badge-percent'"
            :title="$t('mainReport.Discounts')"
            :text="$t('mainReport.FromhereyoucancontrolyourDiscountsreports')"
            v-if="
              ($site.salesDiscounts_allow || $site.purchaseDiscounts_allow) &&
              ($user.role.available_reports.find(
                (el) => el.id == 29 || el.id == 30
              ) ||
                $user.admin)
            "
          />
          <!-- تقارير  نقطة البيع -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/pointOfSale'"
            :icon="'cash-register'"
            :title="$t('mainReport.pointOfSale')"
            :text="$t('mainReport.FromhereyoucancontrolyourpointOfSalereports')"
            v-if="
              $site.pointOfSales_allow &&
              ($user.role.available_reports.find((el) => el.id == 0) ||
                $user.admin)
            "
          />
          <!-- تقارير عمليات الشحن -->
          <reportLink
            class="col-md-4 col-lg-2"
            :to="'/shipping'"
            :icon="'shipping-fast'"
            :title="$t('mainReport.shippingOperations')"
            :text="
              $t(
                'mainReport.FromhereyoucancontrolyourshippingOperationsreports'
              )
            "
            v-if="
              $site.cities_allow &&
              ($user.role.available_reports.find(
                (el) => el.id == 13 || el.id == 14
              ) ||
                $user.admin)
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import reportsCard from "@/elements/reports/reportsCard.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
import reportLink from "@/elements/reports/reportLink.vue";
export default {
  data() {
    return {
      path: "/mainReport",
      item: {},
      errors: {
        name: false,
        rate: false,
      },
    };
  },
  components: {
    reportsCard,
    addHeader,
    loading,
    dvider,
    reportLink,
  },
};
</script>

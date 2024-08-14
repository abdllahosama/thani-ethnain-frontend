<template>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <indexHeader :title="$t('mainReport.sales')"
                  :description="$t('mainReport.Fromhereyoucancontrolyoursalesreports')"/>
          </div>
          <!-- تقارير العملاء -->
          <div class="col-md-6">
            <reportsCard
              class="title-form"
              :cardTitle="$t('mainReport.customers')"
              :icon="'fa-user-alt'"
              v-if="
                (
                  $user.role.available_reports.find(
                    (el) => el.id == 1 || el.id == 2 || el.id == 3 || el.id == 4
                  ) || $user.admin
                ) 
                && $site.customers_allow
              "
              :reports="[
                {
                  name: $t('mainReport.TotalCustomerAccount'),
                  link: '/customersTotalAccounts',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 1
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.CustomerAccountDetails'),
                  link: '/customersDetailsAccounts',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 2
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.CustomerAssets'),
                  link: '/customersBalance',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 3
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.CustomerGuide'),
                  link: '/customersGuide',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 4
                    ) || $user.admin,
                },

                {
                  name: $t('mainReport.inactiveClients'),
                  link: '/customersInactive',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 4
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.activeCustomers'),
                  link: '/customersActive',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 4
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.customerTraffic'),
                  link: '/customerTraffic',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 4
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.salesCollection'),
                  link: '/salesCollection',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 4
                    ) || $user.admin,
                },
              ]"
            />
          </div>
          <!-- تقارير المبيعات -->
          <div class="col-md-6">
            <reportsCard
              class=""
              :cardTitle="$t('mainReport.Sales')"
              :icon="'fa-file-invoice-dollar'"
              v-if="
              (
                $user.role.available_reports.find(
                  (el) => el.id == 13 || el.id == 14
                ) || $user.admin
              )&& $site.invoices_allow 
              "
              :reports="[
                {
                  name: $t('mainReport.SalesByInvoice'),
                  link: './salesByInvoice',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 13
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.SalesByProduct'),
                  link: '/salesByItem',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 14
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.customerSalesPrices'),
                  link: '/customerSalesPrices',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 14
                    ) || $user.admin,
                },
                {
                  name: 'المبيعات حسب العميل',
                  link: '/salesByCustomer',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 14
                    ) || $user.admin,
                },
              ]"
            />
            <!-- تقارير طلبات البيع -->
            <reportsCard
              class=""
              :cardTitle="$t('mainReport.SalesOrders')"
              :icon="'fa-briefcase'"
              v-if="
              (
                $user.role.available_reports.find(
                  (el) => el.id == 21 || el.id == 22
                ) || $user.admin
              )&&$site.orders_allow
              "
              :reports="[
                {
                  name: $t('mainReport.OrdersByInvoice'),
                  link: './salesOrdersByInvoice',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 21
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.OrdersByProduct'),
                  link: '/salesOrdersByItem',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 22
                    ) || $user.admin,
                },
              ]"
            />
            <!-- تقارير مرتجعات البيع -->
            <reportsCard
              class=""
              :cardTitle="$t('mainReport.invoices')"
              :icon="'fa-exchange'"
              v-if="
              (
                $user.role.available_reports.find(
                  (el) => el.id == 17 || el.id == 18
                ) || $user.admin
              )&& $site.invoices_allow 
              "
              :reports="[
                {
                  name: $t('mainReport.ReturnedByInvoice'),
                  link: './salesReturnsByInvoice',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 17
                    ) || $user.admin,
                },
                {
                  name: $t('mainReport.ReturnedByProduct'),
                  link: '/salesReturnsByItem',
                  role:
                    $user.role.available_reports.find(
                      (el) => el.id == 18
                    ) || $user.admin,
                },
              ]"
            />
          </div>
      </div>
    </div>
</template>
<script>
import reportsCard from "@/elements/reports/reportsCard.vue";
import indexHeader from'@/elements/index/indexHeader.vue';
export default {
    components: {
    reportsCard,
    indexHeader

  },
}
</script>
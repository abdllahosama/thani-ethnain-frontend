<template>
    <div class="row container-fluid">
      <div class="col-12">
        <indexHeader 
        :title="$t('mainReport.Purchases')"
        :description="$t('mainReport.Fromhereyoucancontrolyourpurchasereports')"/>
        </div>

       <!-- تقارير الموردين -->
       <div class="col-md-6">
        <reportsCard
          class=""
          :cardTitle="$t('mainReport.suppliers')"
          :icon="'fa-user-tie'"
          v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 5 || el.id == 6 || el.id == 7 || el.id == 8
              ) || $user.admin
            ) 
            && 
            $site.suppliers_allow
          "
          :reports="[
            {
              name: $t('mainReport.TotalResourcAccount'),
              link: './suppliersTotalAccounts',
              role:
                $user.role.available_reports.find(
                  (el) => el.id == 5
                ) || $user.admin,
            },
            {
              name: $t('mainReport.VendorAccountDetails'),
              link: '/suppliersDetailsAccounts',
              role:
                $user.role.available_reports.find(
                  (el) => el.id == 6
                ) || $user.admin,
            },
            {
              name: $t('mainReport.suppliersBalances'),
              link: '/suppliersBalance',
              role:
                $user.role.available_reports.find(
                  (el) => el.id == 7
                ) || $user.admin,
            },
            {
              name: $t('mainReport.SupplierGuide'),
              link: '/suppliersGuide',
              role:
                $user.role.available_reports.find(
                  (el) => el.id == 8
                ) || $user.admin,
            },
            {
              name: $t('mainReport.inactiveSuppliers'),
              link: '/suppliersInactive',
              role:
                $user.role.available_reports.find(
                  (el) => el.id == 4
                ) || $user.admin,
            },
            {
              name: $t('mainReport.supplierMovement'),
              link: '/supplierMovement',
              role:
                $user.role.available_reports.find(
                  (el) => el.id == 4
                ) || $user.admin,
            },
            {
              name: $t('mainReport.purchasingCollecting'),
              link: '/purchasingCollecting',
              role:
                $user.role.available_reports.find(
                  (el) => el.id == 4
                ) || $user.admin,
            },
          ]"
        />
       </div>
       <div class="col-md-6">
          <!-- تقارير المشتريات -->
          <reportsCard
            class=""
            :cardTitle="$t('mainReport.purchases')"
            :icon="'fa-shopping-cart'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 15 || el.id == 16
              ) || $user.admin
            )&& $site.bills_allow
            "
            :reports="[
              {
                name: $t('mainReport.PurchasesByInvoice'),
                link: './purchasesByBill',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 15
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.PurchasesByProduct'),
                link: '/purchasesByItem',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 16
                  ) || $user.admin,
              },
            ]"
          />
          <!-- تقارير طلبات الشراء -->
          <reportsCard
            class=""
            :cardTitle="$t('mainReport.Orders')"
            :icon="'fa-briefcase'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 23 || el.id == 24
              ) || $user.admin
            )&& $site.orders_allow
            "
            :reports="[
              {
                name: $t('mainReport.OrdersByInvoice'),
                link: './purchasesOrdersByBill',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 23
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.OrdersByProduct'),
                link: '/purchasesOrdersByItem',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 24
                  ) || $user.admin,
              },
            ]"
          />
        
          <!-- تقارير مرتجعات الشراء -->
          <reportsCard
            class=""
            :cardTitle="$t('mainReport.bills')"
            :icon="'fa-exchange'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 19 || el.id == 20
              ) || $user.admin
            )&&$site.bills_allow
            "
            :reports="[
              {
                name: $t('mainReport.ReturnedByInvoice'),
                link: './purchasesReturnsByBill',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 19
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.ReturnedByProduct'),
                link: '/purchasesReturnsByItem',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 20
                  ) || $user.admin,
              },
            ]"
          />
        </div>
        </div>
</template>
<script>
import reportsCard from "@/elements/reports/reportsCard.vue";
import indexHeader from'@/elements/index/indexHeader.vue';
export default {
    components: {
    reportsCard,
    indexHeader,
  },
}
</script>
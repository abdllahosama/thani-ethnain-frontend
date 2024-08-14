<template>
    <div class="row container-fluid">
      <div class="col-12">
        <indexHeader 
          :title="$t('mainReport.lockers')"
          :description="$t('mainReport.Fromhereyoucancontrolyourlockersreports')"
        />
        </div>
           <!-- تقارير الخزائن -->
           <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.safes')"
            :icon="'fa-treasure-chest'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 9 || el.id == 10
              ) || $user.admin
            ) && $site.safes_allow
            "
            :reports="[
              {
                name: $t('mainReport.TreasuryStatement'),
                link: './safesAccounts',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 9
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.SafeBalances'),
                link: '/safersBalance',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 10
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.safesMove'),
                link: '/safesMove',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 10
                  ) || $user.admin,
              },
            ]"
          />
          
          <!-- تقارير السندات -->
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.Payments')"
            :icon="'fa-credit-card-front'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 25 || el.id == 26
              ) || $user.admin
            )&& 
            ($site.salesPayments_allow ||
                $site.purchasePayments_allow) &&
              ($user.admin ||
                $user.role.sales_payments_show ||
                $user.role.purchase_payments_show)
            "
            :reports="[
              {
                name: $t('mainReport.RecordSalesPayments'),
                link: './paymentHistory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 25
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.RecordPurchasePayments'),
                link: '/purchasePaymentHistory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 26
                  ) || $user.admin,
              },
            ]"
          />
          <!-- تقارير المصروفات -->

          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.Expenses')"
            :icon="'fa-usd-square'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 31 || el.id == 32
              ) || $user.admin
            )&& $site.expenses_allow
            "
            :reports="[
              {
                name: $t('mainReport.ExpenseList'),
                link: './expenseHistory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 31
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.ExpensesByClassification'),
                link: '/expenseByCategory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 32
                  ) || $user.admin,
              },
            ]"
          />

          <!-- تقارير الإيرادات -->

          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.Incomes')"
            :icon="'fa-usd-square'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 31 || el.id == 32
              ) || $user.admin
            )&& $site.expenses_allow
            "
            :reports="[
              {
                name: $t('mainReport.IncomeList'),
                link: './incomeHistory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 31
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.IncomesByClassification'),
                link: '/incomeByCategory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 32
                  ) || $user.admin,
              },
            ]"
          />
           <!-- تقارير عمليات الخزائن -->
           <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.vaultsOperations')"
            :icon="'fa-file-invoice-dollar'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 13 || el.id == 14
              ) || $user.admin
            )&&
            ($site.safesDeposits_allow ||
                $site.safesWithdrawals_allow ||
                $site.safesTransfers_allow) &&
              ($user.admin ||
                $user.role.safes_deposits_show ||
                $user.role.safes_withdrawals_show ||
                $user.role.safes_transfers_show)
            "
            :reports="[
              {
                name: $t('mainReport.depositLockers'),
                link: './safeDepositHistory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 13
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.pullLockers'),
                link: '/safeWithdrawalHistory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 14
                  ) || $user.admin,
              },
               {
                name: $t('mainReport.movingLockers'),
                link: '/safeTransferHistory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 14
                  ) || $user.admin,
              },
            ]"
          />
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
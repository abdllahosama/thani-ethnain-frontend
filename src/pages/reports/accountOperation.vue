<template>
    <div class="row container-fluid">
      <div class="col-12">
        <indexHeader 
          :title="$t('mainReport.accountOperations')"
          :description="$t('mainReport.FromhereyoucancontrolyouraccountOperationsreports')"/>
        </div>
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.accounts')"
            :icon="'fa-coins'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 34 || el.id == 35 || el.id == 36 || el.id == 37
              ) || $user.admin
            )
            && $site.accounts_allow 
            "
            :reports="[
              {
                name: $t('mainReport.totalAccounts'),
                link: './totalAccounts',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 37
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.accountDetails'),
                link: '/accountDetails',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 37
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.accountBalances'),
                link: '/accountBalances',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 37
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.accountsGuide'),
                link: '/accountsGuide',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 37
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.movementAccounts'),
                link: '/movementAccounts',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 37
                  ) || $user.admin,
              },
            ]"
          />
          
           <!-- تقارير  عمليات الحسابات  -->
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.accountOperations')"
            :icon="'fa-hand-holding-usd'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 31 || el.id == 32
              ) || $user.admin
            ) &&
            ($site.accountsDeposits_allow ||
                $site.accountsWithdrawals_allow 
              )
            "
            :reports="[
              {
                name: $t('mainReport.accountTransactionPaymentsRecord'),
                link: './accountTransactionPaymentsRecord',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 31
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.recordWithdrawalsAccountsOperations'),
                link: '/recordWithdrawalsAccountsOperations',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 32
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
    indexHeader
  },
}
</script>
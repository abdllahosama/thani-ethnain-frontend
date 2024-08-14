<template>
    <div class="row container-fluid">
      <div class="col-12">
        <indexHeader 
          :title="$t('mainReport.stores')"
          :description="$t('mainReport.Fromhereyoucancontrolyourstoresreports')"/>
        </div>
          <!-- تقارير المخازن -->
          <reportsCard
            class="col-md-6 "
            :cardTitle="$t('mainReport.stores')"
            :icon="'fa-store-alt'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 11 || el.id == 12
              ) || $user.admin
            ) && $site.stores_allow
            "
            :reports="[
              {
                name: $t('mainReport.InventoryOfStores'),
                link: './warehouseInventory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 11
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.TheValueOfProducts'),
                link: '/ProductsValue',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 12
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.storeAlerts'),
                link: '/productAlerts',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 12
                  ) || $user.admin,
              },
            ]"
          />
          <!-- تقارير المنتجات -->
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.products')"
            :icon="'fa-store-alt'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 52
              ) || $user.admin
            ) && $site.stores_allow 
            "
            :reports="[
              {
                name: $t('mainReport.productAccountStatement'),
                link: './productDetailsAccounts',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 52
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.inactiveProducts'),
                link: '/inactiveProducts',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 4
                  ) || $user.admin,
              },
              
            ]"
          />
          <!-- تقارير ايداع المخازن  -->
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.warehouseDeposit')"
            :icon="'far fa-store-alt'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 13 || el.id == 14
              ) || $user.admin
            )&&
            ($site.storesDeposits_allow ||
                $site.storesWithdrawals_allow ||
                $site.storesTransfers_allow) &&
              ($user.admin ||
                $user.role.stores_deposits_show ||
                $user.role.stores_withdrawals_show ||
                $user.role.stores_transfers_show)
            "
            :reports="[
              {
                name: $t('mainReport.depositPerInvoice'),
                link: './storesDepositsByInvoice',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 13
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.depositProduct'),
                link: '/storesDepositsByItem',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 14
                  ) || $user.admin,
              },
            ]"
          />
              <!-- تقارير سحب المخازن  -->
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.storeWithdrawals')"
            :icon="'fa-file-invoice-dollar'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 13 || el.id == 14
              ) || $user.admin
            )&&
            ($site.storesDeposits_allow ||
                $site.storesWithdrawals_allow ||
                $site.storesTransfers_allow) &&
              ($user.admin ||
                $user.role.stores_deposits_show ||
                $user.role.stores_withdrawals_show ||
                $user.role.stores_transfers_show)
            "
            :reports="[
              {
                name: $t('mainReport.withdrawalAccordingInvoice'),
                link: './storesWithdrawalsByBill',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 13
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.checkoutProduct'),
                link: '/storesWithdrawalsByItem',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 14
                  ) || $user.admin,
              },
            ]"
          />
              <!-- تقارير نقل المخازن  -->
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.warehouseTransfer')"
            :icon="'fa-file-invoice-dollar'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 13 || el.id == 14
              ) || $user.admin
            )&&
            ($site.storesDeposits_allow ||
                $site.storesWithdrawals_allow ||
                $site.storesTransfers_allow) &&
              ($user.admin ||
                $user.role.stores_deposits_show ||
                $user.role.stores_withdrawals_show ||
                $user.role.stores_transfers_show)
            "
            :reports="[
              {
                name: $t('mainReport.transferinvoice'),
                link: './storesTransfersByInvoice',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 13
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.transferProduct'),
                link: '/storesTransfersByItem',
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
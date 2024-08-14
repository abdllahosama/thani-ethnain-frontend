<template>
    <div class="row container-fluid">
      <div class="col-12">
        <indexHeader 
          :title="$t('mainReport.Discounts')"
          :description="$t('mainReport.FromhereyoucancontrolyourDiscountsreports')"/>
        </div>
          <!-- تقارير الخصومات -->
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.Discounts')"
            :icon="'fa-badge-percent'"
            v-if="
            (
              $user.role.available_reports.find(
                (el) => el.id == 29 || el.id == 30
              ) || $user.admin
            )&& 
            ($site.salesDiscounts_allow ||
                $site.purchaseDiscounts_allow) &&
              ($user.admin ||
                $user.role.sales_discounts_show ||
                $user.role.purchase_discounts_show)
            "
            :reports="[
              {
                name: $t('mainReport.RecordSalesDiscounts'),
                link: './discountsHistory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 29
                  ) || $user.admin,
              },
              {
                name: $t('mainReport.RecordPurchaseDiscounts'),
                link: '/purchaseDiscountsHistory',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 30
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
<template>
    <div class="row container-fluid">
      <div class="col-12">
        <indexHeader 
          :title="$t('mainReport.pointOfSale')"
          :description="$t('mainReport.FromhereyoucancontrolyourpointOfSalereports')"/>
        </div>
          <!-- تقارير  نقطة البيع -->
          <reportsCard
            class="col-md-6"
            :cardTitle="$t('mainReport.pointOfSale')"
            :icon="'far fa-cash-register'"
            v-if="
            (
              $user.role.available_reports.find((el) => el.id == 0) ||
              $user.admin
            )&&  $site.pointOfSales_allow
            "
            :reports="[
              {
                name: $t('mainReport.pointOfSale'),
                link: './pointOfSalesOverview',
                role:
                  $user.role.available_reports.find(
                    (el) => el.id == 0
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
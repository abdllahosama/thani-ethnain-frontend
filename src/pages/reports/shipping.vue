<template>
    <div class="row container-fluid">
      <div class="col-12">
        <indexHeader 
          :title="$t('mainReport.shippingOperations')"
          :description="$t('mainReport.FromhereyoucancontrolyourshippingOperationsreports')"/>
        </div>
          <!-- تقارير عمليات الشحن -->
          <reportsCard
          class="col-md-6"
          :cardTitle="$t('mainReport.shippingOperations')"
          :icon="'far fa-shipping-fast'"
          v-if="
          (
            $user.role.available_reports.find(
              (el) => el.id == 13 || el.id == 14
            ) || $user.admin
          )&& $site.cities_allow 
          "
          :reports="[
            {
              name: $t('mainReport.shippingOperations'),
              link: './shippingOperationsByInvoice',
              role:
                $user.role.available_reports.find(
                  (el) => el.id == 13
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
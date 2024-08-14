<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersPurchaseDiscounts.purchaseDiscounts')}}</h4>
        <router-link
          :to="'/purchaseDiscounts/create?customer_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.customersPurchaseDiscounts.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.customersPurchaseDiscounts.FindACheck')"
        :withoutCard="true"
        :filter="{customer_id: $route.params.id}"
        :emptyTableText="
          $parent.$t('components.customersPurchaseDiscounts.thereAreNosalesDiscounts')
        "
        :emptyTableSubText="
          $parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.customersPurchaseDiscounts.Discount'), type: 'mainLink', sort: true },
          {
            column: 'client_type',
            title: $t('components.customersPurchaseDiscounts.customerName'),
            type: 'clintLink',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersPurchaseDiscounts.date'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $parent.$t('components.customersPurchaseDiscounts.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $parent.$t('components.customersPurchaseDiscounts.amount'),
            type: 'text',
            sort: true,
          },
          {
            column: 'options',
            title: $parent.$t('components.customersPurchaseDiscounts.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.sales_payments_edit,
              },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.sales_payments_delete,
              },
            ],
          },
        ]"
        :deleteText="{
          attention: $parent.$t('allerts.Attention'),
          areYouReallySureToDeleteTheItem:
            $parent.$t('allerts.areYouReallySureToDeleteTheItem'),
          close: $parent.$t('allerts.close'),
          confirm: $parent.$t('allerts.confirm'),
          loading: $parent.$t('allerts.loading'),
        }"
      />
    </div>
  </div>
</template>
<script>
import axios from "axios";

import indexTable from "@/elements/index/indexTable.vue";
export default {
  data() {
    return {
      path: "/purchaseDiscounts",
    };
  },
  components: {
    indexTable,
  },
};
</script>

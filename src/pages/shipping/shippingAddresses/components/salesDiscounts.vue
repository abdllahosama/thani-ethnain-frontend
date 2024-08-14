<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.customersSalesDiscounts.salesDiscounts')}}</h4>
        <router-link
          :to="'/salesDiscounts/create?customer_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.customersSalesDiscounts.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.customersSalesDiscounts.FindACheck')"
        :withoutCard="true"
        :emptyTableText="
          $parent.$t('components.customersSalesDiscounts.thereAreNosalesDiscounts')
        "
        :filter="{customer_id: $route.params.id}"
        :emptyTableSubText="
          $parent.$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.customersSalesDiscounts.Discount'), type: 'mainLink', sort: true },
          {
            column: 'client_type',
            title: $t('components.customersSalesDiscounts.customerName'),
            type: 'clintLink',
            sort: true,
          },
          {
            column: 'date',
            title: $parent.$t('components.customersSalesDiscounts.date'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $parent.$t('components.customersSalesDiscounts.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $parent.$t('components.customersSalesDiscounts.amount'),
            type: 'text',
            sort: true,
          },
          {
            column: 'options',
            title: $parent.$t('components.customersSalesDiscounts.settings'),
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
import indexTable from "@/elements/index/indexTable.vue";
export default {
  data() {
    return {
      path: "/salesDiscounts",
    };
  },
  components: {
    indexTable,
  },
};
</script>

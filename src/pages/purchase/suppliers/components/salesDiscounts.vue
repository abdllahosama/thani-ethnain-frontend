<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.suppliers.saleDiscounts')}}</h4>
        <router-link
          :to="'/salesDiscounts/create?supplier_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.suppliers.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.suppliers.searchForACheck')"
        :withoutCard="true"
        :emptyTableText="$t('salesDiscounts.thereAreNosalesDiscounts')"
        :filter="{supplier_id: $route.params.id}"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.suppliers.rival'), type: 'mainLink', sort: true },
          {
            column: 'client_type',
            title: $t('components.suppliers.supplierName'),
            type: 'clintLink',
            sort: true,
          },
          {
            column: 'date',
            title: $t('salesDiscounts.date'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $t('salesDiscounts.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('salesDiscounts.amount'),
            type: 'text',
            sort: true,
          },
          {
            column: 'options',
            title: $t('salesDiscounts.settings'),
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
          attention: $t('allerts.Attention'),
          areYouReallySureToDeleteTheItem:
            $t('allerts.areYouReallySureToDeleteTheItem'),
          close: $t('allerts.close'),
          confirm: $t('allerts.confirm'),
          loading: $t('allerts.loading'),
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

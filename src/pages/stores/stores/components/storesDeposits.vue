<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.stores.Deposits')}}</h4>
        <router-link
          :to="'/storesDeposits/create?store_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.stores.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="
          $t('storesDeposits.searchForAnStoresDepositsOperations')
        "
        :emptyTableText="
          $t('storesDeposits.thereAreNostoresDepositsOperations')
        "
        :filter="{store_id: $route.params.id}"
        :withoutCard="true"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          {
            column: 'code',
            title: $t('storesDeposits.operation'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'store_id',
            title: $t('storesDeposits.storeName'),
            type: 'link',
            to: 'store',
            sort: true,
            link: true,
          },
          {
            column: 'date',
            title: $t('storesDeposits.theDateOfTheOperation'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $t('storesDeposits.description'),
            type: 'text',
            sort: true,
          },
          {
            column: 'options',
            title: $t('storesDeposits.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin || $user.role.stores_deposits_edit,
              },
              { name: 'printStoresDeposit', role: true },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.stores_deposits_delete,
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
      path: "/storesDeposits",
    };
  },
  components: {
    indexTable,
  },
};
</script>

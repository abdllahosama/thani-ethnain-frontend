<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.safes.withdrawalsSafe')}}</h4>
        <router-link
          :to="'/safesWithdrawals/create?safe_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.salesPayments_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.safes.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('safesWithdrawals.searchForWithdrawals')"
        :withoutCard="true"
        :emptyTableText="
          $t('safesWithdrawals.thereAreNoWithdrawalsOperations')
        "
        :filter="{safe_id: $route.params.id}"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          {
            column: 'code',
            title: $t('safesWithdrawals.operation'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'safe_id',
            title: $t('safesWithdrawals.safe'),
            type: 'link',
            to: 'safe',
            sort: true,
            link: true,
          },
          {
            column: 'date',
            title: $t('safesWithdrawals.withdrawalsDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $t('safesWithdrawals.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('safesWithdrawals.amount'),
            type: 'text',
            sort: true
          },
          {
            column: 'options',
            title: $t('safesWithdrawals.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.safes_withdrawals_edit,
              },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.safes_withdrawals_delete,
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
      path: "/safesWithdrawals",
    };
  },
  components: {
    indexTable,
  },
};
</script>

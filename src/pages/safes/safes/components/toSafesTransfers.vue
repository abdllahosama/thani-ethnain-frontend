<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.safes.transfersLockers')}}</h4>
        <router-link
          :to="'/safesTransfers/create?to_safe_id=' + $route.params.id"
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
        :searchText="$t('safesTransfers.searchForTransfer')"
        :emptyTableText="
          $t('safesTransfers.thereAreNoWithdrawalsOperations')
        "
        :filter="{safe_id: $route.params.id}"
        :withoutCard="true"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          {
            column: 'code',
            title: $t('safesTransfers.operation'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'from_safe_id',
            title: $t('safesTransfers.fromSafeTransefrs'),
            element: 'fromSafe',
            type: 'link',
            to: 'safe',
            sort: true,
            link: true,
          },
          {
            column: 'to_safe_id',
            title: $t('safesTransfers.toSafeTransefrs'),
            element: 'toSafe',
            type: 'link',
            to: 'safe',
            sort: true,
            link: true,
          },
          {
            column: 'date',
            title: $t('safesTransfers.transferDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $t('safesTransfers.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('safesTransfers.amount'),
            type: 'text',
            sort: true
          },
          {
            column: 'options',
            title: $t('safesTransfers.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.safes_transfers_edit,
              },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.safes_transfers_delete,
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
      path: "/safesTransfers",
    };
  },
  components: {
    indexTable,
  },
};
</script>

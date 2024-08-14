<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.safes.depositOperationsToSafe')}}</h4>
        <router-link
          :to="'/safesDeposits/create?safe_id=' + $route.params.id"
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
        :searchText="$t('components.safes.processSearch')"
        :emptyTableText="$t('components.safes.thereDepositsMoment')"
        :filter="{safe_id: $route.params.id}"
        :withoutCard="true"
        :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
        :cloumns="[
          { column: 'code', title: $t('components.safes.proces'), type: 'mainLink', sort: true },
          {
            column: 'safe_id',
            title: $t('components.safes.treasury'),
            type: 'link',
            to: 'safe',
            sort: true,
            link: true,
          },
          { column: 'date', title: $t('components.safes.date'), type: 'text', sort: true },
          {
            column: 'description',
            title:$t('components.safes.thatAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('components.safes.cost'),
            type: 'text',
            sort: true
          },
          {
            column: 'options',
            title: $t('components.safes.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.safes_deposits_edit,
              },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.safes_deposits_delete,
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
      path: "/safesDeposits",
    };
  },
  components: {
    indexTable,
  },
};
</script>

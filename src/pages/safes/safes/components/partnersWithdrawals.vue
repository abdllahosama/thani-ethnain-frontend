<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('partnersWithdrawals.WithdrawalOfPartners')}}</h4>
        <router-link
          :to="'/partnersWithdrawals/create?safe_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.partnersWithdrawals_allow &&
            ($user.admin ||
              $user.role.partners_withdrawals_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.safes.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('partnersDeposits.SearchForAnOperation')"
        :emptyTableText="$t('partnersWithdrawals.thereAreNoWithdrawalsOperations')"
        :filter="{safe_id: $route.params.id}"
        :withoutCard="true"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          {
            column: 'code',
            title: $t('partnersDeposits.Process'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'partner_id',
            title: $t('partnersDeposits.PartnerName'),
            type: 'link',
            to: 'partner',
            sort: true,
            link: true,
          },
          {
            column: 'safe_id',
            title: $t('partnersDeposits.Treasury'),
            type: 'link',
            to: 'safe',
            sort: true,
            link: true,
          },
          {
            column: 'date',
            title: $t('partnersDeposits.date'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $t('partnersDeposits.AndThatIsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('partnersDeposits.cost'),
            type: 'text',
            sort: true,
          },

          {
            column: 'options',
            title: $t('partnersDeposits.actions'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin || $user.role.sales_payments_edit,
              },
              { name: 'printSalesPayment', role: true },
              { name: 'download', role: true },
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
      path: "/partnersWithdrawals",
    };
  },
  components: {
    indexTable,
  },
};
</script>

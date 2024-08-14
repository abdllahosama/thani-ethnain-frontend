<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('accountsDeposits.accountsDeposits')}}</h4>
        <router-link
          :to="'/accountsDeposits/create?safe_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.accountsDeposits_allow &&
            ($user.admin ||
              $user.role.accounts_deposits_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.safes.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('accountsDeposits.SearchForAnOperation')"
        :emptyTableText="$t('accountsDeposits.ThereAreCurrentlyNoDeposits')"
        :filter="{safe_id: $route.params.id}"
        :withoutCard="true"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          {
            column: 'code',
            title: $t('accountsDeposits.Process'),
            type: 'mainLink',
            sort: true,
          },
          {
            column: 'account_id',
            title: $t('accountsDeposits.accountName'),
            type: 'link',
            to: 'account',
            sort: true,
            link: true,
          },
          {
            column: 'safe_id',
            title: $t('accountsDeposits.Treasury'),
            type: 'link',
            to: 'safe',
            sort: true,
            link: true,
          },
          {
            column: 'date',
            title: $t('accountsDeposits.date'),
            type: 'text',
            sort: true,
          },
          {
            column: 'description',
            title: $t('accountsDeposits.AndThatIsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('accountsDeposits.cost'),
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
                $user.admin || $user.role.accounts_deposits_edit,
              },
              { name: 'printSalesPayment', role: true },
              { name: 'download', role: true },
              {
                name: 'delete',
                role:
                $user.admin ||
                $user.role.accounts_deposits_delete,
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
      path: "/accountsDeposits",
    };
  },
  components: {
    indexTable,
  },
};
</script>

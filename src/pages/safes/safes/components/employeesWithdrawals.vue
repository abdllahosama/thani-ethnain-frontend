<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.safes.staffDraws')}}</h4>
        <router-link
          :to="'/employeesWithdrawals/create?safe_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.employeesWithdrawals_allow &&
            ($user.admin ||
              $user.role.employees_withdrawals_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.safes.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.safes.searchForAWithdrawal')"
        :emptyTableText="$t('employeesWithdrawals.ThereAreNoWithdrawals')"
        :filter="{safe_id: $route.params.id}"
        :withoutCard="true"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.safes.Withdrawal'), type: 'mainLink', sort: true },
          {column: 'employee_id', title: $t('employeesWithdrawals.EmployeesName'), to: 'employee', type: 'link', sort: true, link: true },
          {
            column: 'safe_id',
            title: $t('employeesWithdrawals.Treasury'),
            type: 'link',
            to: 'safe',
            sort: true,
          },
          {
            column: 'date',
            title: $t('employeesWithdrawals.date'),
            type: 'text',
            sort: true
          },
          {
            column: 'cost',
            title: $t('employeesWithdrawals.cost'),
            type: 'text',
            sort: true
          },
          {
            column: 'description',
            title: $t('employeesWithdrawals.thatsAbout'),
            type: 'text',
            sort: true,
          },
          { column: 'notes', title: $t('employeesWithdrawals.note'), type: 'text', sort: true },

          {
            column: 'options',
            title: $t('expenses.settings'),
            type: 'options',
            options: [
              { name: 'show' },
              {
                name: 'edit',
                role:
                  $user.admin ||
                  $user.role.expenses_edit,
              },
              { name: 'print', role: true },
              { name: 'download', role: true },
              {
                name: 'delete',
                role:
                  $user.admin ||
                  $user.role.expenses_delete,
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
      path: "/employeesWithdrawals",
    };
  },
  components: {
    indexTable,
  },
};
</script>

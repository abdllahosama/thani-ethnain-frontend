<template>
  <div>
    <div class="card">
      <div class="card-header">
        <h4 class="card-header-title">{{$t('components.bankaccounts.expenses')}}</h4>
        <router-link
          :to="'/expenses/create?safe_id=' + $route.params.id"
          class="btn btn-sm btn-primary"
          v-if="
            $parent.item.stat == 1 &&
            $site.expenses_allow &&
            ($user.admin ||
              $user.role.sales_payments_add)
          "
        >
          <i class="fas fa-plus"></i> {{$t('components.bankaccounts.addition')}}
        </router-link>
      </div>
      <indexTable
        :searchText="$t('components.bankaccounts.searchMoney')"
        :emptyTableText="$t('expenses.thereAreNoExpenses')"
        :filter="{safe_id: $route.params.id}"
        :withoutCard="true"
        :emptyTableSubText="
          $t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')
        "
        :cloumns="[
          { column: 'code', title: $t('components.bankaccounts.expense'), type: 'mainLink', sort: true },
          { column: 'safe_id',            title:$t('expenses.Treasury'),      type: 'link', to:'safe', sort: true, link: true},
          {
            column: 'date',
            title: $t('expenses.expenseDate'),
            type: 'text',
            sort: true,
          },
          {
            column: 'expense_section_id',
            title: $t('expenses.section'),
            type: 'link',
            to: 'expenseSection',
            sort: true,
            link: false,
          },
          {
            column: 'description',
            title: $t('expenses.thatsAbout'),
            type: 'text',
            sort: true,
          },
          {
            column: 'notes',
            title: $t('expenses.note'),
            type: 'text',
            sort: true,
          },
          {
            column: 'cost',
            title: $t('expenses.amount'),
            type: 'text',
            sort: true
          },

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
      path: "/expenses",
    };
  },
  components: {
    indexTable,
  },
};
</script>

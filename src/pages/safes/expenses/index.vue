<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('expenses.expenses')"
                     :description="$t('expenses.fromHereYouCanControlTheExpenses')"
                     />
         <indexTable :searchText="$t('expenses.SearchForAllowance')"
                     :emptyTableText="$t('expenses.thereAreNoExpenses')"
                     :buttonRole="$user.role.expenses_add"
                     :statusSearch="true"
                     :statusValues="[
                        { title: $t('orders.situation'), value: ''},
                        { title: $t('orders.all'), value: ''},
                        { title: $t('invoices.draft'), value: 0 },
                        { title: $t('invoices.approved'), value: 1 },
                      ]"
                     :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                     :cloumns="[
                         {column: 'code',               title: $t('expenses.PerDiem'),type: 'mainLink',sort: true,},
                         {column: 'safe_id',            title:$t('expenses.Treasury'),      type: 'link', to:'safe', sort: true, link: true},
                         {column: 'date',               title: $t('expenses.expenseDate') ,type: 'text' , sort: true },
                         {column: 'expense_section_id', title: $t('expenses.section') ,type: 'link', to:'expenseSection', sort: true, link: false},
                         {column: 'description',        title: $t('expenses.thatsAbout') ,type: 'text' , sort: true },
                         {column: 'notes',              title: $t('expenses.note') ,type: 'text' , sort: true },
                         {column: 'cost',               title: $t('expenses.amount') ,type: 'text' , sort: true },
                         {column: 'type',               title: $t('expenses.form.type') ,type: 'status' , sort: true ,  values: [
                            {title: $t('expenses.form.paid'), value: 0, color: 'success'},
                            {title: $t('expenses.form.worthy'), value: 1, color: 'dark'},
                          ]
                         },
                         {column: 'status',             title: $t('bills.situation') ,type: 'status' , sort: true ,  values: [
                            {title: $t('invoices.draft'), value: 0, color: 'dark'},
                            {title: $t('invoices.approved'), value: 1, color: 'success'},
                          ]
                         },
                         {column: 'options', title: $t('expenses.settings'), type: 'options', options: [
                             {name: 'show'},
                             {name: 'edit',   role: $user.admin || $user.role.expenses_edit},
                             {name: 'file'},
                             {name: 'printExpense',   role: true},
                             {name: 'download',   role: true},
                             {name: 'delete', role: $user.admin || $user.role.expenses_delete},
                         ]}
                       ]"
                     :deleteText="{
                        attention: $t('allerts.Attention'),
                        areYouReallySureToDeleteTheItem: $t('allerts.areYouReallySureToDeleteTheItem'),
                        close: $t('allerts.close'),
                        confirm: $t('allerts.confirm'),
                        loading: $t('allerts.loading'),
                       }" />
      </div>
    </div>
  </div>

</template>
<script>

  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'

  export default {
    data() {
      return {
        path: '/expenses',
      }
    },
    components: {
      indexHeader,
      indexTable
    }
  }

</script>

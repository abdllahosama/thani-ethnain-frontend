<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('expenseSections.expenseSections')"
                     :description="$t('expenseSections.fromHereControlOverExpenseSections')"/>
       <indexTable :searchText="$t('expenseSections.SearchForARating')"
                  :emptyTableText="$t('expenseSections.thereAreNoSections')"
                  :localData="true"
                  :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                  :buttonRole="$user.role.expenses_add"
                  :cloumns="[
                   {column: 'name',    title:$t('expenseSections.sectionName') ,type: 'text' , sort: true },
                   {column: 'expense_section_id',    title:$t('expenseSections.fatherSection') ,type: 'link', to:'expenseSection', sort: true, link: false },
                   {column: 'options', title:$t('expenseSections.settings'), type: 'options', options: [
                   {name: 'edit',   role: $user.admin || $user.role.expenses_edit},
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
        path: '/expenseSections'
      }
    },
    components: {
      indexHeader,
      indexTable
    }
  }

</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('manufacturingOperations.OperationsList')"
                     :description="$t('manufacturingOperations.FromHereYouCanControlTheListOfOperations')"/>
         <indexTable :searchText="$t('manufacturingOperations.SearchForAnOperation')"
                     :emptyTableText="$t('manufacturingOperations.ThereAreNoOperations')"
                     :emptyTableSubText="$t('manufacturingOperations.TryAddingItemsToTheTableAndTryAgain')"
                     :buttonRole="$user.admin || $user.role.manufacturing_operations_add"
                    :cloumns="[
                     {column: 'code',        title: $t('manufacturingOperations.OperationCode') ,  type: 'mainLink' , sort: true },
                     {column: 'start_date',  title: $t('manufacturingOperations.StartDate') ,  type: 'text'     , sort: true },
                     {column: 'end_date',    title:$t('manufacturingOperations.EndDate'),  type: 'text'     , sort: true },
                     {column: 'cost',        title: $t('manufacturingOperations.cost')       ,  type: 'text'     , sort: true},
                     {column: 'price',       title: $t('manufacturingOperations.price')       ,  type: 'text'     , sort: true},
                     {column: 'invoice_id',    title: $t('salesPayments.invoice') ,type: 'linkInvoice', to:'invoice', sort: true, link: true},
                     {column: 'description', title: $t('manufacturingOperations.description')  ,  type: 'text' , sort: true},
                     {
                        column: 'status',
                        title: $t('manufacturingOperations.Status'),
                        type: 'status',
                        sort: true,
                        values: [
                          { title: $t('manufacturingOperations.ItIsOpen'), value: 0, color: 'dark' },
                          { title: $t('manufacturingOperations.InProgress'), value: 1, color: 'primary' },
                          { title: $t('manufacturingOperations.Very'), value: 2, color: 'success' },
                          { title: $t('manufacturingOperations.canceled'),value: 3, color: 'danger'},
                        ],
                      },
                      {column: 'options', title:$t('manufacturingOperations.Settings'), type: 'options', options: [
                         {name: 'show'},
                         {name: 'edit', role: $user.admin || $user.role.manufacturing_operations_edit},
                         {name: 'file'},
                         {name: 'link', role: $user.admin || $user.role.manufacturing_operations_edit, title: 'إيداع خامات', icon: 'conveyor-belt-alt', link: '/manufacturingDeposits/create?manufacturing_operation_id=' },
                         {name: 'link', role: $user.admin || $user.role.manufacturing_operations_edit, title: 'سحب المنتجات', icon: 'conveyor-belt', link: '/manufacturingWithdrawals/create?manufacturing_operation_id=' },
                         {name: 'delete', role: $user.admin || $user.role.manufacturing_operations_delete},
                      ]
                      }
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
        path: '/manufacturingOperations'
      }
    },
    components: {
      indexHeader,
      indexTable,

    }
  }

</script>

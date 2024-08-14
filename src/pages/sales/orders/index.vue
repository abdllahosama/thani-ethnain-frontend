<template>

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <indexHeader :title="$t('orders.salesOrders')"
                       :description="$t('orders.fromHereYouCanControlSalesOrders')" />
          <indexTable :searchText="$t('orders.searchForAsalesOrder')"
                      :emptyTableText="$t('orders.thereAreNoOrders')"
                      :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                      :buttonRole="$user.role.orders_add"
                      :statusSearch="true"
                      :selectAll="true"
                      :statusRole="$user.role.orders_allow_status"
                      :deleteAllRole="$user.role.orders_delete"
                      :statusValues="[
                        { title: $t('orders.situation'), value: ''},
                        { title: $t('orders.all'), value: ''},
                        { title: $t('orders.NewOrder'), value: 0 },
                        { title: $t('orders.BeingProcessed'), value: 1 },
                        { title: $t('orders.readyForShipping'), value: 2 },
                        { title: $t('orders.UnderShipping'), value: 3 },
                        { title: $t('orders.shipped'), value: 4 },
                        { title: $t('orders.complete'), value: 5 },
                        { title: $t('orders.returnd'), value: 6 },
                        { title: $t('orders.canceled'), value: 7 }
                      ]"
                      :cloumns="[
                        {column: 'code',    title: $t('orders.salesOrder') ,type: 'mainLink' , sort: true },
                        {column: 'date',    title: $t('orders.orderDate') ,type: 'text' , sort: true },
                        {column: 'client_type', title: $t('orders.customerName'),type: 'clintLink',sort: false,},
                        {column: 'total',    title: $t('orders.cost') ,type: 'text' , sort: true },
                        {column: 'status',    title: $t('orders.situation') ,type: 'status' , sort: true ,  values: [
                          { title: $t('orders.NewOrder'), value: 0, color: 'dark'},
                          { title: $t('orders.BeingProcessed'), value: 1, color: 'info' },
                          { title: $t('orders.readyForShipping'), value: 2, color: 'info' },
                          { title: $t('orders.UnderShipping'), value: 3, color: 'info' },
                          { title: $t('orders.shipped'), value: 4, color: 'success' },
                          { title: $t('orders.complete'), value: 5, color: 'success' },
                          { title: $t('orders.returnd'), value: 6, color: 'danger'},
                          { title: $t('orders.canceled'), value: 7, color: 'danger' },
                        ]},
                        {column: 'options', title: $t('orders.settings'), type: 'options', options: [
                            {name: 'show'},
                            {name: 'edit',   role: $user.admin || $user.role.orders_edit},
                            {name: 'file'},
                            {name: 'stat',   role: $user.admin || $user.role.orders_edit},
                            {name: 'printOrder',   role: true},
                            {name: 'printDelevary',   role: true},
                            {name: 'delete', role: $user.admin || $user.role.orders_delete},
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
          path: '/orders'
        }
      },
      components: {
        indexHeader,
        indexTable
      }
    }
  
  </script>
<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('customers.index.customers')"
                     :description="$t('customers.index.customersDescription')"
                     :showExport="'true'"
                     :exportLink="path + '/export/excel'"
                     :showImport="'true'"
                     :explanationPath="path + '/explaination'"
                     />
        <indexTable :searchText="$t('customers.index.searchForCustomer')"
                    :emptyTableText="$t('customers.index.thereAreNoCustomers')"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.admin || $user.role.customers_add"
                    :localData="true"
                    :cloumns="[
                      {column: 'id',    title: 'كود' ,type: 'mainLink' , sort: true },
                      {column: 'name',    title:$t('customers.index.customerName') ,type: 'mainLink' , sort: true },
                      {column: 'mobile',  title:$t('customers.index.phoneNumber')  ,type: 'text'     , sort: true, icon: 'phone' },
                      {column: 'balance', title:$t('customers.index.balance')      ,type: 'text'     , sort: true, icon: 'usd-square' },
                      {column: 'stat',    title:$t('customers.index.active')      ,type: 'stat'     , sort: true, hideMobile: true },
                      {column: 'options', title:$t('customers.index.actions'), type: 'options', options: [
                          {name: 'show'},
                          {name: 'edit',   role: $user.admin || $user.role.customers_edit},
                          {name: 'link',   role: $site.salesPayments_allow && ($user.admin|| $user.role.sales_payments_add), title: $t('customers.index.AddABatch'), icon: 'dollar-sign', link:'/salesPayments/create?customer_id='},
                          {name: 'link',   role: $site.quotations_allow && ($user.admin || $user.role.quotations_add), title: $t('customers.index.AddABid'), icon: 'calculator', link:'/quotations/create?customer_id='},
                          {name: 'link',   role: $site.invoices_allow && ($user.admin || $user.role.invoices_add), title: $t('customers.index.AddASalesBill'), icon: 'file-invoice-dollar', link:'/invoices/create?customer_id='},
                          {name: 'link',   role: $site.orders_allow && ($user.admin || $user.role.orders_add), title:$t('customers.index.AddARequest'), icon: 'briefcase', link:'/orders/create?customer_id='},
                          {name: 'delete', role: $user.admin || $user.role.customers_delete},
                      ]}
                    ]"
                    :deleteText="{
                     attention: $t('allerts.Attention'),
                     areYouReallySureToDeleteTheItem: $t('allerts.AreYouReallySureTheClientIsDeletedIfYouDeleteTheCustomerAllInvoicesAndProcessesWillBeDeleted'),
                     close: $t('allerts.close'),
                     confirm: $t('allerts.confirm'),
                     loading: $t('allerts.loading'),
                    }" />
      </div>
    </div>
    <importForm v-if="importShow"/>
  </div>

</template>
<script>
  import indexHeader from '@/elements/index/indexHeader.vue'
  import indexTable from '@/elements/index/indexTable.vue'
  import importForm from './components/importForm.vue'

  export default {
    data() {
      return {
        path: '/customers',
        importShow: false
      }
    },
    methods: {
      importForm() {
        this.importShow = true
      }
    },
    components: {
      indexHeader,
      indexTable,
      importForm
    }
  }

</script>

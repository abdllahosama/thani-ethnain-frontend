<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('paymentMethods.paymentMethods')"
                     :description="$t('paymentMethods.fromHereYouCanControlThePaymentMethods')"/>
         <indexTable :searchText="$t('paymentMethods.SearchForAPaymentMethod')"
                    :emptyTableText="$t('paymentMethods.thereAreNoPaymentMethods')"
                    :localData="true"
                    :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                    :buttonRole="$user.role.sales_payments_add || $user.role.purchase_payments_add  || $user.role.expenses_add ? 1 : 0"
                    :cloumns="[
                     {column: 'name',    title:$t('paymentMethods.paymentMethod') ,type: 'text' , sort: true },
                     {column: 'options', title:$t('paymentMethods.actions'), type: 'options', options: [
                     {name: 'edit',   role: $user.admin || $user.role.sales_payments_edit || $user.role.purchase_payments_edit  || $user.role.expenses_edit},
                     {name: 'delete', role: $user.admin || $user.role.sales_payments_delete || $user.role.purchase_payments_delete  || $user.role.expenses_delete},
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
        path: '/paymentMethods'
      }
    },
    components: {
      indexHeader,
      indexTable
    }
  }

</script>

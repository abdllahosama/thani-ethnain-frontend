<template>

  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader :title="$t('paymentFees.paymentFees')"
                     :description="$t('paymentFees.fromHereYouCanControlThePaymentFees')"/>
       <indexTable :searchText="$t('paymentFees.SearchForAFee')"
                  :emptyTableText="$t('paymentFees.thereIsNoPaymentFee')"
                  :localData="true"
                  :emptyTableSubText="$t('allerts.TryAddingSomeItemsToTheTableAndTryAgain')"
                  :buttonRole="$user.role.sales_payments_add || $user.role.purchase_payments_add  || $user.role.expenses_add"
                  :cloumns="[
                   {column: 'name',    title:$t('paymentFees.paymentFeeName') ,type: 'text' , sort: true },
                   {column: 'cost',    title:$t('paymentFees.paymentFeeCost') ,type: 'text' , sort: true },
                   {column: 'options', title:$t('paymentFees.actions'), type: 'options', options: [
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
        path: '/paymentFees'
      }
    },
    components: {
      indexHeader,
      indexTable,
    }
  }

</script>

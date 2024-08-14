<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-6">
          {{$t('salesInstallments.form.paymentsDate')}}
        </div>
        <div class="col-xl-5">
          {{$t('salesInstallments.form.cost')}}
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <salesInstallmentsItem v-for="(rowItem, index) in $parent.item.salesInstallmentItems" :key="index" :index="index" :item="rowItem"/>
    <button class="btn btn-success w-100 mb-4" @click="$parent.addSalesInstallment()">
        <i class="fas fa-plus"></i> {{$t('salesInstallments.form.addPremium')}}
    </button>
  </div>

</template>
<script>

  import salesInstallmentsItem from './salesInstallmentsItem.vue'
  export default {
    components: {
      salesInstallmentsItem
    }
  }

</script>

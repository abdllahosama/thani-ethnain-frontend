<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-6">
          {{$t('partnersSettlements.form.partnerName')}}
        </div>
        <div class="col-xl-3">
          {{$t('partnersSettlements.form.theAmount')}}
        </div>
        <div class="col-xl-2">
          {{$t('partnersSettlements.form.theRatio')}}
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <quotationItem v-for="(rowItem, index) in $parent.item.quotationItems" :key="index" :index="index" :item="rowItem"/>
    <button class="btn btn-success w-100 mb-4" @click="$parent.addQuotationItem()">
        <i class="fas fa-plus"></i> {{$t('invoices.form.addition')}}
    </button>
  </div>

</template>
<script>

  import quotationItem from './quotationItem.vue'
  export default {
    components: {
      quotationItem,
    }
  }

</script>

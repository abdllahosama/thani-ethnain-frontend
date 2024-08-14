<template>
  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-2">
          {{$t('freePrint.goldInvoice.item')}}
        </div>
        <div class="col-xl-1">
          {{$t('freePrint.goldInvoice.theNumber')}}
        </div>
        <div class="col-xl-2">
           {{$t('freePrint.goldInvoice.caliber')}}
        </div>
        <div class="col-xl-2">
          {{$t('freePrint.goldInvoice.gram')}}
        </div>
        <div class="col-xl-2">
          {{$t('freePrint.goldInvoice.milligram')}}
        </div>
        <div class="col-xl-2">
          {{$t('freePrint.goldInvoice.pound')}}
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <quotationItem
      v-for="(rowItem, index) in $parent.options.quotationItems"
      :key="index"
      :index="index"
      :item="rowItem"
    ></quotationItem>
    <button
      class="btn btn-success w-100 mb-4"
      @click="$parent.addQuotationItem()"
    >
      <i class="fas fa-plus"></i> {{ $t('invoices.form.addition') }}
    </button>
  </div>
</template>
<script>
import quotationItem from "./quotationItem.vue";
export default {
    components: {
      quotationItem
    }
};
</script>

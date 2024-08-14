<template>
  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-6">{{$t('components.pointOfSalesQuotation.theNameOfThePaymentMethod')}}</div>
        <div class="col-xl-5">{{$t('components.pointOfSalesQuotation.Treasury')}}</div>
      </div>
    </div>

    <quotationItem
      v-for="(rowItem, index) in $parent.item.payment_methods"
      :key="index"
      :index="index"
      :item="rowItem"
    ></quotationItem>

    <button
      class="btn btn-success w-100 mb-4"
      @click="$parent.addQuotationItem()"
    >
      <i class="fas fa-plus"></i> {{ $parent.$t('components.pointOfSalesQuotation.addition') }}
    </button>
  </div>
</template>
<script>
import quotationItem from "./quotationItem.vue";
export default {
  data() {
    return {
      items: [],
      filteredItems: [],
    };
  },
  methods: {},
  components: {
    quotationItem,
  },
};
</script>

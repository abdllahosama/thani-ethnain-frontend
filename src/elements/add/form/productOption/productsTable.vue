<template>
  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-6">
          اسم المنتج
        </div>
        <div class="col-xl-5">
          {{ $t('invoices.form.price') }}
        </div>
      </div>
    </div>
    <quotationItem
      v-for="(rowItem, index) in $parent.item.quotationItems"
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
  data() {
    return {
      filteredItems: [],
    };
  },
  mounted() {
    this.filteredItems = this.$database.products.concat(
      this.$database.materials
    );
  },
  components: {
    quotationItem,
  },
};
</script>

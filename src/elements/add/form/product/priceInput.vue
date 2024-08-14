<template>
  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row">
        <div class="row pt-4 quotation-item mb-3 pb-3"></div>
        <div class="col-xl-12">
          <div class="row">
            <div class="col-xl-2 mr-5">
              {{ $t("products.form.sellingPrice") }}
            </div>
            <div class="col-xl-3">
              <label class="d-xl-none">{{
                $t("products.form.sellingPrice")
              }}</label>
              <div class="add-input">
                <input
                  type="number"
                  class="form-control w-100"
                  placeholder="0"
                  min="1"
                  v-model="$parent.item.price"
                />
                <span>{{ $option.currency }}</span>
              </div>
            </div>
            <div class="col-xl-2 text-center">
              {{ $t("products.form.purchasingPrice") }}
            </div>
            <div class="col-xl-3">
              <label class="d-xl-none">
                {{ $t("products.form.purchasingPrice") }}</label
              >
              <div class="add-input">
                <input
                  type="number"
                  class="form-control w-100"
                  placeholder="0"
                  min="1"
                  v-model="$parent.item.cost"
                />
                <span>{{ $option.currency }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <priceItem
      v-for="(rowItem, index) in $parent.item.productPrices"
      :key="index"
      :index="index"
      :item="rowItem"
    />
    <div class="row pt-4 mb-3 pb-3"></div>

    <button
      class="btn btn-success w-100 mb-4"
      @click="$parent.addProductPrices()"
    >
      <i class="fas fa-plus"></i> {{ $t("invoices.form.addition") }}
    </button>
  </div>
</template>
<script>
import priceItem from "./priceItem.vue";
export default {
  components: {
    priceItem,
  },
};
</script>

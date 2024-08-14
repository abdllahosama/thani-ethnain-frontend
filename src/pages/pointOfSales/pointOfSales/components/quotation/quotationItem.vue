<template>
  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-6">
      <label class="d-xl-none"> {{$t('components.pointOfSalesQuotation.theNameOfThePaymentMethod')}} </label>
      <input
        type="text"
        class="form-control w-100"
        :placeholder="$t('components.pointOfSalesQuotation.theNameOfThePaymentMethod')"
        v-model="item.name"
      />
    </div>
    <div class="col-xl-5">
      <label class="d-xl-none"> {{$t('components.pointOfSalesQuotation.Treasury')}} </label>
      <select class="form-control w-100" v-model="item.safe_id">
        <option value="">{{$t('components.pointOfSalesQuotation.ChooseTheSafe')}}</option>
        <option
          v-for="(safe, index) in $database.safes"
          :key="index"
          :value="safe.id">
          {{ safe.name }}
        </option>
      </select>
    </div>

    <div class="col-xl-1">
      <button
        class="btn btn-danger"
        @click="deleteItem()"
        :disabled="$parent.$parent.item.payment_methods.length <= 1"
      >
        <i class="far fa-trash"></i>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: "/invoiceItems",
      searchProducts: {},
      noSearch: false,
      showItemsList: false,
    };
  },
  methods: {
    searchItem() {
      this.showItemsList = true;
      var search = this.item.product_name;
      var editsearch = new RegExp(search, "i");
      var products = this.$parent.filteredItems
        .sort(this.$dynamicSort({ orderBy: "name", orderType: "desc" }))
        .filter((el) => editsearch.test(el.name))
        .slice(0, 20);
      if (typeof products != "undefined") {
        this.searchProducts = products;
      } else {
        this.searchProducts = [];
      }
    },
    deleteItem() {
      this.$parent.$parent.item.payment_methods.splice(
        this.$parent.$parent.item.payment_methods.indexOf(this.item),
        1
      );
    },
    selectProduct(e) {
      if (
        (e.key == "ArrowDown" && this.searchProducts.length != 0) ||
        (e.key == "ArrowUp" && this.searchProducts.length != 0)
      ) {
        var product = this.searchProducts.find((el) => el.focused == true);
        var selected = this.searchProducts.indexOf(product);
        var length = this.searchProducts.length;
        if (selected > -1) {
          this.$set(this.searchProducts[selected], "focused", false);
        }
        if (e.key == "ArrowDown") {
          if (selected < length - 1) {
            this.$set(this.searchProducts[selected + 1], "focused", true);
          } else {
            this.$set(this.searchProducts[0], "focused", true);
          }
        } else if (e.key == "ArrowUp") {
          if (selected > 0) {
            this.$set(this.searchProducts[selected - 1], "focused", true);
          } else {
            this.$set(this.searchProducts[length - 1], "focused", true);
          }
        }
      } else if (e.key == "Enter") {
        var item = this.$parent.filteredItems.find(
          (el) => el.barcode == this.item.product_name
        );
        if (item) {
          this.changeProduct(item);
        } else {
          var eproduct = this.searchProducts.find((el) => el.focused == true);
          var eselected = this.searchProducts.indexOf(eproduct);
          if (eselected != -1) {
            this.changeProduct(eproduct);
          }
        }
      }
    },
    removeItemList() {
      this.showItemsList = false;
    },
    removeItem() {
      this.item.product_name = "";
      this.updateItem();
    },
  },
  watch: {},
  props: ["item", "index"],
};
</script>

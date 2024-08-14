<template>
  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-11">
        <div class="col-xl-12">
          <label class="d-xl-none"> اسم المنتج </label>
          <div class="search-container" v-click-outside="removeItemList">
            <div :class="item.product_id != 0 ? 'add-input' : ''">
              <input
                type="text"
                class="form-control w-100"
                :class="{ 'is-invalid': item.productNameError }"
                autocomplete="off"
                :placeholder="
                  $t('quotations.form.productName')
                "
                v-model="item.product_name"
                @change="updateItem()"
                @keydown="selectProduct"
                @keyup="searchItem"
                @focus="searchItem"
                :disabled="item.product_id != 0"
              />
              <span
                class="btn btn-danger"
                v-if="item.product_id != 0"
                @click="removeItem"
                ><i class="fas fa-times"></i
              ></span>
            </div>
            <ul
              class="list-unstyled search-selects"
              v-if="searchProducts.length > 0 && showItemsList"
            >
              <li
                v-for="product in searchProducts"
                :key="product.id"
                @click="changeProduct(product)"
                :class="{ focusd: product.focused }"
                :title="product.description"
              >
                {{ product.name }}
                <span
                  v-if="product.track_quantity == 1"
                  class="quotation-item-quantity"
                  >{{ product.quantity }}
                </span>
                <span
                  class="quotation-item-quantity"
                  v-if="product.track_quantity == 0"
                  ><i class="fal fa-infinity"></i
                ></span>
              </li>
            </ul>
          </div>
        </div>
    </div>


    <div class="col-xl-1">
      <button
        class="btn btn-danger"
        @click="deleteItem()"
        :disabled="$parent.$parent.item.quotationItems.length <= 1"
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
    addTax() {
      if (this.item.tax_id == "add") {
        this.item.tax_id = 0;
        this.$parent.$parent.addTax = 1;
        this.$parent.$parent.$parent.model = 1;
        this.$parent.$parent.itemIndex = this.item.id;
      } else if (this.item.tax_id == 0) {
        this.item.tax_rate = 0;
        this.updateItem();
      } else {
        var id = this.item.tax_id;
        var tax = this.$database.taxes.find(function (
          tax
        ) {
          if (tax.id == id) return true;
        });
        this.item.tax_rate = tax.rate;
        this.updateItem();
      }
    },
    addDiscount() {
      if (this.item.discount_id == "add") {
        this.$parent.$parent.addDiscount = 1;
        this.$parent.$parent.$parent.model = 1;
        this.item.discount_id = 0;
        this.$parent.$parent.itemIndex = this.item.id;
      } else if (this.item.discount_id == 0) {
        this.item.discount_rate = 0;
        this.updateItem();
      } else {
        var id = this.item.discount_id;
        var discount = this.$database.discounts.find(
          function (discount) {
            if (discount.id == id) return true;
          }
        );
        this.item.discount_rate = discount.rate;
        this.updateItem();
      }
    },
    updateItem() {
      if (this.item.discount_rate !== 0) {
        this.item.subtotal =
          this.item.quantity *
          this.item.price *
          ((100 - this.item.discount_rate) / 100);
        this.item.discount =
          this.item.quantity *
          this.item.price *
          (this.item.discount_rate / 100);
      } else {
        this.item.subtotal = this.item.quantity * this.item.price;
        this.item.discount = 0;
      }

      this.item.average = this.item.subtotal * (this.item.tax_rate / 100);
      this.item.total = this.item.subtotal + this.item.average;
    },
    changeProduct(Product) {
      this.item.product_id = Product.id;
      this.item.maxQuantity =
        Product.track_quantity == 1 ? Product.quantity : "";
      this.item.product_name = Product.name;
      this.item.description = Product.description;
      this.item.unit_id = Product.unit_id;
      this.item.price = Product.price;
      this.item.quantity = 1;
      if (Product.tax_id != 0) {
        this.item.tax_rate = Product.tax_rate;
        this.item.tax_id = Product.tax_id;
      } else {
        this.item.tax_rate = 0;
        this.item.tax_id = 0;
      }
      if (Product.discount_id != 0) {
        this.item.discount_rate = Product.discount_rate;
        this.item.discount_id = Product.discount_id;
      } else {
        this.item.discount_rate = 0;
        this.item.discount_id = 0;
      }
      this.searchProducts = {};
      this.noSearch = true;

      var productUnits =
        this.$database.productUnits.filter(
          (el) => el.product_id == Product.id
        );

      var units = [];
      var unit = this.$database.units.find(
        (el) => el.id == Product.unit_id
      );
      if (unit) {
        var productUnit = {
          unit: unit,
          quantity: 1,
        };
        units.push(productUnit);
      }
      productUnits.forEach((productUnit) => {
        var unit = this.$database.units.find(
          (el) => el.id == productUnit.unit_id
        );
        if (unit) {
          productUnit.unit = unit;
          units.push(productUnit);
        }
      });
      this.item.units = units;

      var productPrice =
        this.$database.productPrices.find(
          (el) =>
            el.product_id == this.item.product_id &&
            el.priceList_id == this.$parent.$parent.item.priceList_id &&
            el.unit_id == this.item.unit_id &&
            el.detail_id == 0
        );
      if (productPrice && productPrice.price != 0) {
        this.item.price = productPrice.price;
      } else if (this.$parent.$parent.item.priceList_id == 0) {
        this.item.price = Product.price;
      } else {
        this.item.price = "";
      }

      this.updateItem();
      this.removeItemList();
    },
    blurSearch() {
      setTimeout(() => {
        this.searchProducts = {};
      }, 200);
    },
    deleteItem() {
      this.$parent.$parent.item.quotationItems.splice(
        this.$parent.$parent.item.quotationItems.indexOf(this.item),
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
      this.item.product_id = "";
      this.item.product_name = "";
      this.item.description = "";
      this.item.unit_id = 0;
      this.item.price = "";
      this.item.quantity = "";
      this.item.tax_id = 0;
      this.item.discount_id = 0;
      this.updateItem();
    },
    changeUnit() {
      var productPrice =
        this.$database.productPrices.find(
          (el) =>
            el.product_id == this.item.product_id &&
            el.priceList_id == this.$parent.$parent.item.priceList_id &&
            el.unit_id == this.item.unit_id &&
            el.detail_id == 0
        );
      if (productPrice && productPrice.price != 0) {
        this.item.price = productPrice.price;
      } else {
        this.item.price = "";
      }
      this.updateItem();
    },
  },
  watch: {
    "$parent.$parent.item.priceList_id": function () {
      var productPrice =
        this.$database.productPrices.find(
          (el) =>
            el.product_id == this.item.product_id &&
            el.priceList_id == this.$parent.$parent.item.priceList_id &&
            el.unit_id == this.item.unit_id &&
            el.detail_id == 0
        );
      if (productPrice && productPrice.price != 0) {
        this.item.price = productPrice.price;
      } else {
        this.item.price = "";
      }
      this.updateItem();
    },
  },
  props: ["item", "index"],
};
</script>

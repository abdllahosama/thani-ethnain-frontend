<template>
  <div>
    <div
      class="input-group input-group-flush w-100 search-input"
      v-click-outside="removeItemList"
    >
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-search"></i></span>
      </div>
      <input
        type="search"
        :id="
          !$parent.options.change_customer && !$parent.options.barcode_allow
            ? 'searchInput'
            : ''
        "
        autocomplete="off"
        :placeholder="$parent.$t('components.pointOfSalesInputs.searchForProduct')"
        v-model="search"
        class="form-control list-search"
        @keydown="selectProduct"
        @focus="searchForProducts()"
        @keyup="searchForProducts()"
      />
      <ul
        class="list-unstyled search-selects"
        style="top: 43px"
        v-if="searchProducts.length > 0 && showItemsList"
      >
        <li
          v-for="product in searchProducts"
          :key="product.id"
          @click="addFromSearch(product.id)"
          :class="{ focusd: product.focused }"
        >
          {{ product.name }}
          <span
            v-if="product.track_quantity == 1"
            class="quotation-item-quantity"
            >{{ product.max_quantity }}
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
</template>
<script>
export default {
  data() {
    return {
      search: "",
      searchProducts: [],
      showItemsList: false,
      product: [],
      productPopUp: false,
    };
  },
  methods: {
    searchForProducts() {
      var editsearch = new RegExp(this.search, "i");
      var products = this.$parent.filteredProducts
        .sort(this.$dynamicSort({ orderBy: "name", orderType: "desc" }))
        .filter((el) => editsearch.test(el.name))
        .slice(0, 15);
      if (typeof products != "undefined") {
        this.searchProducts = products;
        this.showItemsList = true
      } else {
        this.searchProducts = [];
      }
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
        var item = this.$parent.filteredProducts.find((el) => el.barcode == this.search);
        if (item) {
          this.addFromSearch(item.id);
        } else {
          var eproduct = this.searchProducts.find((el) => el.focused == true);
          var eselected = this.searchProducts.indexOf(eproduct);
          if (eselected != -1) {
            this.addFromSearch(eproduct.id);
          } else {
            this.$parent.aletText =this.$parent.$t('allerts.productIsntAvulbleInStoke');
            this.$parent.alertType = "danger";
          }
        }
      }
    },
    addFromSearch(id) {
      var product = this.$parent.filteredProducts.find((el) => el.id == id);
      var productPrices = this.$database.productPrices.filter(
        (el) => el.product_id == product.id && el.detail_id != 0
      );
      product.productDetails = [];

      productPrices.forEach((productPrice) => {
        if (productPrice.price > 0) {
          var detail = this.$database.details.find(
            (el) => el.id == productPrice.detail_id
          );

          if (detail) {
            product.productDetails.push({
              name: detail.name,
              id: detail.id,
              price: productPrice.price,
            });
          }
        }
      });
      if (product.productDetails.length == 0) {
        const ids = this.$parent.item.invoiceItems.map((el) => el.id);
        var productInCart = ids.indexOf(product.id);
        if (
          productInCart != -1 &&
          !this.$parent.item.invoiceItems[productInCart].printedCheck
        ) {
          if (this.quantity > 0) {
            this.$parent.item.invoiceItems[productInCart].quantity =
              this.$parent.item.invoiceItems[productInCart].quantity -
              0 +
              (this.$parent.quantity - 0);
          } else {
            this.$parent.item.invoiceItems[productInCart].quantity =
              this.$parent.item.invoiceItems[productInCart].quantity - 0 + 1;
          }
        } else {
          if (this.$parent.quantity > 0) {
            product.quantity = this.$parent.quantity;
          } else {
            product.quantity = 1;
          }
          var price = product.price;
          if (this.$parent.item.priceList_id > 0) {
            var priceList = this.$database.productPrices.find((el) => el.priceList_id == this.$parent.item.priceList_id && el.product_id == product.id)
            if (priceList) {
              price = priceList.price;
            }
          }
          this.$parent.item.invoiceItems.unshift({
            id: product.id,
            name: product.name,
            price: price,
            cost: product.cost,
            quantity: product.quantity,
            discount: 0,
            section_id: product.section_id,
          });
        }
        this.$parent.quantity = "";
        this.search = "";
        this.$parent.calculateTotal();
      } else {
        this.$parent.productSelectionFormShow = true;
        this.$parent.productSelects = product;
        this.search = "";
      }
    },
    removeItemList() {
        this.showItemsList = false;
    },
  },
};
</script>

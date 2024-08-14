<template>
  <div>
        <div class="input-group input-group-flush w-100 search-input">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-scanner"></i></span>
          </div>
          <input
            type="search"
            id="searchInput"
            :placeholder="$parent.$t('components.pointOfSalesInputs.BarcodeScanning')"
            v-model="barcode"
            class="form-control list-search"
            @change="barcodeItem"
            @keyup="moveToQuantity"
            autocomplete="off"
          />
        </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      barcode: "",
    };
  },
  methods: {
    barcodeItem() {
      var product = this.$parent.filteredProducts.find(
        (el) => el.barcode == this.barcode
      );
      var producWithWeight = this.$parent.filteredProducts.find(
        (el) => el.barcode == this.barcode.slice(0, 7)
      );
      if (typeof product !== "undefined") {
        const ids = this.$parent.cart.map((el) => el.id);
        var productInCart = ids.indexOf(product.id);

        var price = 0;
        var priceList = "";
        if (productInCart != -1) {
          if (this.$parent.quantity > 0) {
            this.$parent.cart[productInCart].quantity =
              this.$parent.cart[productInCart].quantity -
              0 +
              (this.$parent.quantity - 0);
          } else {
            this.$parent.cart[productInCart].quantity =
              this.$parent.cart[productInCart].quantity - 0 + 1;
          }
        } else {
          if (this.$parent.quantity > 0) {
            product.quantity = this.$parent.quantity;
          } else {
            product.quantity = 1;
          }
          price = product.price;
          if (this.$parent.item.priceList_id > 0) {
            priceList = this.$database.productPrices.find(
              (el) => el.priceList_id == this.$parent.item.priceList_id && el.product_id == product.id
            );
            if (priceList) {
              price = priceList.price;
            }
          }
          this.$parent.cart.unshift({
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
      } else if (typeof producWithWeight !== "undefined") {
        producWithWeight.quantity = this.barcode.slice(7, 13) / 10000;

        price = producWithWeight.price;

        if (this.$parent.item.priceList_id > 0) {
          priceList = this.$database.productPrices.find(
            (el) => el.priceList_id == this.$parent.item.priceList_id && el.product_id == producWithWeight.id
          );
          if (priceList) {
            price = priceList.price;
          }
        }
        this.$parent.cart.unshift({
          id: producWithWeight.id,
          name: producWithWeight.name,
          price: price,
          cost: producWithWeight.cost,
          quantity: producWithWeight.quantity,
          discount: 0,
          section_id: producWithWeight.section_id,
        });
      } else {
        this.$parent.aletText =this.$parent.$t('allerts.productIsntAvulbleInStoke');
        this.$parent.alertType = "danger";
      }
      this.barcode = "";
      this.$parent.calculateTotal();
    },
    moveToQuantity(event) {
      if (event.key == "ArrowDown") {
        this.$parent.quantity = this.barcode;
        this.barcode = "";
      }
    },
  },
};
</script>

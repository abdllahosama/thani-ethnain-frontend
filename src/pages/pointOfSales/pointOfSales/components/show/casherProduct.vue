<template>
  <div>
    <div class="card casher-product">
      <div class="casher-product-image" @click="addItme(item.id)">
        <div class="dummy"></div>
        <div class="image" :class="{'noImage': !item.image}" :style="item.image != null ? image : ''"></div>
      </div>
      <div class="casher-product-name"  @click="addItme(item.id)">
        {{ item.name }}
      </div>
      <div class="pos-btn-size-container" v-if="item.productDetails.length > 0">
        <button class="pos-btn-size" :class="{'active': detailId === index}"  v-for="(productDetail, index) in item.productDetails" :key="index" @click="selectDetail(index)">
          {{ productDetail.name }}
        </button>
      </div>
      <div class="price-container">
        <div class="casher-product-price" v-if="item.productDetails.length <= 0">
          {{ $moneyFormat(item.showPrice) }}
        </div>
        <div class="casher-product-price" v-if="item.productDetails.length > 0">
          {{ $moneyFormat(price) }}
        </div>
        <div class="item-quantity item-out-quantity sm-quantity-btn">
          <button class="btn btn-light" @click="plusOne()"><i class="fas fa-plus"></i></button>
          <div class="item-quantity-inner">{{quantity}}</div>
          <button class="btn btn-light" @click="minusOne()"><i class="fas fa-minus"></i></button>
        </div>
      </div>
      <!--div class="display-flex text-center mb-3">
        <div
          class="btn btn-success btn-sm m-1"
          v-for="(productDetail, index) in item.productDetails"
          :key="index"
          @click="addItmeDetail(item.id, index)"
        >
          {{ productDetail.name }} <br />
          ({{ $moneyFormat(productDetail.price) }})
        </div>
      </div-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image:
        'background-image: url("' +
        localStorage.getItem("site") +
        "/companiesUploads/" +
        localStorage.getItem("subdomain") +
        "/products/" +
        this.item.image +
        '");',
      quantity: 1,
      price: '',
      detailId: ''
    };
  },
  methods: {
    addItme(id) {
      var product = this.$parent.filteredProducts.find((el) => el.id == id);
      const ids = this.$parent.item.invoiceItems.map((el) => el.id);
      var productInCart = ids.indexOf(product.id);
      if (product.productDetails.length == 0) {
        if (!product.allow_product_options) {
          if (
            productInCart != -1 &&
            !this.$parent.item.invoiceItems[productInCart].printedCheck
          ) {
            if (this.quantity > 0) {
              this.$parent.item.invoiceItems[productInCart].quantity =
              parseFloat(this.$parent.item.invoiceItems[productInCart].quantity) + parseFloat(this.quantity);
            } else {
              this.$parent.item.invoiceItems[productInCart].quantity =
              parseFloat(this.$parent.item.invoiceItems[productInCart].quantity) + 1;
            }
          } else {
            if (this.quantity > 0) {
              product.quantity = this.quantity;
            } else {
              product.quantity = 1;
            }
            var price = product.price;
            if (this.$parent.item.priceList_id > 0) {
              var priceList = this.$database.productPrices.find((el) => el.priceList_id == this.$parent.item.priceList_id && el.product_id == product.id);
              if (priceList) {
                price = priceList.price;
              }
            }
            this.$parent.item.invoiceItems.unshift({
              id: product.id,
              name: product.name,
              detail_id: 0,
              price: price,
              quantity: product.quantity,
              discount: 0,
              section_id: product.section_id,
            });
          }
          this.$parent.quantity = "";
          this.search = "";
          this.$parent.calculateTotal();
        } else {
          this.$parent.productOptionsFormShow = true;
          this.$parent.productOptionsId = product.id;
          this.$parent.productOptionsDetailId = null;
          this.$parent.productOptionsQuantity = this.quantity;
        }
        this.quantity = 1
      } else {
        this.addItmeDetail(id, this.detailId)
      }
    },
    addItmeDetail(id, detailId) {
      var product = this.$parent.filteredProducts.find(
        (el) => el.id == id && !el.printedCheck
      );
      var detail = product.productDetails[detailId];
      const cartProduct = this.$parent.item.invoiceItems.find(
        (el) => el.id == id && el.detail_id == detail.id
      );
      var productInCart = this.$parent.item.invoiceItems.indexOf(cartProduct);
      if (!product.allow_product_options) {
        if (
          productInCart != -1 &&
          !this.$parent.item.invoiceItems[productInCart].printedCheck
        ) {
          if (this.quantity > 0) {
            this.$parent.item.invoiceItems[productInCart].quantity = parseFloat(this.$parent.item.invoiceItems[productInCart].quantity) + parseFloat(this.quantity);
          } else {
            this.$parent.item.invoiceItems[productInCart].quantity = parseFloat(this.$parent.item.invoiceItems[productInCart].quantity) + 1;
          }
        } else {
          if (this.quantity > 0) {
            product.quantity = this.quantity;
          } else {
            product.quantity = 1;
          }
          var price = product.price;
          price = detail.price - 0;

          if (this.$parent.item.priceList_id > 0) {
            this.$database.productPrices.find((el) => el.priceList_id == this.$parent.item.priceList_id && el.product_id == product.id)
            if (priceList) {
              price = priceList.price;
            }
          }

          this.$parent.item.invoiceItems.unshift({
            id: product.id,
            name: product.name,
            detail_id: detail.id,
            price: price,
            quantity: product.quantity,
            detailName: detail.name,
            discount: 0,
            productDetails: product.productDetails,
            section_id: product.section_id,
          });
        }
        this.$parent.quantity = "";
        this.search = "";
        this.$parent.calculateTotal();
      } else {
        this.$parent.productOptionsFormShow = true;
        this.$parent.productOptionsId = product.id;
        this.$parent.productOptionsDetailId = detailId;
        this.$parent.productOptionsQuantity = this.quantity;
      }
      this.quantity = 1
    },
    plusOne () {
      this.quantity += 1
    },
    minusOne () {
      if (this.quantity > 1) {
        this.quantity -= 1
      }
    },
    selectDetail (id) {
      this.detailId = id
      this.price = this.item.productDetails[id].price
    },
    removeItemList() {
      var chek = this;
      setTimeout(function () {
        chek.showItemsList = false;
      }, 100);
    },
  },
  mounted () {
    if (this.item.productDetails.length > 0) {
      this.selectDetail(0)
    }
  },
  props: ["item"],
};
</script>

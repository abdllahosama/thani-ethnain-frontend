<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.addition')}} {{$parent.productSelects.name}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <button
                  v-for="(productDetail, index) in $parent.productSelects.productDetails" 
                  :key="index"
                  @click="addItmeDetail($parent.productSelects.id, index)"
                  class="btn col-2 ml-2 pos-main-btn btn-primary"
                >
                {{productDetail.name}}
                <br>
                ({{productDetail.price}} {{$option.currency}})
              </button>
            </div>
          </div>
          <div class="card-footer card-footer-boxed">
            <div class="row align-items-center justify-content-between">
              <div class="col-auto"></div>
              <div class="col-auto">
                <!-- Link -->
                <button class="btn btn-outline-danger" @click="close()">
                  <i class="far fa-times"></i>
                  {{$t('components.pointOfSalesPopUp.Close')}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: {},
      showError: false,
      loading: false,
      productOptions: [],
      selectedProductOptions: []
    }
  },
  methods:{
    close() {
      this.$parent.productSelectionFormShow = false
    },
    addItmeDetail(id, detailId) {
        var product = this.$parent.filteredProducts.find(el => el.id == id);
        var detail = product.productDetails[detailId];
        const cartProduct = this.$parent.item.invoiceItems.find(el => el.id  == id && el.detail_id == detail.id);
        var productInCart = this.$parent.item.invoiceItems.indexOf(cartProduct);
        if (productInCart != -1 && !this.$parent.item.invoiceItems[productInCart].printedCheck) {
            if (this.quantity > 0) {
                this.$parent.item.invoiceItems[productInCart].quantity = (this.$parent.item.invoiceItems[productInCart].quantity - 0) + (this.$parent.quantity - 0);
            } else {
                this.$parent.item.invoiceItems[productInCart].quantity = (this.$parent.item.invoiceItems[productInCart].quantity - 0) + 1;
            }
        } else {
            if (this.$parent.quantity > 0) {
                product.quantity = this.$parent.quantity;
            } else {
                product.quantity = 1;
            }
            var price = product.price;
            price = detail.price - 0;

            if (this.$parent.item.priceList_id > 0) {
                var priceList = this.$database.productPrices.find((el) => el.priceList_id == this.$parent.item.priceList_id && el.product_id == product.id)
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
        this.$parent.quantity = '';
        this.search = '';
        this.$parent.calculateTotal();
        this.close()
    },   
  },
};
</script>

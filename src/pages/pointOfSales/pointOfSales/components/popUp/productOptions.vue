<template>
  <div class="modal fade show">
    <div class="modal-dialog modal-dialog-centered big-model">
      <div class="modal-content">
        <div class="sm-stop-edit" v-if="loading"></div>
        <div class="modal-card card">
          <div class="card-header">
            <h4 class="card-header-title">{{$t('components.pointOfSalesPopUp.addition')}} {{product.name}}</h4>
            <button type="button" class="close" @click="close()">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="card-body">
            <div  v-for="(productOption, index) in productOptions" :key="index">
              <div class="mb-2">
                <label> {{productOption.name}}</label>
                <div class="row">
                  <div class="col-225  mb-3"  v-for="(item, itemIndex) in productOption.items" 
                  :key="itemIndex" v-if="item.product">
                    <button
                      @click="addToOptions(index, itemIndex)"
                      class="btn  h-100 w-100"
                      :class="selectedProductOptions.find(el => el.productOptionItemId == item.id) ? ' btn-primary' : 'btn-outline-primary'"
                      title="item.product.name"
                      >
                      {{item.product.name}}
                      <br>
                      ({{$moneyFormat(item.product.showPrice)}})
                    </button>
                  </div>
                </div>
              </div>
              <hr />
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
                <button
                  class="btn btn-dark"
                  v-if="!loading"
                  @click="addProduct"
                >
                  <i class="far fa-save"></i>
                  {{$t('components.pointOfSalesPopUp.construction')}}
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
      this.$parent.productOptionsFormShow = false
    },
    addToOptions (optionId, itemId) {
      var productOption = this.productOptions[optionId]
      var option = productOption.items[itemId]
      
      if (!this.selectedProductOptions.find(el => el.productOptionItemId == option.id)) {
        if (productOption.status == 0) {
          this.selectedProductOptions = this.selectedProductOptions.filter(el => el.productOptionId != productOption.id)
        }
        this.selectedProductOptions = this.selectedProductOptions.filter(el => el.productOptionItemId != option.id)

        this.selectedProductOptions.push({
          productOptionId: productOption.id,
          productOptionItemId: option.id,
          id: option.product.id,
          name: option.product.name,
          price: option.product.showPrice
        })
      } else {
        this.selectedProductOptions = this.selectedProductOptions.filter(el => el.productOptionItemId != option.id)
      }
    },
    addProduct () {
        var price = this.product.showPrice;
        var detailId = 0
        var detailName = ""
        if (this.$parent.item.priceList_id > 0) {
            var priceList  = this.$database.productPrices.find((el) => el.priceList_id == this.$parent.item.priceList_id && el.product_id == this.product.id);
            if (priceList) {price = priceList.price;}
        }

        if (this.$parent.productOptionsDetailId != null) {
          var detail = this.product.productDetails[this.$parent.productOptionsDetailId];
          price = detail.price - 0;
          detailId = detail.id
          detailName = detail.name
        }
        
        var refrance = Math.random() * 999999;
        var countedPrice = price;
        this.selectedProductOptions.forEach(option => {
          var productOption= this.productOptions.find(el => el.id == option.productOptionId).items.find(el => el.id == option.productOptionItemId)
          countedPrice += productOption.product.showPrice
          this.$parent.item.invoiceItems.unshift({
            id: productOption.product.id,
            name: productOption.product.name,
            detail_id: 0,
            price: productOption.product.showPrice,
            quantity: this.$parent.productOptionsQuantity,
            discount: 0,
            section_id: this.product.section_id,
            refrance_product_id: refrance
          });
          
        });
        this.$parent.item.invoiceItems.unshift({
            id: this.product.id,
            name: this.product.name,
            detail_id: detailId,
            detailName: detailName,
            price: price,
            quantity: this.$parent.productOptionsQuantity,
            discount: 0,
            section_id: this.product.section_id,
            refrance_id: refrance,
            countedPrice: countedPrice
        });
        this.$parent.calculateTotal()
        this.close()
    }
  },
  mounted () {
    this.product = this.$parent.filteredProducts.find(el => el.id == this.$parent.productOptionsId)
    if (Array.isArray(JSON.parse(this.product.product_option_id))) {
      JSON.parse(this.product.product_option_id).forEach((id) => {
        var productOption = this.$database.productOptions.find((el) => el.id == id);
        if (productOption) {
          this.productOptions.push(productOption);
        }
      });
      this.productOptions.forEach(productOption => {
        productOption.items = this.$database.productOptionItems.filter((el) => el.product_option_id == productOption.id);
        productOption.items.forEach(item => {
          item.product = this.$parent.filteredProducts.find((el) => el.id == item.product_id);
          var priceListPrice = this.$database.productPrices.find(el => el.product_id == item.id && el.priceList_id == this.$parent.item.priceList_id)
          if (priceListPrice) {
            item.product.showPrice = priceListPrice.price;
          } else {
            if (item.product) {
              item.product.showPrice = item.product.price
            }
          }
        });
      })
    }
  }
};
</script>

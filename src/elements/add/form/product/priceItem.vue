<template>

  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-2">
      <label class="d-xl-none">{{$t('products.form.priceList')}}</label>
      <select type="text"
             class="form-control w-100"
             :class="{ 'is-invalid' : item.productNameError}"
             v-model="item.priceList_id">
             <option value="0">{{$t('products.form.achnerPriceList')}}</option>
             <optgroup :label="$t('products.form.priceLists')">
               <option v-for="priceList in $database.priceLists" :value="priceList.id">{{priceList.name}}</option>
             </optgroup>
      </select>
    </div>
    <div class="col-xl-2">
      <label class="d-xl-none">{{$t('products.form.productDetail')}}</label>
      <select type="text"
             class="form-control w-100"
             :class="{ 'is-invalid' : item.productNameError}"
             v-model="item.detail_id">
             <option value="0">{{$t('products.form.chooseProductDetail')}}</option>
             <optgroup :label="$t('products.form.productDetails')">
               <option v-for="detail in $database.details" :value="detail.id">{{detail.name}}</option>
             </optgroup>
      </select>
    </div>
    <div class="col-xl-2">
      <label class="d-xl-none">{{$t('products.form.unit')}} </label>
      <select type="text"
             class="form-control w-100"
             :class="{ 'is-invalid' : item.productNameError}"
             v-model="item.unit_id">
             <option value="0">{{$t('products.form.chooseTheUnit')}}</option>
             <optgroup :label="$t('products.form.units')">
               <option v-for="unit in $database.units" :value="unit.id">{{unit.name}}</option>
             </optgroup>
      </select>
    </div>
    <div class="col-xl-5">
      <div class="row">
        <div class="col-xl-6">
          <label class="d-xl-none">{{$t('products.form.sellingPrice')}}</label>
          <div class="add-input">
            <input type="number" class="form-control w-100" placeholder="0" :max="item.maxQuantity"   v-model="item.price">
            <span>{{$parent.$option.currency}}</span>
          </div>
        </div>
        <div class="col-xl-6">
          <label class="d-xl-none"> {{$t('products.form.purchasingPrice')}}</label>
          <div class="add-input">
            <input type="number" class="form-control w-100" placeholder="0" min="1" :max="item.maxQuantity"   v-model="item.cost">
            <span>{{$parent.$option.currency}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-1">
      <button class="btn btn-danger" @click="deleteItem()">
          <i class="far fa-trash"></i>
      </button>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {
        path: '/invoiceItems',
        searchProducts: {},
        noSearch: false,
        showItemsList: false,
      }
    },
    methods: {
      deleteItem() {
        this.$parent.$parent.item.productPrices.splice(this.$parent.$parent.item.productPrices.indexOf(this.item), 1)
      },
    },

    props: ['item', 'index']
  }

</script>

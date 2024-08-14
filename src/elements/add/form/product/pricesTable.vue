<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-2">
          {{$t('products.form.priceLists')}}
        </div>
        <div class="col-xl-2">
          {{$t('products.form.productDetail')}}
        </div>
        <div class="col-xl-2">
          {{$t('products.form.unit')}}
        </div>
        <div class="col-xl-5">
          <div class="row">
            <div class="col-xl-6">
              {{$t('products.form.sellingPrice')}}
            </div>
            <div class="col-xl-6">
              {{$t('products.form.purchasingPrice')}}
            </div>
          </div>
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <div class="row pt-4 quotation-item mb-3 pb-3">
      <div class="col-xl-2">
        <label class="d-xl-none">{{$t('products.form.priceList')}}</label>
        <input type="text" disabled="disabled" class="form-control w-100" value="لا يوجد">
      </div>
      <div class="col-xl-2">
        <label class="d-xl-none">{{$t('products.form.productDetail')}}</label>
        <input type="text" disabled="disabled" class="form-control w-100" value="لا يوجد">
      </div>
      <div class="col-xl-2">
        <label class="d-xl-none">{{$t('products.form.unit')}}</label>
        <input type="text" disabled="disabled" class="form-control w-100" :value="$parent.item.unit_name">
      </div>
      <div class="col-xl-5">
        <div class="row">
          <div class="col-xl-6">
            <label class="d-xl-none">{{$t('products.form.sellingPrice')}}</label>
            <div class="add-input">
              <input type="number" class="form-control w-100" placeholder="0" min="1"  v-model="$parent.item.price">
              <span>{{$option.currency}}</span>
            </div>
          </div>
          <div class="col-xl-6">
            <label class="d-xl-none"> {{$t('products.form.purchasingPrice')}}</label>
            <div class="add-input">
              <input type="number" class="form-control w-100" placeholder="0" min="1"  v-model="$parent.item.cost">
              <span>{{$option.currency}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-1">
        <button class="btn btn-danger btn-disabled"  disabled="disabled">
            <i class="far fa-trash"></i>
        </button>
      </div>
    </div>
    <priceItem v-for="(rowItem, index) in $parent.item.productPrices" :key="index" :index="index" :item="rowItem"/>
    <button class="btn btn-success w-100 mb-4" @click="$parent.addProductPrices()">
        <i class="fas fa-plus"></i> {{$t('invoices.form.addition')}}
    </button>
  </div>
</template>
<script>

  import priceItem from './priceItem.vue'
  export default {
    components: {
      priceItem
    }
  }

</script>

<template>

  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-4">
      <label class="d-xl-none">{{$t('products.form.storeProducts')}}</label>
      <input type="text" class="form-control w-100"  disabled="disabled"    v-model="item.name">
    </div>
    <div class="col-xl-4">
      <label class="d-xl-none"> {{$t('products.form.quantity')}} </label>
      <div class="add-input">
        <input type="number" class="form-control w-100" placeholder="0" min="1" v-model="item.quantity"  :disabled="$route.name == 'productsEdit' ? true : false">
        <span>{{$parent.$parent.item.unit_name}}</span>
      </div>
    </div>
    <div class="col-xl-4">
      <label class="d-xl-none"> {{$t('products.form.lessAmount')}}</label>
      <div class="add-input">
        <input type="number" class="form-control w-100" placeholder="0" min="1" v-model="item.min_quantity">
        <span>{{$parent.$parent.item.unit_name}}</span>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    props: ['item', 'index']
  }

</script>

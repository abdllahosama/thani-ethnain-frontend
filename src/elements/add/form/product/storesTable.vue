<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-4">
           {{$t('products.form.storeProducts')}}
        </div>
        <div class="col-xl-4">
          {{$t('products.form.quantity')}}
        </div>
        <div class="col-xl-4">
             {{$t('products.form.lessAmount')}}
        </div>
      </div>
    </div>
    <storeItem v-for="(rowItem, index) in $parent.item.productQuantities" :key="index" :index="index" :item="rowItem"/>
  </div>
</template>
<script>

  import storeItem from './storeItem.vue'
  export default {
    components: {
      storeItem
    }
  }

</script>

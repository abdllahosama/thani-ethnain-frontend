<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-6">
          {{$t('products.form.unit')}}
        </div>
        <div class="col-xl-5">
          {{$t('products.form.quantity')}}
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <unitItem v-for="(rowItem, index) in $parent.item.productUnits" :key="index" :index="index" :item="rowItem"></unitItem>
    <button class="btn btn-success w-100 mb-4" @click="$parent.addUnit()">
        <i class="fas fa-plus"></i> {{$t('invoices.form.addition')}}
    </button>
  </div>
</template>
<script>

  import unitItem from './unitItem.vue'
  export default {
    components: {
      unitItem
    }
  }

</script>

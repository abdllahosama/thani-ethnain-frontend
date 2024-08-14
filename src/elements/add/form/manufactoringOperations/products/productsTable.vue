<template>
  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-3">اسم المنتج</div>
        <div class="col-xl-2">الوحدة</div>
        <div :class="$option.count_allow ? 'col-xl-1' : 'col-xl-2'">{{ $t('invoices.form.Quantity') }}</div>
        <div class="col-xl-1" v-if="$option.count_allow">العدد</div>
        <div class="col-xl-2">السعر</div>
        <div class="col-xl-2">{{ $t('invoices.form.Total') }}</div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <quotationItem
      v-for="(rowItem, index) in $parent.item.manufacturingOperationProducts"
      :key="index"
      :index="index"
      :item="rowItem"
    />
    <button
      class="btn btn-success w-100 mb-4"
      @click="$parent.addManufacturingOperationProduct()"
    >
      <i class="fas fa-plus"></i> {{ $t('invoices.form.addition') }}
    </button>
  </div>
</template>
<script>
import quotationItem from "./quotationItem.vue";
export default {
    data(){
      return{
        items: [],
        filteredItems: [],
      }
    },
    methods: {
      updateQuantities () {
        this.filteredItems = []
        this.items.forEach(item =>{
          if (item.track_quantity == 0 ) {
            this.filteredItems.push(item)
          } else {
          var productQuantities = this.$database.productQuantities.filter(el => el.product_id == item.id)
          if (productQuantities.length > 0) {
            var quantity = 0
            productQuantities.forEach(productQuantity => {
              quantity += productQuantity.quantity
            })
            item.quantity = quantity
            this.filteredItems.push(item)
          } else {
            item.quantity = 0
            this.filteredItems.push(item)
          }

          }


        })
      }
    },
    mounted () {
      this.items = this.$database.products.concat(this.$database.materials)
      this.updateQuantities()
    },
    watch: {
      '$database.productQuantities': function () {
        this.updateQuantities()
      }
    },
    components: {
      quotationItem,
    },
};
</script>

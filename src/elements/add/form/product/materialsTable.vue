<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-6">
           {{$t('products.form.materialName')}}
        </div>
        <div class="col-xl-5">
          {{$t('products.form.quantity')}}
        </div>
        <div class="col-xl-1"></div>
      </div>
    </div>
    <materialItem v-for="(rowItem, index) in $parent.item.productMaterials" :key="index" :index="index" :item="rowItem"/>
    <button class="btn btn-success w-100 mb-4" @click="$parent.addMaterial()">
        <i class="fas fa-plus"></i> {{$t('invoices.form.addition')}}
    </button>
  </div>
</template>
<script>

  import materialItem from './materialItem.vue'
  export default {
    data(){
      return{
        items: [],
        filteredItems: [],
      }
    },
    mounted () {
      this.items = this.$database.products.concat(this.$database.materials)
      this.filteredItems = []
      this.items.forEach(item =>{
        if (item.track_quantity == 1 ) {
          this.filteredItems.push(item)
        }
      })
    },
    components: {
      materialItem
    }
  }

</script>

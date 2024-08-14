<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-5">
          اسم العملية
        </div>
          <div class="row col-6">
            <div class="col-xl-5">
              تاريخ البدأ
            </div>
            <div class="col-xl-3">
              تاريخ الإنتهاء
          </div>
        </div>  
      </div>
    </div>
    <quotationItem v-for="(rowItem, index) in $parent.item.quotationItems" :key="index" :index="index" :item="rowItem"></quotationItem>
    <button class="btn btn-success w-100 mb-4" @click="$parent.addQuotationItem()">
        <i class="fas fa-plus"></i> {{$t('invoices.form.addition')}}
    </button>
  </div>

</template>
<script>

  import quotationItem from './quotationItem.vue'
  export default {
    data(){
      return{
        items: [],
        filteredItems: [],
      }
    },
    mounted () {
      this.items = this.$database.products.concat(this.$database.materials)
    },
    
    components: {
      quotationItem
    }
  }

</script>

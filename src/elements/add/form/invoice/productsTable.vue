<template>

  <div class="col-12">
    <div class="d-xl-block d-none">
      <div class="row invoice-table-header">
        <div class="col-xl-3">
          <div class="row">
            <div class="col-xl-9">
              {{$t('invoices.form.ProductItem')}}
            </div>
            <div class="col-xl-3">
            {{$t('invoices.form.unit')}}
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div class="row">
            <div :class="$option.count_allow ? 'col-xl-3' : 'col-xl-6'">
              {{$t('invoices.form.Quantity')}}
            </div>
            <div class="col-xl-3" v-if="$option.count_allow">
              {{$t('invoices.form.theNumber')}}
            </div>
            <div class="col-xl-6">
              {{$t('invoices.form.price')}}
            </div>
          </div>
        </div>
        <div class="col-xl-2" v-if="$option.invoices_required_data.find(el => el.id == 4)">
          {{$t('invoices.form.taxAndDiscount')}}
        </div>
        <div class="col-xl-3">
          <div class="row">
            <div class="col-xl-3" v-html="$t('invoices.form.subTotal')">

            </div>
            <div class="col-xl-3">
              {{$t('invoices.form.theAverage')}}
            </div>
            <div class="col-xl-3">
              {{$t('invoices.form.Total')}}
            </div>
            <div class="col-xl-3"></div>
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
    methods: {
      updateQuantities () {
        this.filteredItems = []
        this.items.forEach(item =>{
          if (item.track_quantity == 0 ) {
            this.filteredItems.push(item)
          } else {

          var productQuantity = this.$database.productQuantities.find(el => el.product_id == item.id && el.store_id == this.$parent.item.store_id )
          if (productQuantity) {
            if (productQuantity.quantity > 0) {
              item.quantity = productQuantity.quantity
              this.filteredItems.push(item)
            }
          }

          }
        })
      }
    },
    mounted () {
      this.items = this.$database.products.concat(this.$database.materials)
    },
    watch: {
      '$parent.item.store_id': function(){
        this.updateQuantities()
      },
      '$database.productQuantities': function () {
        this.updateQuantities()
      }

    },
    components: {
      quotationItem
    }
  }

</script>

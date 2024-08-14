<template>

  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-2">
        <label class="d-xl-none"> {{$t('freePrint.goldInvoice.item')}}</label>
        <input type="text" class="form-control w-100" placeholder="اسم الصنف"  v-model="item.name">
    </div>
 

      
      <div class="col-xl-1">
      <label class="d-xl-none">  {{$t('freePrint.goldInvoice.theNumber')}} </label>
      <input type="number" class="form-control w-100"   placeholder="0"  v-model="item.count">
    </div>
      

      <div class="col-xl-2">
        <label class="d-xl-none">{{$t('freePrint.goldInvoice.caliber')}}</label>
        <select class="form-control w-100" v-model="item.k">
          <option value="18">18</option>
          <option value="21">21</option>
        </select>
      </div>
      
      <div class="col-xl-2">
        <label class="d-xl-none">{{$t('freePrint.goldInvoice.gram')}}</label>
        <input type="number" class="form-control w-100"  placeholder="0"  v-model="item.g">
      </div>
      
      <div class="col-xl-2">
        <label class="d-xl-none"> {{$t('freePrint.goldInvoice.milligram')}}</label>
        <input type="number" class="form-control w-100"  placeholder="0"  v-model="item.mg">
      </div>
      
      <div class="col-xl-2">
        <label class="d-xl-none">  {{$t('freePrint.goldInvoice.pound')}} </label>
        <input type="number" class="form-control w-100"  placeholder="0"  v-model="item.price">
      </div>
      
    <div class="col-xl-1">
        <button class="btn btn-danger" @click="deleteItem()" :disabled="$parent.$parent.options.quotationItems.length <= 1">
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
        items: {}
      }
    },
    methods: {
      searchItem() {
        this.showItemsList = true
        var search = this.item.product_name
        var editsearch = new RegExp(search, 'i')
        var products = this.$parent.filteredItems.sort(this.$dynamicSort({orderBy: 'name', orderType:'desc'})).filter(el => editsearch.test(el.name)).slice(0, 20)
        if (typeof products != 'undefined') {
          this.searchProducts = products
        } else {
          this.searchProducts = []
        }
      },
      changeProduct(Product) {
        this.item.product_id = Product.id
        this.item.product_name = Product.name
        this.item.barcode     = Product.barcode
        this.item.price     = Product.price
        this.item.quantity = 1
        this.searchProducts = {}
        this.noSearch = true
        this.removeItemList()
      },
      blurSearch() {
        setTimeout(() => {
          this.searchProducts = {}
        }, 200)
      },
      deleteItem() {
        this.$parent.$parent.options.quotationItems.splice(this.$parent.$parent.options.quotationItems.indexOf(this.item), 1)
      },
      selectProduct(e) {
        if (
          (e.key == 'ArrowDown' && this.searchProducts.length != 0) ||
          (e.key == 'ArrowUp' && this.searchProducts.length != 0)
        ) {
          var product = this.searchProducts.find(el => el.focused == true)
          var selected = this.searchProducts.indexOf(product)
          var length = this.searchProducts.length
          if (selected > -1) {
            this.$set(this.searchProducts[selected], 'focused', false)
          }
          if (e.key == 'ArrowDown') {
            if (selected < length - 1) {
              this.$set(this.searchProducts[selected + 1], 'focused', true)
            } else {
              this.$set(this.searchProducts[0], 'focused', true)
            }
          } else if (e.key == 'ArrowUp') {
            if (selected > 0) {
              this.$set(this.searchProducts[selected - 1], 'focused', true)
            } else {
              this.$set(this.searchProducts[length - 1], 'focused', true)
            }
          }
        } else if (e.key == 'Enter') {
          var eproduct = this.searchProducts.find(el => el.focused == true)
          var eselected = this.searchProducts.indexOf(eproduct)
          if (eselected != -1) {
            this.changeProduct(eproduct)
          }
        }
      },
      removeItemList() {
        this.showItemsList = false
      },
      removeItem () {
        this.item.product_id = ''
        this.item.product_name = ''
        this.item.price = ''
        this.item.quantity = ''
      }
    },
    mounted () {
      this.items = this.$database.products.concat(this.$database.materials)
    },
    props: ['item', 'index']
  }

</script>

<template>

  <div class="form-group col-md-6 row">
    <label class="col-md-4">
               اسم المورد
           </label>
    <div class="col-md-7">
      <div class="search-container" v-click-outside="removeSupplierList">
        <div :class="this.$parent.item.supplier_id != 0 && !disabled ? 'add-input' : ''">
          <input type="search"
                 autocomplete="off"
                 v-model="$parent.item.supplier.name"
                 class="form-control"
                 maxlength="255"
                 @keydown="selectSupplier"
                 @keyup="searchSupplier"
                 @focus="searchSupplier"
                 :class="{ 'is-invalid' : $parent.errors.name}"
                 :disabled="this.$parent.item.supplier_id != 0">
          <span class="btn btn-danger" v-if="this.$parent.item.supplier_id != 0 && !disabled" @click="removeSupplier"><i class="fas fa-times"></i></span>
        </div>

        <div class="invalid-feedback">هذا الحقل مطلوب</div>
        <ul class="list-unstyled search-selects" v-if="searchSuppliers.length > 0 && $parent.item.supplier_id == 0 && showSuppliersList">
          <li v-for="supplier in searchSuppliers"
              :key="supplier.id"
              @click="addSupplierFromSearch(supplier.id)"
              :class="{'focusd': supplier.focused}">{{supplier.name}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {
        searchSuppliers: [],
        showSuppliersList: false,
        addedSupplier: false
      }
    },
    methods: {
      searchSupplier() {
        var search = this.$parent.item.supplier.name
        if (this.addedSupplier) {
          this.addedSupplier = false
        } else {
          this.showSuppliersList = true
          var editsearch = new RegExp(search, 'i')
          var suppliers = this.$database.suppliers.sort(this.$dynamicSort({ orderBy: "name", orderType: "desc" })).filter(el => editsearch.test(el.name)).slice(0, 20)
          if (typeof suppliers != 'undefined') {
            this.searchSuppliers = suppliers
          } else {
            this.searchSuppliers = []
          }
        }
      },
      selectSupplier(e) {
        if (
          (e.key == 'ArrowDown' && this.searchSuppliers.length != 0) ||
          (e.key == 'ArrowUp' && this.searchSuppliers.length != 0)
        ) {
          var supplier = this.searchSuppliers.find(el => el.focused == true)
          var selected = this.searchSuppliers.indexOf(supplier)
          var length = this.searchSuppliers.length
          if (selected > -1) {
            this.$set(this.searchSuppliers[selected], 'focused', false)
          }
          if (e.key == 'ArrowDown') {
            if (selected < length - 1) {
              this.$set(this.searchSuppliers[selected + 1], 'focused', true)
            } else {
              this.$set(this.searchSuppliers[0], 'focused', true)
            }
          } else if (e.key == 'ArrowUp') {
            if (selected > 0) {
              this.$set(this.searchSuppliers[selected - 1], 'focused', true)
            } else {
              this.$set(this.searchSuppliers[length - 1], 'focused', true)
            }
          }
        } else if (e.key == 'Enter') {
          var esupplier = this.searchSuppliers.find(el => el.focused == true)
          var eselected = this.searchSuppliers.indexOf(esupplier)
          if (eselected != -1) {
            this.addSupplierFromSearch(esupplier.id, esupplier.name)
            this.showSuppliersList = false
          }
        }
      },
      addSupplierFromSearch(id) {
        var supplier = this.$database.suppliers.find(el => el.id == id)
        this.$parent.item.supplier_id = id
        this.$parent.item.supplier = supplier
        this.addedSupplier = true
      },
      removeSupplierList() {
        this.showSuppliersList = false
      },
      removeSupplier() {
        this.$parent.item.supplier_id = 0
        this.$parent.item.supplier = {}
        this.searchSuppliers = []
      }
    },
    props: ['disabled'],
  }

</script>

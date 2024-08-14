<template>

  <div class="form-group col-md-6 row">
    <label class="col-md-4">
             اسم العميل
         </label>
    <div class="col-md-7">
      <div class="search-container" v-click-outside="removeCustomerList">
        <div :class="this.$parent.item.customer_id != 0 && !disabled ? 'add-input' : ''">
          <input type="search"
                 autocomplete="off"
                 v-model="$parent.item.customer.name"
                 class="form-control"
                 maxlength="255"
                 @keydown="selectCustomer"
                 @keyup="searchCustmer"
                 @focus="searchCustmer"
                 :class="{ 'is-invalid' : $parent.errors.name}"
                 :disabled="this.$parent.item.customer_id != 0">
          <span class="btn btn-danger" v-if="this.$parent.item.customer_id != 0 && !disabled" @click="removeCustomer"><i class="fas fa-times"></i></span>
        </div>
        <div class="invalid-feedback">هذا الحقل مطلوب</div>
        <ul class="list-unstyled search-selects" v-if="searchCustomers.length > 0 && $parent.item.customer_id == 0 && showCustomersList">
          <li v-for="customer in searchCustomers"
              :key="customer.id"
              @click="addCustomerFromSearch(customer.id)"
              :class="{'focusd': customer.focused}">{{customer.name}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>

  export default {
    data() {
      return {
        searchCustomers: [],
        showCustomersList: false,
        addedCustomer: false
      }
    },
    methods: {
      searchCustmer() {
        var search = this.$parent.item.customer.name
        if (this.addedCustomer) {
          this.addedCustomer = false
        } else {
          this.$parent.item.customer_id = 0
          this.showCustomersList = true
          var editsearch = new RegExp(search, 'i')
          var customers = this.$database.customers.sort(this.$dynamicSort({ orderBy: "name", orderType: "desc" })).filter(el => editsearch.test(el.name)).slice(0, 20)
          if (typeof customers != 'undefined') {
            this.searchCustomers = customers
          } else {
            this.searchCustomers = []
          }
        }
      },
      selectCustomer(e) {
        if (
          (e.key == 'ArrowDown' && this.searchCustomers.length != 0) ||
          (e.key == 'ArrowUp' && this.searchCustomers.length != 0)
        ) {
          var customer = this.searchCustomers.find(el => el.focused == true)
          var selected = this.searchCustomers.indexOf(customer)
          var length = this.searchCustomers.length
          if (selected > -1) {
            this.$set(this.searchCustomers[selected], 'focused', false)
          }
          if (e.key == 'ArrowDown') {
            if (selected < length - 1) {
              this.$set(this.searchCustomers[selected + 1], 'focused', true)
            } else {
              this.$set(this.searchCustomers[0], 'focused', true)
            }
          } else if (e.key == 'ArrowUp') {
            if (selected > 0) {
              this.$set(this.searchCustomers[selected - 1], 'focused', true)
            } else {
              this.$set(this.searchCustomers[length - 1], 'focused', true)
            }
          }
        } else if (e.key == 'Enter') {
          var ecustomer = this.searchCustomers.find(el => el.focused == true)
          var eselected = this.searchCustomers.indexOf(ecustomer)
          if (eselected != -1) {
            this.addCustomerFromSearch(ecustomer.id, ecustomer.name)
            this.showCustomersList = false
          }
        }
      },
      addCustomerFromSearch(id) {
        var customer = this.$database.customers.find(el => el.id == id)
        this.$parent.item.customer_id = id
        this.$parent.item.customer = customer
        this.addedCustomer = true
      },
      removeCustomerList() {
        var chek = this
        setTimeout(function() {
          chek.showCustomersList = false
        }, 100)
      },
      removeCustomer() {
        this.$parent.item.customer_id = 0
        this.$parent.item.customer = {}
        this.searchCustomers = []
      }
    },
    props: ['disabled'],
  }

</script>

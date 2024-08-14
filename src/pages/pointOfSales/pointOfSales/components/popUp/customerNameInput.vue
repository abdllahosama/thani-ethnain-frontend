<template>

  <div class="form-group row cash-form">
    <label class="col-12">
             {{$t('components.pointOfSalesPopUp.customerName')}}
         </label>
    <div class="col-12">
      <div class="search-container" v-click-outside="removeCustomerList">
        <div :class="this.$parent.item.customer_id != 0 && !disabled ? 'add-input' : ''">
          <input type="search"
                 autocomplete="off"
                 v-model="$parent.item.customer.name"
                 class="form-control"
                 @keydown="selectCustomer"
                 @keyup="searchCustmer"
                 @focus="showCustomersList = true"
                 :class="{ 'is-invalid' : $parent.errors.name}"
                 :disabled="$parent.item.customer_id != 0">
          <span class="btn btn-danger" v-if="this.$parent.item.customer_id != 0 && !disabled" @click="removeCustomer"><i class="fas fa-times"></i></span>
        </div>
        <div class="invalid-feedback">{{$t('components.pointOfSalesPopUp.ThisFieldIsRequired')}}</div>
        <ul class="list-unstyled search-selects" v-if="searchCustomerSplitPopUp.length > 0 && $parent.item.customer_id == 0 && showCustomersList">
          <li v-for="customer in searchCustomerSplitPopUp"
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
        searchCustomerSplitPopUp: [],
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
          var customers = this.$database.customers.filter(el => editsearch.test(el.name)).slice(0, 20)
          if (typeof customers != 'undefined' && search != '') {
            this.searchCustomerSplitPopUp = customers
          } else {
            this.searchCustomerSplitPopUp = []
          }
        }
      },
      selectCustomer(e) {
        if (
          (e.key == 'ArrowDown' && this.searchCustomerSplitPopUp.length != 0) ||
          (e.key == 'ArrowUp' && this.searchCustomerSplitPopUp.length != 0)
        ) {
          var customer = this.searchCustomerSplitPopUp.find(el => el.focused == true)
          var selected = this.searchCustomerSplitPopUp.indexOf(customer)
          var length = this.searchCustomerSplitPopUp.length
          if (selected > -1) {
            this.$set(this.searchCustomerSplitPopUp[selected], 'focused', false)
          }
          if (e.key == 'ArrowDown') {
            if (selected < length - 1) {
              this.$set(this.searchCustomerSplitPopUp[selected + 1], 'focused', true)
            } else {
              this.$set(this.searchCustomerSplitPopUp[0], 'focused', true)
            }
          } else if (e.key == 'ArrowUp') {
            if (selected > 0) {
              this.$set(this.searchCustomerSplitPopUp[selected - 1], 'focused', true)
            } else {
              this.$set(this.searchCustomerSplitPopUp[length - 1], 'focused', true)
            }
          }
        } else if (e.key == 'Enter') {
          var ecustomer = this.searchCustomerSplitPopUp.find(el => el.focused == true)
          var eselected = this.searchCustomerSplitPopUp.indexOf(ecustomer)
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
        this.searchCustomerSplitPopUp = []
      }
    },
    props: ['disabled'],
  }

</script>

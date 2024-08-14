<template>
  <div>
    <div class="row">
      <label  class="col-sm-3"> {{$t('components.pointOfSalesInputs.customerName')}} </label>
      <div class="col-md-7">
        <div
          class="input-group"
          v-click-outside="removeCustomerList"
        >
          <div :class="$parent.$parent.item.customer_id != 0 ? 'add-input  w-100' : ' w-100'">
            <input
              type="search"
              autocomplete="off"
              maxlength="200"
              v-model="$parent.$parent.item.customer.name"
              class="form-control list-search"
              @keydown="selectCustomer"
              @keyup="searchCustmer"
              @focus="searchCustmer"
              :disabled="$parent.$parent.item.customer_id != 0"
            />
            <span class="btn btn-danger" v-if="$parent.$parent.item.customer_id != 0" @click="removeCustomer"><i class="fas fa-times"></i></span>
          </div>
          <ul
            class="list-unstyled search-selects"
            v-if="
              searchCustomers.length > 0 &&
              $parent.$parent.item.customer_id == 0 &&
              showCustomersList
            "
          >
            <li
              v-for="customer in searchCustomers"
              :key="customer.id"
              @click="addCustomerFromSearch(customer.id)"
              :class="{ focusd: customer.focused }"
            >
              {{ customer.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      customers: {},
      searchCustomers: [],
      showCustomersList: false,
      addedCustomer: false,
    };
  },
  methods: {
    searchCustmer() {
      var search = this.$parent.$parent.item.customer.name;
      if (this.addedCustomer) {
        this.addedCustomer = false;
      } else {
        this.$parent.$parent.item.customer_id = 0;
        this.showCustomersList = true;
        var editsearch = new RegExp(search, "i");
        var customers = this.$database.customers
        .sort(this.$dynamicSort({orderBy: 'name', orderType:'desc'}))
        .filter((el) => editsearch.test(el.name)).slice(0, 10);
        if (typeof customers != "undefined") {
          this.searchCustomers = customers;
        } else {
          this.searchCustomers = [];
        }
      }
    },
    selectCustomer(e) {
      if (
        (e.key == "ArrowDown" && this.searchCustomers.length != 0) ||
        (e.key == "ArrowUp" && this.searchCustomers.length != 0)
      ) {
        var customer = this.searchCustomers.find((el) => el.focused == true);
        var selected = this.searchCustomers.indexOf(customer);
        var length = this.searchCustomers.length;
        if (selected > -1) {
          this.$set(this.searchCustomers[selected], "focused", false);
        }
        if (e.key == "ArrowDown") {
          if (selected < length - 1) {
            this.$set(this.searchCustomers[selected + 1], "focused", true);
          } else {
            this.$set(this.searchCustomers[0], "focused", true);
          }
        } else if (e.key == "ArrowUp") {
          if (selected > 0) {
            this.$set(this.searchCustomers[selected - 1], "focused", true);
          } else {
            this.$set(this.searchCustomers[length - 1], "focused", true);
          }
        }
      } else if (e.key == "Enter") {
        var ecustomer = this.searchCustomers.find((el) => el.focused == true);
        var eselected = this.searchCustomers.indexOf(ecustomer);
        if (eselected != -1) {
          this.addCustomerFromSearch(ecustomer.id);
          this.showCustomersList = false;
        }
      }
    },
    addCustomerFromSearch(id) {
      var customer = this.$database.customers.find((el) => el.id == id);
      this.$parent.$parent.item.customer_id = id;
      this.$parent.$parent.item.customer = customer;

      this.$parent.$parent.shippingOperation.shipping_address_id = 0
      this.$parent.$parent.shippingOperation.address1 = ""
      this.$parent.$parent.shippingOperation.address2 = ""
      this.$parent.$parent.shippingOperation.city = ""
      this.$parent.$parent.shippingOperation.floor = ""
      this.$parent.$parent.shippingOperation.flat = ""
      this.$parent.$parent.shippingOperation.mobile = ""
      this.$parent.$parent.shippingOperation.mobile2 = ""
      this.$parent.$parent.shippingOperation.city_id = 0
      this.$parent.$parent.shippingOperation.cost = ""
      
      this.addedCustomer = true;
    },
    removeCustomerList() {
      var chek = this;
      setTimeout(function () {
        chek.showCustomersList = false;
      }, 100);
    },
    removeCustomer () {
      this.$parent.$parent.item.customer_id = 0
      this.$parent.$parent.item.customer = {}
      this.searchCustomers = []

      this.$parent.$parent.shippingOperation.shipping_address_id = 0
      this.$parent.$parent.shippingOperation.address1 = ""
      this.$parent.$parent.shippingOperation.address2 = ""
      this.$parent.$parent.shippingOperation.city = ""
      this.$parent.$parent.shippingOperation.floor = ""
      this.$parent.$parent.shippingOperation.flat = ""
      this.$parent.$parent.shippingOperation.mobile = ""
      this.$parent.$parent.shippingOperation.mobile2 = ""
      this.$parent.$parent.shippingOperation.city_id = 0
      this.$parent.$parent.shippingOperation.cost = ""
    }
  },
};
</script>

<template>
  <div>
    <div class="form-group row">
      <label class="col-12"> {{$t('components.pointOfSalesInputs.customerName')}} </label>
      <div
        v-click-outside="removeCustomerList"
        class="form-group input-group col-12"
      >
        <div :class="$parent.item.customer_id != 0 ? 'add-input w-100' : 'w-100'">
          <input
            type="search"
            autocomplete="off"
            maxlength="200"
            v-model="$parent.item.customer.name"
            class="form-control list-search"
            @keydown="selectCustomer"
            @keyup="searchCustmer"
            @focus="showCustomersList = true"
            :disabled="$parent.item.customer_id != 0"
          />
          <span class="btn btn-danger" v-if="$parent.item.customer_id != 0" @click="removeCustomer"><i class="fas fa-times"></i></span>
        </div>
        <ul
          class="list-unstyled search-selects"
          v-if="
            searchCustomers.length > 0 &&
            $parent.item.customer_id == 0 &&
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
      var search = this.$parent.item.customer.name;
      if (this.addedCustomer) {
        this.addedCustomer = false;
      } else {
        this.$parent.item.customer_id = 0;
        this.showCustomersList = true;
        var editsearch = new RegExp(search, "i");
        var customers = this.$database.customers
        .sort(this.$dynamicSort({orderBy: 'name', orderType:'desc'}))
        .filter((el) => editsearch.test(el.name)).slice(0, 10);
        if (typeof customers != "undefined" && search != "") {
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
          this.addCustomerFromSearch(ecustomer.id, ecustomer.name);
          this.showCustomersList = false;
        }
      }
    },
    addCustomerFromSearch(id) {
      var customer = this.$database.customers.find((el) => el.id == id);
      this.$parent.item.customer_id = id;
      this.$parent.item.customer = customer;
      this.addedCustomer = true;
    },
    removeCustomerList() {
      var chek = this;
      setTimeout(function () {
        chek.showCustomersList = false;
      }, 100);
    },
    removeCustomer () {
      this.$parent.item.customer_id = 0
      this.$parent.item.customer = {}
      this.searchCustomers = []
    }
  },
};
</script>

<template>
  <div>
    <div
      class="input-group input-group-flush w-100 search-input"
      v-click-outside="removeCustomerList"
    >
      <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-map"></i></span>
      </div>
      <input
        :placeholder="$t('components.pointOfSalesInputs.CustomerAddress')"
        type="search"
        autocomplete="off"
        v-model="$parent.item.customer.address"
        class="form-control"
        @keydown="selectCustomer"
        @focus="showCustomersList = true"
        maxlength="200"
      />
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
          {{ customer.address1 }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";

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
      var search = this.$parent.customer_address;
      if (this.addedCustomer) {
        this.addedCustomer = false;
      } else {
        this.$parent.item.customer_id = 0;
        this.showCustomersList = true;
        var editsearch = new RegExp(search, "i");
        var customers = this.$database.customers
          .filter((el) => editsearch.test(el.address1))
          .slice(0, 20);
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
      this.$parent.item.customer = customer
      this.addedCustomer = true;
    },
    removeCustomerList() {
      var chek = this;
      setTimeout(function () {
        chek.showCustomersList = false;
      }, 100);
    },
  },
};
</script>

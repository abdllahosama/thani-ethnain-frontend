<template>
  <div>
    <div class="row">
      <label class="col-sm-3">{{$t('components.pointOfSalesInputs.phoneNumber')}}</label>
      <div class="col-md-7">
        <div
          class="input-group"
          v-click-outside="removeCustomerList"
        >
          <input
            type="search"
            autocomplete="off"
            v-model="$parent.$parent.item.customer.mobile"
            class="form-control"
            @keydown="selectCustomer"
            @keyup="searchCustmer"
            @focus="searchCustmer"
            maxlength="200"
            :disabled="$parent.$parent.item.customer_id != 0"
          />

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
              {{ customer.mobile }}
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
      var search = this.$parent.$parent.item.customer.mobile;
      if (this.addedCustomer) {
        this.addedCustomer = false;
      } else {
        this.$parent.$parent.item.customer_id = 0;
        this.showCustomersList = true;
        var editsearch = new RegExp(search, "i");
        var customers = this.$database.customers
          .sort(this.$dynamicSort({orderBy: 'mobile', orderType:'desc'}))
          .filter((el) => editsearch.test(el.mobile)  && el.mobile != null && el.mobile != "")
          .slice(0, 10);
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
      this.$parent.$parent.item.customer_id = id;
      this.$parent.$parent.item.customer = customer;

      this.$parent.$parent.shippingOperation.address1 = customer.address1
      this.$parent.$parent.shippingOperation.address2 = customer.address2
      this.$parent.$parent.shippingOperation.city = customer.city
      this.$parent.$parent.shippingOperation.floor = customer.floor
      this.$parent.$parent.shippingOperation.flat = customer.flat
      this.$parent.$parent.shippingOperation.mobile = customer.mobile
      this.$parent.$parent.shippingOperation.mobile2 = customer.mobile2
      
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

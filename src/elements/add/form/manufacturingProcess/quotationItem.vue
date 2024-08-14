<template>
  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-4">
      <label class="d-xl-none"> اسم العملية </label>
      <div class="search-container" v-click-outside="removeItemList">
        <div :class="item.product_id != 0 ? 'add-input' : ''">
          <input
            type="text"
            class="form-control w-100"
            :class="{ 'is-invalid': item.productNameError }"
            autocomplete="off"
            :placeholder="'اسم العملية'"
            v-model="item.product_name"
            @change="updateItem()"
            :disabled="item.product_id != 0"
          />
          <span
            class="btn btn-danger"
            v-if="item.product_id != 0"
            @click="removeItem"
            ><i class="fas fa-times"></i
          ></span>
        </div>
        <ul
          class="list-unstyled search-selects"
          v-if="searchProducts.length > 0 && showItemsList"
        >
          <li
            v-for="product in searchProducts"
            :key="product.id"
            @click="changeProduct(product)"
            :class="{ focusd: product.focused }"
          >
            {{ product.name }}
            <span
              v-if="product.track_quantity == 1"
              class="quotation-item-quantity"
              >{{ product.quantity }}
            </span>
            <span
              class="quotation-item-quantity"
              v-if="product.track_quantity == 0"
              ><i class="fal fa-infinity"></i
            ></span>
          </li>
        </ul>
      </div>
      <div class="mt-1" v-if="item.product_id == ''">
        <input
          type="checkbox"
          value="true"
          id="addToProducts"
          v-model="item.add_product"
        />
        <label for="addToProducts" class="mr-1 prevent-select"
          >اضافة الي المنتجات</label
        >
      </div>
      <textarea
        class="form-control w-100"
        :placeholder="
          $t('quotations.form.EnterADescription')
        "
        v-model="item.description"
        @change="updateItem()"
        :disabled="
          $user.admin ||
          $user.role.invoices_edit_product
            ? false
            : true
        "
      ></textarea>
    </div>

    <div class="col-xl-8">
      <div class="row">
        <div class="col-xl-5">
          <VueCtkDateTimePicker
            label="إختر الوقت والتاريخ"
            button-now-translation="الان"
            v-model="end_date"
            format="YYYY-MM-DD hh:mm a"
            color="#631263"
            button-color="#631263"/>
        </div>

        <div class="col-xl-5">
          <VueCtkDateTimePicker
            label="إختر الوقت والتاريخ"
            button-now-translation="الان"
            v-model="end_date"
            format="YYYY-MM-DD hh:mm a"
            color="#631263"
            button-color="#631263" />
        </div>

        <diV class="col-2">
          <button class="btn btn-danger" @click="deleteItem()">
            <i class="far fa-trash"></i>
          </button>
        </diV>
      </div>
    </div>
  </div>
</template>
<script>
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/manufacturingProcessItems",
      searchProducts: {},
      noSearch: false,
      showItemsList: false,
      date: new Date().toISOString("ar-EG", { timeZone: "Africa/Cairo" }),
      start_date: new Date().toISOString("ar-EG", { timeZone: "Africa/Cairo" }),
      end_date: new Date().toISOString("ar-EG", { timeZone: "Africa/Cairo" }),
    };
  },
  methods: {
    searchItem() {
      this.showItemsList = true;
      var search = this.item.product_name;
      var editsearch = new RegExp(search, "i");
      var products = this.$parent.filteredItems
        .sort(this.$dynamicSort({ orderBy: "name", orderType: "desc" }))
        .filter((el) => editsearch.test(el.name))
        .slice(0, 20);
      if (typeof products != "undefined") {
        this.searchProducts = products;
      } else {
        this.searchProducts = [];
      }
    },

    updateItem() {
      if (this.item.discount_rate !== 0) {
        this.item.subtotal =
          this.item.quantity *
          this.item.price *
          ((100 - this.item.discount_rate) / 100);
        this.item.discount =
          this.item.quantity *
          this.item.price *
          (this.item.discount_rate / 100);
      } else {
        this.item.subtotal = this.item.quantity * this.item.price;
        this.item.discount = 0;
      }


      this.$parent.$parent.changePrice();
    },
    
    blurSearch() {
      setTimeout(() => {
        this.searchProducts = {};
      }, 200);
    },
    deleteItem() {
      this.$parent.$parent.item.quotationItems.splice(
        this.$parent.$parent.item.quotationItems.indexOf(this.item),
        1
      );
      this.$parent.$parent.changePrice();
    },
   
    removeItemList() {
      this.showItemsList = false;
    },
    removeItem() {
      this.item.product_id = "";
      this.item.product_name = "";
      this.item.description = "";
      this.item.price = "";
      this.item.quantity = this.updateItem();
    },
  },
  props: ["item", "index"],

  components: {
    VueCtkDateTimePicker,
  },
};
</script>

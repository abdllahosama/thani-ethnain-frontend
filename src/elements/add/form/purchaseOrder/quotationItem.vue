<template>
  <div class="row pt-4 quotation-item mb-3 pb-3">
    <div class="col-xl-3">
      <div class="row">
        <div class="col-xl-9">
          <label class="d-xl-none"> {{$t('quotations.form.productName')}}</label>
          <div class="search-container" v-click-outside="removeItemList">
            <div :class="item.product_id != 0 ? 'add-input' : ''">
              <input
                type="text"
                class="form-control w-100"
                :class="{ 'is-invalid': item.productNameError }"
                autocomplete="off"
                :placeholder="
                  $t('quotations.form.productName')
                "
                v-model="item.product_name"
                @change="updateItem()"
                @keydown="selectProduct"
                @keyup="searchItem"
                @focus="searchItem"
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
                :title="product.description"
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
          
          <textarea
            class="form-control w-100"
            :placeholder="
              $t('quotations.form.EnterADescription')
            "
            v-model="item.description"
            @keyup="updateItem()"
            :disabled="
              $user.admin ||
              $user.role.purchase_orders_edit_product
                ? false
                : true
            "
          ></textarea>
        </div>
        <div class="col-xl-3">
          <label class="d-xl-none"> {{$t('quotations.form.unit')}} </label>
          <select
            class="form-control w-100"
            v-model="item.unit_id"
            @change="changeUnit"
          >
            <option value="0">{{$t('quotations.form.basicUnit')}}</option>
            <option
              v-for="unit in this.item.units"
              :key="unit.unit.id"
              :value="unit.unit.id"
            >
              {{ unit.unit.name }} [{{ unit.quantity }}]
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="col-xl-4">
      <div class="row">
        <div :class="$option.count_allow ? 'col-xl-3' : 'col-6'"  v-if="item.unit_coefficients.length == 0">
          <label class="d-xl-none"> {{$t('quotations.form.Quantity')}} </label>
          <input
            type="number"
            class="form-control w-100"
            :class="{ 'is-invalid': item.quantityError }"
            placeholder="0"
            min="1"
            :max="item.maxQuantity"
            v-model="item.quantity"
            @keyup="updateItem()"
          />
        </div>
        <div :class="$option.count_allow ? 'col-xl-3' : 'col-xl-6'" v-if="item.unit_coefficients.length > 0">
          <label class="d-xl-none"> {{$t('quotations.form.Quantity')}} </label>
          <div class="w-100 d-flex">
            <div class="" v-for="(unitCoefficient, index) in item.unit_coefficients" :key="index">
              <label>{{unitCoefficient.name}}</label>
              <input
              type="number"
              class="form-control"
              :class="{ 'is-invalid': item.quantityError }"
              :placeholder="0"
              min="1"
              v-model="unitCoefficient.value"
              @keyup="updateItem()"
            />
          </div>
          <div class="">
            <label>{{$t('quotations.form.Quantity')}}</label>
            <input
              type="number"
              class="form-control"
              :class="{ 'is-invalid': item.quantityError }"
              placeholder="0"
              min="1"
              disabled
              :max="item.maxQuantity"
              v-model="item.quantity"
            />
          </div>
          </div>
        </div>
        <div class="col-xl-6">
          <label class="d-xl-none"> {{$t('quotations.form.price')}} </label>
          <div class="add-input table-add-input">
            <input
              type="number"
              class="form-control w-100"
              :class="{ 'is-invalid': item.priceError }"
              placeholder="0"
              v-model="item.price"
              @keyup="updateItem()"
              :disabled="
                $user.admin ||
                $user.role.purchase_orders_edit_product
                  ? false
                  : true
              "
            />
            <span>{{ $parent.$option.currency }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-2" v-if="$option.purchase_orders_required_data.find(el => el.id == 4)">
      <div class="row">
        <div class="col-12">
          <label class="d-xl-none"> {{$t('quotations.form.Tax')}} </label>
          <div class="add-input">
            <select
              class="form-control w-100"
              v-model="item.tax_id"
              @change="addTax()"
              :disabled="
                $user.admin ||
                $user.role.purchase_orders_edit_product
                  ? false
                  : true
              "
            >
              <option value="0">{{$t('quotations.form.chooseTax')}}</option>
              <option value="add">
                [+] {{ $t('quotations.form.addition') }}
              </option>
              <optgroup
                :label="$t('quotations.form.Taxes')"
              >
                <option
                  v-for="tax in $database.taxes"
                  :key="tax.id"
                  :value="tax.id"
                >
                  {{ tax.name }} [{{ tax.rate }}%]
                </option>
              </optgroup>
            </select>
                        <span>%</span>

          </div>
        </div>
        <div class="col-12 mt-xl-2">
          <label class="d-xl-none"> {{$t('quotations.form.rebate')}} </label>
          <div class="add-input">
          <input
              type="number"
              class="form-control w-100"
              v-if="item.discount_type == 1"
              :class="{ 'is-invalid': item.priceError }"
              placeholder="$t('quotations.form.discountValue')"
              v-model="item.discount_value"
              @keyup="updateItem()"
              :disabled="
                $user.admin ||
                $user.role.bills_edit_product
                  ? false
                  : true
              "
            />
            <select
              class="form-control w-100"
              v-model="item.discount_id"
              v-if="item.discount_type == 0"
              @change="addDiscount()"
              :disabled="
                $user.admin ||
                $user.role.purchase_orders_edit_product
                  ? false
                  : true
              "
            >
              <option value="0">{{$t('quotations.form.chooseDiscount')}}</option>
              <option value="add">
                [+] {{ $t('quotations.form.addition') }}
              </option>
              <optgroup
                :label="$t('quotations.form.Discounts')"
              >
                <option
                  v-for="discount in $database.discounts"
                  :key="discount.id"
                  :value="discount.id"
                >
                  {{ discount.name }} [{{ discount.rate }}%]
                </option>
              </optgroup>
            </select>
            <span class="add-input-select" @change="updateItem()">
              <select v-model="item.discount_type">
                <option value="0">%</option>
                <option value="1">$</option>
              </select>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3">
      <div class="row">
        <div class="col-xl-3">
          <label class="d-xl-none pl-3">{{$t('quotations.form.total')}} : </label
          >{{ $moneyFormat(item.subtotal) }}
        </div>
        <div class="col-xl-3">
          <label class="d-xl-none pl-3">{{$t('quotations.form.theAverage')}} : </label
          >{{ $moneyFormat(item.average) }}
        </div>
        <div class="col-xl-3">
          <label class="d-xl-none pl-3">{{$t('quotations.form.Total')}} : </label
          >{{ $moneyFormat(item.total) }}
        </div>
        <div class="col-xl-3">
          <button
            class="btn btn-danger"
            @click="deleteItem()"
            :disabled="$parent.$parent.item.quotationItems.length <= 1"
          >
            <i class="far fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: "/invoiceItems",
      searchProducts: {},
      noSearch: false,
      showItemsList: false,
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
    addTax() {
      if (this.item.tax_id == "add") {
        this.item.tax_id = 0;
        this.$parent.$parent.addTax = 1;
        this.$parent.$parent.$parent.model = 1;
        this.$parent.$parent.itemIndex = this.item.id;
      } else if (this.item.tax_id == 0) {
        this.item.tax_rate = 0;
        this.updateItem();
      } else {
        var id = this.item.tax_id;
        var tax = this.$database.taxes.find(function (
          tax
        ) {
          if (tax.id == id) return true;
        });
        this.item.tax_rate = tax.rate;
        this.updateItem();
      }
    },
    addDiscount() {
      if (this.item.discount_id == "add") {
        this.$parent.$parent.addDiscount = 1;
        this.$parent.$parent.$parent.model = 1;
        this.item.discount_id = 0;
        this.$parent.$parent.itemIndex = this.item.id;
      } else if (this.item.discount_id == 0) {
        this.item.discount_rate = 0;
        this.updateItem();
      } else {
        var id = this.item.discount_id;
        var discount = this.$database.discounts.find(
          function (discount) {
            if (discount.id == id) return true;
          }
        );
        this.item.discount_rate = discount.rate;
        this.updateItem();
      }
    },
    updateItem() {
      if (this.item.unit_coefficients.length > 0) {
        this.item.quantity = 1
        this.item.unit_coefficients.forEach( el => {
          this.item.quantity *= el.value
        })
        this.item.quantity = this.item.quantity.toFixed(1)
      }
      if (this.item.discount_type == 0 ) {
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
      } else {
        this.item.subtotal =
            this.item.quantity *
            (this.item.price - this.item.discount_value );
        this.item.discount = this.item.discount_value * this.item.quantity;
      }

      this.item.average = this.item.subtotal * (this.item.tax_rate / 100);
      this.item.total = this.item.subtotal + this.item.average;

      this.$parent.$parent.changePrice();
    },
    changeProduct(Product) {
      this.item.product_id = Product.id;
      this.item.maxQuantity =
        Product.track_quantity == 1 ? Product.quantity : "";
      this.item.product_name = Product.name;
      this.item.description = Product.description;
      this.item.unit_id = Product.unit_id;
      this.item.price = Product.cost;
      this.item.quantity = 1;
      if (Product.tax_id != 0) {
        this.item.tax_rate = Product.tax_rate;
        this.item.tax_id = Product.tax_id;
      } else {
        this.item.tax_rate = 0;
        this.item.tax_id = 0;
      }
      if (Product.discount_id != 0) {
        this.item.discount_rate = Product.discount_rate;
        this.item.discount_id = Product.discount_id;
      } else {
        this.item.discount_rate = 0;
        this.item.discount_id = 0;
      }
      this.searchProducts = {};
      this.noSearch = true;

      var productUnits =
        this.$database.productUnits.filter(
          (el) => el.product_id == Product.id
        );

      var units = [];
      var unit = this.$database.units.find(
        (el) => el.id == Product.unit_id
      );
      if (unit) {
        var productUnit = {
          unit: unit,
          quantity: 1,
        };
        units.push(productUnit);
      }
      productUnits.forEach((productUnit) => {
        var unit = this.$database.units.find(
          (el) => el.id == productUnit.unit_id
        );
        if (unit) {
          productUnit.unit = unit;
          units.push(productUnit);
        }
      });
      this.item.units = units;

      var productPrice =
        this.$database.productPrices.find(
          (el) =>
            el.product_id == this.item.product_id &&
            el.priceList_id == this.$parent.$parent.item.priceList_id &&
            el.unit_id == this.item.unit_id &&
            el.detail_id == 0
        );
      if (productPrice && productPrice.price != 0) {
        this.item.price = productPrice.cost;
      } else if (this.$parent.$parent.item.priceList_id == 0) {
        this.item.price = Product.cost;
      } else {
        this.item.price = "";
      }

      this.updateItem();
      this.changeUnit();
      this.removeItemList();
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
    selectProduct(e) {
      if (
        (e.key == "ArrowDown" && this.searchProducts.length != 0) ||
        (e.key == "ArrowUp" && this.searchProducts.length != 0)
      ) {
        var product = this.searchProducts.find((el) => el.focused == true);
        var selected = this.searchProducts.indexOf(product);
        var length = this.searchProducts.length;
        if (selected > -1) {
          this.$set(this.searchProducts[selected], "focused", false);
        }
        if (e.key == "ArrowDown") {
          if (selected < length - 1) {
            this.$set(this.searchProducts[selected + 1], "focused", true);
          } else {
            this.$set(this.searchProducts[0], "focused", true);
          }
        } else if (e.key == "ArrowUp") {
          if (selected > 0) {
            this.$set(this.searchProducts[selected - 1], "focused", true);
          } else {
            this.$set(this.searchProducts[length - 1], "focused", true);
          }
        }
      } else if (e.key == "Enter") {
        var item = this.$parent.filteredItems.find(
          (el) => el.barcode == this.item.product_name
        );
        if (item) {
          this.changeProduct(item);
        } else {
          var eproduct = this.searchProducts.find((el) => el.focused == true);
          var eselected = this.searchProducts.indexOf(eproduct);
          if (eselected != -1) {
            this.changeProduct(eproduct);
          }
        }
      }
    },
    removeItemList() {
      this.showItemsList = false;
    },
    removeItem() {
      this.item.product_id = "";
      this.item.product_name = "";
      this.item.description = "";
      this.item.unit_id = 0;
      this.item.price = "";
      this.item.quantity = "";
      this.item.tax_id = 0;
      this.item.discount_id = 0;
      this.updateItem();
    },
    changeUnit() {
      let unit = this.$database.units.find(el => el.id == this.item.unit_id)
      let itemUnitsCoefficients = []
      if (unit) {
        if (Array.isArray(JSON.parse(unit.units_coefficient_id))) {
          itemUnitsCoefficients = this.$database.unitsCoefficients.filter(row => JSON.parse(unit.units_coefficient_id).includes(row.id) )
        }
      }
      this.item.unit_coefficients = []
      itemUnitsCoefficients.forEach(el => {
        this.item.unit_coefficients.push({
          id: el.id,
          name: el.name,
          value: 1
        })
      })
      this.item.unit_coefficients = this.item.unit_coefficients.sort(this.$dynamicSort({ orderBy: "id", orderType: "desc" }))
      var productPrice =
        this.$database.productPrices.find(
          (el) =>
            el.product_id == this.item.product_id &&
            el.priceList_id == this.$parent.$parent.item.priceList_id &&
            el.unit_id == this.item.unit_id &&
            el.detail_id == 0
        );
      if (productPrice && productPrice.price != 0) {
        this.item.price = productPrice.cost;
      } else {
        this.item.price = "";
      }
      this.updateItem();
    },
  },
  watch: {
    "$parent.$parent.item.priceList_id": function () {
      var productPrice =
        this.$database.productPrices.find(
          (el) =>
            el.product_id == this.item.product_id &&
            el.priceList_id == this.$parent.$parent.item.priceList_id &&
            el.unit_id == this.item.unit_id &&
            el.detail_id == 0
        );
      if (productPrice && productPrice.price != 0) {
        this.item.price = productPrice.cost;
      } else {
        this.item.price = "";
      }
      this.updateItem();
    },
  },
  props: ["item", "index"],
};
</script>

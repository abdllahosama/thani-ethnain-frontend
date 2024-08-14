<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="$t('manufacturingWithdrawals.form.AddAWithdrawalWithOperations')"
          :description="$t('manufacturingWithdrawals.form.FromHereYouCanAddAWithdrawalOfOperations')"
          v-if="$route.name == 'manufacturingWithdrawalsCreate'"
        />
        <addHeader
          :title="$t('manufacturingWithdrawals.form.editOperation')"
          :description="$t('manufacturingWithdrawals.form.fromHereYouEditOperation')"
          v-if="$route.name == 'manufacturingWithdrawalsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('manufacturingWithdrawals.form.basicInformation')"
            :description="$t('manufacturingWithdrawals.form.mainIformation')"
            noLine="true"
          />
          <connectionInput
            :title="$t('manufacturingWithdrawals.form.NumberingTheProcess')"
            :group="$t('manufacturingWithdrawals.form.Groups')"
            v-model="item.invoice_group"
            :disabled="
              $user.admin ||
              $user.role.manufacturing_operations_edit_item
                ? false
                : true
            "
            :values="$database.invoiceGroups"
            v-if="$route.name == 'manufacturingWithdrawalsCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('manufacturingWithdrawals.form.NumberingIsRequired')"
          />
          <subFileInput :title="$t('invoices.form.invoiceFile')"
                     v-model="item.file"
                     :file="item.file"
                     :path="'invoices'"
                     :hasErorr="errors.file"
                     :error="$t('allerts.ChooseASuitableFile')"/>
          <formInput
          :title="$t('salesPayments.form.reference')"
          v-model="item.refrance"
          maxlength="255" />

          <formInput
            :title="$t('manufacturingWithdrawals.form.NumberingTheProcess')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'manufacturingWithdrawalsEdit'"
          />

          <formInput
            :title="$t('manufacturingWithdrawals.form.reference')"
            v-model="item.manufacturing_operation_code"
            :disabled="true"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{$t('manufacturingWithdrawals.form.date')}}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('manufacturingWithdrawals.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('manufacturingWithdrawals.form.Now')"
                  v-model="item.date"
                  :disabled="
                    $user.admin ||
                    $user.role.store_withdrawals_edit_item
                      ? false
                      : true
                  "
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>

          <connectionInput
            :title="$t('manufacturingWithdrawals.form.ProductStore')"
            :group="$t('manufacturingWithdrawals.form.stores')"
            v-model="item.store_id"
            :values="$database.stores"
            :hasErorr="errors.store_id"
            :error="$t('manufacturingWithdrawals.form.ThisFieldIsRequired')"
          />

          <monyInput
            :title="$t('manufacturingWithdrawals.form.price')"
            v-model="item.price"
            :disabled="true"
          />

          <selectInput
            :title="$t('invoices.form.Situation')"
            v-model="item.status"
            :values="[
              { name: $t('invoices.draft'), value: 0 },
              { name: $t('invoices.approved'), value: 1 }
            ]"
          />

          
          <dvider
            :title="$t('manufacturingWithdrawals.form.ProductsInformation')"
            :description="$t('manufacturingWithdrawals.form.BillProductInformation')"
          />
          <productsTable class="col-12" />

          <dvider
            :title="$t('manufacturingWithdrawals.form.PaymentDetails')"
            :description="
              $t('manufacturingWithdrawals.form.additionalOperationInformation')
            "
          />

          <formTextarea
            :title="$t('manufacturingWithdrawals.form.thatAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('manufacturingWithdrawals.form.note')"
            v-model="item.notes"
          />

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="
              $route.name == 'manufacturingWithdrawalsCreate' && !$parent.stopEdit
            "
          >
            {{$t('manufacturingWithdrawals.form.AddAProcess')}}

          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'manufacturingWithdrawalsEdit' && !$parent.stopEdit"
          >
            {{$t('manufacturingWithdrawals.form.ProcessModification')}}

          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";

import formInput from "@/elements/add/form/formInput.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import checkInput from "@/elements/add/form/checkInput.vue";

import productsTable from "@/elements/add/form/manufactringWithdrawals/productsTable.vue";

import loading from "@/elements/add/loading.vue";
import subFileInput from "@/elements/add/form/subFileInput.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/manufacturingWithdrawals",
      item: {
        date: "",
        invoice_group: this.$option.manufacturing_withdrawals_invoice_group_id,
        store_id: 0,
        manufacturingWithdrawalProducts: [],
        manufacturing_operation_id: 0,
        price: 0,
        status: 1,
      },
      errors: {
        invoice_group: false,
      },
      itemIndex: null
    };
  },
  mounted() {
    this.$updateDatabase([
      "productQuantities",
      "products",
      "productUnits",
      "units",
      "invoiceGroups",
      "projects",
      "projectItems",
    ]);
    if (this.$route.name == "manufacturingWithdrawalsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
    if (this.$route.name == "manufacturingWithdrawalsCreate") {
      this.item.date = this.$nowDate()
      this.addManufacturingWithdrawalProduct();
      this.getManufacturingOperation();
    }
    var elm = this;
      window.addEventListener("keydown", function (e) {
        if (e.key == "F1" || e.key == "Meta") {
          e.preventDefault();
          elm.saveItem();
        }
    })
  },
  methods: {
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.$parent.stopEdit = false;
          this.item = response.data;

          this.item.manufacturingWithdrawalProducts.forEach((item) => {
            var product = this.$database.products.find(
              (el) => el.id == item.product_id
            );
            if (product) {
              var productUnits = this.$database.productUnits.filter(
                (el) => el.product_id == product.id
              );
              var units = [];
              var unit = this.$database.units.find(
                (el) => el.id == product.unit_id
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
              item.units = units;
            }
          });

          if (this.item.manufacturingWithdrawalProducts.length == 0) {
            this.addManufacturingWithdrawalProduct();
          }

          this.item.date = this.$dateFormat(this.item.date, true)
        });
    },
    saveItem() {
      var error = 0;
      this.errors = [];
      if (
        (typeof this.item.store_id === "undefined" ||
          this.item.store_id == "" ||
          this.item.store_id == 0) &&
        this.$route.name == "manufacturingWithdrawalsCreate"
      ) {
        error = 1;
        this.errors.store_id = true;
      }
      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "manufacturingWithdrawalsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      this.item.manufacturingWithdrawalProducts.forEach((quotationItem) => {
        if (quotationItem.quantity == "" || quotationItem.quantity < 0 ) {
          error = 1;
          quotationItem.quantityError = true;
        } else {
          quotationItem.quantityError = false;
        }
        if (quotationItem.product_name == "") {
          error = 1;
          quotationItem.productNameError = true;
        } else {
          quotationItem.productNameError = false;
        }
      });
      if (error == 0) {
        this.item.date = this.$fixDate(this.item.date);
        if (this.$route.name == "manufacturingWithdrawalsCreate") {
          this.$parent.aletText = this.$t('manufacturingWithdrawals.form.TheInvoiceHasBeenSuccessfullyAdded');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));

          this.item.manufacturingWithdrawalProducts.forEach((quotationItem) => {
            var productUnitQuantity = 1;
            var productUnit = this.$database.productUnits.find(el => el.product_id == quotationItem.product_id && el.unit_id == quotationItem.unit_id)
            if (productUnit) {productUnitQuantity =  productUnit.quantity}

            var productQuantity = this.$database.productQuantities.find(
              (el) =>
                el.product_id == quotationItem.product_id &&
                el.store_id == this.item.store_id
            );
            if (productQuantity && productQuantity.track_quantity == 1) {
              productQuantity.quantity =
                productQuantity.quantity + (quotationItem.quantity * productUnitQuantity);
            }
          });

          localStorage.database = JSON.stringify(this.$database);
          this.$router.go(-1);
          this.$parent.stopEdit = false;
          
        } else if (this.$route.name == "manufacturingWithdrawalsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.stopEdit = false;
              this.$parent.aletText = this.$t('manufacturingWithdrawals.form.invoiceHasBeenModifiedSuccessfully');
              this.$parent.alertType = "success";
              this.$router.go(-1);
              return response;
            });
        }
      } else {
        this.$parent.aletText = this.$t('allerts.pleaseMakeSureOfTheInput');
        this.$parent.alertType = "danger";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    addManufacturingWithdrawalProduct() {
      this.item.manufacturingWithdrawalProducts.push({
        product_name: "",
        product_id: 0,
        description: "",
        unit_id: 0,
        quantity: "",
        count: "",
        total: 0,
        quantityError: false,
        productNameError: false,
        priceError: false
      });
    },
    getManufacturingOperation() {
      axios
        .get(this.$linkGnirator("/manufacturingOperations/" + this.$route.query.manufacturing_operation_id))
        .then((response) => {
          this.$parent.stopEdit = false;
          this.item.manufacturing_operation_code = response.data.code;
          this.item.manufacturing_operation_id   = response.data.id;
        });
    },
    changePrice() {
      this.item.price = 0;
      this.item.manufacturingWithdrawalProducts.forEach((qitem) => {this.item.price += qitem.total;});
    },
  },
  components: {
    dvider,
    addHeader,
    formInput,
    connectionInput,
    formTextarea,
    monyInput,
    selectInput,
    productsTable,
    loading,

    checkInput,

    VueCtkDateTimePicker,
    subFileInput,
  },
  watch: {
    "$option.invoice_invoice_group_id": function (val) {
      this.item.invoice_group = val;
    },
  },
};
</script>

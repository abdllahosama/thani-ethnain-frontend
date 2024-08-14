<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="$t('manufacturingDeposits.form.AddADepositProcessWithManufacturingProcesses')"
          :description="$t('manufacturingDeposits.form.FromHereYouCanAddADepositInManufacturingProcesses')"
          v-if="$route.name == 'manufacturingDepositsCreate'"
        />
        <addHeader
          :title="$t('manufacturingDeposits.form.editOperation')"
          :description="$t('manufacturingDeposits.form.fromHereYouEditOperation')"
          v-if="$route.name == 'manufacturingDepositsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('manufacturingDeposits.form.basicInformation')"
            :description="$t('manufacturingDeposits.form.mainIformation')"
            noLine="true"
          />
          <connectionInput
            :title="$t('manufacturingDeposits.form.NumberingTheProcess')"
            :group="$t('manufacturingDeposits.form.Groups')"
            v-model="item.invoice_group"
            :disabled="$user.admin || $user.role.manufacturing_operations_edit_item ? false: true"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'manufacturingDepositsCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('manufacturingDeposits.form.NumberingIsRequired')"
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
            :title="$t('manufacturingDeposits.form.NumberingTheProcess')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'manufacturingDepositsEdit'"
            maxlength="255" 
          />

          <formInput
            :title="$t('manufacturingWithdrawals.form.reference')"
            v-model="item.manufacturing_operation_code"
            :disabled="true"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{$t('manufacturingDeposits.form.date')}}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('manufacturingDeposits.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('manufacturingDeposits.form.Now')"
                  v-model="item.date"
                  :disabled="$user.admin || $user.role.store_deposit_edit_item ? false: true"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>

          <connectionInput
            :title="$t('manufacturingDeposits.form.ProductStore')"
            :group="$t('manufacturingDeposits.form.Storeres')"
            v-model="item.store_id"
            :values="$database.stores"
            :hasErorr="errors.store_id"
            :error="$t('manufacturingDeposits.form.ThisFieldIsRequired')"
          />
          
          <monyInput
            :title="$t('manufacturingDeposits.form.cost')"
            v-model="item.cost"
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
            :title="$t('manufacturingDeposits.form.ProductsInformation')"
            :description="$t('manufacturingDeposits.form.BillProductInformation')"
          />
          <productsTable class="col-12" />

          <dvider
            :title="$t('manufacturingDeposits.form.PaymentDetails')"
            :description="$t('manufacturingDeposits.form.additionalOperationInformation')"
          />

          <formTextarea
            :title="$t('manufacturingDeposits.form.thatAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('manufacturingDeposits.form.note')"
            v-model="item.notes"
          />

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'manufacturingDepositsCreate' && !$parent.stopEdit"
          >
            {{$t('manufacturingDeposits.form.AddAProcess')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'manufacturingDepositsEdit' && !$parent.stopEdit"
          >
          {{$t('manufacturingDeposits.form.ProcessModification')}}
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

import productsTable from "@/elements/add/form/manufacturingDeposits/productsTable.vue";

import loading from "@/elements/add/loading.vue";
import subFileInput from "@/elements/add/form/subFileInput.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/manufacturingDeposits",
      item: {
        date: "",
        invoice_group: this.$option.manufacturing_deposits_invoice_group_id,
        store_id: 0,
        manufacturingDepositMaterials: [],
        manufacturing_operation_id: 0,
        cost: 0,
        status: 1,
      },
      errors: {
        store_id: false,
        invoice_group: false,
      },
      itemIndex: null,
      print: this.$route.name == "manufacturingDepositsCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "productQuantities",
      'productUnits',
      'units',
      "products",
      "materials",
      "invoiceGroups",
      "stores"
    ]);
    if (this.$route.name == "manufacturingDepositsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
    if (this.$route.name == "manufacturingDepositsCreate") {
      this.item.date = this.$nowDate()
      this.$parent.stopEdit = true;
      this.getManufacturingOperation();
      this.addManufacturingDepositMaterial();
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
          this.item.manufacturingDepositMaterials.forEach((item) => {
            if (item.track_quantity == 1) {
              var productQuantity =
                this.$database.productQuantities.find(
                  (el) =>
                    el.product_id == item.product_id &&
                    el.store_id == this.item.store_id
                );
              if (productQuantity) {
                item.maxQuantity = productQuantity.quantity + item.quantity;
              }
            }
          });
          this.item.manufacturingDepositMaterials.forEach(item => {
            var product = this.$database.products.find(el => el.id == item.product_id)
            if (product) {
              var productUnits = this.$database.productUnits.filter(el => el.product_id == product.id)
              var units = []
              var unit = this.$database.units.find(el => el.id == product.unit_id)
              if (unit) {
                var productUnit = {
                  unit: unit,
                  quantity: 1
                }
                units.push(productUnit)
              }
              productUnits.forEach(productUnit => {
                var unit = this.$database.units.find(el => el.id == productUnit.unit_id)
                if (unit) {
                  productUnit.unit = unit
                  units.push(productUnit)
                }
              })
              item.units = units
            }

          })

          if (this.item.quotationItems.length == 0) {
              this.addManufacturingDepositMaterial()
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
        this.$route.name == "manufacturingDepositsCreate"
      ) {
        error = 1;
        this.errors.store_id = true;
      }
      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "manufacturingDepositsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      this.item.manufacturingDepositMaterials.forEach((quotationItem) => {
        if (quotationItem.quantity == "" || quotationItem.quantity <= 0) {
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
        this.item.date = this.$fixDate(this.item.date)
        if (this.$route.name == "manufacturingDepositsCreate") {
          this.$parent.aletText = this.$t('manufacturingDeposits.form.TheInvoiceHasBeenSuccessfullyAdded');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.item.manufacturingDepositMaterials.forEach((quotationItem) => {
            var productUnitQuantity = 1;
            var productUnit = this.$database.productUnits.find(el => el.product_id == quotationItem.product_id && el.unit_id == quotationItem.unit_id)
            if (productUnit) {productUnitQuantity =  productUnit.quantity}

            var productQuantity = this.$database.productQuantities.find(
              (el) =>
                el.product_id == quotationItem.product_id &&
                el.store_id == this.item.store_id
            );
            if (productQuantity && productQuantity.track_quantity == 1) {
              productQuantity.quantity = productQuantity.quantity + (quotationItem.quantity * productUnitQuantity);
            }
          });

          localStorage.database = JSON.stringify(this.$database);
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "manufacturingDepositsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.stopEdit = false;
              this.$parent.aletText = this.$t('manufacturingDeposits.form.invoiceHasBeenModifiedSuccessfully');
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
    addManufacturingDepositMaterial() {
      this.item.manufacturingDepositMaterials.push({
        product_name: "",
        product_id: 0,
        unit_id: 0,
        quantity: "",
        count: "",
        cost: "",
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
    changePrice () {
      this.item.cost = 0;
      this.item.manufacturingDepositMaterials.forEach((qitem) => {this.item.cost += qitem.total;});
    }
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

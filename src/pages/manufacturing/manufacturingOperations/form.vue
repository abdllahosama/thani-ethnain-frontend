<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="$t('manufacturingOperations.form.AddAManufacturingProcess')"
          :description="$t('manufacturingOperations.form.ThatIsWhereYouCanAddANewManufacturingProcess')"
          v-if="$route.name == 'manufacturingOperationsCreate'"
        />
        <addHeader
          :title="$t('manufacturingOperations.form.ManufacturingProcessModification')"
          :description="$t('manufacturingOperations.form.FromHereYouCanModifyTheManufacturingData')"
          v-if="$route.name == 'manufacturingOperationsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('manufacturingOperations.form.basicInformation')"
            :description="$t('manufacturingOperations.form.BasicInformationForTheManufacturingProcess')"
            noLine="true"
          />

          <connectionInput
            :title="$t('manufacturingOperations.form.ProcessNumbering')"
            :group="$t('manufacturingOperations.form.Groups')"
            v-model="item.invoice_group"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'manufacturingOperationsCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('manufacturingOperations.form.ThisFieldIsRequired')"
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
            :title="$t('manufacturingOperations.form.OperationCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'manufacturingOperationsEdit'"
            maxlength="255"
          />
          <checkInput
            :title="$t('manufacturingOperations.form.DirectManufacturing')"
            :value="item.direct_operation"
            v-model="item.direct_operation"
          />
          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{$t('manufacturingOperations.form.StartDate')}}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>

                <VueCtkDateTimePicker
                  :label="$t('manufacturingOperations.form.ChooseTimeAndDate')"
                  button-now-translation="$t('manufacturingOperations.form.Now')"
                  v-model="item.start_date"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{$t('manufacturingOperations.form.ExpirationDate')}}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>

                <VueCtkDateTimePicker
                  :disabled="item.direct_operation == 1"
                  :label="$t('manufacturingOperations.form.ChooseTimeAndDate')"
                  button-now-translation="$t('manufacturingOperations.form.Now')"
                  v-model="item.end_date"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>

          <monyInput
            :title="$t('manufacturingOperations.form.expectedCost')"
            v-model="item.expected_cost"
            :disabled="true"
          />

          <monyInput
            :title="$t('manufacturingOperations.form.expectedPrice')"
            v-model="item.expected_price"
            :disabled="true"
          />

          <!--selectInput
            :title="$t('manufacturingOperations.form.Status')"
            v-model="item.status"
            :disabled="item.direct_operation == 1"
            :values="[
              { name: $t('manufacturingOperations.form.ItIsOpen'), value: 0 },
              { name: $t('manufacturingOperations.form.InProgress'), value: 1 },
              { name: $t('manufacturingOperations.form.Very'), value: 2 },
              { name: $t('manufacturingOperations.form.canceled'), value: 3 },
            ]"
          /-->

          <connectionInput
            :title="$t('manufacturingOperations.form.manufacturingModel')"
            :group="$t('manufacturingOperations.form.manufacturingModels')"
            v-model="item.manufacturing_model_id"
            :values="$database.manufacturingModels"
          />

          <formInput
            type="number"
            :title="$t('manufacturingOperations.form.quantity')"
            v-model="item.quantity"
          />

          <formTextarea :title="$t('manufacturingOperations.form.DescriptionOfTheOperation')" v-model="item.description" />
          
          <dvider
            :title="$t('manufacturingOperations.form.depositedMaterials')"
            :description="$t('manufacturingOperations.form.fromHereYouCanAddNewMaterialDepositProcess')"
            v-if="item.direct_operation"
          />

          <connectionInput
            :title="$t('manufacturingDeposits.form.ProductStore')"
            :group="$t('manufacturingDeposits.form.Storeres')"
            v-model="item.from_store_id"
            :values="$database.stores"
            :hasErorr="errors.from_store_id"
            :error="$t('manufacturingDeposits.form.ThisFieldIsRequired')"
            v-if="item.direct_operation"
          />
          
          <monyInput
            :title="$t('manufacturingDeposits.form.cost')"
            v-model="item.cost"
            :disabled="true"
            v-if="item.direct_operation"
          />
          <materialsTable class="col-12" v-if="item.direct_operation" />

          <dvider
            :title="$t('manufacturingOperations.form.withdrawalProducts')"
            :description="$t('manufacturingOperations.form.fromHereYouCanAddNewProductDepositProcess')"
            v-if="item.direct_operation"
          />

        <connectionInput
          :title="$t('manufacturingWithdrawals.form.ProductStore')"
          :group="$t('manufacturingWithdrawals.form.stores')"
          v-model="item.to_store_id"
          :values="$database.stores"
          :hasErorr="errors.to_store_id"
          :error="$t('manufacturingWithdrawals.form.ThisFieldIsRequired')"
          v-if="item.direct_operation"
        />

        <monyInput
          :title="$t('manufacturingWithdrawals.form.price')"
          v-model="item.price"
          :disabled="true"
          v-if="item.direct_operation"
        />
        <productsTable class="col-12" v-if="item.direct_operation" />

          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'manufacturingOperationsCreate' && !$parent.stopEdit"
          >
            {{$t('manufacturingOperations.form.AdditionProcessOfManufacturing')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="
              $route.name == 'manufacturingOperationsEdit' && !$parent.stopEdit
            "
          >
            {{$t('manufacturingOperations.form.ManufacturingProcessModification')}}
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

import materialsTable from "@/elements/add/form/manufactoringOperations/materials/materialsTable.vue";
import productsTable from "@/elements/add/form/manufactoringOperations/products/productsTable.vue";

import loading from "@/elements/add/loading.vue";
import subFileInput from "@/elements/add/form/subFileInput.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/manufacturingOperations",
      item: {
        invoice_group: this.$option.manufacturing_operations_invoice_group_id,
        status: 0,
        start_date: "",
        end_date: "",
        manufacturing_model_id: 0,
        cost: 0,
        price: 0,
        expected_cost: 0,
        expected_price: 0,
        ProductsCount: 0,
        direct_operation: 0,
        quantity: 1,
        from_store_id: 0,
        to_store_id:0,
        manufacturingOperationMaterials: [],
        manufacturingOperationProducts: [],
      },
      errors: {
        name: false,
      },
      itemIndex: null,
    };
  },
  mounted() {
    this.$updateDatabase(["products", "materials", "InvoiceGroups", "manufacturingModelProducts", "manufacturingModelMaterials"]);
    if (this.$route.name == "manufacturingOperationsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
    if (this.$route.name == "manufacturingOperationsCreate") {

      this.item.start_date = this.$nowDate()
      this.item.end_date = this.$nowDate(5)

        this.addManufacturingOperationMaterial();
        this.addManufacturingOperationProduct();
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
          var manufacturingOperationMaterials = response.data.manufacturingOperationMaterials
          var manufacturingOperationProducts = response.data.manufacturingOperationProducts
          this.item = response.data;
          var elm = this
          setTimeout(function () {
            elm.item.manufacturingOperationMaterials = manufacturingOperationMaterials
            elm.item.manufacturingOperationProducts = manufacturingOperationProducts
          }, 100)
          if (this.item.manufacturingOperationMaterials.length == 0 && this.item.direct_operation) {
            this.addManufacturingOperationMaterial();
          }
          if (this.item.manufacturingOperationProducts.length == 0 && this.item.direct_operation) {
            this.addManufacturingOperationProduct();
          }
          this.item.start_date = this.$dateFormat(this.item.start_date, true)
          this.item.end_date = this.$dateFormat(this.item.end_date, true)
        });
    },
    saveItem() {
      var error = 0;
      this.errors = [];
      if (
        (typeof this.item.from_store_id === "undefined" ||
          this.item.from_store_id == "" ||
          this.item.from_store_id == 0
        ) &&
        this.item.direct_operation

      ) {
        error = 1;
        this.errors.from_store_id = true;
      }

      if (
        (typeof this.item.to_store_id === "undefined" ||
          this.item.to_store_id == "" ||
          this.item.to_store_id == 0
        ) &&
        this.item.direct_operation

      ) {
        error = 1;
        this.errors.to_store_id = true;
      }
      if (this.item.direct_operation) {
        this.item.manufacturingOperationMaterials.forEach((quotationItem) => {
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

        this.item.manufacturingOperationProducts.forEach((quotationItem) => {
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
      }

      if (error == 0) {
        this.item.start_date = this.$fixDate(this.item.start_date);
        this.item.end_date = this.$fixDate(this.item.end_date);
        if (this.$route.name == "manufacturingOperationsCreate") {
          this.$parent.aletText = this.$t('manufacturingOperations.form.TheOperationHasBeenSuccessfullyAdded');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "manufacturingOperationsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then(() => {
              this.$parent.stopEdit = false;

              this.$parent.aletText = this.$t('manufacturingOperations.form.TheProcessHasBeenSuccessfullyModified');
              this.$parent.alertType = "success";
              this.$router.go(-1);
              this.loading = false;
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
    addManufacturingOperationMaterial() {
      this.item.manufacturingOperationMaterials.push({
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
    addManufacturingOperationProduct() {
      this.item.manufacturingOperationProducts.push({
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
    changePrice () {
      this.item.cost = 0;
      this.item.price = 0;
      this.item.manufacturingOperationMaterials.forEach((qitem) => {this.item.cost += qitem.total;});
      this.item.manufacturingOperationProducts.forEach((qitem) => {this.item.price += qitem.total;});
    },
    mangeQuantities () {
      if (this.item.direct_operation == 1) {
        var manufacturingModel = this.$database.manufacturingModels.find(el => el.id == this.item.manufacturing_model_id);
        if (manufacturingModel && this.item.quantity) {
          this.item.expected_cost  = manufacturingModel.expected_cost  * this.item.quantity
          this.item.expected_price = manufacturingModel.expected_price * this.item.quantity
          var manufacturingModelProducts = this.$database.manufacturingModelProducts.filter(el => el.manufacturing_model_id == this.item.manufacturing_model_id)
          var manufacturingModelMaterials = this.$database.manufacturingModelMaterials.filter(el => el.manufacturing_model_id == this.item.manufacturing_model_id)
          this.item.manufacturingOperationProducts = []
          this.item.manufacturingOperationMaterials = []
          manufacturingModelProducts.forEach((el) => {
            var product = this.$database.products.find(prod => prod.id == el.product_id)
            if (!product) {
              product = this.$database.materials.find(prod => prod.id == el.product_id)
            }
            if (product) {
              this.item.manufacturingOperationProducts.push({
                product_name: product.name,
                product_id: product.id,
                description: "",
                unit_id: product.unit_id,
                quantity: this.item.quantity * el.quantity,
                price: product.price,
                count: "",
                total: this.item.quantity * el.quantity * product.price,
                quantityError: false,
                productNameError: false,
                priceError: false
              });
            }
          })
          manufacturingModelMaterials.forEach((el) => {
            var product = this.$database.products.find(prod => prod.id == el.product_id)
            if (!product) {
              product = this.$database.materials.find(prod => prod.id == el.product_id)
            }
            if (product) {
              this.item.manufacturingOperationMaterials.push({
                product_name: product.name,
                product_id: product.id,
                description: "",
                unit_id: product.unit_id,
                quantity: this.item.quantity * el.quantity,
                cost: product.cost,
                count: "",
                total: this.item.quantity * el.quantity * product.cost,
                quantityError: false,
                productNameError: false,
                priceError: false
              });
            }
          })
        } else {
          this.item.expected_cost  = 0
          this.item.expected_price = 0
          this.item.manufacturingOperationProducts = [{
            product_name: "",
            product_id: 0,
            description: "",
            unit_id: 0,
            quantity: "",
            count: "",
            price: "",
            total: 0,
            quantityError: false,
            productNameError: false,
            priceError: false
          }]
        this.item.manufacturingOperationMaterials = [{
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
      }]
        }
        this.changePrice()
      }
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
    loading,

    checkInput,

    materialsTable,
    productsTable,
    subFileInput,

    VueCtkDateTimePicker,
  },
  watch: {
    "$option.invoice_invoice_group_id": function (val) {
      this.item.invoice_group = val;
    },
    "item.direct_operation": function () {
      if (this.item.direct_operation == 1) {
        this.item.end_date = this.item.start_date;
        this.item.status = 2
        this.mangeQuantities()
      } 
    },
    "item.manufacturing_model_id": function () {
      this.mangeQuantities()
    },
    "item.quantity": function () {
      this.mangeQuantities()
    }
  },
};
</script>

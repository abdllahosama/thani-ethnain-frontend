<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="$t('storesTransfers.form.addStoreTransferOperation')"
          :description="
            $t('storesTransfers.form.fromHereYouCanAddNewTransferOperation')
          "
          v-if="$route.name == 'storesTransfersCreate'"
        />
        <addHeader
          :title="$t('storesTransfers.form.editOperation')"
          :description="$t('storesTransfers.form.fromHereYouEditOperation')"
          v-if="$route.name == 'storesTransfersEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('storesTransfers.form.basicInformation')"
            :description="$t('storesTransfers.form.mainIformation')"
            noLine="true"
          />
          <connectionInput
            :title="$t('storesTransfers.form.operationNumber')"
            :group="$t('storesTransfers.form.Groups')"
            v-model="item.invoice_group"
            :values="$database.invoiceGroups"
            :disabled="$user.admin || $user.role.stores_transfers_edit_item ? false: true"
            v-if="$route.name == 'storesTransfersCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('storesTransfers.form.NumberingIsRequired')"
          />
          <formInput
            :title="$t('storesTransfers.form.operationNumber')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'storesTransfersEdit'"
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

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{
              $t('storesTransfers.form.date')
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('storesTransfers.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('storesTransfers.form.Now')"
                  v-model="item.date"
                  :disabled="$user.admin || $user.role.stores_transfers_edit_item ? false: true"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"/>
              </div>
            </div>
          </div>

          <connectionInput
            :title="$t('storesTransfers.form.fromStoreName')"
            :group="$t('storesTransfers.form.Storeres')"
            v-model="item.from_store_id"
            :values="$database.stores"
            :hasErorr="errors.from_store_id"
            :error="$t('storesTransfers.form.ThisFieldIsRequired')"
          />
          <connectionInput
            :title="$t('storesTransfers.form.toStoreName')"
            :group="$t('storesTransfers.form.fromStoreName')"
            v-model="item.to_store_id"
            :values="$database.stores"
            :hasErorr="errors.to_store_id"
            :except="item.from_store_id"
            :error="$t('storesTransfers.form.ThisFieldIsRequired')"
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
            :title="$t('storesTransfers.form.ProductsInformation')"
            :description="$t('storesTransfers.form.BillProductInformation')"
          />
          <productsTable class="col-12" />

          <dvider
            :title="$t('storesTransfers.form.operationInformation')"
            :description="
              $t('storesTransfers.form.additionalOperationInformation')
            "
          />

          <formTextarea
            :title="$t('storesTransfers.form.thatIsAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('storesTransfers.form.note')"
            v-model="item.notes"
          />

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'storesTransfersCreate' && !$parent.stopEdit"
          >
            {{ $t('storesTransfers.form.addOperation') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'storesTransfersEdit' && !$parent.stopEdit"
          >
            {{ $t('storesTransfers.form.editOperation') }}
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
import subFileInput from "@/elements/add/form/subFileInput.vue";

import productsTable from "@/elements/add/form/storesTransfer/productsTable.vue";

import loading from "@/elements/add/loading.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/storesTransfers",
      item: {
        date: "",
        invoice_group: this.$option.stores_transfer_invoice_group_id,
        from_store_id: 0,
        to_store_id: 0,
        quotationItems: [],
        ProductsCount: 0,
        status: 1,
      },
      errors: {
        from_store_id: false,
        to_store_id: false,
        invoice_group: false,
      },
      itemIndex: null,
      print: this.$route.name == "storesTransfersCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "productQuantities",
      "products",
      'productUnits',
      'units',
      "invoiceGroups",
      "stores"
    ]);
    if (this.$route.name == "storesTransfersEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      if (this.$route.params.id) {
        this.item.from_store_id = this.$route.params.id;
      }
      this.addQuotationItem();
    }
    if (this.$route.name == "storesTransfersCreate") {
      var params = this.$getParams()
      if (params.from_store_id) {
        var store = this.$database.stores.find((el) => el.id == params.from_store_id);
        this.item.from_store_id = params.from_store_id;
        this.item.store = store;
      }
      this.item.date = this.$nowDate()
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

          this.item.quotationItems.forEach(item => {
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
            this.addQuotationItem();
          }
          this.item.date = this.$dateFormat(this.item.date, true)
        });
    },
    saveItem() {
      var error = 0;
      this.errors = [];
      if (
        (typeof this.item.from_store_id === "undefined" ||
          this.item.from_store_id == "" ||
          this.item.from_store_id == "" ||
          this.item.from_store_id == null) &&
        this.$route.name == "storesTransfersCreate"
      ) {
        error = 1;
        this.errors.from_store_id = true;
      }
      if (
        (typeof this.item.to_store_id === "undefined" ||
          this.item.to_store_id == "" ||
          this.item.to_store_id == 0 ||
          this.item.to_store_id == null) &&
        this.$route.name == "storesTransfersCreate"
      ) {
        error = 1;
        this.errors.to_store_id = true;
      }
      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "storesTransfersCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
        this.item.quotationItems.forEach(quotationItem => {
          var productUnitQuantity = 1;
          var productUnit = this.$database.productUnits.find(el => el.product_id == quotationItem.product_id && el.unit_id == quotationItem.unit_id)
          if (productUnit) {productUnitQuantity =  productUnit.quantity}

          if (quotationItem.quantity == '' || quotationItem.quantity <= 0 || (quotationItem.quantity * productUnitQuantity) > quotationItem.maxQuantity) {
            error = 1
            quotationItem.quantityError = true
          } else {
            quotationItem.quantityError = false
          }
          if (quotationItem.product_name == '') {
            error = 1
            quotationItem.productNameError = true
          } else {
            quotationItem.productNameError = false
          }
        })
        if (error == 0) {
          this.item.date = this.$fixDate(this.item.date)
          if (this.$route.name == 'storesTransfersCreate') {
           this.$parent.aletText = this.$t('storesTransfers.form.TheInvoiceHasBeenSuccessfullyAdded')
           this.$parent.alertType = 'success'
           this.$addToLocalDatabase(this.item, this.path.substring(1));
           
           // update store quantities
           this.item.quotationItems.forEach(quotationItem => {
             var productUnitQuantity = 1;
             var productUnit = this.$database.productUnits.find(el => el.product_id == quotationItem.product_id && el.unit_id == quotationItem.unit_id)
             if (productUnit) {productUnitQuantity =  productUnit.quantity}

            var productQuantity = this.$database.productQuantities.find(el => el.product_id == quotationItem.product_id && el.store_id == this.item.from_store_id )
            if (productQuantity && productQuantity.track_quantity == 1) {
                productQuantity.quantity = productQuantity.quantity - (quotationItem.quantity * productUnitQuantity)
              }
            var productQuantity = this.$database.productQuantities.find(el => el.product_id == quotationItem.product_id && el.store_id == this.item.to_store_id )
            if (productQuantity && productQuantity.track_quantity == 1) {
                productQuantity.quantity = productQuantity.quantity + (quotationItem.quantity * productUnitQuantity)
              }
            })

          
          this.$router.go(-1);
          this.$parent.stopEdit = false;

          if(this.print) {
             var printData = JSON.parse(JSON.stringify(this.item));
             var today = new Date();
              var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
              var time = today.getHours() + ":" + today.getMinutes();

              var hours = today.getHours();
              var minutes = today.getMinutes();
              var ampm = hours >= 12 ? 'pm' : 'am';
              hours = hours % 12;
              hours = hours ? hours : 12;
              minutes = minutes < 10 ? '0' + minutes : minutes;
              var time = hours + ':' + minutes + ' ' + ampm;
                
              printData.date = date
              printData.time = time

              printData.created_at = new Date().toISOString("ar-EG", {
                timeZone: "Africa/Cairo",
             })

             var fromStore = this.$database.stores.find(el => (el.id == printData.from_store_id));
             var toStore = this.$database.stores.find(el => (el.id == printData.to_store_id));
             
             printData.fromStore = fromStore
             printData.toStore = toStore

             this.$parent.printedStoresTransfer = printData;
          }
        } else if (this.$route.name == "storesTransfersEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.stopEdit = false;
              this.$parent.aletText = this.$t('storesTransfers.form.invoiceHasBeenModifiedSuccessfully');
              this.$parent.alertType = "success";
              this.$router.go(-1);
              this.$parent.stopEdit = false;
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
    addQuotationItem() {
      this.item.quotationItems.push({
        id: "",
        invoice_id: this.item.id,
        add_product: false,
        product_name: "",
        product_id: 0,
        description: "",
        unit_id: 0,
        quantity: "",
        count: "",
        quantityError: false,
        productNameError: false,
        priceError: false
      });
    },
    changePrice() {
      this.item.ProductsCount = 0;
      this.item.quotationItems.forEach((qitem) => {
        this.item.ProductsCount += qitem.quantity - 0;
      });
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
    subFileInput,
    loading,
    checkInput,
    VueCtkDateTimePicker,
  },
  watch: {
    "$option.invoice_invoice_group_id": function (val) {
      this.item.invoice_group = val;
    },
    "item.from_store_id": function (val) {
      if (val == this.item.to_store_id) {
        this.item.to_store_id = "";
      }
    },
  },
};
</script>

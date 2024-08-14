<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="$t('shippingOperations.form.CreateAShippingProcess')"
          :description="$t('shippingOperations.form.FromHereYouCanCreateANewShipmentProcess')"
          v-if="$route.name == 'shippingOperationsCreate'"
        />
        <addHeader
          :title="$t('shippingOperations.form.ModifyTheShippingProcess')"
          :description="$t('shippingOperations.form.FromHereYouCanModifyYourShipments')"
          v-if="$route.name == 'shippingOperationsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('shippingOperations.form.basicInformation')"
            :description="$t('shippingOperations.form.BasicInformationForTheOperation')"
            noLine="true"
          />
          <connectionInput
            :title="$t('shippingOperations.form.BillNumbering')"
            :group="$t('shippingOperations.form.Groups')"
            v-model="item.invoice_group"
            :disabled="
              $user.admin || $user.role.shippingOperations_edit_product
                ? false
                : true
            "
            :values="$database.invoiceGroups"
            v-if="$route.name == 'shippingOperationsCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('shippingOperations.form.ThisFieldIsRequired')"
          />
          <formInput
            :title="$t('shippingOperations.form.InvoiceCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'shippingOperationsEdit'"
            :hasErorr="errors.code"
            maxlength="255"
          />

          <connectionInput
            :title="$t('shippingOperations.form.pickupLocation')"
            :group="$t('shippingOperations.form.pickupLocations')"
            v-model="item.pickup_location_id"
            :values="$database.pickupLocations"
            :hasErorr="errors.pickup_location_id"
            :error="$t('shippingOperations.form.ThisFieldIsRequired')"
          />
          <selectInput
            :title="$t('shippingOperations.form.TypeOfShipping')"
            v-model="item.client_type"
            :values="[
              { name: $t('shippingOperations.form.CustomerShipping'), value: 0 },
              { name: $t('shippingOperations.form.supplierShipping'), value: 1 },
            ]"
          />
          <customerSearchInput
            :disabled="$route.name == 'shippingOperationsEdit' ? true : false"
            v-if="item.client_type == 0"
          />
          <supplierSearchInput
            :disabled="$route.name == 'shippingOperationsEdit' ? true : false"
            v-if="item.client_type == 1"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{$t('shippingOperations.form.date')}}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>

                <VueCtkDateTimePicker
                  :label="$t('shippingOperations.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('shippingOperations.form.Now')"
                  v-model="item.date"
                  :disabled="
                    $user.admin ||
                    $user.role.shippingOperations_edit_product
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
          <selectInput
            :title="$t('shippingOperations.form.theStatus')"
            v-model="item.status"
            :disabled="
              $user.admin || $user.role.shippingOperations_edit_product
                ? false
                : true
            "
            :values="[
              { name: $t('shippingOperations.draft'), value: 0 },
              { name: $t('shippingOperations.sent'), value: 1 },
              { name: $t('shippingOperations.seen'), value: 2 },
              { name: $t('shippingOperations.driven'), value: 3 },
              { name: $t('shippingOperations.canceled'), value: 4 },
            ]"
          />
          <formInput
            :title="$t('shippingOperations.form.invoiceCode')"
            v-model="item.invoice_code"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.trackingNumber')"
            v-model="item.tracking_number"
            maxlength="255" 
          />

          <formInput
            :title="$t('shippingOperations.form.numberOfItems')"
            v-model="item.items_count"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.ShipmentWeight')"
            v-model="item.weight"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.ShipmentHeight')"
            v-model="item.height"
            maxlength="255" 
          />

          <formTextarea
            :title="$t('shippingOperations.form.descriptionOfTheShipping')"
            v-model="item.shippment_description"
            maxlength="255"
          />

          <dvider
            :title="$t('shippingOperations.form.addressOfShipping')"
            :description="$t('shippingOperations.form.theAddressOfTheShipping')"
          />
          <formInput
            :title="$t('shippingOperations.form.customerName')"
            v-model="item.customer_name"
            maxlength="255" 
          />
          <div class="col-12"></div>
          <formInput
            :title="$t('shippingOperations.form.title')"
            v-model="item.address1"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.supplement')"
            v-model="item.address2"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.theEntity')"
            v-model="item.entity"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.city')"
            v-model="item.city"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.floor')"
            v-model="item.floor"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.apartment')"
            v-model="item.apartment"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.postalCode')"
            v-model="item.zip"
            maxlength="255" 
          />
          <formInput
            :title="$t('shippingOperations.form.theState')"
            v-model="item.country"
            maxlength="255" 
          />
          <iconInput 
            :type="'text'" 
            :title="$t('shippingOperations.form.mobileNumber')" 
            :icon="'phone'" 
            v-model="item.mobile"
            maxlength="255" 
          />
          <iconInput 
            :type="'text'" 
            :title="$t('shippingOperations.form.anotherNumber')" 
            :icon="'phone'" 
            v-model="item.mobile2" 
            maxlength="255" 
          />
          <dvider
            :title="$t('shippingOperations.form.accountingData')"
            :description="$t('shippingOperations.form.theDataOfaccounting')"
          />
          <selectInput
            :title="$t('shippingOperations.form.paymentMethod')"
            v-model="item.payment_method"
            :values="[
              { name: $t('shippingOperations.form.cashOnDelevary'), value: 0 },
              { name: $t('shippingOperations.form.paied'), value: 1 },
            ]"
          />
          <monyInput 
            :title="$t('shippingOperations.form.cost')" 
            v-model="item.cost"
          />
          <dvider
            :title="$t('shippingOperations.form.otherData')"
            :description="$t('shippingOperations.form.otherDataOfShipping')"
          />
          <formTextarea
            :title="$t('shippingOperations.form.thatsAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('shippingOperations.form.notes')"
            v-model="item.notes"
          />

          

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'shippingOperationsCreate' && !$parent.stopEdit"
          >
              {{$t('shippingOperations.form.CreateAShippingProcess')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'shippingOperationsEdit' && !$parent.stopEdit"
          >
              {{$t('shippingOperations.form.ModifyTheShippingProcess')}}
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
import iconInput from '@/elements/add/form/iconInput.vue';

import productsTable from "@/elements/add/form/invoice/productsTable.vue";
import dilvaryAndAddInput from "@/elements/add/form/invoice/dilvaryAndAddInput.vue";


import loading from "@/elements/add/loading.vue";

import customerSearchInput from "@/elements/add/form/search/customerNameInput.vue";

import supplierSearchInput from "@/elements/add/form/search/supplierNameInput.vue";


import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/shippingOperations",
      addTax: 0,
      addDiscount: 0,
      item: {
        invoice_group: this.$option.invoice_invoice_group_id,
        pickup_location_id: 0,
        customer_id: 0,
        supplier_id: 0,
        customer: {
          name: "",
          mobile: "",
          address1: "",
          balance: 0,
        },
        supplier: {
          name: "",
          mobile: "",
          address1: "",
          balance: 0,
        },
        client_type: 0,
        status: 1,
        date: "",
        payment_method: 0
      },
      errors: {
        name: false,
        invoice_group: false,
      },
      print: this.$route.name == "shippingOperationsCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "customers",
      "suppliers",
      "invoiceGroups",
    ]);
    if (this.$route.name == "shippingOperationsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
      
    if (this.$route.name == "shippingOperationsCreate") {
      this.item.date = this.$nowDate()
      this.item.expiry_date = this.$nowDate(5)
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
          this.item.date = this.$dateFormat(this.item.date, true)
        });
    },
    saveItem() {
      var error = 0;
      this.errors = [];
      if (
        this.item.client_type == 0 &&
        (typeof this.item.customer.name === "undefined" ||
          this.item.customer.name == "") &&
        this.$route.name == "shippingOperationsCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }

      if (
        this.item.client_type == 1 &&
        (typeof this.item.supplier.name === "undefined" ||
          this.item.supplier.name == "") &&
        this.$route.name == "shippingOperationsCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }


      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "shippingOperationsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      
      if (error == 0) {
        this.item.date = this.$fixDate(this.item.date);
        if (this.$route.name == "shippingOperationsCreate") {
          this.$parent.aletText = "تم اضافة الفاتورة بنجاح";
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          
          if (this.$option.print_after) {
            var printData = JSON.parse(JSON.stringify(this.item));
            var today = !isNaN(Date.parse(printData.date))
              ? new Date(printData.date)
              : new Date();

            var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

            var time = today.getHours() + ":" + today.getMinutes();
            var hours = today.getHours();
            var minutes = today.getMinutes();
            var ampm = hours >= 12 ? "pm" : "am";
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? "0" + minutes : minutes;

            var time = hours + ":" + minutes + " " + ampm;

            printData.date = date;
            printData.time = time;

            //this.$parent.printedInvoice = printData;
          }

          localStorage.database = JSON.stringify(this.$database);
          
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "shippingOperationsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.stopEdit = false;
              this.loading = false;
              this.$parent.aletText = "تم تعديل الفاتورة بنجاح";
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
  },
  components: {
    dvider,
    addHeader,
    formInput,
    connectionInput,
    formTextarea,
    monyInput,
    selectInput,
    checkInput,
    iconInput,
    productsTable,
    dilvaryAndAddInput,
    loading,

    customerSearchInput,
    supplierSearchInput,
    

    VueCtkDateTimePicker,
  },
  watch: {
    "$option.invoice_invoice_group_id": function (val) {
      this.item.invoice_group = val;
    }
  },
};
</script>

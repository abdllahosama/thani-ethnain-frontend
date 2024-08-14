<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="$t('quotations.form.AddABid')"
          :description="$t('quotations.form.FromHereYouCanAddANewBid')"
          v-if="$route.name == 'quotationsCreate'"
        />
        <addHeader
          :title="$t('quotations.form.AdjustYourBid')"
          :description="$t('quotations.form.FromHereYouCanEditYourBidData')"
          v-if="$route.name == 'quotationsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('quotations.form.basicInformation')"
            :description="$t('quotations.form.BasicInformationForTheBid')"
            noLine="true"
          />

          <connectionInput
            :title="$t('quotations.form.NumberingTheOffer')"
            :group="$t('quotations.form.Groups')"
            v-model="item.invoice_group"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'quotationsCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('quotations.form.NumberingIsRequired')"
          />
          <formInput
            :title="$t('quotations.form.DisplayCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'quotationsEdit'"
            maxlength="255"
          />
          <subFileInput :title="$t('invoices.form.invoiceFile')"
            v-model="item.file"
            :file="item.file"
            :path="'invoices'"
            :hasErorr="errors.file"
            :error="$t('allerts.ChooseASuitableFile')"
          />
          <formInput
            :title="$t('salesPayments.form.reference')"
            v-model="item.refrance"
            maxlength="255"
          />

          <selectInput
            :title="$t('quotations.form.TypeOfInvoice')"
            v-model="item.client_type"
            :disabled="$route.name == 'quotationsEdit' ? true : false"
            :values="[
              { name: $t('quotations.form.CustomerBill'), value: 0 },
              { name: $t('quotations.form.ResourceInvoice'), value: 1 },
              { name: $t('quotations.form.PartnerBill'), value: 2 },
            ]"
          />
          
          <searchGroupInput
            v-if="item.client_type == 0"
            :type="'customer'"
            :values="$database.customers.filter((el) => el.stat == 1)"
            :inputs="$option.quotations_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 1"
            :type="'supplier'"
            :values="$database.suppliers.filter((el) => el.stat == 1)"
            :inputs="$option.quotations_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 2"
            :type="'partner'"
            :values="$database.partners.filter((el) => el.stat == 1)"
            :inputs="$option.quotations_customer_data"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{
              $t('quotations.form.date')
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('quotations.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('quotations.form.Now')"
                  v-model="item.date"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>
          <div class="form-group row" :class="'col-md-6'" v-if="$option.quotations_required_data.find(el => el.id == 2)">
            <label :class="'col-md-4'">{{
              $t('quotations.form.ExpiryDate')
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100  to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('quotations.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('quotations.form.Now')"
                  v-model="item.expiry_date"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>
          <selectInput
            :title="$t('quotations.form.Situation')"
            v-model="item.status"
            :values="[
              { name: $t('quotations.draft'), value: 0 },
              { name: $t('quotations.sent'), value: 1 },
              { name: $t('quotations.seen'), value: 2 },
              { name: $t('quotations.approved'), value: 3 },
              { name: $t('quotations.rejected'), value: 4 },
              { name: $t('quotations.canceled'), value: 5 },
            ]"
          />
          <searchGroupInput
            :type="'priceList'"
            :values="$database.priceLists"
            :inputs="[{ 'title':$t('quotations.form.ListOfPrices'),'show': 'name'}]"
            v-if="$option.quotations_required_data.find(el => el.id == 3)"
          />

          <dvider
            :title="$t('quotations.form.ProductInformation')"
            :description="$t('quotations.form.BidProductInformation')"
          />
          <productsTable class="col-12" />
          <dilvaryAndAddInput class="col-12" />

          <dvider
            :title="$t('quotations.form.RequestDetails')"
            :description="$t('quotations.form.AdditionalDisplayInformation')"
          />
          <div class="col-12 data-table-header">
            <div class="row">
              <div class="col-xl-2">
                <div class="row">
                  <div class="col-xl-12 col-6">{{$t('quotations.form.Quantity')}}</div>
                  <div class="col-xl-12 col-6">
                    {{ item.ProductsCount }}
                  </div>
                </div>
              </div>
              <div :class="item.delivery > 0 ? 'col-xl-2' : 'col-xl-3'">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t('quotations.form.Subtotal') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ item.subtotal + item.discount }}
                    {{ $t('quotations.form.currency') }}
                  </div>
                </div>
              </div>
              <div class="col-xl-3">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t('quotations.form.totalTaxes') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ item.tax }} {{ $t('quotations.form.currency') }}
                  </div>
                </div>
              </div>
              <div :class="item.edit > 0 ? 'col-xl-1' : 'col-xl-2'">
                <div class="row">
                  <div class="col-xl-12 col-6">{{$t('quotations.form.rebate')}}</div>
                  <div class="col-xl-12 col-6">
                    - {{ item.discount }} {{ $t('quotations.form.currency') }}
                  </div>
                </div>
              </div>
              <div class="col-xl-1" v-if="item.delivery > 0">
                <div class="row">
                  <div class="col-xl-12 col-6"> {{ $t('quotations.form.Shipping') }} </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.delivery) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-1" v-if="item.edit > 0">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ item.edit_text ? item.edit_text : $t('quotations.form.modulation') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.edit) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-2">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t('quotations.form.total') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.total) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12"><hr class="mb-5 mt-0" /></div>

          <div class="form-group row col-md-12">
            <label class="col-md-2">{{$t('quotations.form.noteToTheCustomer')}}</label>
            <div class="col-md-95">
              <vue-editor v-model="item.notes"></vue-editor>
            </div>
          </div>

          <div class="form-group row col-md-12">
            <label class="col-md-2">{{$t('quotations.form.termsOfOffer')}}</label>
            <div class="col-md-95">
              <vue-editor v-model="item.terms"></vue-editor>
            </div>
          </div>
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'quotationsCreate' && !$parent.stopEdit"
          >
            {{$t('quotations.form.AddAShow')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'quotationsEdit' && !$parent.stopEdit"
          >
            {{$t('quotations.form.ModifyTheOffer')}}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
    <addTax v-if="addTax == 1"></addTax>
    <addDiscount v-if="addDiscount == 1"></addDiscount>
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

import productsTable from "@/elements/add/form/quotation/productsTable.vue";
import dilvaryAndAddInput from "@/elements/add/form/quotation/dilvaryAndAddInput.vue";

import addTax from "@/elements/popupForms/addTax.vue";
import addDiscount from "@/elements/popupForms/addDiscount.vue";
import loading from "@/elements/add/loading.vue";

import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      path: "/quotations",
      addTax: 0,
      addDiscount: 0,
      item: {
        customer_id: 0,
        supplier_id: 0,
        partner_id: 0,
        project_id: 0,
        project_item_id: 0,
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
        partner: {
          name: "",
          mobile: "",
          address1: "",
          balance: 0,
        },
        priceList: {

        },
        client_type: 0,
        status: 0,
        date: "",
        expiry_date: "",
        invoice_group: this.$option.quotation_invoice_group_id,
        priceList_id: 0,
        quotationItems: [],
        subtotal: 0,
        discount: 0,
        tax: 0,
        delivery: "",
        edit: "",
        total: 0,
        paid: 0,
        rest: 0,
        ProductsCount: 0,
      },
      errors: {
        name: false,
        invoice_group: false,
      },
      itemIndex: null,
      print: this.$route.name == "quotationsCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "customers",
      "suppliers",
      "productQuantities",
      "productUnits",
      "units",
      "products",
      "priceLists",
      "materials",
      "invoiceGroups",
      "taxes",
      "discounts",
      "productPrices",
    ]);
    if (this.$route.name == "quotationsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } 

    if (this.$route.name == "quotationsCreate") {
      this.addQuotationItem();
      var params = this.$getParams()
      if (params.customer_id) {
        var customer = this.$database.customers.find((el) => el.id == params.customer_id);
        this.item.customer_id = params.customer_id;
        this.item.customer = customer;
      }
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
    saveItem() {
      var error = 0;
      this.errors = [];
      if (
        this.item.client_type == 0 &&
        (typeof this.item.customer.name === "undefined" ||
          this.item.customer.name == "") &&
        this.$route.name == "quotationsCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }

      if (
        this.item.client_type == 1 &&
        (typeof this.item.supplier.name === "undefined" ||
          this.item.supplier.name == "") &&
        this.$route.name == "quotationsCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }

      if (
        this.item.client_type == 2 &&
        (typeof this.item.partner.name === "undefined" ||
          this.item.partner.name == "") &&
        this.$route.name == "quotationsCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }

      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "quotationsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }

      this.item.quotationItems.forEach((quotationItem) => {
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
        this.item.date = this.$fixDate(this.item.date);
        this.item.expiry_date = this.$fixDate(this.item.expiry_date);
        this.changePrice();
        if (this.$route.name == "quotationsCreate") {
          this.$parent.aletText = this.$t('allerts.quotationsuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
          this.$parent.stopEdit = false;
          if (this.$option.print_after) {
            var printData = JSON.parse(JSON.stringify(this.item));
            var today = !isNaN(Date.parse(printData.date))
              ? new Date(printData.date)
              : new Date();

            var date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();

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

            this.$parent.printedQuotation = printData;
          }
        } else if (this.$route.name == "quotationsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.stopEdit = false;
              this.$parent.aletText = "تم تعديل العرض بنجاح";
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
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.$parent.stopEdit = false;
          this.item = response.data;

          this.item.quotationItems.forEach((item) => {
            item.quantity = this.$isFloat(item.quantity) ? item.quantity.toFixed(1) : item.quantity
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

          if (this.item.quotationItems.length == 0) {
            this.addQuotationItem();
          }
          
          this.item.date = this.$dateFormat(this.item.date, true)
          this.item.expiry_date = this.$dateFormat(this.item.expiry_date, true)
        });
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
        price: "",
        tax_id: 0,
        tax_rate: 0,
        discount_type: 0,
        discount_value: "",
        discount_id: 0,
        discount_rate: 0,
        subtotal: 0,
        average: 0,
        discount: 0,
        total: 0,
        quantityError: false,
        productNameError: false,
        priceError: false,
        unit_coefficients: []
      });
    },
    changePrice() {
      this.item.subtotal = 0;
      this.item.tax = 0;
      this.item.discount = 0;
      this.item.total = 0;
      this.item.ProductsCount = 0;

      this.item.quotationItems.forEach((qitem) => {
        this.item.subtotal += qitem.subtotal;
        this.item.tax += qitem.average;
        this.item.discount += qitem.discount;
        this.item.total += qitem.total;
        this.item.ProductsCount += qitem.quantity - 0;
      });

      this.item.total += this.item.delivery - 0;
      this.item.total += this.item.edit - 0;
      this.item.rest = this.item.total - this.item.paid;
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
    dilvaryAndAddInput,
    addTax,
    addDiscount,
    loading,

    searchGroupInput,

    checkInput,
    subFileInput,
    VueCtkDateTimePicker,
    VueEditor
  },
  watch: {
    "$option.quotation_invoice_group_id": function (val) {
      this.item.invoice_group = val;
    },
  },
};
</script>

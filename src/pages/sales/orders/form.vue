<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="$t('orders.form.AddARequest')"
          :description="$t('orders.form.FromHereYouCanAddANewApplicationBond')"
          v-if="$route.name == 'ordersCreate'"
        />
        <addHeader
          :title="$t('orders.form.AmendingTheApplicationBond')"
          :description="
            $t('orders.form.FromHereYouCanModifyTheApplicationBondData')
          "
          v-if="$route.name == 'ordersEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('orders.form.basicInformation')"
            :description="$t('orders.form.BasicInformationForTheBid')"
            noLine="true"
          />

          <connectionInput
            :title="$t('orders.form.NumberingTheOffer')"
            :group="$t('orders.form.Groups')"
            v-model="item.invoice_group"
            :disabled="
              $user.admin || $user.role.orders_edit_product ? false : true
            "
            :values="$database.invoiceGroups"
            v-if="$route.name == 'ordersCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('orders.form.ThisFieldIsRequired')"
          />
          <formInput
            :title="$t('orders.form.InvoiceCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'ordersEdit'"
            maxlength="255"
          />
          <subFileInput
            :title="$t('invoices.form.invoiceFile')"
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
            :title="$t('orders.form.TypeOfInvoice')"
            v-model="item.client_type"
            :disabled="$route.name == 'ordersEdit' ? true : false"
            :values="[
              { name: $t('orders.form.CustomerBill'), value: 0 },
              { name: $t('orders.form.ResourceInvoice'), value: 1 },
              { name: $t('orders.form.PartnerBill'), value: 2 },
            ]"
          />

          <searchGroupInput
            v-if="item.client_type == 0"
            :type="'customer'"
            :values="$database.customers.filter((el) => el.stat == 1)"
            :inputs="[
              {
                title: 'اسم العميل',
                show: 'name',
              },
              {
                title: 'رقم الهاتف',
                show: 'mobile',
              },
              {
                title: 'رقم هاتف آخر',
                show: 'mobile2'
              },
              {title: 'العنوان', show: 'address1'},
            ]"
          />

          <searchGroupInput
            v-if="item.client_type == 1"
            :type="'supplier'"
            :values="$database.suppliers.filter((el) => el.stat == 1)"
            :inputs="$option.orders_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 2"
            :type="'partner'"
            :values="$database.partners.filter((el) => el.stat == 1)"
            :inputs="$option.orders_customer_data"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{ $t("orders.form.date") }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('orders.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('orders.form.Now')"
                  v-model="item.date"
                  :disabled="
                    $user.admin || $user.role.orders_edit_date ? false : true
                  "
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>
          <div
            class="form-group row"
            :class="'col-md-6'"
            v-if="$option.orders_required_data.find((el) => el.id == 2)"
          >
            <label :class="'col-md-4'">{{
              $t("orders.form.ExpiryDate")
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('orders.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('orders.form.Now')"
                  v-model="item.expiry_date"
                  :disabled="
                    $user.admin || $user.role.orders_edit_date ? false : true
                  "
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>
          <selectInput
            :title="$t('orders.form.Situation')"
            v-model="item.status"
            :vaslusRole="$user.role.orders_allow_status"
            :values="[
              { name: $t('orders.NewOrder'), value: 0 },
              { name: $t('orders.BeingProcessed'), value: 1 },
              { name: $t('orders.readyForShipping'), value: 2 },
              { name: $t('orders.UnderShipping'), value: 3 },
              { name: $t('orders.shipped'), value: 4 },
              { name: $t('orders.complete'), value: 5 },
              { name: $t('orders.returnd'), value: 6 },
              { name: $t('orders.canceled'), value: 7 },
            ]"
          />
          <searchGroupInput
            :type="'priceList'"
            :values="$database.priceLists"
            :inputs="[{ show: 'name' }]"
            v-if="$option.orders_required_data.find((el) => el.id == 3)"
          />

          <dvider
            :title="$t('orders.form.ProductsInformation')"
            :description="$t('orders.form.BidProductInformation')"
          />
          <productsTable class="col-12" />
          <div class="col-4"></div>
          <div class="col-4"></div>
          <dilvaryAndAddInput class="col-4 col-md-6 col-12" />

          <dvider
            :title="$t('orders.form.RequestDetails')"
            :description="$t('orders.form.AdditionalDisplayInformation')"
          />
          <div class="col-12 data-table-header">
            <div class="row">
              <div class="col-xl-2">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t("orders.form.Quantity") }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ item.ProductsCount }}
                  </div>
                </div>
              </div>
              <div :class="item.delivery > 0 ? 'col-xl-2' : 'col-xl-3'">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t("orders.form.Subtotal") }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.subtotal + item.discount) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-3">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t("orders.form.totalTaxes") }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.tax) }}
                  </div>
                </div>
              </div>
              <div :class="item.edit > 0 ? 'col-xl-1' : 'col-xl-2'">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t("orders.form.rebate") }}
                  </div>
                  <div class="col-xl-12 col-6">
                    - {{ $moneyFormat(item.discount) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-1" v-if="item.delivery > 0">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t("orders.form.Shipping") }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.delivery) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-1" v-if="item.edit > 0">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{
                      item.edit_text
                        ? item.edit_text
                        : $t("orders.form.Modification")
                    }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.edit) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-2">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t("orders.form.Total") }}
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
            <label class="col-md-2">{{
              $t("quotations.form.noteToTheCustomer")
            }}</label>
            <div class="col-md-95">
              <ckeditor :editor="editor" v-model="item.notes" :config="editorConfig"></ckeditor>
            </div>
          </div>
          <div class="form-group row col-md-12">
            <label class="col-md-2">{{
              $t("quotations.form.termsOfOffer")
            }}</label>
            <div class="col-md-95">
              <ckeditor :editor="editor" v-model="item.terms" :config="editorConfig"></ckeditor>
            </div>
          </div>
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'ordersCreate' && !$parent.stopEdit"
          >
            {{ $t("orders.form.AddARequest") }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'ordersEdit' && !$parent.stopEdit"
          >
            {{ $t("orders.form.OrderAdjustment") }}
          </a>
          <loading v-if="$parent.stopEdit" />
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

import productsTable from "@/elements/add/form/order/productsTable.vue";
import dilvaryAndAddInput from "@/elements/add/form/order/dilvaryAndAddInput.vue";

import addTax from "@/elements/popupForms/addTax.vue";
import addDiscount from "@/elements/popupForms/addDiscount.vue";
import loading from "@/elements/add/loading.vue";

import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

import UploadAdapter from '@/helpers/UploadAdapter.js';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
    return {
      path: "/orders",
      addTax: 0,
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'insertTable', '|', 'imageUpload', 'mediaEmbed', '|', 'undo', 'redo' ],
        table: {
          toolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        },
        extraPlugins: [function uploader(editor) {
          editor.plugins.get( 'FileRepository' ).createUploadAdapter =  function ( loader ) {
            return new UploadAdapter( loader );
          };
        }],
        language: 'ar',
      },
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
        priceList: {},
        client_type: 0,
        status:
          typeof this.$user.role.orders_allow_status === "undefined" ||
          this.$user.role.orders_allow_status.length == 0
            ? 0
            : this.$user.role.orders_allow_status[0].id,
        date: "",
        expiry_date: "",
        invoice_group: this.$option.order_invoice_group_id,
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
      taxes: {},
      discounts: {},
      invoiceGroups: {},
      stores: {},
      customers: {},
      itemIndex: null,
      items: [],
      print: this.$route.name == "ordersCreate" ? true : false,
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
    if (this.$route.name == "ordersEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      this.addQuotationItem();
      if (this.$route.params.id) {
        var customer = this.$database.customers.find(
          (el) => el.id == this.$route.params.id
        );
        this.item.customer_id = this.$route.params.id;
        this.item.customer = customer;
      }
    }
    if (this.$route.name == "ordersCreate") {
      var params = this.$getParams();
      if (params.customer_id) {
        var customer = this.$database.customers.find(
          (el) => el.id == params.customer_id
        );
        this.item.customer_id = params.customer_id;
        this.item.customer = customer;
      }
      this.item.date = this.$nowDate();
      this.item.expiry_date = this.$nowDate(5);
    }
    var elm = this;
    window.addEventListener("keydown", function (e) {
      if (e.key == "F1" || e.key == "Meta") {
        e.preventDefault();
        elm.saveItem();
      }
    });
  },
  methods: {
    uploader(editor) {
      console.log(editor)
      editor.plugins.get( 'FileRepository' )
      .createUploadAdapter =  function ( loader ) {
        console.log('djidji')
        // return new UploadAdapter( loader );
      };
    },
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.$parent.stopEdit = false;
          this.item = response.data;
          this.item.quotationItems.forEach((item) => {
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

          this.item.date = this.$dateFormat(this.item.date, true);
          this.item.expiry_date = this.$dateFormat(this.item.expiry_date, true);
        });
    },
    saveItem() {
      var error = 0;
      this.errors = [];
      if (
        this.item.client_type == 0 &&
        (typeof this.item.customer.name === "undefined" ||
          this.item.customer.name == "") &&
        this.$route.name == "ordersCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }

      if (
        this.item.client_type == 1 &&
        (typeof this.item.supplier.name === "undefined" ||
          this.item.supplier.name == "") &&
        this.$route.name == "ordersCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }
      if (
        this.item.client_type == 2 &&
        (typeof this.item.partner.name === "undefined" ||
          this.item.partner.name == "") &&
        this.$route.name == "ordersCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }
      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "ordersCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }

      this.item.quotationItems.forEach((quotationItem) => {
        if (quotationItem.price == "" || quotationItem.price <= 0) {
          error = 1;
          quotationItem.priceError = true;
        } else {
          quotationItem.priceError = false;
        }
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
        if (this.$route.name == "ordersCreate") {
          this.$parent.aletText = this.$t("allerts.ordersuccessfullyAdde");
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
              "/" +
              (today.getMonth() + 1) +
              "/" +
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

            printData.created_at = new Date().toISOString("ar-EG", {
              timeZone: "Africa/Cairo",
            });
            this.$parent.printedOrder = printData;
          }
        } else if (this.$route.name == "ordersEdit") {
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
        this.$parent.aletText = this.$t("allerts.pleaseMakeSureOfTheInput");
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
        image: "",
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
        status: 0,
        total: 0,
        unit_coefficients: [],
      });
    },
    changePrice() {
      this.item.subtotal = 0;
      this.item.tax = 0;
      this.item.discount = 0;
      this.item.total = 0;

      this.item.quotationItems.forEach((qitem) => {
        this.item.subtotal += qitem.subtotal;
        this.item.tax += qitem.average;
        this.item.discount += qitem.discount;
        this.item.total += qitem.total;
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

    VueCtkDateTimePicker
  },
  watch: {
    "$option.order_invoice_group_id": function (val) {
      this.item.invoice_group = val;
    },
  },
};
</script>

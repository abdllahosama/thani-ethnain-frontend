<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="$t('bills.form.AddAPurchaseBill')"
          :description="$t('bills.form.ThatIsWhereYouCanAddANewBill')"
          v-if="$route.name == 'billsCreate'"
        />
        <addHeader
          :title="$t('bills.form.AdjustYourPurchaseBill')"
          :description="$t('bills.form.FromHereYouCanModifyTheInvoiceData')"
          v-if="$route.name == 'billsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('bills.form.basicInformation')"
            :description="$t('bills.form.BasicInformationOfTheInvoice')"
            noLine="true"
          />
          <connectionInput
            :title="$t('bills.form.BillNumbering')"
            :group="$t('bills.form.Groups')"
            v-model="item.invoice_group"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'billsCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('bills.form.ThisFieldIsRequired')"
          />
          <formInput
            :title="$t('bills.form.InvoiceCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'billsEdit'"
            maxlength="255"
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

          <selectInput
            :title="$t('bills.form.TypeOfInvoice')"
            v-model="item.client_type"
            :disabled="$route.name == 'billsEdit' ? true : false"
            :values="[
              { name: $t('bills.form.CustomerBill'), value: 0 },
              { name: $t('bills.form.ResourceInvoice'), value: 1 },
              { name: $t('bills.form.PartnerBill'), value: 2 },
            ]"
          />
          
          <searchGroupInput
            v-if="item.client_type == 0"
            :type="'customer'"
            :values="$database.customers.filter((el) => el.stat == 1)"
            :inputs="$option.bills_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 1"
            :type="'supplier'"
            :values="$database.suppliers.filter((el) => el.stat == 1)"
            :inputs="$option.bills_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 2"
            :type="'partner'"
            :values="$database.partners.filter((el) => el.stat == 1)"
            :inputs="$option.bills_customer_data"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{
              $t('bills.form.date')
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('bills.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('bills.form.Now')"
                  v-model="item.date"
                  :disabled="
                    $user.admin || $user.role.bills_edit_product
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
          <div class="form-group row" :class="'col-md-6'"  v-if="$option.bills_required_data.find(el => el.id == 2)">
            <label :class="'col-md-4'">{{
              $t('bills.form.ExpiryDate')
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('bills.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('bills.form.Now')"
                  v-model="item.expiry_date"
                  :disabled="
                    $user.admin || $user.role.bills_edit_product
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
            :title="$t('bills.form.Situation')"
            v-model="item.status"
            :disabled="
              $user.admin || $user.role.bills_edit_product
                ? false
                : true
            "
            :values="[
              { name: $t('bills.open'), value: 0 },
              { name: $t('bills.driven'), value: 1 },
              { name: $t('bills.canceled'), value: 2 },
            ]"
          />
          <searchGroupInput
            :type="'store'"
            :values="$database.stores"
            :inputs="[{ 'title':$t('invoices.form.ProductStore'),'show': 'name'}]"
            v-if="$database.stores.length > 1"
          />
          
          <searchGroupInput
            :type="'safe'"
            :values="$database.safes"
            :inputs="[{ 'title':$t('invoices.form.Treasury'),'show': 'name'}]"
            v-if="$database.safes.length > 1"
          />

          <searchGroupInput
            :type="'priceList'"
            :values="$database.priceLists"
            :inputs="[{ 'title':$t('invoices.form.PriceLists'),'show': 'name'}]"
            v-if="$option.bills_required_data.find(el => el.id == 3)"
          />

          <checkInput
            :title="$t('bills.form.billForProject')"
            :value="item.project_bill"
            v-model="item.project_bill"
          />

          <dvider
            :title="$t('bills.form.projectDetails')"
            :description="$t('bills.form.projectDetailsData')"
            v-if="item.project_bill"
          />

          <connectionInput
            :title="$t('bills.form.Project')"
            :group="$t('bills.form.Projects')"
            v-model="item.project_id"
            :values="$database.projects"
            v-if="item.project_bill &&
            $site.projects_allow"
            :hasErorr="errors.project_id"
            :error="$t('bills.form.ThisFieldIsRequired')"
          />

          <connectionInput
            :disabled="item.project_id == 0"
            :title="$t('bills.form.ProjectOutput')"
            :group="$t('bills.form.ProjectOutputs')"
            v-model="item.project_item_id"
            :values="$database.projectItems.filter(el => el.project_id == item.project_id)"
            v-if="item.project_bill &&
            $site.projects_allow"
          />

         

          <dvider
            :title="$t('bills.form.ProductsInformation')"
            :description="$t('bills.form.BillProductInformation')"
          />
          
          <productsTable class="col-12" />
          <div class="col-xl-4 offset-xl-4 col-12">
            <div class="form-group row">
              <label class="col-2">
                <i class="fas fa-badge-percent qutation-icon"></i>
              </label>
              <div class="col-10">
                <div class="add-input">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="0"
                    min="0"
                    max="100"
                    v-model="item.discount_value"
                    @keyup="changePrice"
                  />
                  <span class="add-input-select">
                    <select v-model="item.discount_type" @change="changePrice">
                      <option value="0">%</option>
                      <option value="1">$</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-2">
                <i
                  class="fas fa-hand-holding-usd"
                  style="font-size: 20px; margin-top: 10px"
                ></i>
              </label>
              <div class="col-10">
                <div class="add-input">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="0"
                    min="0"
                    max="100"
                    v-model="item.main_tax"
                    @change="changePrice"
                  />
                  <span>%</span>
                </div>
              </div>
            </div>
          </div>
          <dilvaryAndAddInput class="col-xl-4 col-12" />

          <dvider
            :title="$t('bills.form.RequestDetails')"
            :description="$t('bills.form.AdditionalDisplayInformation')"
          />

          <div class="col-12 data-table-header">
            <div class="row">
              <div class="col-xl-2">
                <div class="row">
                  <div class="col-xl-12 col-6">{{$t('bills.form.Quantity')}}</div>
                  <div class="col-xl-12 col-6">
                    {{ item.ProductsCount }}
                  </div>
                </div>
              </div>
              <div :class="item.delivery > 0 ? 'col-xl-1' : 'col-xl-2'">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t('bills.form.Subtotal') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.subtotal + item.discount -
                      (item.discount_type >=0 && item.discount_value > 0 ?
                        (item.discount_type == 0 ? discount = item.subtotal * item.discount_value / 100 : item.discount_value) :
                        0
                      )
                    ) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-2">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t('bills.form.totalTaxes') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.tax) }}
                  </div>
                </div>
              </div>
              <div :class="item.edit > 0 ? 'col-xl-1' : 'col-xl-2'">
                <div class="row">
                  <div class="col-xl-12 col-6">{{$t('bills.form.rebate')}}</div>
                  <div class="col-xl-12 col-6">
                    - {{ $moneyFormat(item.discount) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-1" v-if="item.delivery > 0">
                <div class="row">
                  <div class="col-xl-12 col-6">{{$t('bills.form.Shipping')}}</div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.delivery) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-1" v-if="item.edit > 0">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ item.edit_text ? item.edit_text : $t('bills.form.modulation') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.edit) }}
                  </div>
                </div>
              </div>
              <div class="col-xl-1">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t('bills.form.Total') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.total) }} 
                  </div>
                </div>
              </div>
              <div class="col-xl-2">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t('bills.form.paid') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    <div
                      class="add-input table-add-input"
                      v-if="$route.name == 'billsCreate'"
                    >
                      <input
                        type="number"
                        placeholder="0"
                        class="form-control m-w-50"
                        v-model="item.paid"
                        @keyup="changePrice"
                      />
                      <span>{{ $option.currency }}</span>
                    </div>
                    {{
                      $route.name == "billsEdit"
                        ? item.paid + " " + $option.currency
                        : ""
                    }}
                  </div>
                </div>
              </div>
              <div class="col-xl-1">
                <div class="row">
                  <div class="col-xl-12 col-6">
                    {{ $t('bills.form.rest') }}
                  </div>
                  <div class="col-xl-12 col-6">
                    {{ $moneyFormat(item.rest) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12"> <hr class="mb-5 mt-0" /></div>
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
            v-if="$route.name == 'billsCreate' && !$parent.stopEdit"
          >
            {{$t('bills.form.AddABill')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'billsEdit' && !$parent.stopEdit"
          >
            {{$t('bills.form.InvoiceAdjustment')}}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
    <addTax v-if="addTax == 1"/>
    <addDiscount v-if="addDiscount == 1"/>
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


import productsTable from "@/elements/add/form/bill/productsTable.vue";
import dilvaryAndAddInput from "@/elements/add/form/bill/dilvaryAndAddInput.vue";

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
      path: "/bills",
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
        store:{

        },
        safe:{

        },
        priceList:{

        },
        client_type: 1,
        status: 0,
        date: "",
        expiry_date: "",
        invoice_group: this.$option.bill_invoice_group_id,
        store_id: 0,
        safe_id: 0,
        priceList_id: 0,
        quotationItems: [],
        subtotal: 0,
        discount_value: 0,
        discount_type: 1,
        discount: 0,
        tax: 0,
        delivery: "",
        edit: "",
        total: 0,
        paid: "",
        rest: 0,
        project_bill: 0,
        purchasePayment: [],
      },
      errors: {
        name: false,
        store_id: false,
        invoice_group: false,
        safe_id: false,
        project_id: false
      },
      taxes: {},
      discounts: {},
      invoiceGroups: {},
      stores: {},
      safes: {},
      suppliers: {},
      itemIndex: null,
      items: [],
      print: this.$route.name == "billsCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "customers",
      "suppliers",
      "projects",
      "projectItems",
      "productQuantities",
      "productUnits",
      "units",
      "products",
      "priceLists",
      "materials",
      "invoiceGroups",
      "taxes",
      "discounts",
      "stores",
      "safes",
      "productPrices",
    ]);
    if (this.$route.name == "billsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {

      this.addQuotationItem();

      if (this.$route.params.id) {
        var supplier = this.$database.suppliers.find(
          (el) => el.id == this.$route.params.id
        );
        this.item.supplier_id = this.$route.params.id;
        this.item.supplier = supplier;
      }
      if (this.$route.params.id) {
        var supplier = this.$database.supplier.find(
          (el) => el.id == this.$route.params.id
        );
        this.item.supplier_id = this.$route.params.id;
        this.item.supplier = supplier;
      }
      if (this.$database.stores.length == 1) {
        this.item.store_id = this.$database.stores[0].id;
        this.item.store = this.$database.stores[0];
      }
      if (this.$database.safes.length == 1) {
        this.item.safe_id = this.$database.safes[0].id;
        this.item.safe = this.$database.safes[0];
      }
    }
    if (this.$route.name == "billsCreate") {
      var params = this.$getParams()
      if (params.supplier_id) {
        var supplier = this.$database.suppliers.find((el) => el.id == params.supplier_id);
        this.item.supplier_id = params.supplier_id;
        this.item.supplier = supplier;
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
    saveItem() {
      var error = 0;
      this.errors = [];
      if (
        this.item.client_type == 0 &&
        (typeof this.item.customer.name === "undefined" ||
          this.item.customer.name == "") &&
        this.$route.name == "billsCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }
      if (
        this.item.client_type == 1 &&
        (typeof this.item.supplier.name === "undefined" ||
          this.item.supplier.name == "") &&
        this.$route.name == "billsCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }
       if (
        this.item.client_type == 2 &&
        (typeof this.item.partner.name === "undefined" ||
          this.item.partner.name == "") &&
        this.$route.name == "invbillsCreateoicesCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }
      if (
        (typeof this.item.store_id === "undefined" ||
          this.item.store_id == "") &&
        this.$route.name == "billsCreate"
      ) {
        error = 1;
        this.errors.store_id = true;
      }
      if (
        this.$route.name == "billsCreate" &&
        this.item.paid != 0 &&
        (typeof this.item.safe_id === "undefined" ||
          this.item.safe_id == "" ||
          this.item.safe_id == 0)
      ) {
        error = 1;
        this.errors.safe_id = true;
      }
      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "billsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }

      if (
        this.item.project_bill != 0 &&
        (typeof this.item.project_id === "undefined" ||
          this.item.project_id == "" ||
          this.item.project_id == 0)
      ) {
        error = 1;
        this.errors.project_id = true;
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
        this.item.date = this.$fixDate(this.item.date)
        this.item.expiry_date = this.$fixDate(this.item.expiry_date)
        this.changePrice()
        if (this.$route.name == "billsCreate") {
          this.$parent.aletText = "تم اضافة الفاتورة بنجاح";
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          // change customer balance
          var balance = 0
          if (this.item.client_type == 0) {
            var customer = this.$database.customers.find((el) => el.id == this.item.customer_id);
            if (customer) {
              customer.balance = parseFloat(customer.balance) + parseFloat(this.item.rest);
              balance = customer.balance
            }
          } else {
            var supplier = this.$database.suppliers.find((el) => el.id == this.item.supplier_id);
            if (supplier) {
              supplier.balance = parseFloat(supplier.balance) + parseFloat(this.item.rest);
              balance = supplier.balance
            }
          }

          //change safe balance
          if (this.item.paid > 0) {
            var safe = this.$database.safes.find((el) => el.id == this.item.safe_id);
            safe.balance = parseFloat(safe.balance) - parseFloat(this.item.paid);
          }

          // change store balance
          this.item.quotationItems.forEach((quotationItem) => {
            var productUnitQuantity = 1;
            var productUnit = this.$database.productUnits.find(
              (el) =>
                el.product_id == quotationItem.product_id &&
                el.unit_id == quotationItem.unit_id
            );
            if (productUnit) {
              productUnitQuantity = productUnit.quantity;
            }

            var productQuantity = this.$database.productQuantities.find(
              (el) =>
                el.product_id == quotationItem.product_id &&
                el.store_id == this.item.store_id
            );
            if (productQuantity && productQuantity.track_quantity == 1) {
              productQuantity.quantity =
                productQuantity.quantity +
                quotationItem.quantity * productUnitQuantity;
            }
          });

          localStorage.database = JSON.stringify(this.$database);
          this.$router.go(-1);
          this.$parent.stopEdit = false;

          if (this.$option.print_after) {
            var printData = JSON.parse(JSON.stringify(this.item));
            printData.purchasePayment = {new_balance :  balance}
            var today = !isNaN(Date.parse(printData.date)) ? new Date(printData.date) : new Date();
          
            var date =
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate();

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
            this.$parent.printedBill = printData;
          }

        } else if (this.$route.name == "billsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.stopEdit = false;
              this.$parent.aletText = "تم تعديل الفاتورة بنجاح";
              this.$parent.alertType = "success";
              this.$router.go(-1);
              return response;
            });
        }
      } else {
        this.$parent.aletText = $t('allerts.pleaseMakeSureOfTheInput');
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
        count: "",
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
        barcode: "",
        selling_price: "",
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

      if(this.item.discount_type >=0 && this.item.discount_value > 0) {
        let discount = 0 
        if (this.item.discount_type == 0) {
          discount = this.item.subtotal * this.item.discount_value / 100
        } else {
          discount = this.item.discount_value
        }

        this.item.discount += discount - 0
        this.item.total -= discount
      }

      this.item.total += this.item.delivery - 0;
      this.item.total += this.item.edit - 0;
      this.item.rest = this.item.total - this.item.paid;

      if (this.item.client_type == 0) {
        this.item.old_balance = this.item.customer
          ? this.item.customer.balance
          : 0;
      } else if (this.item.client_type == 1) {
        this.item.old_balance = this.item.supplier
          ? this.item.supplier.balance
          : 0;
      }

      this.item.new_balance = this.item.old_balance + this.item.total;
      if (this.item.purchasePayment) {
        this.item.purchasePayment.new_balance =
          this.item.new_balance - this.item.paid;
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
    productsTable,
    dilvaryAndAddInput,
    addTax,
    addDiscount,
    loading,
    subFileInput,

    searchGroupInput,

    checkInput,

    VueCtkDateTimePicker,
    VueEditor
  },
  watch: {
    "$option.bill_invoice_group_id": function (val) {
      this.item.invoice_group = val;
    },
  },
};
</script>

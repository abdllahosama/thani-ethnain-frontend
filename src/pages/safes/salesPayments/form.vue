<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('salesPayments.form.addSalesPayment')"
          :description="
            $t('salesPayments.form.FromHereYouCanCreateaNewSalesPayment')
          "
          v-if="$route.name == 'salesPaymentsCreate'"
        />
        <addHeader
          :title="$t('salesPayments.form.SalesPaymentadjustment')"
          :description="$t('salesPayments.form.FromHereYouCanModifyTheSalesPaymentInformation') "
          v-if="$route.name == 'salesPaymentsEdit'"
        />

        <div class="mb-4 row">
          <connectionInput
            :title="$t('salesPayments.form.NumberingTheBatch')"
            :group="$t('salesPayments.form.Groups')"
            v-model="item.invoice_group"
            :hasErorr="errors.invoice_group"
            :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false: true"
            :error="$t('salesPayments.form.ThisFieldIsRequired')"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'salesPaymentsCreate'"
          />
          <formInput
            :title="$t('salesPayments.form.InvoiceCode')"
            v-model="item.code"
            :disabled="true"
            maxlength="255" 
            v-if="$route.name == 'salesPaymentsEdit'"
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
            :title="$t('salesPayments.form.BatchType')"
            v-model="item.client_type"
            :values="[
              { name: $t('salesPayments.form.CustomerPayment'), value: 0 },
              { name: $t('salesPayments.form.BatchResource'), value: 1 },
              { name: $t('salesPayments.form.PartnerBatch'), value: 2 },
            ]"
          />
          
          <searchGroupInput
            v-if="item.client_type == 0"
            :type="'customer'"
            :values="$database.customers.filter((el) => el.stat == 1)"
            :inputs="$option.salesPayments_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 1"
            :type="'supplier'"
            :values="$database.suppliers.filter((el) => el.stat == 1)"
            :inputs="$option.salesPayments_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 2"
            :type="'partner'"
            :values="$database.partners.filter((el) => el.stat == 1)"
            :inputs="$option.salesPayments_customer_data"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{
              $t('salesPayments.form.PaymentDate')
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('salesPayments.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('salesPayments.form.Now')"
                  v-model="item.date"
                  :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false: true"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>

          <searchGroupInput
          :type="'project'"
          :values="$database.projects"
          :inputs="[{ 'title':$t('salesPayments.form.Project'),'show': 'name'}]"
          v-if="$site.projects_allow"
        />

          <connectionInput
            :disabled="item.project_id == 0"
            :title="$t('salesPayments.form.ProjectOutput')"
            :group="$t('salesPayments.form.ProjectOutputs')"
            v-model="item.project_item_id"
            :values="$database.projectItems.filter(el => el.project_id == item.project_id)"
            v-if="$site.projects_allow"
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
            :title="$t('salesPayments.form.AccountsInformation')"
            :description="
              $t('salesPayments.form.AccountInformationDetails')
            "
          />

          <monyInput
            :title="$t('salesPayments.form.ReceivedAmount')"
            v-model="item.cost"
            :hasErorr="errors.cost"
            :error="$t('allerts.theAmountReceivedMustBeGreaterThan')"
          />
          <searchGroupInput
            :type="'safe'"
            :values="$database.safes"
            :inputs="[{ 'show': 'name'}]"
          />

          <monyInput
            :title="$t('salesPayments.form.BankSees')"
            v-model="item.bank_fees"
            :disabled="
              $user.admin || $user.role.sales_payments_edit_item
                ? false
                : true
            "
          />

          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{
              $t('salesPayments.form.PaymentFee')
            }}</label>
            <div class="col-md-7">
              <div class="d-flex mult-with-add">
                <multiselect
                  v-model="selectedPaymentFees"
                  :options="$database.paymentFees"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  :placeholder="$t('salesPayments.form.PaymentFee')"
                  label="name"
                  track-by="name"
                  :hide-selected="true"
                  :preselect-first="true"
                  :disabled="$user.admin || $user.role.sales_payments_edit_item ? false : true"
                ></multiselect>
                <button class="btn btn-info" @click="model = 'addPaymentFee'" :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false: true"
>
                  <i class="fa fa-plus"></i>
                </button>
              </div>
            </div>
          </div>

          <searchGroupInput
            :type="'paymentMethod'"
            :values="$database.paymentMethods"
            :inputs="[{ 'show': 'name'}]"
          />

          <checkInput
            :title="$t('salesPayments.form.BankTax')"
            :value="item.bank_tax"
            v-model="item.bank_tax"
            :disabled="
              $user.admin || $user.role.sales_payments_edit_item
                ? false
                : true
            "
          />
          <monyInput
            :title="$t('salesPayments.form.TaxAmount')"
            v-if="item.bank_tax == 1"
            v-model="item.bank_tax_amount"
            :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false: true"
          />
          <monyInput
            :title="$t('salesPayments.form.cash')"
            v-model="item.cash"
            :disabled="
              $user.admin || $user.role.sales_payments_edit_item
                ? false
                : true
            "
          />
          <div class="col-6"></div>

          <dvider
            :title="$t('salesPayments.form.PaymentNotes')"
            :description="$t('salesPayments.form.PaymentNotesDetails')"
          ></dvider>

          <formTextarea
            :title="$t('salesPayments.form.thatAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('salesPayments.form.Note')"
            v-model="item.notes"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'salesPaymentsCreate' && !$parent.stopEdit"
          >
            {{ $t('salesPayments.form.addSalesPayment') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'salesPaymentsEdit' && !$parent.stopEdit"
          >
            {{ $t('salesPayments.form.SalesPaymentadjustment') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
    <addPaymentMethod v-if="model == 'addPaymentMethod'"/>
    <addPaymentFee v-if="model == 'addPaymentFee'"/>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import checkInput from "@/elements/add/form/checkInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
import subFileInput from "@/elements/add/form/subFileInput.vue";


import addPaymentMethod from "@/elements/popupForms/addPaymentMethod.vue";
import addPaymentFee from "@/elements/popupForms/addPaymentFee.vue";

import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/salesPayments",
      item: {
        invoice_group: this.$option.sales_payment_invoice_group_id,
        customer_id: 0,
        supplier_id: 0,
        partner_id: 0,
        project_id: 0,
        project: {},
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
        paymentMethod:{

        },
        safe:{

        },
        client_type: 0,
        invoice_id: 0,
        payment_method_id: 0,
        payment_fee_id: [],
        bank_tax: 0,
        safe_id: 0,
        date: "",
        status: 1,
      },
      selectedPaymentFees: [],
      model: false,
      errors: {
        invoice_group: false,
        name: false,
        cost: false,
        safe_id: false,
      },
      print: this.$route.name == "salesPaymentsCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "invoiceGroups",
      "customers",
      "suppliers",
      "projects",
      "projectItems",
      "safes",
      "paymentMethods",
      "paymentFees",
    ]);

    if (this.$route.name == "salesPaymentsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      

      var params = this.$getParams()
      if (params.customer_id) {
        var customer = this.$database.customers.find((el) => el.id == params.customer_id);
        this.item.customer_id = params.customer_id;
        this.item.customer = customer;
      }
      if (params.safe_id) {
        var safe = this.$database.safes.find(
          (el) => el.id == params.safe_id
        );
        this.item.safe_id = params.safe_id;
      } else {
        if (this.$database.safes.length == 1) {
          this.item.safe_id = this.$database.safes[0].id;
          this.item.safe = this.$database.safes[0];
        }
      }
      
    }
    if (this.$route.name == "salesPaymentsCreate") {
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
          this.item = response.data;
          this.$parent.stopEdit = false;
          if (Array.isArray(JSON.parse(this.item.payment_fee_id))) {
            JSON.parse(this.item.payment_fee_id).forEach((id) => {
              var paymentFee = this.$database.paymentFees.find((el) => el.id == id);
              this.selectedPaymentFees.push(paymentFee);
            });
          }
          this.item.date = this.$dateFormat(this.item.date, true)
        });
    },
    saveItem() {
      var error = 0;
      if (
        this.item.client_type == 0 &&
        (typeof this.item.customer_id === "undefined" ||
          this.item.customer_id == "")
      ) {
        error = 1;
        this.errors.name = true;
      }
      if (
        this.item.client_type == 1 &&
        (typeof this.item.supplier_id === "undefined" ||
          this.item.supplier_id == "")
      ) {
        error = 1;
        this.errors.name = true;
      }
      if (
        this.item.client_type == 2 &&
        (typeof this.item.partner.name === "undefined" ||
          this.item.partner.name == "") &&
        this.$route.name == "salesPaymentsCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }
      if (
        typeof this.item.cost === "undefined" ||
        this.item.cost == "" ||
        this.item.cost == 0
      ) {
        error = 1;
        this.errors.cost = true;
      }
      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "salesPaymentsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      if (this.$route.name == "salesPaymentsCreate") {
        if (
          typeof this.item.safe_id === "undefined" ||
          this.item.safe_id == "" ||
          this.item.safe_id == 0
        ) {
          error = 1;
          this.errors.safe_id = true;
        }
      }
      if (error == 0) {
        this.item.date = this.$fixDate(this.item.date)
        if (this.$route.name == "salesPaymentsCreate") {
          this.$parent.aletText = this.$t('allerts.salesPaymentSuccessfullyAdde');
          this.$parent.alertType = "success";
          var item = this.$addToLocalDatabase(this.item, this.path.substring(1));
          if (this.item.client_type == 0) {
            this.item.old_balance = this.item.customer.balance;
          } else if (this.item.client_type == 1) {
            this.item.old_balance = this.item.supplier.balance;
          }
          this.item.new_balance = parseFloat(this.item.old_balance) + parseFloat(this.item.cost - 0);
          
          if (this.item.client_type == 0) {
            var customer = this.$database.customers.find((el) => el.id == this.item.customer_id);
            if (customer) {
              customer.balance = this.item.new_balance;
            }
          } else {
            var supplier = this.$database.suppliers.find((el) => el.id == this.item.supplier_id);
            if (supplier) {
              supplier.balance = this.item.new_balance;
            }
          }
          var safe = this.$database.safes.find((el) => el.id == this.item.safe_id);
          if (safe) {
            safe.balance = parseFloat(safe.balance) + parseFloat(this.item.cost );
          }
          localStorage.database = JSON.stringify(this.$database);
          
          this.$router.go(-1);
          this.$parent.stopEdit = false;
          if (this.$option.print_after) {
            var printData = item;
            
            printData.created_at = new Date().toISOString("ar-EG", {timeZone: "Africa/Cairo"});
            this.$parent.printedSalesPayment = printData;
          }
        } else if (this.$route.name == "salesPaymentsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              if (response.data == "safe error") {
                this.$parent.aletText = "الموظف غير مربوط بخزينة";
                this.$parent.alertType = "danger";
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                this.$parent.aletText =
                  this.$t('allerts.salesPaymentHasBeenModifiedSuccessfully');
                this.$parent.alertType = "success";
                this.$router.go(-1);
                this.$parent.stopEdit = false;
                return response;
              }
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
  watch: {
    selectedPaymentFees: function (val) {
      this.item.payment_fee_id = val.map((el) => el.id);
    },
  },

  components: {
    formInput,
    dvider,
    addHeader,
    monyInput,
    selectInput,
    formTextarea,
    connectionInput,
    checkInput,
    addPaymentMethod,
    addPaymentFee,
    loading,
    subFileInput,

    searchGroupInput,
    VueCtkDateTimePicker,
  },
};
</script>

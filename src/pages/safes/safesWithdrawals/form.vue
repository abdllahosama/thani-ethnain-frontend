<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('safesWithdrawals.form.addWithdrawals')"
          :description="
            $t('safesWithdrawals.form.FromHereYouCanCreateaNewWithdrawals')
          "
          v-if="$route.name == 'safesWithdrawalsCreate'"
        />
        <addHeader
          :title="$t('safesWithdrawals.form.safesWithdrawalsadjustment')"
          :description="
            $t('safesWithdrawals.form.FromHereYouCanModifyTheSalesPaymentInformation')
          "
          v-if="$route.name == 'safesWithdrawalsEdit'"
        />

        <div class="mb-4 row">
          <connectionInput
            :title="$t('safesWithdrawals.form.NumberingTheWithdrawalProcess')"
            :group="$t('safesWithdrawals.form.Groups')"
            v-model="item.invoice_group"
            :disabled="$user.admin || $user.role.sales_payments_edit_item ? false: true"
            :values="$database.invoiceGroups"
            v-if=" $route.name == 'safesWithdrawalsCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('safesWithdrawals.form.NumberingIsRequired')"
          />
          <formInput
            :title="$t('safesWithdrawals.form.InvoiceCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'safesWithdrawalsEdit'"
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

          

          <searchGroupInput
          :type="'safe'"
          :values="$database.safes"
          :inputs="[{ 'title':$t('bills.form.Treasury'),'show': 'name'}]"
        />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{
              $t('safesWithdrawals.form.withdrawalDate')
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('safesWithdrawals.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('safesWithdrawals.form.Now')"
                  v-model="item.date"
                  :disabled="$user.admin || $user.role.sales_payments_edit_item ? false: true"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"/>
              </div>
            </div>
          </div>

          <selectInput
            :title="$t('invoices.form.Situation')"
            v-model="item.status"
            :values="[
              { name: $t('invoices.draft'), value: 0 },
              { name: $t('invoices.approved'), value: 1 }
            ]"
          />

          <dvider
            :title="$t('safesWithdrawals.form.AccountsInformation')"
            :description="
              $t('safesWithdrawals.form.AccountInformationDetails')
            "
          />

          <monyInput
            :title="$t('safesWithdrawals.form.ReceivedAmount')"
            v-model="item.cost"
            :hasErorr="errors.cost"
            :error="$t('allerts.theAmountReceivedMustBeGreaterThan')"
          />

          <connectionInput
            :title="$t('safesWithdrawals.form.PaymentMethod')"
            :group="$t('safesWithdrawals.form.PaymentMethods')"
            v-model="item.payment_method_id"
            :hasAdd="true"
            :open="'addPaymentMethod'"
            :values="$database.paymentMethods"
            :value="item.payment_fee_id"
            :disabled="$user.admin || $user.role.sales_payments_edit_item ? false: true"
          />

          <div class="col-6"></div>

          <dvider
            :title="$t('safesWithdrawals.form.PaymentNotes')"
            :description="$t('safesWithdrawals.form.PaymentNotesDetails')"
          />

          <formTextarea
            :title="$t('safesWithdrawals.form.thatAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('safesWithdrawals.form.Note')"
            v-model="item.notes"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'safesWithdrawalsCreate' && !$parent.stopEdit"
          >
            {{ $t('safesWithdrawals.form.addWithdrawals') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'safesWithdrawalsEdit' && !$parent.stopEdit"
          >
            {{ $t('safesWithdrawals.form.SalesPaymentadjustment') }}
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

import customerTaxIdInput from "@/elements/add/form/search/customerTaxIdInput.vue";
import customerSearchInput from "@/elements/add/form/search/customerNameInput.vue";

import supplierTaxIdInput from "@/elements/add/form/search/supplierTaxIdInput.vue";
import supplierSearchInput from "@/elements/add/form/search/supplierNameInput.vue";
import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/safesWithdrawals",
      item: {
        invoice_group: this.$option.safes_withdrawal_invoice_group_id,
        customer_id: 0,
        supplier_id: 0,
        point_of_sale_id: 0,
        session_number: 0,
        customer: {
          name: "",
          mobile: "",
          address1: "",
        },
        supplier: {
          name: "",
          mobile: "",
          address1: "",
        },
        client_type: 0,
        invoice_id: 0,
        payment_method_id: 0,
        payment_fee_id: [],
        bank_tax: 0,
        safe_id: 0,
        date: "",
        safe: {},
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
      print: this.$route.name == "safesWithdrawalsCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "invoiceGroups",
      "safes",
      "paymentMethods",
    ]);

    if (this.$route.name == "safesWithdrawalsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      var params = this.$getParams()
      if (params.safe_id) {
        var safe = this.$database.safes.find((el) => el.id == params.safe_id);
        this.item.safe_id = params.safe_id;
        this.item.safe = safe;
      }
      if (params.point_of_sale_id) {this.item.point_of_sale_id = params.point_of_sale_id;}
      if (params.session_number) {this.item.session_number = params.session_number;}
    }
    if (this.$route.name == "safesWithdrawalsCreate") {
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
              var paymentFee = this.$database.paymentFees.find(
                (el) => el.id == id
              );
              this.selectedPaymentFees.push(paymentFee);
            });
          }
          this.item.date = this.$dateFormat(this.item.date, true)
        });
    },
    saveItem() {
      var error = 0;
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
        this.$route.name == "safesWithdrawalsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      if (this.$route.name == "safesWithdrawalsCreate") {
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
        if (this.$route.name == "safesWithdrawalsCreate") {
          this.$parent.aletText = this.$t('allerts.safesWithdrawalsuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.item.new_balance = parseFloat(this.item.old_balance) + parseFloat(this.item.cost);
          
          var safe = this.$database.safes.find((el) => el.id == this.item.safe_id);
          if (safe) {
            safe.balance = parseFloat(safe.balance) - parseFloat(this.item.cost);
          }
          localStorage.database= JSON.stringify(this.$database)
          
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "safesWithdrawalsEdit") {
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

    customerTaxIdInput,
    customerSearchInput,

    supplierTaxIdInput,
    supplierSearchInput,

    VueCtkDateTimePicker,
    subFileInput,
    searchGroupInput,
  },
};
</script>

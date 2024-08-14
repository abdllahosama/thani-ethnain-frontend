<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('safesDeposits.form.addSalesPayment')"
          :description="
            $t('safesDeposits.form.FromHereYouCanCreateaNewSalesPayment')
          "
          v-if="$route.name == 'safesDepositsCreate'"
        />
        <addHeader
          :title="$t('safesDeposits.form.SalesPaymentadjustment')"
          :description="
            $t('safesDeposits.form.FromHereYouCanModifyTheSalesPaymentInformation')
          "
          v-if="$route.name == 'safesDepositsEdit'"
        />

        <div class="mb-4 row">
          <connectionInput
            :title="$t('safesDeposits.form.NumberingTheProcess')"
            :group="$t('safesDeposits.form.Groups')"
            v-model="item.invoice_group"
            :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false : true"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'safesDepositsCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('safesDeposits.form.NumberingIsRequired')"
          />
          <formInput
            :title="$t('safesDeposits.form.OperationCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'safesDepositsEdit'"
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
              $t('safesDeposits.form.PaymentDate')
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('safesDeposits.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('safesDeposits.form.Now')"
                  v-model="item.date"
                  :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false : true"
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

          <checkInput
            :title="$t('safesDeposits.form.PrintTheProcess')"
            :value="print"
            v-model="print"
            v-if="$route.name == 'safesDepositsCreate'"
          />

          <dvider
            :title="$t('safesDeposits.form.AccountsInformation')"
            :description="
              $t('safesDeposits.form.AccountInformationDetails')
            "
          />

          <monyInput
            :title="$t('safesDeposits.form.ReceivedAmount')"
            v-model="item.cost"
            :hasErorr="errors.cost"
            :error="$t('allerts.theAmountReceivedMustBeGreaterThan')"
          />

          <searchGroupInput
            :type="'paymentMethod'"
            :values="$database.paymentMethods"
            :inputs="[{ 'show': 'name'}]"
          />

          <dvider
            :title="$t('safesDeposits.form.PaymentNotes')"
            :description="$t('safesDeposits.form.PaymentNotesDetails')"
          />

          <formTextarea
            :title="$t('safesDeposits.form.thatAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('safesDeposits.form.Note')"
            v-model="item.notes"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'safesDepositsCreate' && !$parent.stopEdit"
          >
            {{ $t('safesDeposits.form.addSalesPayment') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'safesDepositsEdit' && !$parent.stopEdit"
          >
            {{ $t('safesDeposits.form.SalesPaymentadjustment') }}
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
import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/safesDeposits",
      item: {
        invoice_group: this.$option.safes_deposit_invoice_group_id,
        safe_id: 0,
        payment_method_id: 0,
        point_of_sale_id: 0,
        session_number: 0,
        safe_id: 0,
        date: "",
        safe: {},
        paymentMethod:{},
        status: 1
      },
      selectedPaymentFees: [],
      model: false,
      errors: {
        invoice_group: false,
        safe_id: false,
        cost: false,
      },
      print: this.$route.name == "safesDepositsCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "invoiceGroups",
      "safes",
      "paymentMethods"
    ]);

    if (this.$route.name == "safesDepositsEdit") {
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
    if (this.$route.name == "safesDepositsCreate") {
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
        this.$route.name == "safesDepositsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      if (this.$route.name == "safesDepositsCreate") {
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
        if (this.$route.name == "safesDepositsCreate") {
          this.$parent.aletText = this.$t('allerts.safesDepositsuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          
          // update safe balance
          var safe = this.$database.safes.find((el) => el.id == this.item.safe_id);
          if (safe) {
            safe.balance = parseFloat(safe.balance) + parseFloat(this.item.cost);
          }
          localStorage.database= JSON.stringify(this.$database)
          
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "safesDepositsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.salesPaymentHasBeenModifiedSuccessfully');
              this.$parent.alertType = "success";
              this.$router.go(-1);
              this.$parent.stopEdit = false;
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
    formInput,
    dvider,
    addHeader,
    monyInput,
    selectInput,
    formTextarea,
    connectionInput,
    checkInput,
    addPaymentMethod,
    loading,
    VueCtkDateTimePicker,
    subFileInput,
    searchGroupInput,
  },
};
</script>

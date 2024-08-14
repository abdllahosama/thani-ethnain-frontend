<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('safesTransfers.form.addSafesTransfers')"
          :description="$t('safesTransfers.form.FromHereYouCanCreateaNewTransfers')"
          v-if="$route.name == 'safesTransfersCreate'"
        />
        <addHeader
          :title="$t('safesTransfers.form.safesTransfersadjustment')"
          :description="
            $t('safesTransfers.form.FromHereYouCanModifyTheSalesPaymentInformation')
          "
          v-if="$route.name == 'safesTransfersEdit'"
        />

        <div class="mb-4 row">
          <connectionInput
            :title="$t('safesTransfers.form.NumberingTheTransfer')"
            :group="$t('safesTransfers.form.Groups')"
            v-model="item.invoice_group"
            :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false : true"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'safesTransfersCreate'"
            :hasErorr="errors.invoice_group"
            :error="$t('safesTransfers.form.NumberingIsRequired')"
          />
          <formInput
            :title="$t('safesTransfers.form.OperationCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'safesTransfersEdit'"
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

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{
              $t('safesTransfers.form.withdrawalDate')
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('safesTransfers.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('safesTransfers.form.Now')"
                  v-model="item.date"
                  :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false : true"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"/>
              </div>
            </div>
          </div>

          <searchGroupInput
            :type="'from_safe'"
            :values="$database.safes.filter(el => el.id != item.to_safe_id)"
            database="safe"
            :inputs="[{ 'show': 'name'}]"
          />

          <searchGroupInput
            :type="'to_safe'"
            :values="$database.safes.filter(el => el.id != item.from_safe_id)"
            database="safe"
            :inputs="[{ 'show': 'name'}]"
          />


          <selectInput
            :title="$t('invoices.form.Situation')"
            v-model="item.status"
            :values="[
              { name: $t('invoices.draft'), value: 0 },
              { name: $t('invoices.approved'), value: 1 }
            ]"
          />

          <checkInput
            :title="$t('safesTransfers.form.PrintTheInvoice')"
            :value="print"
            v-model="print"
            v-if="$route.name == 'safesWithdrawalsCreate'"
          />

          <dvider
            :title="$t('safesTransfers.form.AccountsInformation')"
            :description="
              $t('safesTransfers.form.AccountInformationDetails')
            "
          />

          <monyInput
            :title="$t('safesTransfers.form.ReceivedAmount')"
            v-model="item.cost"
            :hasErorr="errors.cost"
            :error="$t('allerts.theAmountReceivedMustBeGreaterThan')"
          />

          <connectionInput
            :title="$t('safesTransfers.form.PaymentMethod')"
            :group="$t('safesTransfers.form.PaymentMethods')"
            v-model="item.payment_method_id"
            :hasAdd="true"
            :open="'addPaymentMethod'"
            :values="$database.paymentMethods"
            :value="item.payment_fee_id"
            :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false : true"
          />

          <div class="col-6"></div>

          <dvider
            :title="$t('safesTransfers.form.PaymentNotes')"
            :description="$t('safesTransfers.form.PaymentNotesDetails')"
          />

          <formTextarea
            :title="$t('safesTransfers.form.thatAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('safesTransfers.form.Note')"
            v-model="item.notes"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'safesTransfersCreate' && !$parent.stopEdit"
          >
            {{ $t('safesTransfers.form.addSafesTransfers') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'safesTransfersEdit' && !$parent.stopEdit"
          >
            {{ $t('safesTransfers.form.safesTransfersadjustment') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
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

import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/safesTransfers",
      item: {
        invoice_group: this.$option.safes_transfer_invoice_group_id,
        payment_method_id: 0,
        from_safe_id: "",
        to_safe_id: "",
        date: "",
        status: 1,
        from_safe: {},
        to_safe: {}
      },
      selectedPaymentFees: [],
      model: false,
      errors: {
        invoice_group: false,
        cost: false,
        from_safe_id: false,
        to_safe_id: false,
      },
      print: this.$route.name == "safesTransfersCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "invoiceGroups",
      "safes",
      "paymentMethods"
    ]);

    if (this.$route.name == "safesTransfersEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      var params = this.$getParams()
      if (params.from_safe_id) {
        this.item.from_safe_id = params.from_safe_id;
      }
      if (params.to_safe_id) {
        this.item.to_safe_id = params.to_safe_id;
      }
    }
    if (this.$route.name == "safesTransfersCreate") {
      var params = this.$getParams()
      if (params.from_safe_id) {
        var safe = this.$database.safes.find((el) => el.id == params.from_safe_id);
        this.item.from_safe_id = params.from_safe_id;
        this.item.safe = safe;
      }
      
      if (params.point_of_sale_id) {this.item.point_of_sale_id = params.point_of_sale_id;}
      if (params.session_number) {this.item.session_number = params.session_number;}

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
        this.$route.name == "safesTransfersCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      if (this.$route.name == "safesTransfersCreate") {
        if (
          typeof this.item.to_safe_id === "undefined" ||
          this.item.to_safe_id == "" ||
          this.item.to_safe_id == 0
        ) {
          error = 1;
          this.errors.to_safe_id = true;
        }
        if (
          typeof this.item.from_safe_id === "undefined" ||
          this.item.from_safe_id == "" ||
          this.item.from_safe_id == 0
        ) {
          error = 1;
          this.errors.from_safe_id = true;
        }
      }
      if (error == 0) {
        this.item.date = this.$fixDate(this.item.date)
        if (this.$route.name == "safesTransfersCreate") {
          this.$parent.aletText = this.$t('allerts.safesTransfersSuccessfullyAdded');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.item.new_balance = parseFloat(this.item.old_balance) + parseFloat(this.item.cost);          

          //change safes balance
          var fromSafe = this.$database.safes.find((el) => el.id == this.item.from_safe_id);
          if (fromSafe) {
            fromSafe.balance = parseFloat(fromSafe.balance) - parseFloat(this.item.cost);
          }
          var toSafe = this.$database.safes.find((el) => el.id == this.item.to_safe_id);
          if (toSafe) {
            toSafe.balance = parseFloat(toSafe.balance) + parseFloat(this.item.cost);
          }
          
          localStorage.database= JSON.stringify(this.$database)
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "safesTransfersEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
              this.$t('allerts.safeTransfersHasBeenModifiedSuccessfully');
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
    loading,
    subFileInput,
    searchGroupInput,
    VueCtkDateTimePicker,
  },
};
</script>

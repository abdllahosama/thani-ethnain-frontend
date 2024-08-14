<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('purchasePayments.form.addpurchasePayment')"
          :description="
            $t('purchasePayments.form.FromHereYouCanCreateaNewpurchasePayment')
          "
          v-if="$route.name == 'purchasePaymentsCreate'"
        />
        <addHeader
          :title="$t('purchasePayments.form.purchasePaymentadjustment')"
          :description="
            $t(
              'purchasePayments.form.FromHereYouCanModifyThepurchasePaymentInformation'
            )
          "
          v-if="$route.name == 'purchasePaymentsEdit'"
        />
        <div class="mb-4 row">
          <connectionInput
            :title="$t('purchasePayments.form.NumberingTheBatch')"
            :group="$t('purchasePayments.form.Groups')"
            v-model="item.invoice_group"
            :disabled="
              $user.admin ||
              $user.role.purchase_payments_edit_item
                ? false
                : true
            "
            :hasErorr="errors.invoice_group"
            :error="$t('purchasePayments.form.ThisFieldIsRequired')"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'purchasePaymentsCreate'"
          />
          <formInput
            :title="$t('purchasePayments.form.InvoiceCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'purchasePaymentsEdit'"
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
            :title="$t('purchasePayments.form.reference')"
            v-model="item.refrance"
            maxlength="255"
          />
          <selectInput
            :title="$t('purchasePayments.form.BatchType')"
            :disabled="$route.name == 'purchasePaymentsEdit' ? true : false"
            v-model="item.client_type"
            :values="[
              { name: $t('purchasePayments.form.CustomerPayment'), value: 0 },
              { name: $t('purchasePayments.form.BatchResource'), value: 1 },
              { name: $t('purchasePayments.form.PartnerBatch'), value: 2 },
            ]"
          />
          
          <searchGroupInput
            v-if="item.client_type == 0"
            :type="'customer'"
            :values="$database.customers.filter((el) => el.stat == 1)"
            :inputs="$option.purchasePayments_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 1"
            :type="'supplier'"
            :values="$database.suppliers.filter((el) => el.stat == 1)"
            :inputs="$option.purchasePayments_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 2"
            :type="'partner'"
            :values="$database.partners.filter((el) => el.stat == 1)"
            :inputs="$option.purchasePayments_customer_data"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{
              $t("purchasePayments.form.PaymentDate")
            }}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>

                <VueCtkDateTimePicker
                  :label="$t('purchasePayments.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('purchasePayments.form.Now')"
                  v-model="item.date"
                  :disabled="
                    $user.admin ||
                    $user.role.purchase_payments_edit_item
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

          <searchGroupInput
          :type="'project'"
          :values="$database.projects"
          :inputs="[{ 'title':$t('purchasePayments.form.Project'),'show': 'name'}]"
          v-if="$site.projects_allow"
        />


          <connectionInput
            :disabled="item.project_id == 0"
            :title="$t('purchasePayments.form.ProjectOutput')"
            :group="$t('purchasePayments.form.ProjectOutputs')"
            v-model="item.project_item_id"
            :values="
              $database.projectItems.filter(
                (el) => el.project_id == item.project_id
              )
            "
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
            :description="$t('salesPayments.form.AccountInformationDetails')"
          />

          <monyInput
            :title="$t('purchasePayments.form.cash')"
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
            :title="$t('purchasePayments.form.BankFees')"
            v-model="item.bank_fees"
            :disabled="
              $user.admin ||
              $user.role.purchase_payments_edit_item
                ? false
                : true
            "
          />
          <connectionInput
            :title="$t('purchasePayments.form.PaymentMethod')"
            :group="$t('purchasePayments.PaymentMethods')"
            v-model="item.payment_method_id"
            :hasAdd="true"
            :open="'addPaymentMethod'"
            :values="$database.paymentMethods"
            :value="item.payment_fee_id"
            :disabled="
              $user.admin ||
              $user.role.purchase_payments_edit_item
                ? false
                : true
            "
          />
          <checkInput
            :title="$t('purchasePayments.form.BankTax')"
            :value="item.bank_tax"
            v-model="item.bank_tax"
            :disabled="
              $user.admin ||
              $user.role.purchase_payments_edit_item
                ? false
                : true
            "
          />
          <monyInput
            :title="$t('purchasePayments.form.TaxAmount')"
            v-if="item.bank_tax == 1"
            v-model="item.bank_tax_amount"
            :disabled="
              $user.admin ||
              $user.role.purchase_payments_edit_item
                ? false
                : true
            "
          />
          <dvider
            :title="$t('salesPayments.form.PaymentNotes')"
            :description="$t('salesPayments.form.PaymentNotesDetails')"
          />
          <formTextarea
            :title="$t('purchasePayments.form.thatAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('purchasePayments.form.Note')"
            v-model="item.notes"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'purchasePaymentsCreate' && !$parent.stopEdit"
          >
            {{ $t("purchasePayments.form.addpurchasePayment") }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'purchasePaymentsEdit' && !$parent.stopEdit"
          >
            {{ $t("purchasePayments.form.purchasePaymentadjustment") }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
    <!-- / .row -->
    <addPaymentMethod v-if="model == 'addPaymentMethod'"/>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
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
      path: "/purchasePayments",
      item: {
        invoice_group: this.$option.purchase_payment_invoice_group_id,
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
        safe:{

        },
        client_type: 1,
        bill_id: 0,
        payment_number: 0,
        payment_method_id: 0,
        date: "",
        bank_tax: 0,
        safe_id: 0,
        status: 1,
      },
      model: false,
      errors: {
        name: false,
        cost: false,
        safe_id: false,
        invoice_group: false,
      },
      print: this.$route.name == "purchasePaymentsCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "InvoiceGroups",
      "customers",
      "suppliers",
      "projects",
      "projectItems",
      "safes",
      "paymentMethods",
    ]);

    if (this.$route.name == "purchasePaymentsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      var params = this.$getParams();
      if (params.supplier_id) {
        var supplier = this.$database.suppliers.find(
          (el) => el.id == params.supplier_id
        );
        this.item.supplier_id = params.supplier_id;
        this.item.supplier = supplier;
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
    if (this.$route.name == "purchasePaymentsCreate") {
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
        this.$route.name == "purchasePaymentsCreate"
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
        this.$route.name == "purchasePaymentsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      if (this.$route.name == "purchasePaymentsCreate") {
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
        this.item.date = this.$fixDate(this.item.date);
        if (this.$route.name == "purchasePaymentsCreate") {
          this.$parent.aletText = this.$t('allerts.purchasePaymentSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          if (this.item.client_type == 0) {
            this.item.old_balance = this.item.customer.balance;
          } else if (this.item.client_type == 1) {
            this.item.old_balance = this.item.supplier.balance;
          }
          this.item.new_balance = parseFloat(this.item.old_balance) - parseFloat(this.item.cost);
          
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
          safe.balance = parseFloat(safe.balance) - parseFloat(this.item.cost);

          localStorage.database = JSON.stringify(this.$database);
          
          this.$router.go(-1);
          this.$parent.stopEdit = false;
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

            printData.created_at = new Date().toISOString("ar-EG", {timeZone: "Africa/Cairo"});
            this.$parent.printedPurchasePayment = printData;

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

              printData.created_at = new Date().toISOString("ar-EG", {timeZone: "Africa/Cairo"});
              this.$parent.printedPurchasePayment = printData;
            }
          }
        } else if (this.$route.name == "purchasePaymentsEdit") {
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
              } else if (response.data == "money error") {
                this.$parent.aletText = "المبلغ غير موجود بالخزينة";
                this.$parent.alertType = "danger";
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                this.$parent.aletText =
                  this.$t('allerts.purchasePaymentHasBeenModifiedSuccessfully');
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
    loading,
    subFileInput,

    searchGroupInput,
    VueCtkDateTimePicker,
  },
};
</script>

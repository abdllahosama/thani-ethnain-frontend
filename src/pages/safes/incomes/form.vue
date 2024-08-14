<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('incomes.form.addincome')"
          :description="$t('incomes.form.FromHereYouCanCreateaNewincome')"
          v-if="$route.name == 'incomesCreate'"
        />
        <addHeader
          :title="$t('incomes.form.incomeadjustment')"
          :description="
            $t('incomes.form.FromHereYouCanModifyTheincomeInformation')
          "
          v-if="$route.name == 'incomesEdit'"
        />
        <div class="mb-4 row">
          <connectionInput
            :title="$t('incomes.form.NumberingOfAllowances')"
            :group="$t('incomes.form.Groups')"
            v-model="item.invoice_group"
            :disabled="$user.admin || $user.role.expenses_edit_item ? false : true"
            :hasErorr="errors.invoice_group"
            :error="$t('incomes.form.ThisFieldIsRequired')"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'incomesCreate'"
          />
          <formInput
            :title="$t('incomes.form.AllowanceCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'incomesEdit'"
            maxlength="255"
          />
          <subFileInput :title="$t('invoices.form.invoiceFile')"
                     v-model="item.file"
                     :file="item.file"
                     :path="'invoices'"
                     :hasErorr="errors.file"
                     :error="$t('allerts.ChooseASuitableFile')"/> 
          <formInput
            :title="$t('incomes.form.reference')"
            v-model="item.refrance"
            maxlength="255"
          />
          <formInput
            :title="$t('incomes.form.paidFor')"
            v-model="item.cash_to"
            maxlength="255"
          />
          
          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{$t('incomes.form.date')}}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('incomes.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('incomes.form.Now')"
                  v-model="item.date"
                  :disabled="$user.admin || $user.role.expenses_edit_item ? false : true"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>
          <searchGroupInput
            :type="'supplier'"
            :values="$database.suppliers"
            :inputs="[{ 'title':$t('incomes.form.supplier'),'show': 'name'}]"
          />

           <searchGroupInput
            :type="'customer'"
            :values="$database.customers"
            :inputs="[{ 'title':$t('incomes.form.customer'),'show': 'name'}]"
          />

          <searchGroupInput
            :type="'project'"
            :values="$database.projects"
            :inputs="[{ 'title':$t('incomes.form.Project'),'show': 'name'}]"
            v-if="$site.projects_allow"
          />
          <connectionInput
            :disabled="item.project_id == 0"
            :title="$t('incomes.form.ProjectOutput')"
            :group="$t('incomes.form.ProjectOutputs')"
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
            :description="$t('salesPayments.form.AccountInformationDetails')"
          />

          <selectInput
            :title="$t('incomes.form.type')"
            v-model="item.type"
            :values="[
              { name: $t('incomes.form.paid'), value: 0 },
              { name: $t('incomes.form.worthy'), value: 1 }
            ]"
          />

          <monyInput
            :title="$t('incomes.form.cost')"
            v-model="item.cost"
            :hasErorr="errors.cost"
            :error="$t('allerts.costMustBeGreaterThan')"
          />

          <searchGroupInput
            :type="'safe'"
            :values="$database.safes"
            :inputs="[{ 'show': 'name'}]"
          />
          <searchGroupInput
            :type="'paymentMethod'"
            :values="$database.paymentMethods"
            :inputs="[{ 'show': 'name'}]"
          />

          <connectionInput
            :title="$t('incomes.form.BasicClassification')"
            :group="$t('incomes.form.classifications')"
            v-model="item.income_section_id"
            :hasAdd="false"
            :values="this.$database.incomeSections.filter(el => el.income_section_id == 0)"
            :value="item.income_section_id"
          />
          <connectionInput
            v-if="item.income_section_id"
            :title="$t('incomes.form.Subclassification')"
            :group="$t('incomes.form.classifications')"
            v-model="item.sup_income_section_id"
            :hasAdd="false"
            :open="'addIncomeSection'"
            :values="this.$database.incomeSections.filter(el => el.income_section_id == item.income_section_id)"
            :value="item.sup_income_section_id"
          />
          

          <dvider
            :title="$t('salesPayments.form.PaymentNotes')"
            :description="$t('salesPayments.form.PaymentNotesDetails')"
          />

          <formTextarea
            :title="$t('incomes.form.thatAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('incomes.form.Note')"
            v-model="item.notes"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'incomesCreate' && !$parent.stopEdit"
          >
            {{ $t('incomes.form.addincome') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'incomesEdit' && !$parent.stopEdit"
          >
            {{ $t('incomes.form.incomeadjustment') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
    <addPaymentMethod v-if="model == 'addPaymentMethod'"/>
    <addTaxe v-if="model == 'addTaxe'"></addTaxe>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
import subFileInput from "@/elements/add/form/subFileInput.vue";

import addPaymentMethod from "@/elements/popupForms/addPaymentMethod.vue";
import addTaxe from "./components/addTaxe.vue";
import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/incomes",
      item: {
        invoice_group: this.$option.income_invoice_group_id,
        payment_method_id: 0,
        safe_id: 0,
        date: "",
        project_id: 0,
        project_item_id: 0,
        type: 0,
        status: 1,
        sup_income_section_id: 0,
        customer_id: 0,
        customer: {},
        supplier_id: 0,
        supplier: {},
        project_id: 0,
        project: {},
        safe:{},
        paymentMethod:{},
      },
      model: false,
      errors: {
        cost: false,
        safe_id: false,
        invoice_group: false,
      },
      incomesSections: [],
      selectedIncomesSections: []
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
      "taxes",
      "incomeSections",
    ]);
    

    
    if (this.$route.name == "incomesEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }

    if (this.$route.name == "incomesCreate") {
      var params = this.$getParams()
      if (params.safe_id) {
        var safe = this.$database.safes.find(
          (el) => el.id == params.safe_id
        );
        this.item.safe_id = params.safe_id;
        this.item.safe = safe;
      } else {
        if (this.$database.safes.length == 1) {
          this.item.safe_id = this.$database.safes[0].id;
          this.item.safe = this.$database.safes[0];
        }
      }

      this.item.date = this.$nowDate()
    }
    this.incomesSections = this.$database.incomeSections.filter(el => el.income_section_id == 0)

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
        this.item.cost < 1
      ) {
        error = 1;
        this.errors.cost = true;
      }
      if (
        this.item.type == 0  && (typeof this.item.safe_id === "undefined" ||
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
        this.$route.name == "incomesCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      if (error == 0) {
        this.item.date = this.$fixDate(this.item.date)
        if (this.$route.name == "incomesCreate") {
          this.$parent.aletText = this.$t('allerts.incomeSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          
          var safe = this.$database.safes.find((el) => el.id == this.item.safe_id);
          if (safe && this.item.type == 0) {safe.balance = parseFloat(safe.balance) - parseFloat(this.item.cost);}
          localStorage.database = JSON.stringify(this.$database);
          
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "incomesEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              if (response.data == "safe error") {
                this.$parent.aletText = this.$t('incomes.form.TheEmployeeIsNotTiedToASafe');
                this.$parent.alertType = "danger";
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else if (response.data == "money error") {
                this.$parent.aletText = this.$t('incomes.form.TheAmountIsNotInTheSafe');
                this.$parent.alertType = "danger";
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              } else {
                this.$parent.aletText =
                  this.$t('allerts.incomeHasBeenModifiedSuccessfully');
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
      'item.income_section_id': function(val) {
        if (val == 0 ) {
          this.selectedIncomesSections = []
        } else {
          this.selectedIncomesSections = this.$database.incomesSections.filter(el => el.income_section_id == val)
        }
      }
   },
  components: {
    formInput,
    dvider,
    addHeader,
    monyInput,
    formTextarea,
    connectionInput,
    addPaymentMethod,
    addTaxe,
    loading,
    selectInput,
    subFileInput,

    VueCtkDateTimePicker,
    searchGroupInput,
  },
};
</script>

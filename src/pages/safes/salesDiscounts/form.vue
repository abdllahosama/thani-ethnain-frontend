<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('salesDiscounts.form.addsalesDiscount')"
          :description="$t('salesDiscounts.form.FromHereYouCanCreateaNewSalesDiscount')"
          v-if="$route.name == 'salesDiscountsCreate'"
        />
        <addHeader
          :title="$t('salesDiscounts.form.SalesDiscountadjustment')"
          :description="$t('salesDiscounts.form.FromHereYouCanModifyTheSalesDiscountInformation')"
          v-if="$route.name == 'salesDiscountsEdit'"
        />

        <div class="mb-4 row">
          <connectionInput
            :title="$t('salesDiscounts.form.DiscountNumbering')"
            :group="$t('salesDiscounts.form.Groups')"
            v-model="item.invoice_group"
            :disabled="
              $user.admin || $user.role.sales_payments_edit_item
                ? false
                : true
            "
            :hasErorr="errors.invoice_group"
            :error="$t('salesDiscounts.form.ThisFieldIsRequired')"
            :values="$database.invoiceGroups"
            v-if="$route.name == 'salesDiscountsCreate'"
          />
          <formInput
            :title="$t('salesDiscounts.form.DiscountCode')"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'salesDiscountsEdit'"
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
            :title="$t('salesDiscounts.form.DiscountType')"
            v-model="item.client_type"
            :disabled="$route.name == 'salesDiscountsEdit' ? true : false"
            :values="[
              { name: $t('salesDiscounts.form.CustomerDiscount'), value: 0 },
              { name: $t('salesDiscounts.form.SupplierDiscount'), value: 1 },
              { name: $t('salesDiscounts.form.PartnerDiscount'), value: 2 },
            ]"
          />

          <searchGroupInput
            v-if="item.client_type == 0"
            :type="'customer'"
            :values="$database.customers.filter((el) => el.stat == 1)"
            :inputs="$option.salesDiscounts_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 1"
            :type="'supplier'"
            :values="$database.suppliers.filter((el) => el.stat == 1)"
            :inputs="$option.salesDiscounts_customer_data"
          />

          <searchGroupInput
            v-if="item.client_type == 2"
            :type="'partner'"
            :values="$database.partners.filter((el) => el.stat == 1)"
            :inputs="$option.salesDiscounts_customer_data"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'">{{$t('salesDiscounts.form.ConstructionDate')}}</label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100 to-left">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  :label="$t('salesDiscounts.form.ChooseTimeAndDate')"
                  :button-now-translation="$t('salesDiscounts.form.Now')"
                  v-model="item.date"
                  :disabled=" $user.admin || $user.role.sales_payments_edit_item ? false : true"
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>

          <monyInput
            :title="$t('salesDiscounts.form.discountAmount')"
            v-model="item.cost"
            :hasErorr="errors.cost"
            :error="$t('allerts.theAmountReceivedMustBeGreaterThan')"
          />

          <searchGroupInput
          :type="'project'"
          :values="$database.projects"
          :inputs="[{ 'title':$t('salesDiscounts.form.Project'),'show': 'name'}]"
          v-if="$site.projects_allow"
        />


          <connectionInput
            :disabled="item.project_id == 0"
            :title="$t('salesDiscounts.form.ProjectOutput')"
            :group="$t('salesDiscounts.form.ProjectOutputs')"
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

          <div class="col-6"></div>

          <dvider
            :title="$t('salesDiscounts.form.discountNotes')"
            :description="$t('salesDiscounts.form.discountNotesDetails')"
          />

          <formTextarea
            :title="$t('salesDiscounts.form.thatAbout')"
            v-model="item.description"
          />
          <formTextarea
            :title="$t('salesDiscounts.form.Note')"
            v-model="item.notes"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'salesDiscountsCreate' && !$parent.stopEdit"
          >
            {{ $t('salesDiscounts.form.addSalesDiscount') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'salesDiscountsEdit' && !$parent.stopEdit"
          >
            {{ $t('salesDiscounts.form.salesDiscountadjustment') }}
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
      path: "/salesDiscounts",
      item: {
        invoice_group: this.$option.sales_discount_invoice_group_id,
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
        client_type: 0,
        date: "",
        status: 1
      },
      selectedPaymentFees: [],
      model: false,
      errors: {
        invoice_group: false,
        name: false,
        cost: false,
      },
      print: 1,
    };
  },
  mounted() {
    this.$updateDatabase(["invoiceGroups", "customers", "suppliers","projects",
      "projectItems",]);

    if (this.$route.name == "salesDiscountsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
    if (this.$route.name == "salesDiscountsCreate") {
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
        this.$route.name == "salesDiscountsCreate"
      ) {
        error = 1;
        this.errors.name = true;
      }
      if (
        typeof this.item.cost === "undefined" ||
        this.item.cost == "" ||
        this.item.cost < 1
      ) {
        error = 1;
        this.errors.cost = true;
      }
      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "salesDiscountsCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      if (error == 0) {
        this.item.date = this.$fixDate(this.item.date)
        if (this.$route.name == "salesDiscountsCreate") {
          this.$parent.aletText = this.$t('allerts.salesChequesuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          if (this.item.client_type == 0) {
            this.item.old_balance = this.item.customer.balance;
          } else if (this.item.client_type == 1) {
            this.item.old_balance = this.item.supplier.balance;
          }
          this.item.new_balance = parseFloat(this.item.old_balance) + parseFloat(this.item.cost);          

          // change customer balance
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

          localStorage.database = JSON.stringify(this.$database);
          
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "salesDiscountsEdit") {
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
    loading,
    subFileInput,

    searchGroupInput,

    VueCtkDateTimePicker,
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('customers.form.addCustomer')"
          :description="$t('customers.form.fromHereYouCanCreateANewCustomer')"
          v-if="$route.name == 'customersCreate'"
        />
        <addHeader
          :title="$t('customers.form.editCustomer')"
          :description="
            $t('customers.form.fromHereYouCanModifyTheCustomerInformation')
          "
          v-if="$route.name == 'customersEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('customers.form.basicInformation')"
            :description="$t('customers.form.customersBasicInformation')"
            noLine="true"
          />

          <formInput
            :title="$t('customers.form.customerName')"
            :checkError="'nameErorr'"
            v-model="item.name"
            maxlength="255"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
          />

          <checkInput
            :title="$t('customers.form.customerCase')"
            :value="item.stat"
            v-model="item.stat"
          />

          <searchGroupInput
           :type="'sectionsAccount'"
            v-model="item.sections_account_id"
            :values="$database.sectionsAccounts"
            :model="'sections_account'"
            :inputs="[{ 'show': 'name'}]"
          />
          
          <dvider
            :title="$t('customers.form.accountaSttings')"
            :description="
              $t('customers.form.fromHereYouCanControlSettingsAccounts')
            "
          />

          <selectInput
            :title="$t('customers.form.balanceType')"
            v-model="item.balance_type"
            :disabled="this.$route.name == 'customersEdit' ? true : false"
            :values="[
              { value: 0, name: 'تراكمي' },
              { value: 1, name: 'دائن ومدين' },
            ]"
          />

          <monyInput
            :title="$t('customers.form.initialBalance')"
            v-model="item.balance"
            :disabled="
              this.$route.name == 'customersEdit' || item.balance_type == 1
            "
            :checkError="'nameErorr'"
            :hasErorr="errors.balance"
            :error="$t('allerts.thisFieldIsRequired')"
          />

          <monyInput
            v-if="item.balance_type == 1"
            :title="$t('customers.form.debit')"
            v-model="item.debit"
            :disabled="this.$route.name == 'customersEdit' ? true : false"
            :checkError="'nameErorr'"
            :hasErorr="errors.debit"
            :error="$t('allerts.thisFieldIsRequired')"
          />

          <monyInput
            v-if="item.balance_type == 1"
            :title="$t('customers.form.creditor')"
            v-model="item.creditor"
            :disabled="this.$route.name == 'customersEdit' ? true : false"
            :checkError="'nameErorr'"
            :hasErorr="errors.creditor"
            :error="$t('allerts.thisFieldIsRequired')"
          />

          <connectionInput
            :title="$t('customers.form.priceList')"
            :group="$t('customers.form.priceLists')"
            v-model="item.priceList_id"
            :values="$database.priceLists"
          />

          <dvider
            :title="$t('customers.form.billingAddress')"
            :description="
              $t('customers.form.theTitleOfBillingAndTheInvoiceIsRecorded')
            "
          />
          <formInput
            :title="$t('customers.form.title')"
            v-model="item.address1"
            maxlength="255"
          />
          <formInput
            :title="$t('customers.form.supplement')"
            v-model="item.address2"
            maxlength="255"
          />
          <formInput
            :title="$t('customers.form.theEntity')"
            v-model="item.entity"
            maxlength="255"
          />
          <formInput
            :title="$t('customers.form.city')"
            v-model="item.city"
            maxlength="255"
          />
          <formInput
            :title="$t('customers.form.postalCode')"
            v-model="item.zip"
            maxlength="255"
          />
          <formInput
            :title="$t('customers.form.theState')"
            v-model="item.country"
            maxlength="255"
          />

          <dvider
            :title="$t('customers.form.contactInformation')"
            :description="$t('customers.form.customerContactInformation')"
          />
          <iconInput
            :type="'text'"
            :title="$t('customers.form.mobileNumber')"
            :icon="'phone'"
            v-model="item.mobile"
          />
          <iconInput
            :type="'text'"
            :title="$t('customers.form.anotherNumber')"
            :icon="'phone'"
            v-model="item.mobile2"
          />
          <!--iconInput :type="'text'" :title="$t('customers.form.faxNumber')" :icon="'fax'" v-model="item.fax"/>
          <iconInput :type="'text'" :title="$t('customers.form.telephoneNumber')'" :icon="'phone'" v-model="item.telephone"/-->
          <iconInput
            :type="'text'"
            :title="$t('customers.form.email')"
            :icon="'at'"
            v-model="item.email"
          />
          <!--iconInput :type="'text'" :col="'col-12'" :title="$t('customers.form.theSiteIsOnTheInternet')" :icon="'browser'" v-model="item.website"/>

                      <dvider :title="$t('customers.form.socialNetworks')" :description="$t('customers.form.customersSocialMediaAccounts')"/>
                      <iconInput :type="'text'" :title="$t('customers.form.linkedInAccount')" :icon="'linkedin'" :iconTtype="'social'" v-model="item.linkedin"/>
                      <iconInput :type="'text'" :title="$t('customers.form.facebookAccount')" :icon="'facebook'" :iconTtype="'social'" v-model="item.facebook"/>
                      <iconInput :type="'text'" :title="$t('customers.form.twitterAccount')" :icon="'twitter'" :iconTtype="'social'" v-model="item.twitter"/>
                      <iconInput :type="'text'" :title="$t('customers.form.googlePlusAccount')'" :icon="'google-plus'" :iconTtype="'social'" v-model="item.google_plus"></iconInput-->

          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'customersCreate' && !$parent.stopEdit"
          >
            {{ $t("customers.form.addCustomer") }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'customersEdit' && !$parent.stopEdit"
          >
            {{ $t("customers.form.editCustomer") }}
          </a>
          <loading v-if="$parent.stopEdit" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import fileInput from "@/elements/add/form/fileInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
import checkInput from "@/elements/add/form/checkInput.vue";
import iconInput from "@/elements/add/form/iconInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";
import subFileInput from "@/elements/add/form/subFileInput.vue";
export default {
  data() {
    return {
      path: "/customers",
      item: {
        stat: 1,
        balance_type: 1,
        sections_account: {},
      },
      errors: {
        name: false,
        balanse: false,
      },
    };
  },
  methods: {
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (
        typeof this.item.balance !== "undefined" &&
        this.item.balance.length > 11
      ) {
        error = 1;
        this.errors.balance = true;
      }
      if (error == 0) {
        if (this.$route.name == "customersCreate") {
          this.$parent.aletText = this.$t("allerts.customerSuccessfullyAdde");
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, "customers");
          this.$router.go(-1);
        } else if (this.$route.name == "customersEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              if (response.data == "repeated") {
                this.$parent.aletText = this.$t(
                  "customers.form.duplicateCustomerCode"
                );
                this.$parent.alertType = "danger";
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                this.$parent.stopEdit = false;
                this.loading = false;
              } else {
                this.$parent.aletText = this.$t(
                  "allerts.customerHasBeenModifiedSuccessfully"
                );
                this.$parent.alertType = "success";
                this.$router.go(-1);
                this.$parent.stopEdit = false;
                this.loading = false;
              }
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
    getItem() {
      var item = this.$database.customers.find(
        (el) => el.id == this.$route.params.id
      );
      if (item) {
        this.item = item;
        var sectionsAccount = this.$database.sectionsAccounts.find(
          (el) => el.id == item.sections_account_id
        );
        if (sectionsAccount) {
          this.item.sections_account = sectionsAccount;
        } else {
          this.item.sections_account = {};
        }
      }
      this.$parent.stopEdit = false;
    },
    claculateBalance() {
      this.item.balance =
        parseFloat(
          this.item.creditor && this.item.creditor != ""
            ? this.item.creditor
            : 0
        ) -
        parseFloat(
          this.item.debit != "" && this.item.debit ? this.item.debit : 0
        );
      if (this.$option.balance_type == 1) {
        this.item.balance = this.item.balance * -1;
      }
    },
  },
  watch: {
    "item.name": function (val) {
      var customer = this.$database.customers.find(
        (el) => el.name == val && el.id != this.item.id
      );
      if (customer) {
        this.$parent.aletText = this.$t(
          "customers.form.CustomerIsNameIsDuplicated"
        );
        this.$parent.alertType = "danger";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    "item.tax_number": function (val) {
      var customer = this.$database.customers.find(
        (el) => el.tax_number == val && el.id != this.item.id
      );
      if (customer && val != null) {
        this.$parent.aletText = this.$t("customers.form.RepeatClientCode");
        this.$parent.alertType = "danger";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    "item.debit": function () {
      this.claculateBalance();
    },
    "item.creditor": function () {
      this.claculateBalance();
    },
    "item.balance_type": function () {
      this.claculateBalance();
    },
  },
  mounted() {
    this.$updateDatabase(["customers"]);
    if (this.$route.name == "customersEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }

    var elm = this;
    window.addEventListener("keydown", function (e) {
      if (e.key == "F1" || e.key == "Meta") {
        e.preventDefault();
        elm.saveItem();
      }
    });
  },
  components: {
    formInput,
    fileInput,
    dvider,
    addHeader,
    monyInput,
    checkInput,
    iconInput,
    selectInput,
    loading,
    connectionInput,
    searchGroupInput,
    subFileInput,
  },
};
</script>

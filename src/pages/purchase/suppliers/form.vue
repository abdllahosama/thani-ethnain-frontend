<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('suppliers.form.addSupplier')"
          :description="
            $t('suppliers.form.fromHereYouCanCreateANewSupplier')
          "
          v-if="$route.name == 'suppliersCreate'"
        />
        <addHeader
          :title="$t('suppliers.form.editSupplier')"
          :description="
            $t('suppliers.form.fromHereYouCanModifyTheSupplierInformation')
          "
          v-if="$route.name == 'suppliersEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('suppliers.form.basicInformation')"
            :description="$t('suppliers.form.suppliersBasicInformation')"
            noLine="true"
          />
          <fileInput
            :title="$t('suppliers.form.supllierImage')"
            v-model="item.image"
            :image="item.image"
            :path="'suppliers'"
            :hasErorr="errors.image"
            :error="$t('allerts.ChooseASuitableFile')"
            :col="'col-12'"
          />
          <formInput
            :title="$t('suppliers.form.supplierName')"
            :checkError="'nameErorr'"
            v-model="item.name"
            maxlength="255"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
          />
          <formInput
            :title="$t('suppliers.form.taxIdentificationNumber')"
            v-model="item.tax_number"
            maxlength="255"
          />

          <searchGroupInput
           :type="'sectionsAccount'"
            v-model="item.sections_account_id"
            :values="$database.sectionsAccounts"
            :model="'sections_account'"
            :inputs="[{ 'show': 'name'}]"
          />
          <checkInput
            :title="$t('suppliers.form.supplierCase')"
            :value="item.stat"
            v-model="item.stat"
          />

          <dvider 
            :title="$t('customers.form.accountaSttings')" 
            :description="$t('customers.form.fromHereYouCanControlSettingsAccounts')"
          />
          
          <selectInput
            :title="$t('customers.form.balanceType')" 
            v-model="item.balance_type"
            :disabled="this.$route.name == 'customersEdit'? true : false"
            :values="[
              {value: 0, name: 'تراكمي'},
              {value: 1, name: 'دائن ومدين'}
            ]"
          />


          <monyInput
            :title="$t('customers.form.initialBalance')"
            v-model="item.balance"
            :disabled="this.$route.name == 'suppliersEdit' ? true : false || item.balance_type == 1"
            :checkError="'nameErorr'"
            :hasErorr="errors.balance"
            :error="$t('allerts.thisFieldIsRequired')"
          />

          <monyInput 
            v-if="item.balance_type == 1"
            :title="$t('customers.form.debit')" 
            v-model="item.debit" 
            :disabled="this.$route.name == 'suppliersEdit'? true : false"
            :checkError="'nameErorr'"
            :hasErorr="errors.debit"
            :error="$t('allerts.thisFieldIsRequired')"
          />
          
          <monyInput 
            v-if="item.balance_type == 1"
            :title="$t('customers.form.creditor')" 
            v-model="item.creditor" 
            :disabled="this.$route.name == 'suppliersEdit'? true : false" 
            :checkError="'nameErorr'"
            :hasErorr="errors.creditor"
            :error="$t('allerts.thisFieldIsRequired')"
          />
          
          <subFileInput :title="$t('invoices.form.invoicesbalance')"
            v-model="item.file"
            :file="item.file"
            :path="'invoices'"
          />

          <dvider
            :title="$t('suppliers.form.billingAddress')"
            :description="
              $t('suppliers.form.theTitleOfBillingAndTheInvoiceIsRecorded')
            "
          />
          <formInput
            :title="$t('suppliers.form.title')"
            v-model="item.address1"
            maxlength="255"
          />
          <formInput
            :title="$t('suppliers.form.supplement')"
            v-model="item.address2"
            maxlength="255"
          />
          <formInput
            :title="$t('suppliers.form.theEntity')"
            v-model="item.entity"
            maxlength="255"
          />
          <formInput
            :title="$t('suppliers.form.city')"
            v-model="item.city"
            maxlength="255"
          />
          <formInput
            :title="$t('suppliers.form.postalCode')"
            v-model="item.zip"
            maxlength="255"
          />
          <formInput
            :title="$t('suppliers.form.theState')"
            v-model="item.country"
            maxlength="255"
          />

          <dvider
            :title="$t('suppliers.form.contactInformation')"
            :description="$t('suppliers.form.supplierContactInformation')"
          />
          <iconInput
            :type="'text'"
            :title="$t('suppliers.form.mobileNumber')"
            :icon="'phone'"
            v-model="item.mobile"
          />
          <!--iconInput :type="'text'" :title="$t('suppliers.form.faxNumber')" :icon="'fax'" v-model="item.fax"/>
                      <iconInput :type="'text'" :title="$t('suppliers.form.telephoneNumber')'" :icon="'phone'" v-model="item.telephone"></iconInput-->
          <iconInput
            :type="'text'"
            :title="$t('suppliers.form.email')"
            :icon="'at'"
            v-model="item.email"
          />
          <!--iconInput :type="'text'" :col="'col-12'" :title="$t('suppliers.form.theSiteIsOnTheInternet')" :icon="'browser'" v-model="item.website"/>

                      <dvider :title="$t('suppliers.form.socialNetworks')" :description="$t('suppliers.form.suppliersSocialMediaAccounts')"/>
                      <iconInput :type="'text'" :title="$t('suppliers.form.linkedInAccount')" :icon="'linkedin'" :iconTtype="'social'" v-model="item.linkedin"/>
                      <iconInput :type="'text'" :title="$t('suppliers.form.facebookAccount')" :icon="'facebook'" :iconTtype="'social'" v-model="item.facebook"/>
                      <iconInput :type="'text'" :title="$t('suppliers.form.twitterAccount')" :icon="'twitter'" :iconTtype="'social'" v-model="item.twitter"/>
                      <iconInput :type="'text'" :title="$t('suppliers.form.googlePlusAccount')'" :icon="'google-plus'" :iconTtype="'social'" v-model="item.google_plus"></iconInput-->

          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'suppliersCreate' && !$parent.stopEdit"
          >
            {{ $t('suppliers.form.addSupplier') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'suppliersEdit' && !$parent.stopEdit"
          >
            {{ $t('suppliers.form.editSupplier') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
    <!-- / .row -->
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import fileInput from "@/elements/add/form/fileInput.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
import selectInput from '@/elements/add/form/selectInput.vue';
import checkInput from "@/elements/add/form/checkInput.vue";
import iconInput from "@/elements/add/form/iconInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
import connectionInput from '@/elements/add/form/connectionInput.vue';
import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";
import subFileInput from "@/elements/add/form/subFileInput.vue";

export default {
  data() {
    return {
      path: "/suppliers",
      item: {
        stat: 1,
        balance_type: 1,
        sections_account: {
        }
      },
      errors: {
        name: false,
        balance: false
      },
    };
  },
  methods: {
    getItem() {
      var item = this.$database.suppliers.find(
        (el) => el.id == this.$route.params.id
      );
      if (item) {
        this.item = item;
        console.log(item)
        var sectionsAccount = this.$database.sectionsAccounts.find(el => el.id == item.sections_account_id)
          if (sectionsAccount) {
            this.item.sections_account = sectionsAccount
          } else {
            this.item.sections_account = {}
          }
      }
      this.$parent.stopEdit = false;
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (typeof this.item.balance !== 'undefined' && this.item.balance.length > 11) {
          error = 1
          this.errors.balance = true
        }
      if (error == 0) {
        if (this.$route.name == "suppliersCreate") {
          this.$parent.aletText = this.$t('allerts.supplierSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "suppliersEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.supplierHasBeenModifiedSuccessfully');
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
    claculateBalance () {
      this.item.balance = parseFloat(this.item.creditor && this.item.creditor != '' ? this.item.creditor : 0) - parseFloat(this.item.debit != '' && this.item.debit ? this.item.debit : 0) ;
      if (this.$option.balance_type == 1) {this.item.balance = this.item.balance * -1}
    }
  },
  watch: {
    "item.name": function (val) {
      var suppler = this.$database.suppliers.find(
        (el) => el.name == val && el.id != this.item.id
      );
      if (typeof suppler !== "undefined") {
        this.$parent.aletText = "اسم المورد مكرر";
        this.$parent.alertType = "danger";
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    'item.debit': function () {
      this.claculateBalance()
    },
    'item.creditor': function () {
      this.claculateBalance()
    },
    'item.balance_type': function () {
      this.claculateBalance()
    }
  },
  mounted() {
    this.$updateDatabase(["suppliers"]);
    if (this.$route.name == "suppliersEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }

    var elm = this;
      window.addEventListener("keydown", function (e) {
        if (e.key == "F1" || e.key == "Meta") {
          e.preventDefault();
          elm.saveItem();
        }
    })
  },
  components: {
    formInput,
    fileInput,
    dvider,
    addHeader,
    monyInput,
    selectInput,
    checkInput,
    iconInput,
    loading,
    connectionInput,
    searchGroupInput,
    subFileInput,
  },
};
</script>
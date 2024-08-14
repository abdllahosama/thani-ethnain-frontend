<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('safes.form.addCustomer')"
          :description="$t('safes.form.fromHereYouCanCreateANewCustomer')"
          v-if="$route.name == 'safesCreate'"
        />
        <addHeader
          :title="$t('safes.form.editCustomer')"
          :description="
            $t('safes.form.fromHereYouCanModifyTheCustomerInformation')
          "
          v-if="$route.name == 'safesEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('safes.form.basicInformation')"
            :description="$t('safes.form.safesBasicInformation')"
            noLine="true"
          />
          <formInput
            :title="$t('safes.form.customerName')"
            :checkError="'nameErorr'"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255" 
          />
        
          <checkInput
            :title="$t('safes.form.customerCase')"
            :value="item.stat"
            v-model="item.stat"
          />
          <formInput
            :title="$t('safes.form.conversionFactor')"
            :checkError="'nameErorr'"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255" 
          />

          <dvider 
            :title="$t('customers.form.accountaSttings')" 
            :description="$t('customers.form.fromHereYouCanControlSettingsAccounts')"
          />
          
          <selectInput
            :title="$t('customers.form.balanceType')" 
            v-model="item.balance_type"
            :disabled="this.$route.name == 'safesEdit'? true : false"
            :values="[
              {value: 0, name: 'تراكمي'},
              {value: 1, name: 'دائن ومدين'}
            ]"
          />

          <monyInput 
            :title="$t('customers.form.initialBalance')" 
            v-model="item.balance"
            :disabled="this.$route.name == 'safesEdit' || item.balance_type == 1" 
          />

          <monyInput 
            v-if="item.balance_type == 1"
            :title="$t('customers.form.debit')" 
            v-model="item.debit" 
            :disabled="this.$route.name == 'safesEdit'? true : false"
            :checkError="'nameErorr'"
            :hasErorr="errors.debit"
            :error="$t('allerts.thisFieldIsRequired')"
          />

          <monyInput 
            v-if="item.balance_type == 1"
            :title="$t('customers.form.creditor')" 
            v-model="item.creditor" 
            :disabled="this.$route.name == 'safesEdit'? true : false" 
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
            :title="$t('safes.form.billingAddress')"
            :description="
              $t('safes.form.theTitleOfBillingAndTheInvoiceIsRecorded')
            "
          />
          <formInput
            :title="$t('safes.form.title')"
            v-model="item.address1"
            maxlength="255" 
          />
          <formInput
            :title="$t('safes.form.supplement')"
            v-model="item.address2"
            maxlength="255" 
          />
          <formInput
            :title="$t('safes.form.theEntity')"
            v-model="item.entity"
            maxlength="255" 
          />
          <formInput
            :title="$t('safes.form.city')"
            v-model="item.city"
            maxlength="255" 
          />
          <formInput
            :title="$t('safes.form.postalCode')"
            v-model="item.zip"
            maxlength="255" 
          />
          <formInput
            :title="$t('safes.form.theState')"
            v-model="item.country"
            maxlength="255" 
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'safesCreate' && !$parent.stopEdit"
          >
            {{ $t('safes.form.addCustomer') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'safesEdit' && !$parent.stopEdit"
          >
            {{ $t('safes.form.editCustomer') }}
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
import monyInput from "@/elements/add/form/monyInput.vue";
import checkInput from "@/elements/add/form/checkInput.vue";
import selectInput from '@/elements/add/form/selectInput.vue'
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
import subFileInput from "@/elements/add/form/subFileInput.vue";

export default {
  data() {
    return {
      path: "/safes",
      item: {
        stat: 1,
        balance_type: 1
      },
      errors: {
        name: false,
      },
      readyUsers: 0,
    };
  },
  methods: {
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (error == 0) {
        if (this.$route.name == "safesCreate") {
          this.$parent.aletText = this.$t('allerts.safesuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "safesEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.customerHasBeenModifiedSuccessfully');
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
    getItem() {
      var item = this.$database.safes.find(
        (el) => el.id == this.$route.params.id
      );
      if (item) {
        this.item = item;
      }
      this.$parent.stopEdit = false;
    },
    claculateBalance () {
      this.item.balance = parseFloat(this.item.debit != '' && this.item.debit ? this.item.debit : 0) - parseFloat(this.item.creditor && this.item.creditor != '' ? this.item.creditor : 0) ;
    }
  },
  watch: {
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
    if (this.$route.name == "safesEdit") {
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
    dvider,
    addHeader,
    monyInput,
    selectInput,
    checkInput,
    loading,
    subFileInput,
  },
};
</script>
<style></style>

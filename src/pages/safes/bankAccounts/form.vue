<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('bankAccounts.form.addBankAccounts')"
          :description="
            $t('bankAccounts.form.fromHereYouCanCreateAbankAccounts')
          "
          v-if="$route.name == 'bankAccountsCreate'"
        />
        <addHeader
          :title="$t('bankAccounts.form.editBankAccounts')"
          :description="
            $t('bankAccounts.form.fromHereYouCanModifyTheBankAccountsInformation')
          "
          v-if="$route.name == 'bankAccountsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('bankAccounts.form.basicInformation')"
            :description="
              $t('bankAccounts.form.bankAccountBasicInformation')
            "
            noLine="true"
          />
          <formInput
            :title="$t('bankAccounts.form.bankName')"
            :checkError="'nameErorr'"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
          />
          <monyInput
            :title="$t('bankAccounts.form.initialBalance')"
            v-model="item.balance"
            :disabled="this.$route.name == 'bankAccountsEdit' ? true : false"
          />
          <formInput
            :title="$t('bankAccounts.form.accountName')"
            :checkError="'nameErorr'"
            v-model="item.bank_name"
            maxlength="255"
          />
          <formInput
            :title="$t('bankAccounts.form.accountNumber')"
            :checkError="'nameErorr'"
            v-model="item.account_number"
            maxlength="255"
          />
          <checkInput
            :title="$t('bankAccounts.form.accountCase')"
            :value="item.stat"
            v-model="item.stat"
          />

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'bankAccountsCreate' && !$parent.stopEdit"
          >
            {{ $t('bankAccounts.form.addBankAccounts') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'bankAccountsEdit' && !$parent.stopEdit"
          >
            {{ $t('bankAccounts.form.editBankAccounts') }}
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
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/safes",
      item: {
        stat: 1,
        bank_account: 1,
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
        if (this.$route.name == "bankAccountsCreate") {
          this.$parent.aletText = this.$t('allerts.safesuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, 'safes');
          this.$router.go(-1);
        } else if (this.$route.name == "bankAccountsEdit") {
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
        this.$parent.aletText = $t('allerts.pleaseMakeSureOfTheInput');
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
  },
  mounted() {
    if (this.$route.name == "bankAccountsEdit") {
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
    checkInput,
    loading,
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('paymentMethods.form.createAPaymentMethod')"
          :description="
            $t('paymentMethods.form.fromHereYouCanCreateANewPaymentMethod')
          "
          v-if="$route.name == 'paymentMethodsCreate'"
        />
        <addHeader
          :title="$t('paymentMethods.form.modifyThePaymentMethod')"
          :description="
            $t('paymentMethods.form.fromHereYouCanEditThePaymentMethodInformation') "
          v-if="$route.name == 'paymentMethodsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('paymentMethods.form.paymentMethodInformation')"
            :description="$t('paymentMethods.form.basicInformationOfThePaymentMethod')"
            noLine="true"
          />

          <formInput
            :title="$t('paymentMethods.form.theNameOfThePaymentMethod')"
            :col="'col-12'"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'paymentMethodsCreate' && !$parent.stopEdit"
          >
            {{ $t('paymentMethods.form.createAPaymentMethod') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'paymentMethodsEdit' && !$parent.stopEdit"
          >
            {{ $t('paymentMethods.form.modifyThePaymentMethod') }}
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
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/paymentMethods",
      item: {},
      errors: {
        name: false,
      },
    };
  },
  mounted() {
    if (this.$route.name == "paymentMethodsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
  },
  methods: {
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.item = response.data;
          this.$parent.stopEdit = false;
        });
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (error == 0) {
        if (this.$route.name == "paymentMethodsCreate") {
          this.$parent.aletText = this.$t('allerts.paymentMethodSuccessfullyAdded');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "paymentMethodsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.paymentMethodHasBeenModifiedSuccessfully');
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
    loading,
  },
};
</script>
<style></style>

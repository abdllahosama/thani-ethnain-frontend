<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('discounts.form.createADiscountRate')"
          :description="
            $t('discounts.form.fromHereYouCanCreateADiscountRate')
          "
          v-if="$route.name == 'discountsCreate'"
        />
        <addHeader
          :title="$t('discounts.form.discountRateAdjustment')"
          :description="
            $t('discounts.form.fromHereYouCanAdjustTheDiscountRate')
          "
          v-if="$route.name == 'discountsEdit'"
        />
        <div class="mb-4 row">
          <formInput
            :title="$t('discounts.form.nameTheDiscountRate')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
          />
          <formInput
            :type="'number'"
            :title="$t('discounts.form.theAverage')"
            v-model="item.rate"
            :hasErorr="errors.rate"
            :error="$t('allerts.theDiscountShouldBeFromTo')"
            maxlength="255"
          />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'discountsCreate' && !$parent.stopEdit"
          >
            {{ $t('discounts.form.createADiscountRate') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'discountsEdit' && !$parent.stopEdit"
          >
            {{ $t('discounts.form.discountRateAdjustment') }}
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
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/discounts",
      item: {},
      errors: {
        name: false,
        rate: false,
      },
    };
  },
  mounted() {
    if (this.$route.name == "discountsEdit") {
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
      if (
        typeof this.item.rate === "undefined" ||
        this.item.rate == "" ||
        this.item.rate < 1 ||
        this.item.rate > 100
      ) {
        error = 1;
        this.errors.rate = true;
      }
      if (error == 0) {
        if (this.$route.name == "discountsCreate") {
          this.$parent.aletText =
            this.$t('allerts.discountSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));          
          this.$router.go(-1);
        } else if (this.$route.name == "discountsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.discountHasBeenModifiedSuccessfully');
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
    addHeader,
    loading,
  },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('taxes.form.CreateATaxRate')"
          :description="$t('taxes.form.fromHereYouCanCreateATaxRate')"
          v-if="$route.name == 'taxesCreate'"
        />
        <addHeader
          :title="$t('taxes.form.taxRateAdjustment')"
          :description="$t('taxes.form.fromHereYouCanAdjustTheTaxRate')"
          v-if="$route.name == 'taxesEdit'"
        />
        <div class="mb-4 row">
          <formInput
            :title="$t('taxes.form.nameTheTaxRate')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255" 
          />
          <formInput
            :type="'number'"
            :title="$t('taxes.form.theAverage')"
            v-model="item.rate"
            :hasErorr="errors.rate"
            :error="$t('allerts.theTaxRateShouldBeFromTo')"
          />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'taxesCreate' && !$parent.stopEdit"
          >
            {{ $t('taxes.form.CreateATaxRate') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'taxesEdit' && !$parent.stopEdit"
          >
            {{ $t('taxes.form.taxRateAdjustment') }}
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
      path: "/taxes",
      item: {},
      errors: {
        name: false,
        rate: false,
      },
    };
  },
  mounted() {
    if (this.$route.name == "taxesEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
  },
  methods: {
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.$parent.stopEdit = false;
          this.item = response.data;
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
        if (this.$route.name == "taxesCreate") {
          this.$parent.aletText = this.$t('allerts.taxeSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "taxesEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.taxeHasBeenModifiedSuccessfully');
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

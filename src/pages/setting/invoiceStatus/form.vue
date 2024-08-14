<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('invoiceStatus.form.createStatus')"
          :description="
            $t('invoiceStatus.form.FromHereYouCanCreateAStatus')
          "
          v-if="$route.name == 'invoiceStatusCreate'"
        />
        <addHeader
          :title="$t('invoiceStatus.form.EditStatus')"
          :description="
            $t('invoiceStatus.form.FromHereYouCanModifyTheStatusInformation')
          "
          v-if="$route.name == 'invoiceStatusEdit'"
        />
        <div class="mb-4 row">
          <formInput
            :title="$t('invoiceStatus.form.StatusName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
          />
          <selectInput
            :title="$t('invoiceStatus.form.theStatus')"
            v-model="item.stat"
            :disabled="$route.name == 'invoicesEdit' ? true : false"
            :values="[
              { name: $t('invoiceStatus.form.Ineffective'), value: 0 },
              { name: $t('invoiceStatus.form.effective'), value: 1 },
            ]"
          />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'invoiceStatusCreate' && !$parent.stopEdit"
          >
            {{ $t('invoiceStatus.form.createStatus') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'invoiceStatusEdit' && !$parent.stopEdit"
          >
            {{ $t('invoiceStatus.form.EditeStatus') }}
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
import selectInput from "@/elements/add/form/selectInput.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/invoiceStatus",
      item: {
        stat: 1,
      },
      errors: {
        name: false,
        prefix: false,
      },
    };
  },
  mounted() {
    if (this.$route.name == "invoiceStatusEdit") {
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
        if (this.$route.name == "invoiceStatusCreate") {
          this.$parent.aletText = this.$t('allerts.groupNumberingSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));          
          this.$router.go(-1);
        } else if (this.$route.name == "invoiceStatusEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.groupNumberingHasBeenModifiedSuccessfully');
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
    selectInput,
    addHeader,
    loading,
  },
};
</script>
<style></style>

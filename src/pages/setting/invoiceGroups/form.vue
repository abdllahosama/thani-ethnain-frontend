<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('invoiceGroups.form.createGroupNumbering')"
          :description="
            $t('invoiceGroups.form.fromHereYouCanCreateGroupGumbering')
          "
          v-if="$route.name == 'invoiceGroupsCreate'"
        />
        <addHeader
          :title="$t('invoiceGroups.form.groupNumberingAdjustment')"
          :description="
            $t('invoiceGroups.form.fromHereYouCanModifyTheGroupNumberingData')
          "
          v-if="$route.name == 'invoiceGroupsEdit'"
        />
        <div class="mb-4 row">
          <formInput
            :title="$t('invoiceGroups.form.theName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
          />
          <formInput
            :title="$t('invoiceGroups.form.thePrefix')"
            v-model="item.prefix"
          />
          <formInput
            :type="'number'"
            :title="$t('invoiceGroups.form.nextNumber')"
            v-model="item.next_id"
          />
          <formInput
            :type="'number'"
            :title="$t('invoiceGroups.form.leftMargin')"
            v-model="item.left_pad"
          />
          <div class="form-group col-6 row">
            <!-- Label -->
            <label class="col-md-4">{{
              $t('invoiceGroups.form.yearPrefix')
            }}</label>
            <!-- Input -->
            <div class="col-md-7">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  id="yearToggle"
                  :checked="item.prefix_year == 1"
                  class="custom-control-input"
                  value="1"
                  @change="changePrefixYear()"
                />
                <label for="yearToggle" class="custom-control-label"></label>
              </div>
            </div>
          </div>
          <div class="form-group col-6 row">
            <!-- Label -->
            <label class="col-md-4">{{
              $t('invoiceGroups.form.theMonthPrefix')
            }}</label>
            <!-- Input -->
            <div class="col-md-7">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  id="monthToggle"
                  :checked="item.prefix_month == 1"
                  class="custom-control-input"
                  value="1"
                  @change="changePrefixMonth()"
                />
                <label for="monthToggle" class="custom-control-label"></label>
              </div>
            </div>
          </div>
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'invoiceGroupsCreate' && !$parent.stopEdit"
          >
            {{ $t('invoiceGroups.form.createGroupNumbering') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'invoiceGroupsEdit' && !$parent.stopEdit"
          >
            {{ $t('invoiceGroups.form.groupNumberingAdjustment') }}
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
      path: "/invoiceGroups",
      item: {
        next_id: 1,
      },
      errors: {
        name: false,
        prefix: false,
      },
    };
  },
  mounted() {
    if (this.$route.name == "invoiceGroupsEdit") {
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
        if (this.$route.name == "invoiceGroupsCreate") {
          this.$parent.aletText = this.$t('allerts.groupNumberingSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "invoiceGroupsEdit") {
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
    changePrefixYear() {
      if (this.item.prefix_year == 1) {
        this.item.prefix_year = 0;
      } else if (this.item.prefix_year == 0) {
        this.item.prefix_year = 1;
      }
    },
    changePrefixMonth() {
      if (this.item.prefix_month == 1) {
        this.item.prefix_month = 0;
      } else if (this.item.prefix_month == 0) {
        this.item.prefix_month = 1;
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
<style></style>

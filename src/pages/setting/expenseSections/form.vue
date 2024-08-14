<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('expenseSections.form.createExpenseSections') "
          :description="
            $t('expenseSections.form.fromHereYouCanCreateANewSection')
          "
          v-if="$route.name == 'expenseSectionsCreate'"
        />
        <addHeader
          :title="$t('expenseSections.form.editExpenseSections')"
          :description="
            $t('expenseSections.form.fromHereYouCanModifyTheSectionData')
          "
          v-if="$route.name == 'expenseSectionsEdit'"
        />
        <div class="mb-4 row">
          <formInput
            :title="$t('expenseSections.form.sectionName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
            />
            <connectionInput
             :title="$t('expenseSections.form.fatherClassification')"
              :group="$t('expenseSections.form.classifications')"
              v-model="item.expense_section_id" 
              :hasAdd="false"
              :values="$database.expenseSections.filter(el =>el.expense_section_id == 0)"
            />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'expenseSectionsCreate' && !$parent.stopEdit"
          >
            {{ $t('expenseSections.form.createExpenseSections') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'expenseSectionsEdit' && !$parent.stopEdit"
          >
            {{ $t('expenseSections.form.editExpenseSections') }}
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
import connectionInput from "@/elements/add/form/connectionInput.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/expenseSections",
      item: {
        expense_section_id: 0
      },
      errors: {
        name: false,
      },
    };
  },
  mounted() {
    this.$updateDatabase(['expenseSections'])
    if (this.$route.name == "expenseSectionsEdit") {
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
        if (this.$route.name == "expenseSectionsCreate") {
          this.$parent.aletText =
            this.$t('allerts.expenseSectionSuccessfullyAdded');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "expenseSectionsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.expenseSectionHasBeenModifiedSuccessfully');
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
    connectionInput,
    addHeader,
    loading,
  },
};
</script>
<style></style>

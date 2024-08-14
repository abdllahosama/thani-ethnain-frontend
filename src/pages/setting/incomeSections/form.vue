<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('incomeSections.form.createIncomeSections') "
          :description="
            $t('incomeSections.form.fromHereYouCanCreateANewSection')
          "
          v-if="$route.name == 'incomeSectionsCreate'"
        />
        <addHeader
          :title="$t('incomeSections.form.editIncomeSections')"
          :description="
            $t('incomeSections.form.fromHereYouCanModifyTheSectionData')
          "
          v-if="$route.name == 'incomeSectionsEdit'"
        />
        <div class="mb-4 row">
          <formInput
            :title="$t('incomeSections.form.sectionName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
            />
            <connectionInput
             :title="$t('incomeSections.form.fatherClassification')"
              :group="$t('incomeSections.form.classifications')"
              v-model="item.income_section_id" 
              :hasAdd="false"
              :values="$database.incomeSections.filter(el => el.income_section_id == 0)"
            />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'incomeSectionsCreate' && !$parent.stopEdit"
          >
            {{ $t('incomeSections.form.createIncomeSections') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'incomeSectionsEdit' && !$parent.stopEdit"
          >
            {{ $t('incomeSections.form.editIncomeSections') }}
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
      path: "/incomeSections",
      item: {
        income_section_id: 0
      },
      errors: {
        name: false,
      },
    };
  },
  mounted() {
    this.$updateDatabase(['incomeSections'])
    if (this.$route.name == "incomeSectionsEdit") {
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
        if (this.$route.name == "incomeSectionsCreate") {
          this.$parent.aletText =
            this.$t('allerts.incomeSectionSuccessfullyAdded');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "incomeSectionsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.incomeSectionHasBeenModifiedSuccessfully');
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

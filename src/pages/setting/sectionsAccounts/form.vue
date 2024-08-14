<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <addHeader :title="$t('sections.form.createSection')" :description="$t('sectionsAccount.form.fromHereYouCanCreateNewAccountCategory')" v-if="$route.name == 'sectionsAccountsCreate'"/>
                <addHeader :title="$t('sections.form.editSection')" :description="$t('sections.form.fromHereModifyTheSectionData')"  v-if="$route.name == 'sectionsAccountsEdit'"/>
                <div class="mb-4 row">
                    <dvider :title="$t('sections.form.sectionInformation')" :description="$t('sections.form.basicSectionInformation')" noLine="true"/>
                    <formInput :title="$t('sections.form.sectionName')" v-model="item.name" :hasErorr="errors.name" :error="$t('allerts.thisFieldIsRequired')"/>
                    
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'sectionsAccountsCreate' && !$parent.stopEdit"
          >
            {{ $t('sections.form.createSection') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'sectionsAccountsEdit' && !$parent.stopEdit"
          >
            {{ $t('sections.form.editSection') }}
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
import fileInput from "@/elements/add/form/fileInput.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/sectionsAccounts",
      item: {},
      errors: {
        name: false,
      }
    };
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
        if (this.$route.name == "sectionsAccountsCreate") {
          this.$parent.aletText = this.$t('allerts.sectionsAccountSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "sectionsAccountsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.sectionHasBeenModifiedSuccessfully');
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
  mounted() {
    this.$updateDatabase(["sectionsAccounts"]);

    if (this.$route.name == "sectionsAccountsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
  },
  components: {
    formInput,
    fileInput,
    dvider,
    addHeader,
    connectionInput,
    loading,
  },
};
</script>
<style></style>

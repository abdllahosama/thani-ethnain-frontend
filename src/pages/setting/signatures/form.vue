<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-12">
                <addHeader :title="$t('signatures.form.signatureInformation')" :description="$t('signatures.form.fromCreateNewSignature')" v-if="$route.name == 'signaturesCreate'"/>
                <addHeader :title="$t('signatures.form.editSignatures')" :description="$t('signatures.form.fromHereYouAdjustLighting')"  v-if="$route.name == 'signaturesEdit'"/>
                <div class="mb-4 row">
                    <dvider :title="$t('signatures.form.signatureInformation')" :description="$t('signatures.form.basicInformationLights')" noLine="true"/>
                    <formInput :title="$t('signatures.jobTitle')" v-model="item.name" :hasErorr="errors.name" :error="$t('allerts.thisFieldIsRequired')"/>
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'signaturesCreate' && !$parent.stopEdit"
          >
            {{ $t('signatures.form.createSignature') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'signaturesEdit' && !$parent.stopEdit"
          >
            {{ $t('signatures.form.editSignatures') }}
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
      path: "/signatures",
      item: {},
      sections: {},
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
        if (this.$route.name == "signaturesCreate") {
          this.$parent.aletText = this.$t('allerts.signatureSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "signaturesEdit") {
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
    this.$updateDatabase(["signatures"]);

    if (this.$route.name == "signaturesEdit") {
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

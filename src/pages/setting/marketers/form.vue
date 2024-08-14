<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('marketers.form.addMarketer')"
          :description="$t('marketers.form.FromHereYouCanAddANewMarketer')"
          v-if="$route.name == 'marketersCreate'"
        />
        <addHeader
          :title="$t('marketers.form.EditMarketer')"
          :description="$t('marketers.form.FromHereYouCanModifyTheMarketerIsData')"
          v-if="$route.name == 'marketersEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('marketers.form.basicInformation')"
            :description="$t('marketers.form.BasicInformationForTheMarketer')"
            noLine="true"
          />
          <formInput
            :title="$t('marketers.form.MarketerIsName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('marketers.form.TheNamezOfTheMarketerCannotBeEmpty')"
            maxlength="255"
          />
          <monyInput
            :title="$t('marketers.form.balance')"
            v-model="item.balance"
            :hasErorr="false"
          />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'marketersCreate' && !$parent.stopEdit"
          >
            {{$t('marketers.form.addMarketer')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'marketersEdit' && !$parent.stopEdit"
          >
            {{$t('marketers.form.EditMarketer')}}
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
import monyInput from "@/elements/add/form/monyInput.vue";

export default {
  data() {
    return {
      path: "/marketers",
      item: {},
      errors: {
        name: false,
      },
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
        if (this.$route.name == "marketersCreate") {
          this.$parent.aletText = this.$t('marketers.form.MarketerAddedSuccessfully');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "marketersEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText = this.$t('marketers.form.TheMarketerHasBeenSuccessfullyModified');
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
    this.$updateDatabase(["marketers"]);

    if (this.$route.name == "marketersEdit") {
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
    monyInput,
  },
};
</script>

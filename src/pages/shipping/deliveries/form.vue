<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('deliveries.form.AddAShippingRepresentative')"
          :description="$t('deliveries.form.FromHereYouCanAddANewShippingRepresentative')"
          v-if="$route.name == 'deliveriesCreate'"
        />
        <addHeader
          :title="$t('deliveries.form.EditingTheShippingRepresentative')"
          :description="$t('deliveries.form.FromHereYouCanModifyTheDataOfTheShippingRepresentative')"
          v-if="$route.name == 'deliveriesEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('deliveries.form.basicInformation')"
            :description="$t('deliveries.form.BasicInformationForTheShippingRepresentative')"
            noLine="true"
          />
          <formInput
            :title="$t('deliveries.form.ShippingRepresentativeIsName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('deliveries.form.TheNameOfTheShippingRepresentativeCannotBeEmpty')"
            maxlength="255"
          />
          <searchGroupInput
            :type="'safe'"
            :values="$database.safes"
            :inputs="[{ 'show': 'name'}]"
          />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'deliveriesCreate' && !$parent.stopEdit"
          >
            {{$t('deliveries.form.AddAShippingRepresentative')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'deliveriesEdit' && !$parent.stopEdit"
          >
            {{$t('deliveries.form.EditingTheShippingZepresentative')}}
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
import searchGroupInput from "@/elements/add/form/searchGroupInput.vue";

export default {
  data() {
    return {
      path: "/deliveries",
      item: {
        safe_id: 0,
        safe:{},
      },
      errors: {
        name: false,
        safe_id: false,
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
      if (typeof this.item.safe_id === "undefined" || this.item.safe_id == "") {
        error = 1;
        this.errors.safe_id = true;
      }
      if (error == 0) {
        if (this.$route.name == "deliveriesCreate") {
          this.$parent.aletText = this.$t('deliveries.form.DelegateAddedSuccessfully');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "deliveriesEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText = this.$t('deliveries.form.TheShippingAgentHasBeenModifiedSuccessfully');
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
    this.$updateDatabase(["deliveries"]);

    if (this.$route.name == "deliveriesEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
    var elm = this;
      window.addEventListener("keydown", function (e) {
        if (e.key == "F1" || e.key == "Meta") {
          e.preventDefault();
          elm.saveItem();
        }
      })
  },
  components: {
    formInput,
    fileInput,
    dvider,
    addHeader,
    connectionInput,
    loading,
    searchGroupInput,
  },
};
</script>

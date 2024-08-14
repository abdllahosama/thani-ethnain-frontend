<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('pickupLocations.form.CreateAReceivingPoint')"
          :description="$t('pickupLocations.form.FromHereYouCanCreateANewReceivingPoint')"
          v-if="$route.name == 'pickupLocationsCreate'"
        />
        <addHeader
          :title="$t('pickupLocations.form.EditReceivingPoint')"
          :description="
            $t('pickupLocations.form.FromHereYouCanModifyYourPickupPoint')
          "
          v-if="$route.name == 'pickupLocationsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('pickupLocations.form.BasicInformationOfTheReceivingPoint')"
            :description="$t('pickupLocations.form.FromHereYouCanModifyTheBasicInformationOfTheReceivingPoint')"
            noLine="true"
          />
          <formInput
            :title="$t('pickupLocations.form.theNameOfThePickupLocations')"
            v-model="item.name"
            :col="'col-md-12'"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255" 
          />
          <formTextarea
            :title="$t('pickupLocations.form.descriptionOfThePickupLocations')"
            v-model="item.description"
            maxlength="255"
          />
          <dvider
            :title="$t('pickupLocations.form.addressOfPickupLocations')"
            :description="$t('pickupLocations.form.theAddressOfThePickupLocations')"
          />
          <formInput
            :title="$t('pickupLocations.form.title')"
            v-model="item.address1"
            maxlength="255" 
          />
          <formInput
            :title="$t('pickupLocations.form.supplement')"
            v-model="item.address2"
            maxlength="255" 
          />
          <formInput
            :title="$t('pickupLocations.form.theEntity')"
            v-model="item.entity"
            maxlength="255" 
          />
          <formInput
            :title="$t('pickupLocations.form.city')"
            v-model="item.city"
            maxlength="255" 
          />
          <formInput
            :title="$t('pickupLocations.form.floor')"
            v-model="item.floor"
            maxlength="255" 
          />
          <formInput
            :title="$t('pickupLocations.form.apartment')"
            v-model="item.apartment"
            maxlength="255" 
          />
          <formInput
            :title="$t('pickupLocations.form.postalCode')"
            v-model="item.zip"
            maxlength="255" 
          />
          <formInput
            :title="$t('pickupLocations.form.theState')"
            v-model="item.country"
            maxlength="255" 
          />
          <dvider :title="$t('pickupLocations.form.contactInformation')" :description="$t('pickupLocations.form.customerContactInformation')"/>
          <iconInput 
            :type="'text'" 
            :title="$t('pickupLocations.form.mobileNumber')" 
            :icon="'phone'" 
            v-model="item.mobile"
            maxlength="255" 
          />
          <iconInput 
            :type="'text'" 
            :title="$t('pickupLocations.form.anotherNumber')" 
            :icon="'phone'" 
            v-model="item.mobile2" 
            maxlength="255" 
          />
          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'pickupLocationsCreate' && !$parent.stopEdit"
          >
            {{ $t('pickupLocations.form.CreateAReceivingPoint') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'pickupLocationsEdit' && !$parent.stopEdit"
          >
            {{ $t('pickupLocations.form.EditReceivingPoint') }}
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
import formTextarea from "@/elements/add/form/formTextarea.vue";
import iconInput from '@/elements/add/form/iconInput.vue';
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/pickupLocations",
      item: {},
      errors: {
        name: false,
      },
    };
  },
  methods: {
    getItem() {
      var item = this.$database.pickupLocations.find(
        (el) => el.id == this.$route.params.id
      );
      if (item) {
        this.item = item;
      }
      this.$parent.stopEdit = false;
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (error == 0) {
        if (this.$route.name == "pickupLocationsCreate") {
          this.$parent.aletText = this.$t('allerts.pickupLocationsuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "pickupLocationsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.storeHasBeenModifiedSuccessfully');
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
    if (this.$route.name == "pickupLocationsEdit") {
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
    iconInput,
    dvider,
    addHeader,
    formTextarea,
    loading,
  },
};
</script>
<style></style>

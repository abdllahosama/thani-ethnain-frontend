<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('stores.form.createStore')"
          :description="$t('stores.form.FfromHereYouCanCreateANewStore')"
          v-if="$route.name == 'storesCreate'"
        />
        <addHeader
          :title="$t('stores.form.editStore')"
          :description="
            $t('stores.form.fromHereYouCanModifyTheProductStoreInformation')
          "
          v-if="$route.name == 'storesEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('stores.form.basicInformation')"
            :description="$t('stores.form.basicInformationOfTheStore')"
            noLine="true"
          />
          <formInput
            :title="$t('stores.form.theNameOfTheStore')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255" 
          />
          <checkInput :title="$t('stores.form.storeStatus')" :value="item.stat" v-model="item.stat"/>
          <formTextarea
            :title="$t('stores.form.descriptionOfTheStore')"
            v-model="item.description"
          />
          <dvider
            :title="$t('stores.form.addressOfStore')"
            :description="$t('stores.form.theAddressOfTheStore')"
          />
          <formInput
            :title="$t('stores.form.title')"
            v-model="item.address1"
            maxlength="255" 
          />
          <formInput
            :title="$t('stores.form.supplement')"
            v-model="item.address2"
            maxlength="255" 
          />
          <formInput
            :title="$t('stores.form.theEntity')"
            v-model="item.entity"
            maxlength="255" 
          />
          <formInput
            :title="$t('stores.form.city')"
            v-model="item.city"
            maxlength="255" 
          />
          <formInput
            :title="$t('stores.form.postalCode')"
            v-model="item.zip"
            maxlength="255" 
          />
          <formInput
            :title="$t('stores.form.theState')"
            v-model="item.country"
            maxlength="255" 
          />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'storesCreate' && !$parent.stopEdit"
          >
            {{ $t('stores.form.createStore') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'storesEdit' && !$parent.stopEdit"
          >
            {{ $t('stores.form.editStore') }}
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
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
import checkInput from '@/elements/add/form/checkInput.vue'
export default {
  data() {
    return {
      path: "/stores",
      item: {},
      errors: {
        name: false,
      },
    };
  },
  methods: {
    getItem() {
      var item = this.$database.stores.find(
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
        if (this.$route.name == "storesCreate") {
          this.$parent.aletText = this.$t('allerts.storeSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "storesEdit") {
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
    if (this.$route.name == "storesEdit") {
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
    dvider,
    addHeader,
    formTextarea,
    loading,
    checkInput,
  },
};
</script>
<style></style>

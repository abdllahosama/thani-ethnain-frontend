<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('details.form.CreateAProductDetail')"
          :description="$t('details.form.FromHereYouCanCreateNewProductDetails')"
          v-if="$route.name == 'detailsCreate'"
        />
        <addHeader
          :title="$t('details.form.EditProductDetail')"
          :description="$t('details.form.FromHereYouCanModifyTheDetailsOfTheProducts')"
          v-if="$route.name == 'detailsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('details.form.ProductsDetailInformation')"
            :description="$t('details.form.BasicInformationForProductDetail')"
            noLine="true"
          />
          <formInput
            :title="$t('details.form.ProductDetailName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            :col="'col-12'"
            maxlength="255"
          />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'detailsCreate' && !$parent.stopEdit"
          >
            {{$t('details.form.CreateProductDetails')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'detailsEdit' && !$parent.stopEdit"
          >
            {{$t('details.form.EditProductDetail')}}
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
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/details",
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
        if (this.$route.name == "detailsCreate") {
          this.$parent.aletText =
            this.$t('allerts.sectionSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "detailsEdit") {
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
    if (this.$route.name == "detailsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
  },
  components: {
    formInput,
    dvider,
    addHeader,
    loading,
  },
};
</script>
<style></style>

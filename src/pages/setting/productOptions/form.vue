<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('productOptions.form.CreateAProductOption')"
          :description="$t('productOptions.form.FromHereYouCanCreateNewProductOptions')"
          v-if="$route.name == 'productOptionsCreate'"
        />

        <addHeader
          :title="$t('productOptions.form.EditProductsOption')"
          :description="$t('productOptions.form.FromHereYouCanAdjustTheChoiceOfProducts')"
          v-if="$route.name == 'productOptionsEdit'"
        />

        <div class="mb-4 row">
          <dvider
            :title="$t('productOptions.form.ProductsOptionInformation')"
            :description="$t('productOptions.form.BasicInformationForProductChoice')"
            noLine="true"
          />

          <formInput
            :title="$t('productOptions.form.optionName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            :col="'col-5'"
            maxlength="255"
          />

          <selectInput
            :title="$t('productOptions.form.CucumberType')"
            v-model="item.status"
            :values="[
              { name: $t('productOptions.form.Individually'), value: 0 },
              { name: $t('productOptions.form.Multiple'), value: 1 },
            ]"
          />

          <dvider
            :title="$t('productOptions.form.AvailableProducts')"
          />
          <productsTable calss="col-12"/>

          <!-- Buttons -->
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'productOptionsCreate' && !$parent.stopEdit"
          >
            {{$t('productOptions.form.CreateProductDetails')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'productOptionsEdit' && !$parent.stopEdit"
          >
            {{$t('productOptions.form.EditProductDetail')}}
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
import selectInput from "@/elements/add/form/selectInput.vue";
import productsTable from "@/elements/add/form/productOption/productsTable.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";

export default {
  data() {
    return {
      path: "/productOptions",
      item: {
        status:0,
        quotationItems: [],
      },
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
        if (this.$route.name == "productOptionsCreate") {
          this.$parent.aletText = this.$t('allerts.sectionSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "productOptionsEdit") {
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
  addQuotationItem() {
      this.item.quotationItems.push({
        id: "",
        add_product: false,
        product_name: "",
        product_id: 0
      });
    },
  }, 
  mounted() {
    if (this.$route.name == "productOptionsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      this.addQuotationItem();
    }
  },
  components: {
    formInput,
    dvider,
    addHeader,
    loading,
    selectInput,
    productsTable
  },
};
</script>

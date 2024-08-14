<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('units.form.createAUnit')"
          :description="
            $t('units.form.fromHereYouCanCreateProductUnitsOfMeasure')
          "
          v-if="$route.name == 'unitsCreate'"
        />
        <addHeader
          :title="$t('units.form.modifyTheUnit')"
          :description="
            $t('units.form.fromHereYouCanAdjustTheUnitOfMeasure')
          "
          v-if="$route.name == 'unitsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('units.form.unitInformation')"
            :description=" $t('units.form.basicInformationOfTheUnitOfMeasure')"
            noLine="true"
          />

          <formInput
            :title="$t('units.form.unitName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255" 
          />
          <formInput
            :title="$t('units.form.measruingUnit')"
            v-model="item.unit"
            :hasErorr="errors.unit"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255" 
          />


          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'unitsCreate' && !$parent.stopEdit"
          >
            {{ $t('units.form.createAUnit') }}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'unitsEdit' && !$parent.stopEdit"
          >
            {{ $t('units.form.modifyTheUnit') }}
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
      path: "/units",
      item: {},
      errors: {
        name: false,
        unit: false,
      },
    };
  },
  methods: {
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.item = response.data;
          if (!Array.isArray(this.item.units_coefficient_id)) {
            this.item.units_coefficient_id = []
          }
          this.item.units_coefficient_id = this.$database.unitsCoefficients.filter(row => this.item.units_coefficient_id.includes(row.id) )
          this.$parent.stopEdit = false;
        });
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (typeof this.item.unit === "undefined" || this.item.unit == "") {
        error = 1;
        this.errors.unit = true;
      }
      if (error == 0) {
        if (this.$route.name == "unitsCreate") {
          this.$parent.aletText = this.$t('allerts.unitSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "unitsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;

          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.unitHasBeenModifiedSuccessfully');
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
    }
  },
  mounted() {
    if (this.$route.name == "unitsEdit") {
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

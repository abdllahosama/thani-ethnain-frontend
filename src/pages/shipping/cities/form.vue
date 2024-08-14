<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('cities.form.CityConstruction')"
          :description="
            $t('cities.form.FromHereYouCanCreateANewCity')
          "
          v-if="$route.name == 'citiesCreate'"
        />
        <addHeader
          :title="$t('cities.form.CityModification')"
          :description="
            $t('cities.form.FromHereYouCanEditTheCityInformation')
          "
          v-if="$route.name == 'citiesEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('cities.form.CityInformation')"
            :description="
              $t('cities.form.ThatIsWhereYouCanModifyTheCities')
            "
            noLine="true"
          />
          <formInput
            :title="$t('cities.form.TheNameOfTheCity')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
          />
          <formInput
            :title="$t('cities.form.CityCode')"
            v-model="item.code"
            :hasErorr="errors.code"
            :error="$t('allerts.theCostShouldBeGreaterThan')"
          />
            <monyInput
            :title="$t('cities.form.ShippingCost')"
            v-model="item.cost"
            :hasErorr="errors.cost"
            :error="$t('allerts.theCostShouldBeGreaterThan')"
          />
            <monyInput
            :title="$t('cities.form.ShippingPrice')"
            v-model="item.price"
            :hasErorr="errors.price"
            :error="$t('allerts.theCostShouldBeGreaterThan')"
          />
          <!-- Divider -->
          <hr class="mt-5 mb-5 col-12" />
          <!-- Buttons -->
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'citiesCreate' && !$parent.stopEdit"
          >
            {{ $t('cities.form.AddinACity') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'citiesEdit' && !$parent.stopEdit"
          >
            {{ $t('cities.form.CityModification') }}
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
import monyInput from "@/elements/add/form/monyInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import loading from "@/elements/add/loading.vue";
export default {
  data() {
    return {
      path: "/cities",
      item: {},
      errors: {
        name: false,
        cost: false,
      },
    };
  },
  mounted() {
    if (this.$route.name == "citiesEdit") {
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
      if (
        typeof this.item.cost === "undefined" ||
        this.item.cost == "" ||
        this.item.cost < 1
      ) {
        error = 1;
        this.errors.cost = true;
      }
      if (error == 0) {
        if (this.$route.name == "citiesCreate") {
          this.$parent.aletText = this.$t('allerts.citiesSuccessfullyAdded');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          
          this.$router.go(-1);
        } else if (this.$route.name == "citiesEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.citiesHasBeenModifiedSuccessfully');
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
    dvider,
    addHeader,
    monyInput,
    loading,
  },
};
</script>
<style></style>

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="$t('manufacturingModels.form.AddAModel')"
          :description="$t('manufacturingModels.form.FromHereYouCanAddANewModel')"
          v-if="$route.name == 'manufacturingModelsCreate'"
        />
        <addHeader
          :title="$t('manufacturingModels.form.ModifyTheForm')"
          :description="$t('manufacturingModels.form.FromHereYouCanEditTheFormData')"
          v-if="$route.name == 'manufacturingModelsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('manufacturingModels.form.basicInformation')"
            :description="$t('manufacturingModels.form.BasicFormInformation')"
            noLine="true"
          />

          <formInput
            :title="$t('manufacturingModels.form.FormName')"
            v-model="item.name"
            maxlength="255"
          />

          <div class="col-md-6 row mb-4">
              <label class="col-md-4">{{$t('manufacturingModels.form.TheEndTimeOfTheForm')}}</label>
              <div class="col-md-7">
                <div class="add-input table-add-input">
                  <input
                    type="number"
                    class="form-control w-100"
                    placeholder="0"
                    v-model="item.day"
                  />
                  <span>{{$t('manufacturingModels.form.Day')}}</span>
                </div>
              </div>
          </div>
          
          <monyInput
            :title="$t('manufacturingModels.form.ProjectedCost')"
            v-model="item.expected_cost"
            :disabled="true"
          />

          <monyInput
            :title="$t('manufacturingModels.form.ExpectedPrice')"
            v-model="item.expected_price"
            :disabled="true"
          />

          <formTextarea :title="$t('manufacturingModels.form.DescriptionOfTheOperation')" v-model="item.description" />
          <dvider :title="$t('manufacturingModels.form.modelMaterials')" :description="$t('manufacturingModels.form.theRawMaterialsUsedModel')" />
          <productsTableMatrials class="col-12" />
          <dvider :title="$t('manufacturingModels.form.ModelOutputs')" :description="$t('manufacturingModels.form.TheFinalOutputsOfTheModel')" />
          <productsTableResults class="col-12" />
          <!--dvider
            :title="'مصروفات النموذج'"
            :description="'المصروفات الخاصه بالنموذج'"
          />
          <manufactringExpenses class="col-12"/-->


          <hr class="mt-5 mb-5 col-12" />
          <a @click="saveItem" class="btn btn-block btn-primary"
            v-if="$route.name == 'manufacturingModelsCreate' && !$parent.stopEdit">
            {{$t('manufacturingModels.form.AddAForm')}}
          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'manufacturingModelsEdit' && !$parent.stopEdit"
          >
            {{$t('manufacturingModels.form.ModifyTheForm')}}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";

import formInput from "@/elements/add/form/formInput.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import checkInput from "@/elements/add/form/checkInput.vue";

import productsTableMatrials from "@/elements/add/form/manufactringMatrials/productsTable.vue"
import productsTableResults from "@/elements/add/form/manufactringResults/productsTable.vue"
//import manufactringExpenses from "@/elements/add/form/manufactringExpenses/productsTable.vue"


import loading from "@/elements/add/loading.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/manufacturingModels",
      item: {
        name: '',
        expected_cost: 0,
        expected_price: 0,
        day: '',
        description: '',
        manufacturingModelProducts: [],
        manufacturingModelMaterials: [],

      },
      errors: {
        name: false,
      },
      itemIndex: null,
    };
  },
  mounted() {
    
    this.$updateDatabase(["products", "InvoiceGroups"]);
    if (this.$route.name == "manufacturingModelsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    }
    if (this.$route.name == "manufacturingModelsCreate") {
      this.addManufacturingModelMaterial();
      this.addManufacturingModelProduct();
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
          this.$parent.stopEdit = false;
          this.item = response.data;
          if (this.item.manufacturingModelProducts.length == 0) {
            this.addManufacturingModelProduct();
          }
          if (this.item.manufacturingModelMaterials.length == 0) {
            this.addManufacturingModelMaterial();
          }
        });
    },
    saveItem() {
      var error = 0;
      this.errors = [];

      if (error == 0) {
        if (this.$route.name == "manufacturingModelsCreate") {
          this.$parent.aletText = this.$t('manufacturingModels.form.TheOperationHasBeenSuccessfullyAdded');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "manufacturingModelsEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then(() => {
              this.$parent.stopEdit = false;

              this.$parent.aletText = this.$t('manufacturingModels.form.TheProcessHasBeenSuccessfullyModified');
              this.$parent.alertType = "success";
              this.$router.go(-1);
              this.loading = false;
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
    addManufacturingModelMaterial() {
      this.item.manufacturingModelMaterials.push({
        product_name: "",
        product_id: 0,
        unit_id: 0,
        quantity: "",
        cost: "",
        total: 0,
      });
    },
    addManufacturingModelProduct() {
      this.item.manufacturingModelProducts.push({
        product_name: "",
        product_id: 0,
        unit_id: 0,
        quantity: "",
        price: "",
        total: 0,
      });
    },
    changePrice () {
      this.item.expected_cost = 0;
      this.item.expected_price = 0;

      this.item.manufacturingModelProducts.forEach((qitem) => {
        this.item.expected_price += qitem.total;
      });

      this.item.manufacturingModelMaterials.forEach((qitem) => {
        this.item.expected_cost += qitem.total;
      });

    }
  },
  components: {
    dvider,
    addHeader,
    formInput,
    connectionInput,
    formTextarea,
    monyInput,
    selectInput,
    loading,

    checkInput,

    VueCtkDateTimePicker,
    productsTableMatrials,
    productsTableResults,
    //manufactringExpenses
  },
  watch: {
    "$option.invoice_invoice_group_id": function (val) {
      this.item.invoice_group = val;
    },
    "item.directManufacture": function () {
      if (this.item.directManufacture == 1) {
        this.item.end_date = this.item.start_date;
        this.item.status = 2;
      }
    },
  },
};
</script>

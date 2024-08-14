<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('materials.form.CreatingAMaterial')"
          :description="$t('materials.form.FromHereYouCanCreateANewMaterial')"
          v-if="$route.name == 'materialsCreate'"
        />
        <addHeader
          :title="$t('materials.form.ModifiedMaterial')"
          :description="$t('materials.form.FromHereYouCanModifyTheMaterial')"
          v-if="$route.name == 'materialsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('materials.form.basicInformation')"
            :description="$t('materials.form.BackgroundInformationForTheOpacity')"
            noLine="true"
          />
          <formInput
            :title="$t('materials.form.TheNameOfTheMaterial')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
          />
          <connectionInput
            :title="$t('materials.form.RawMaterialRating')"
            :group="$t('materials.form.classifications')"
            v-model="item.section_id"
            :hasAdd="true"
            :open="'addSection'"
            :values="$database.sections"
          />
          <connectionInput
            :title="$t('materials.form.supplierName')"
            :group="$t('materials.form.suppliers')"
            v-model="item.supplier_id"
            :hasAdd="false"
            :values="$database.suppliers"
          />
          <div class="form-group row col-md-6">
            <label class="col-md-4">{{
              $t('materials.form.barcodeCode')
            }}</label>
            <!-- Input -->
            <div class="col-md-7 d-flex">
              <input type="text" class="form-control" v-model="item.barcode" />
              <button
                class="btn btn-primary barcode-generator"
                @click="generatBarcode"
              >
                <i class="fas fa-scanner-keyboard"></i>
              </button>
            </div>
          </div>
          <formTextarea
            :title="$t('materials.form.DescriptionOfTheMaterial')"
            v-model="item.description"
          />
          <dvider
            :title="$t('materials.form.accountsInformation')"
            :description="$t('materials.form.productAccountInformation')"
          />

          <connectionInput
            :title="$t('materials.form.taxRate')"
            :group="$t('materials.form.rates')"
            v-model="item.tax_id"
            :hasAdd="true"
            :values="$database.taxes"
            :open="'addTaxe'"
          />
          <connectionInput
            :title="$t('materials.form.DiscountRate')"
            :group="$t('materials.form.DiscountRates')"
            v-model="item.discount_id"
            :hasAdd="true"
            :values="$database.discounts"
            :open="'addDiscount'"
          />
          <pricesTable class="col-12" />
          <dvider
            :title="$t('materials.form.storeSettings')"
            :description="$t('materials.form.settingsForStores')"
            v-if="item.type == 0"
          />
          <connectionInput
            :title="$t('materials.form.BasicUnit')"
            :group="$t('materials.form.units')"
            v-model="item.unit_id"
            :open="'addUnit'"
            :hasAdd="true"
            :values="$database.units"
            v-if="item.type == 0"
          />

          <unitsTable class="col-12" />

          <dvider
            :title="$t('materials.form.WarehouseQuantities')"
            :description="$t('materials.form.QuantitiesOfProductsAvailableInStores')"
            v-if="item.type == 0"
          />
          <div class="form-group col-12 row" v-if="item.type == 0">
            <label class="col-2">{{
              $t('materials.form.trackInventory')
            }}</label>
            <div class="col-md-7">
              <div class="custom-control custom-switch">
                <input
                  type="checkbox"
                  id="cardToggle"
                  :checked="item.track_quantity == 1"
                  class="custom-control-input"
                  value="1"
                  @change="changevalue()"
                />
                <label for="cardToggle" class="custom-control-label"></label>
              </div>
            </div>
          </div>

          <storesTable
            v-if="item.type == 0 && item.track_quantity == 1"
            class="co-12"
          />

          <dvider
            :title="$t('products.form.ManufacturingSettings')"
            :description="$t('products.form.ManufacturingNumbers')"
            v-if="item.type == 0"
          />
          <checkInput
            :title="$t('products.form.factoryProduct')"
            :value="item.factory_product"
            v-model="item.factory_product"
          />
          <connectionInput
            :title="$t('products.form.manufacturingModel')"
            :group="$t('products.form.manufacturingModels')"
            v-model="item.manufacturing_model_id"
            :values="$database.manufacturingModels"
            v-if="item.factory_product"
          />

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'materialsCreate' && !$parent.stopEdit"
          >
            {{ $t('materials.form.createProduct') }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'materialsEdit' && !$parent.stopEdit"
          >
            {{ $t('materials.form.editProduct') }}
          </a>
          <loading v-if="$parent.stopEdit"/>
        </div>
      </div>
    </div>
    <addSection v-if="model == 'addSection'"></addSection>
    <addUnit v-if="model == 'addUnit'"></addUnit>
    <addStore v-if="model == 'addStore'"></addStore>
    <addTaxe v-if="model == 'addTaxe'"></addTaxe>
    <addDiscount v-if="model == 'addDiscount'"></addDiscount>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";
import checkInput from "@/elements/add/form/checkInput.vue";

import addSection from "./components/addSection.vue";
import addUnit from "./components/addUnit.vue";
import addStore from "./components/addStore.vue";
import addTaxe from "./components/addTaxe.vue";
import addDiscount from "./components/addDiscount.vue";
import loading from "@/elements/add/loading.vue";

import pricesTable from "@/elements/add/form/product/pricesTable.vue";
import unitsTable from "@/elements/add/form/product/unitsTable.vue";
import storesTable from "@/elements/add/form/product/storesTable.vue";
export default {
  data() {
    return {
      path: "/materials",
      item: {
        type: 0,
        track_quantity: 1,
        tax_id: 0,
        discount_id: 0,
        unit_id: 0,
        section_id: 0,
        supplier_id: 0,

        productPrices: [],
        productUnits: [],
        productQuantities: [],

        barcode: "",
        material: 1,
        unit_name: "وحدة",
        factory_product: 0,
        manufacturing_model_id: 0
      },
      errors: {
        name: false,
      },
      model: false,
      disabled: true,
      runStores: 0,
    };
  },
  methods: {
    addUnit() {
      this.item.productUnits.push({
        unit_id: "",
        quantity: "",
      });
    },
    addProductPrices() {
      this.item.productPrices.push({
        priceList_id: 0,
        detail_id: 0,
        unit_id: 0,
        price: "",
        cost: "",
      });
    },
    getItem() {
      axios
        .get(this.$linkGnirator(this.path + "/" + this.$route.params.id))
        .then((response) => {
          this.$parent.stopEdit = false;
          this.item = response.data;
          this.runStores += 1;

          if (this.item.productUnits.length == 0) {
            this.addUnit();
          }
        });
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (error == 0) {
        if (this.$route.name == "materialsCreate") {
          this.$parent.aletText = this.$t('allerts.productSuccessfullyAdde');
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1))
          this.$router.go(-1);
        } else if (this.$route.name == "materialsEdit") {
          this.$parent.stopEdit = true;
          this.item._method = "PUT";
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText =
                this.$t('allerts.productHasBeenModifiedSuccessfully');
              this.$parent.alertType = "success";
              this.$router.go(-1);
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
    changevalue() {
      if (this.item.track_quantity == 1) {
        this.item.track_quantity = 0;
      } else if (this.item.track_quantity == 0) {
        this.item.track_quantity = 1;
      }
    },
    generatBarcode() {
      this.item.barcode = Math.floor(Math.random() * 10000000);
    },
  },
  mounted() {
    this.$updateDatabase([
      "sections",
      "units",
      "stores",
      "suppliers",
      "taxes",
    ]);
    if (this.$route.name == "materialsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      this.runStores += 1;
      this.addUnit();
    }

    var elm = this;
      window.addEventListener("keydown", function (e) {
        if (e.key == "F1" || e.key == "Meta") {
          e.preventDefault();
          elm.saveItem();
        }
    })
  },
  watch: {
    runStores: function (val) {
      if (val == 1) {
        this.$database.stores.forEach((store) => {
          var productQuantity = this.item.productQuantities.find(
            (el) => el.store_id == store.id
          );
          if (productQuantity) {
            productQuantity.name = store.name;
          } else {
            this.item.productQuantities.push({
              store_id: store.id,
              name: store.name,
              quantity: "",
              min_quantity: "",
            });
          }
        });
      }
    },
    "item.unit_id": function (val) {
      var unit = this.$database.units.find((el) => el.id == val);
      if (unit) {
        this.item.unit_name = unit.name;
      } else {
        this.item.unit_name = "وحدة";
      }
    },
    "item.detail_id": function (val) {
      var productMaterials = this.item.productMaterials.filter(
        (el) => el.detail_id == val
      );
      if (!productMaterials.length) {
        this.addMaterial();
      }
    },
  },
  components: {
    formInput,
    dvider,
    addHeader,
    formTextarea,
    connectionInput,
    monyInput,
    addSection,
    checkInput,
    addUnit,
    addStore,
    addTaxe,
    addDiscount,
    loading,
    pricesTable,
    unitsTable,
    storesTable,
  },
};
</script>

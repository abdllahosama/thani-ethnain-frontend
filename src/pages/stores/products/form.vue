<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <addHeader
          :title="$t('products.form.createProduct')"
          :description="$t('products.form.fromHereyouCanCreateANewProduct')"
          v-if="$route.name == 'productsCreate'"
        />
        <addHeader
          :title="$t('products.form.editProduct')"
          :description="$t('products.form.fromHereYouCanModifyTheProductData')"
          v-if="$route.name == 'productsEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="$t('products.form.basicInformation')"
            :description="$t('products.form.basicProductInformation')"
            noLine="true"
          />
          <fileInput
            :title="$t('products.form.productImage')"
            v-model="item.image"
            :image="item.image"
            :path="'products'"
            :hasErorr="errors.image"
            :error="$t('allerts.ChooseASuitableFile')"
            :col="'col-12'"
          />
          <formInput
            :title="$t('products.form.productName')"
            v-model="item.name"
            :hasErorr="errors.name"
            :error="$t('allerts.thisFieldIsRequired')"
            maxlength="255"
          />
          <connectionInput
            :title="$t('products.form.productClassification')"
            :group="$t('products.form.classifications')"
            v-model="item.section_id"
            :hasAdd="true"
            :open="'addSection'"
            :values="$database.sections"
          />
          <div class="form-group col-md-6 row">
            <label class="col-md-4">{{
              $t("products.form.supplierName")
            }}</label>
            <div class="col-md-7">
              <multiselect
                v-model="item.supplier_id"
                :options="$database.suppliers"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('products.form.suppliers')"
                label="name"
                track-by="id"
                :hide-selected="true"
              />
            </div>
          </div>

          <div class="form-group row col-md-12">
            <label class="col-md-2">{{
              $t("products.form.productDescription")
            }}</label>
            <div class="col-md-95">
              <ckeditor
                :editor="editor"
                v-model="item.description"
                :config="editorConfig"
              ></ckeditor>
            </div>
          </div>

          <div class="col-xl-12 row" v-if="item.allow_product_options == 1">
            <label class="col-2">{{
              $t("products.form.ProductOptions")
            }}</label>
            <div class="col-4">
              <multiselect
                v-model="selctedProductOptions"
                :options="$database.productOptions"
                input-class="form-control w-100"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :placeholder="$t('products.form.ChooseFromOptions')"
                label="name"
                track-by="name"
                :hide-selected="true"
              />
            </div>
          </div>

          <dvider
            :title="$t('products.form.accountsInformation')"
            :description="$t('products.form.productAccountInformation')"
          />
          <connectionInput
            :title="$t('products.form.taxRate')"
            :group="$t('products.form.rates')"
            v-model="item.tax_id"
            :hasAdd="true"
            :values="$database.taxes"
            :open="'addTaxe'"
          />
          <connectionInput
            :title="$t('products.form.DiscountRate')"
            :group="$t('products.form.DiscountRates')"
            v-model="item.discount_id"
            :hasAdd="true"
            :values="$database.discounts"
            :open="'addDiscount'"
          />

          <pricesTable class="col-12" />

          <dvider
            :title="$t('products.form.storeSettings')"
            :description="$t('products.form.settingsForStores')"
            v-if="item.type == 0"
          />
          <connectionInput
            :title="$t('products.form.BasicUnit')"
            :group="$t('products.form.units')"
            v-model="item.unit_id"
            :open="'addUnit'"
            :hasAdd="true"
            :values="$database.units"
            v-if="item.type == 0"
          />

          <unitsTable class="col-12" />

          <dvider
            :title="$t('products.form.WarehouseQuantities')"
            :description="
              $t('products.form.QuantitiesOfProductsAvailableInStores')
            "
            v-if="item.type == 0"
          />

          <div class="form-group col-12 row" v-if="item.type == 0">
            <label class="col-2">{{
              $t("products.form.trackInventory")
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

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'productsCreate' && !$parent.stopEdit"
          >
            {{ $t("products.form.createProduct") }}
          </a>
          <a
            @click="saveItem()"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'productsEdit' && !$parent.stopEdit"
          >
            {{ $t("products.form.editProduct") }}
          </a>
          <loading v-if="$parent.stopEdit" />
        </div>
      </div>
    </div>
    <addSection v-if="model == 'addSection'"></addSection>
    <addUnit v-if="model == 'addUnit'"></addUnit>
    <addTaxe v-if="model == 'addTaxe'"></addTaxe>
    <addDiscount v-if="model == 'addDiscount'"></addDiscount>
  </div>
</template>
<script>
import axios from "axios";

import formInput from "@/elements/add/form/formInput.vue";
import fileInput from "@/elements/add/form/fileInput.vue";
import formTextarea from "@/elements/add/form/formTextarea.vue";
import connectionInput from "@/elements/add/form/connectionInput.vue";
import monyInput from "@/elements/add/form/monyInput.vue";
import selectInput from "@/elements/add/form/selectInput.vue";
import checkInput from "@/elements/add/form/checkInput.vue";

import dvider from "@/elements/add/dvider.vue";
import addHeader from "@/elements/add/header.vue";

import addSection from "./components/addSection.vue";
import addUnit from "./components/addUnit.vue";
import addTaxe from "./components/addTaxe.vue";
import addDiscount from "./components/addDiscount.vue";
import loading from "@/elements/add/loading.vue";

import pricesTable from "@/elements/add/form/product/pricesTable.vue";
import unitsTable from "@/elements/add/form/product/unitsTable.vue";
import storesTable from "@/elements/add/form/product/storesTable.vue";
import materialsTable from "@/elements/add/form/product/materialsTable.vue";
import PriceInput from "@/elements/add/form/product/priceInput.vue";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import UploadAdapter from "@/helpers/UploadAdapter.js";

import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      path: "/products",
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|', 'insertTable', '|', 'imageUpload', 'mediaEmbed', '|', 'undo', 'redo' ],
        table: {
          toolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
        },
        extraPlugins: [function uploader(editor) {
          editor.plugins.get( 'FileRepository' ).createUploadAdapter =  function ( loader ) {
            return new UploadAdapter( loader );
          };
        }],
        language: 'ar',
      },
      item: {
        description: '',
        type: 0,
        track_quantity: 0,
        barcode: "",
        tax_id: 0,
        discount_id: 0,
        unit_id: 0,
        section_id: 0,
        supplier_id: [],
        allow_product_options: 0,
        product_option_id: "",
        productPrices: [],
        productUnits: [],
        productQuantities: [],
        productMaterials: [],

        unit_name: "وحدة",
        detail_id: 0,
        factory_product: 0,
        manufacturing_model_id: 0,
      },
      selctedProductOptions: [],
      errors: {
        name: false,
        price: false,
        barcode: false,
      },
      model: false,
      disabled: true,
      runStores: 0,
    };
  },
  methods: {
    addMaterial() {
      this.item.productMaterials.push({
        detail_id: this.item.detail_id,
        material_id: "",
        name: "",
        quantity: "",
        unit: "وحدة",
      });
    },
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
          this.item.detail_id = 0;
          this.runStores += 1;
          if (this.item.productUnits.length == 0) {
            this.addUnit();
          }
          var productMaterials = this.item.productMaterials.filter(
            (el) => el.detail_id == 0
          );
          if (!productMaterials.length) {
            this.addMaterial();
          }
          if (Array.isArray(JSON.parse(this.item.product_option_id))) {
            JSON.parse(this.item.product_option_id).forEach((id) => {
              var productOption = this.$database.productOptions.find(
                (el) => el.id == id
              );
              if (productOption) {
                this.selctedProductOptions.push(productOption);
              }
            });
          }
        });
    },
    saveItem() {
      var error = 0;
      if (typeof this.item.name === "undefined" || this.item.name == "") {
        error = 1;
        this.errors.name = true;
      }
      if (
        typeof this.item.barcode !== "undefined" &&
        this.item.barcode != "" &&
        this.item.barcode != null
      ) {
        var barcode = this.$database.products.find(
          (el) => el.barcode == this.item.barcode && el.id != this.item.id
        );
        if (barcode) {
          error = 1;
          this.errors.barcode = true;
        }
      }
      if (error == 0) {
        if (this.$route.name == "productsCreate") {
          this.$parent.aletText = this.$t("allerts.productSuccessfullyAdde");
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));
          this.$router.go(-1);
        } else if (this.$route.name == "productsEdit") {
          this.$parent.stopEdit = true;
          this.item._method = "PUT";
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.aletText = this.$t(
                "allerts.productHasBeenModifiedSuccessfully"
              );
              this.$parent.alertType = "success";
              this.$router.go(-1);
              return response;
            });
        }
      } else {
        this.$parent.aletText = this.$t("allerts.pleaseMakeSureOfTheInput");
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
      "priceLists",
      "details",
      "units",
      "stores",
      "suppliers",
      "materials",
      "taxes",
      "manufacturingModels",
    ]);

    if (this.$route.name == "productsEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      this.runStores += 1;
      this.addMaterial();
      this.addUnit();
    }

    var elm = this;
    window.addEventListener("keydown", function (e) {
      if (e.key == "F1" || e.key == "Meta") {
        e.preventDefault();
        elm.saveItem();
      }
    });
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
    selctedProductOptions: function (val) {
      this.item.product_option_id = val.map((el) => el.id);
    },
  },
  components: {
    formInput,
    fileInput,
    dvider,
    addHeader,
    formTextarea,
    connectionInput,
    monyInput,
    selectInput,
    addSection,
    addUnit,
    addTaxe,
    addDiscount,
    loading,
    pricesTable,
    unitsTable,
    storesTable,
    materialsTable,
    checkInput,
    PriceInput,
    VueEditor,
  },
};
</script>

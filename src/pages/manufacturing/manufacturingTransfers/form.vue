<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12 mt-3">
        <addHeader
          :title="'أضافه عملية نقل بالعمليات'"
          :description="'من هنا يمكنك اضافه نقل بالعمليات'"
          v-if="$route.name == 'manufacturingTransfersCreate'"
        />
        <addHeader
          :title="'تعديل العملية'"
          :description="'من هنا يمكنك تعديل العملية'"
          v-if="$route.name == 'manufacturingTransfersEdit'"
        />
        <div class="mb-4 row">
          <dvider
            :title="'المعلومات الأساسية'"
            :description="'المعلومات الاساسية للعملية'"
            noLine="true"
          />
          <connectionInput
            :title="'ترقيم العملية'"
            :group="'المجموعات'"
            v-model="item.invoice_group"
            :disabled="
              $user.admin ||
              $user.role.store_withdrawals_edit_item
                ? false
                : true
            "
            :values="$database.invoiceGroups"
            v-if="$route.name == 'manufacturingTransfersCreate'"
            :hasErorr="errors.invoice_group"
            :error="'الترقيم مطلوب'"
          />

          <formInput
            :title="'ترقيم العملية'"
            v-model="item.code"
            :disabled="true"
            v-if="$route.name == 'manufacturingTransfersEdit'"
          />

          <div class="form-group row" :class="'col-md-6'">
            <label :class="'col-md-4'"> التاريخ </label>
            <div :class="'col-md-7'">
              <div class="icon-input w-100">
                <span><i class="far fa-calendar"></i></span>
                <VueCtkDateTimePicker
                  label="إختر الوقت والتاريخ"
                  button-now-translation="الان"
                  v-model="item.date"
                  :disabled="
                    $user.admin ||
                    $user.role.store_withdrawals_edit_item
                      ? false
                      : true
                  "
                  format="YYYY-MM-DD hh:mm a"
                  color="#631263"
                  button-color="#631263"
                />
              </div>
            </div>
          </div>

          <connectionInput
            :title="'من مشروع'"
            :group="'المخازن'"
            v-model="item.from_manufacture_id"
            :values="$database.Manufactures"
            :disabled="$route.name == 'manufacturingTransfersEdit'"
            :hasErorr="errors.store_id"
            :error="'هذا الحقل مطلوب'"
          />

          <connectionInput
            :title="'إلي مشروع'"
            :group="'المخازن'"
            v-model="item.to_store_id"
            :values="$database.to_manufacture_id"
            :disabled="$route.name == 'manufacturingTransfersEdit'"
            :hasErorr="errors.store_id"
            :error="'هذا الحقل مطلوب'"
          />

          <connectionInput
            :title="'العمليه'"
            :group="'العمليات'"
            v-model="item.manufacture_id"
            :values="$database.projects"
          />
          <connectionInput
            :disabled="item.manufacture_id == 0"
            :title="'ناتج العمليه'"
            :group="'نواتج العمليه'"
            v-model="item.manufacture_item_id"
            :values="
              $database.projectItems.filter(
                (el) => el.manufacture_id == item.manufacture_id
              )
            "
          />

          <checkInput
            :title="'الطباعة'"
            :value="print"
            v-model="print"
            v-if="$route.name == 'manufacturingTransfersCreate'"
          />

          <dvider
            :title="'معلومات المنتجات'"
            :description="'معلومات المنتجات الخاصة بالفاتورة'"
          />
          <productsTable class="col-12" />

          <dvider
            :title="'تفاصيل العملية'"
            :description="
              'المعلومات الاضافية الخاصة بالعملية'
            "
          />

          <formTextarea
            :title="'وذالك عن'"
            v-model="item.description"
          />
          <formTextarea
            :title="'ملاحظة'"
            v-model="item.notes"
          />

          <hr class="mt-5 mb-5 col-12" />
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="
              $route.name == 'manufacturingTransfersCreate' && !$parent.stopEdit
            "
          >
                        إضافة عمليه

          </a>
          <a
            @click="saveItem"
            class="btn btn-block btn-primary"
            v-if="$route.name == 'manufacturingTransfersEdit' && !$parent.stopEdit"
          >
                    تعديل العمليه

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

import productsTable from "@/elements/add/form/projectsWithdrawal/productsTable.vue";

import loading from "@/elements/add/loading.vue";

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/manufacturingTransfers",
      item: {
        date: "",
        invoice_group:
          this.$option.manufacturing_withdrawal_invoice_group_id,
        from_store_id: 0,
        to_store_id: 0,
        quotationItems: [],
        ProductsCount: 0,
      },
      errors: {
        store_id: false,
        invoice_group: false,
      },
      itemIndex: null,
      print: this.$route.name == "invoicesCreate" ? true : false,
    };
  },
  mounted() {
    this.$updateDatabase([
      "productQuantities",
      "products",
      "productUnits",
      "units",
      "invoiceGroups",
      "projects",
      "projectItems",
    ]);
    if (this.$route.name == "manufacturingTransfersEdit") {
      this.$parent.stopEdit = true;
      this.getItem();
    } else {
      if (this.$route.params.id) {
        this.item.store_id = this.$route.params.id;
      }
      this.addQuotationItem();
    }

    if (this.$route.name == "manufacturingTransfersCreate") {
      this.item.date = this.$nowDate()
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

          this.item.quotationItems.forEach((item) => {
            var product = this.$database.products.find(
              (el) => el.id == item.product_id
            );
            if (product) {
              var productUnits = this.$database.productUnits.filter(
                (el) => el.product_id == product.id
              );
              var units = [];
              var unit = this.$database.units.find(
                (el) => el.id == product.unit_id
              );
              if (unit) {
                var productUnit = {
                  unit: unit,
                  quantity: 1,
                };
                units.push(productUnit);
              }
              productUnits.forEach((productUnit) => {
                var unit = this.$database.units.find(
                  (el) => el.id == productUnit.unit_id
                );
                if (unit) {
                  productUnit.unit = unit;
                  units.push(productUnit);
                }
              });
              item.units = units;
            }
          });

          if (this.item.quotationItems.length == 0) {
            this.addQuotationItem();
          }
        });
    },
    saveItem() {
      var error = 0;
      this.errors = [];
      if (
        (typeof this.item.store_id === "undefined" ||
          this.item.store_id == "" ||
          this.item.store_id == 0) &&
        this.$route.name == "manufacturingTransfersCreate"
      ) {
        error = 1;
        this.errors.store_id = true;
      }
      if (
        (typeof this.item.invoice_group === "undefined" ||
          this.item.invoice_group == 0 ||
          this.item.invoice_group == "" ||
          this.item.invoice_group == null) &&
        this.$route.name == "manufacturingTransfersCreate"
      ) {
        error = 1;
        this.errors.invoice_group = true;
      }
      this.item.quotationItems.forEach((quotationItem) => {
        var productUnitQuantity = 1;
        var productUnit = this.$database.productUnits.find(
          (el) =>
            el.product_id == quotationItem.product_id &&
            el.unit_id == quotationItem.unit_id
        );
        if (productUnit) {
          productUnitQuantity = productUnit.quantity;
        }

        if (
          quotationItem.quantity == "" ||
          quotationItem.quantity < 1 ||
          quotationItem.quantity * productUnitQuantity >
            quotationItem.maxQuantity
        ) {
          error = 1;
          quotationItem.quantityError = true;
        } else {
          quotationItem.quantityError = false;
        }
        if (quotationItem.product_name == "") {
          error = 1;
          quotationItem.productNameError = true;
        } else {
          quotationItem.productNameError = false;
        }
      });
      if (error == 0) {
        this.item.date = this.$fixDate(this.item.date);
        if (this.$route.name == "manufacturingTransfersCreate") {
          this.$parent.aletText = "تم اضافة العملية بنجاح";
          this.$parent.alertType = "success";
          this.$addToLocalDatabase(this.item, this.path.substring(1));

          if (this.$option.print_after) {
            var today = new Date();
            var date =
              today.getFullYear() +
              "/" +
              (today.getMonth() + 1) +
              "/" +
              today.getDate();
            var time = today.getHours() + ":" + today.getMinutes();

            var hours = today.getHours();
            var minutes = today.getMinutes();
            var ampm = hours >= 12 ? "pm" : "am";
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            var time = hours + ":" + minutes + " " + ampm;

            this.item.date = date;
            this.item.time = time;

            this.item.created_at = new Date().toISOString("ar-EG", {
              timeZone: "Africa/Cairo",
            });
            var fromStore = this.$database.projects.find(
              (el) => el.id == this.item.store_id
            );
            this.item.store = fromStore;

            this.$parent.printedprojectsWithdrawal = this.item;
          }

          this.item.quotationItems.forEach((quotationItem) => {
            var productUnitQuantity = 1;
            var productUnit = this.$database.productUnits.find(
              (el) =>
                el.product_id == quotationItem.product_id &&
                el.unit_id == quotationItem.unit_id
            );
            if (productUnit) {
              productUnitQuantity = productUnit.quantity;
            }

            var productQuantity = this.$database.productQuantities.find(
              (el) =>
                el.product_id == quotationItem.product_id &&
                el.store_id == this.item.store_id
            );
            if (productQuantity && productQuantity.track_quantity == 1) {
              productQuantity.quantity =
                productQuantity.quantity -
                quotationItem.quantity * productUnitQuantity;
            }
          });

          localStorage.database = JSON.stringify(this.$database);
          this.$router.go(-1);
          this.$parent.stopEdit = false;
        } else if (this.$route.name == "manufacturingTransfersEdit") {
          this.item._method = "PUT";
          this.$parent.stopEdit = true;
          axios
            .post(this.$linkGnirator(this.path + "/" + this.item.id), this.item)
            .then((response) => {
              this.$parent.stopEdit = false;
              this.$parent.aletText = "تم تعديل الفاتورة بنجاح";
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
    addQuotationItem() {
      this.item.quotationItems.push({
        id: "",
        manufacturing_withdrawal_id: this.item.id,
        add_product: false,
        product_name: "",
        product_id: 0,
        description: "",
        unit_id: 0,
        quantity: "",
        total: 0,
      });
    },
    changePrice() {
      this.item.ProductsCount = 0;

      this.item.quotationItems.forEach((qitem) => {
        this.item.ProductsCount += qitem.quantity - 0;
        qitem.total = (qitem.quantity - 0) * (qitem.price - 0);
      });
    },
  },
  components: {
    dvider,
    addHeader,
    formInput,
    connectionInput,
    formTextarea,
    monyInput,
    selectInput,
    productsTable,
    loading,

    checkInput,

    VueCtkDateTimePicker,
  },
  watch: {
    "$option.invoice_invoice_group_id": function (val) {
      this.item.invoice_group = val;
    },
  },
};
</script>

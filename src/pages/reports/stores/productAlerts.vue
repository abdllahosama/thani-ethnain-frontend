<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'تنبيهات المخازن.'"
        />

        <div class="card">
          <div class="card-header">
            <h4 class="card-header-title">
              <i class="fal fa-edit"></i>
              خيارات التقرير
            </h4>
          </div>
          <div class="card-body">
            <div class="row">
              <searchInput
                class="col-md-3"
                title="المخزن"
                plaseholder="اختر مخزن"
                :show="'name'"
                :refrance="'id'"
                v-model="params.store_id"
                :value="params.store_id"
                :values="$database.stores"
              />
              <searchInput
                class="col-md-3"
                title="المورد"
                plaseholder="اختر مورد"
                :show="'name'"
                :refrance="'id'"
                v-model="params.supplier_id"
                :value="params.supplier_id"
                :values="$database.suppliers"
              />
              <searchInput
                class="col-md-3"
                title="التصنيف"
                plaseholder="اختر تصنيف"
                :show="'name'"
                :refrance="'id'"
                v-model="params.section_id"
                :value="params.section_id"
                :values="$database.sections"
              />
              <searchInput
                class="col-md-3"
                title="المنتج"
                plaseholder="اختر منتج"
                :show="'name'"
                :refrance="'id'"
                v-model="params.product_id"
                :value="params.product_id"
                :values="$database.products"
              />
                  <label
                    for="zero_quantity_allow"
                    class="custom-control-label"
                  ></label>
                </div>
              </div>
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>

        <div id="reportShow">
          <reportHeader 
            title="تنبيهات المخازن" 
            :details="[
              {title: 'اسم المخزن', value : storeName },
              {title: 'اسم المورد', value : supplierName },
              {title: 'التصنيف', value : sectionName },
              {title: 'المنتج', value : productName }
            ]"
          />
          <div class="card">
            <div class="card-header">
              <h4 class="card-header-title p-4">
                <i class="fal fa-chart-bar"></i>
                تنبيهات المخازن
              </h4>
              <div style="text-align: center" class="col-4">
                <p class="mt-1" v-if="storeName">
                  <strong>اسم المخزن: </strong>{{ storeName }}
                </p>

                <p class="mt-1" v-if="supplierName">
                  <strong>اسم المورد: </strong>{{ supplierName }}
                </p>

                <p class="mt-1" v-if="sectionName">
                  <strong> التصنيف: </strong>{{ sectionName }}
                </p>

                <p class="mt-1" v-if="productName">
                  <strong> المنتج: </strong>{{ productName }}
                </p>
              </div>
              <div class="col-4"></div>
            </div>
          </div>
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'name',  link: '/products',   title:'المنتج' ,type: 'reportMainLink' , sort: true },
              { column: 'barcode',  title:'المخزن' ,type: 'text' , sort: true },
              { column: 'supplier', title: 'الكمية', type: 'text' },
              { column: 'section', title: 'اقل كمية', type: 'text' },
              { column: 'count', title: 'الحاله', type: 'text', disable: !($option.count_allow) },
              { column: 'quantity', title: 'التنبيه', type: 'unit' }
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: $option.count_allow ? 4 : 3, value: '' },
              { colspan: 1, value: quantity },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import reportTable from "@/elements/reports/reportTable.vue";
import indexHeader from "@/elements/index/indexHeader.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";

export default {
  data() {
    return {
      path: "/reports/stores/productAlerts",
      items: [],

      loading: 0,
      count: 0,
      quantity: 0,
      storeName: "",
      supplierName: "",
      sectionName: "",
      productName: "",

      params: {
        store_id: "",
        supplier_id: "",
        section_id: "",
        product_id: "",
        zero_quantity_allow: 1,
      },
      excel: {
        fileName: 'warehouse inventory',
        reportData: '[]'
      },
    };
  },
  methods: {
    getData() {
      this.$setParams(this.params);
      this.loading = 1;
      this.totalPages = 0;
      this.items = [];
      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.items = response.data;

          this.quantity = 0;
          this.items.forEach((item) => {
            this.quantity += item.quantity;

            var supplier = this.$database.suppliers.find(
              (el) => el.id == item.supplier_id
            );
            if (supplier) {
              item.supplier = supplier.name;
            }

            var section = this.$database.sections.find(
              (el) => el.id == item.section_id
            );
            if (section) {
              item.section = section.name;
            }
          });
          if (!this.params.zero_quantity_allow) {
            for (var i = 0; i < this.items.length; i++) {
              if (this.items[i].quantity < 1) {
                this.items.splice(i, 1);
                i--;
              }
            }
          }

          this.count = this.items.length;

          var supplier = this.$database.suppliers.find(
            (el) => el.id == this.params.supplier_id
          );
          if (supplier) {
            this.supplierName = supplier.name;
          } else {
            this.supplierName = "";
          }

          var section = this.$database.sections.find(
            (el) => el.id == this.params.section_id
          );
          if (section) {
            this.sectionName = section.name;
          } else {
            this.sectionName = "";
          }

          var store = this.$database.stores.find(
            (el) => el.id == this.params.store_id
          );
          if (store) {
            this.storeName = store.name;
          } else {
            this.storeName = "";
          }
          var product = this.$database.products.find(
            (el) => el.id == this.params.product_id
          );
          if (product) {
            this.productName = product.name;
          } else {
            this.productName = "";
          }

          this.loading = 0;
        });
    },
  },
  watch: {
    items : function () {
      var mainElemnt = this
      setTimeout(() => {
        var title = document.querySelector('.report-title').textContent
        var data  = document.querySelector('.report-data').textContent
        var date = document.querySelector('.report-date').textContent
        var header = [title, data, date]
        var table = document.querySelector('table')
        var reportData = [...table.rows].map(r => [...r.querySelectorAll('th, td')].map(td => td.textContent))
        reportData.unshift(header)
        mainElemnt.excel.reportData = JSON.stringify(reportData);
      }, 100)
    }
  },
  mounted() {
    this.params = this.$getParams();
    this.$updateDatabase(["stores"]);
    this.getData();
  },
  components: {
    reportTable,
    indexHeader,
    searchInput,
    actionButtons,
  },
};
</script>

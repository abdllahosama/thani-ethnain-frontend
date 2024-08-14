<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'قيمة  المنتجات.'"
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
              <div class="col-md-3">
                <div class="form-group">
                  <label for="exampleInputEmail1">المدة الزمنية</label>
                  <VueCtkDateTimePicker
                    label="اختر المدة الزمنية"
                    :button-now-translation="$t('reports.overview.now')"
                    v-model="params.date"
                    format="YYYY-MM-DD"
                    formated="YYYY-MM-DD"
                    color="#631263"
                    button-color="#631263"
                    :onlyDate="true"
                  />
                </div>
              </div>
              <!-- <searchInput
                class="col-md-3"
                title="المخزن"
                plaseholder="اختر مخزن"
                :show="'name'"
                :refrance="'id'"
                v-model="params.store_id"
                :value="params.store_id"
                :values="$database.stores"
              /> -->
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
              <div class="form-group col-md-3">
                <label> عرض الكميات اقل من واحد </label>
                <div class="custom-control custom-switch small-switch">
                  <input
                    type="checkbox"
                    id="zero_quantity_allow"
                    v-model="params.zero_quantity_allow"
                    class="custom-control-input"
                    :checked="params.zero_quantity_allow"
                  />
                  <label
                    for="zero_quantity_allow"
                    class="custom-control-label"
                  />
                </div>
              </div>
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>

        <div id="reportShow">
        <reportHeader 
            title="قيمة  المنتجات" 
            :details="[
              {title: 'اسم الخزينة', value : safeName },
              {title: 'اسم المورد', value : supplierName },
              {title: 'التصنيف', value : sectionName },
              {title: 'المنتج', value : productName }
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'name',  link: '/products',   title:'المنتج' ,type: 'reportMainLink' , sort: true },
              { column: 'barcode',  title:'كود الباركود' ,type: 'text' , sort: true },
              { column: 'supplier', title: 'المورد', type: 'text' },
              { column: 'section', title: 'التصنيف', type: 'text' },
              { column: 'count', title: 'العدد', type: 'text', disable: !($option.count_allow) },
              { column: 'quantity', title: 'الكمية', type: 'unit' },
              { column: 'cost', title: 'التكلفة', type: 'text' },
              { column: 'total', title: 'الأجمالي',type: 'text' },
              { column: 'totalQuantity', title: 'الكمية الجديدة', type: 'text' },
              { column: 'unitPrice', title: 'التكلفة الجديدة', type: 'text'},
              { column: 'totalPrice', title: 'الإجمالي الجديد', type: 'text'},
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: $option.count_allow ? 6 : 5, value: '' },
              { colspan: 1, value: total },
              { colspan: 2, value: '' },
              { colspan: 1, value: priceNewTotal },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import reportHeader from "@/elements/reports/reportHeader.vue";
import reportTable from "@/elements/reports/reportTable.vue";
import indexHeader from "@/elements/index/indexHeader.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";
import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

export default {
  data() {
    return {
      path: "/reports/stores/ProductsValue",
      items: [],

      loading: 0,

      count: 0,

      date: "",
      storeName : "",
      supplierName : "",
      sectionName : "",
      productName: "",

      quantity: 0,
      total: 0,

      priceNewTotal: 0,

      params: {
        date: "",
        store_id: "",
        supplier_id: "",
        section_id: "",
        zero_quantity_allow: 1,
      },
      excel: {
        fileName: 'products value',
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
          this.total = 0;
          this.priceTotal = 0;
          this.priceNewTotal = 0;

          this.items.forEach((item) => {
            item.total = item.quantity * item.cost;
            this.quantity += item.quantity;
            this.total += item.total;
            this.priceNewTotal += item.totalPrice;

            item.total = this.$moneyFormat(item.total);
            item.unitPrice = this.$moneyFormat(item.unitPrice);
            item.totalPrice = this.$moneyFormat(item.totalPrice);

            item.totalQuantity = item.totalQuantity.toFixed(2);

            var supplier = this.$database.suppliers.find((el) => el.id == item.supplier_id);
            if (supplier) { item.supplier = supplier.name; }

            var section = this.$database.sections.find( (el) => el.id == item.section_id );
            if (section) { item.section = section.name; }
          });

          if (!this.params.zero_quantity_allow) {
            for (var i = 0; i < this.items.length; i++) {
              if (this.items[i].quantity < 1) {
                this.items.splice(i, 1);
                i--;
              }
            }
          }


          var supplier = this.$database.suppliers.find((el) => el.id == this.params.supplier_id );
          if(supplier){
            this.supplierName = supplier.name;
          } else{
            this.supplierName = ""
          }

          var section = this.$database.sections.find((el) => el.id == this.params.section_id );
          if(section){
            this.sectionName = section.name;
          } else{
            this.sectionName = ""
          }

          var store = this.$database.stores.find((el) => el.id == this.params.store_id);
          if(store){
            this.storeName = store.name;
          } else{
            this.storeName = ""
          }

          var product = this.$database.products.find((el) => el.id == this.params.product_id);
          if (product) {
            this.productName = product.name;
          } else {
            this.productName = "";
          }

          this.total = this.$moneyFormat(this.total);
          this.priceNewTotal = this.$moneyFormat(this.priceNewTotal);
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
    reportHeader,
    VueCtkDateTimePicker
  },
};
</script>

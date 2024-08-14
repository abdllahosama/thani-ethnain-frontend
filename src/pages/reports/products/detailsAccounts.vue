<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'كشف حساب منتج.'"
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
                title="المنتج"
                plaseholder="اختر منتج"
                :show="'name'"
                :refrance="'id'"
                v-model="params.product_id"
                :value="params.product_id"
                :values="this.$database.products.concat(this.$database.materials)"
              />
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

              <dateFilter class="col-md-3" />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="كشف حساب منتج" 
            :details="[
              {title: 'اسم المنتج', value : productName },
              {title: 'اسم المخزن', value : storeName }
            ]"
          />
          <reportTable
            :header="[
              { colspan: 6, value: 'الرصيد الأفتتاحي' },
              {
                colspan: 1,
                value: startBalance,
              },
            ]"
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'code', title: 'الكود', type: 'reportCode' },
              { column: 'date', title: 'التاريخ', type: 'text' },
              { column: 'type', title: 'النوع', type: 'reportType' },
              { column: 'quantity', title: 'الكمية', type: 'quantity' },

              {
                column: 'debit',
                title: 'مدين',
                type: 'textOrEmpty',
              },
              {
                column: 'creditor',
                title: 'دائن',
                type: 'textOrEmpty',
              },
              {
                column: 'new_balance',
                title: 'الرصيد',
                type: 'text',
              },
            ]"
            :footer="[
              { colspan: 6, value: 'الرصيد النهائي' },
              {
                colspan: 1,
                value: endBalance,
              },
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
import dateFilter from "@/elements/reports/dateFilter.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";

export default {
  data() {
    return {
      path: "/reports/products/detailsAccounts",
      items: [],

      loading: 0,

      startBalance: 0,
      endBalance: 0,


      products: [],

      params: {
        product_id: "",
        store_id: "",
        dateFilter: "",
        startDate: "",
        endDate: "",
      },

      excel: {
        fileName: 'product detail account',
        reportData: '[]'
      },

      storeName : "",
      productName: "",
      searchStartDate: "",
      searchEndDate: "",
    };
  },
  methods: {
    getData() {
      this.$setParams(this.params);
      this.loading = 1;
      this.items = [];
      axios
        .get(this.$linkGnirator(this.path), { params: this.params })
        .then((response) => {
          this.items = response.data;

          var productQuantity = this.$database.productQuantities.find(
            (el) => el.product_id == this.params.product_id && el.store_id == this.params.store_id
          );
          var startBalance = productQuantity.opening_quantity;

          this.items.forEach((item) => {
            item.old_balance = startBalance;
            if (item.debit) {
              startBalance = startBalance - item.debit;
            }
            if (item.creditor) {
              startBalance = startBalance + item.creditor;
              item.creditor = item.creditor;
            }
            item.new_balance = startBalance;
          });

          if (this.params.startDate != null) {
            var startDate = Date.parse(this.params.startDate) / 1000 - 7200;
            this.items = this.items.filter((el) => el.date >= startDate);
          }
          if (this.params.endDate != null) {
            var endDate = Date.parse(this.params.endDate) / 1000 + 79200;
            this.items = this.items.filter((el) => el.date <= endDate);
          }

          this.items.forEach((item) => {
            item.date = this.$dateFormat(item.date)
          });

          if (this.items[0]) {
            this.startBalance = this.items[0].old_balance;
            this.endBalance = this.items[this.items.length - 1].new_balance;
          }

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          var store = this.$database.stores.find((el) => el.id == this.params.store_id);
          if(store){
            this.storeName = store.name;
          } else{
            this.storeName = ""
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
    }
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
    if (typeof this.params.startDate === "undefined") {
      this.params.startDate = new Date()
        .toISOString("en-US", { timeZone: "Africa/Cairo" })
        .slice(0, 10);
    }
    this.$updateDatabase(["products", "matrials"]);
    if (this.params.product_id > 0) {
      this.getData();
    }
  },
  components: {
    reportHeader,
    reportTable,
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons,
  },
};
</script>

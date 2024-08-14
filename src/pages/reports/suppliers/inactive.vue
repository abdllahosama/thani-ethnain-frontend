<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'الموردين غير النشيطين.'"
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
                :title="$t('reports.overview.sectionsupplier')"
                :plaseholder="$t('reports.overview.chooseSection')"
                :show="'name'"
                :refrance="'id'"
                v-model="params.sections_account_id"
                :value="params.sections_account_id"
                :values="$database.sectionsAccounts"
              />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="الموردين الغير نشطين"
            :details="[
              {title: 'اسم المورد', value : supplierName },
              {title: $t('reports.overview.sectionsupplier'), value : sectionCustomerName },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              {column: 'name',   link: '/suppliers',   title:'المورد' ,type: 'reportMainLink' , sort: true },
              {
                column: 'date',
                title: 'تاريخ اخر معامله',
                type: 'text',
                sort: 'true',
              },
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: 1, value: balance },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import reportHeader from "@/elements/reports/reportHeader.vue";
import reportTable from "@/elements/reports/reportTable.vue";
import indexHeader from "@/elements/index/indexHeader.vue";
import searchInput from "@/elements/reports/searchInput.vue";
import actionButtons from "@/elements/reports/actionButtons.vue";

export default {
  data() {
    return {
      path: "/reports/suppliers/suppliersInactive",
      items: [],

      loading: 0,

      balance: 0,

      suppliers: [],
      sectionCustomerName: "",

      supplierName: "",

      params: {
        supplier_id: "",
        sections_account_id: "",
      },
      excel: {
        fileName: 'suppliers inactive ',
        reportData: '[]'
      },
    };
  },
  methods: {
    getItems() {
      this.$setParams(this.params);
      this.getData();
    },
    getData() {
      var params = this.params;
      this.$setParams(params);
      var items = JSON.parse(JSON.stringify(this.$database.suppliers));
      items = items.filter((el) => el.stat == 1);
      if (params.orderBy) {
        items = items.sort(this.$dynamicSort(params));
      }
      if (params.supplier_id) {
        items = items.filter((el) => el.id == params.supplier_id);
      }
      this.items = items;
      this.balance = 0;
      this.items.forEach((item) => {
        this.balance += item.balance;
        item.balance = this.$moneyFormat(item.balance);
      });
      var supplier = this.$database.suppliers.find((el) => el.id == this.params.supplier_id);
      if (supplier) {
        this.supplierName = supplier.name;
      } else{
        this.supplierName =""
      }
      var sectionCustomer = this.$database.sectionsAccounts.find(el => el.id == this.params.sections_account_id)
      if (sectionCustomer) {this.sectionCustomerName = sectionCustomer.name;} else {this.sectionCustomerName = "";}
      
      this.balance = this.$moneyFormat(this.balance);
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

    this.getData();
  },
  components: {
    reportHeader,
    reportTable,
    indexHeader,
    searchInput,
    actionButtons,
  },
};
</script>

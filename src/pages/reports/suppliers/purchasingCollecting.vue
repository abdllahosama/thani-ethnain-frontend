<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'تقارير المشتريات الى سندات الصرف'"
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
                title="اسم المورد"
                plaseholder="أختر اسم المورد"
                v-model="params.supplier_id"
                :show="'name'"
                :refrance="'id'"
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
              <dateFilter class="col-md-3" />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
        <reportHeader 
            title="المشتريات الى سندات الصرف" 
            :details="[
              {title: 'اسم المورد', value : supplierName },
              {title: $t('reports.overview.sectionsupplier'), value : sectionCustomerName },
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'name',link: '/suppliers' , title: 'اسم المورد', type:'reportMainLink', sort: true},
              { column: 'burchase', title: 'المشتريات', type: 'text', sort: true },
              { column: 'payments', title: 'سندات الصرف', type: 'text', sort: true },
              { column: 'balance', title: 'الرصيد', type: 'text' ,sort: true},
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: 1, value: burchase },
              { colspan: 1, value: payments },
              { colspan: 1, value: balance },
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
      path: "/reports/suppliers/purchasingCollecting",
      items: [],
      loading: 1,

      burchase: 0,
      payments: 0,
      balance: 0,
      sectionCustomerName: "",

      params: {
        dateFilter: 2,
        startDate: '',
        endDate: '',
        supplier_id: "",
        sections_account_id: "",
      },

      excel: {
        fileName: 'purchasing Collecting ',
        reportData: '[]'
      },

      supplierName: "",
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
          let data = response.data;

          this.items = []
          this.burchase = 0;
          this.payments = 0;
          this.balance = 0;
          let itemss = JSON.parse(JSON.stringify(this.$database.suppliers))
          itemss.forEach(supplier => {
           
            supplier.bills             = data.bills.filter(el => el.supplier_id == supplier.id).map(item => item.total).reduce((prev, next) => prev + next, 0)
            supplier.purchasePayments  = data.purchasePayments.filter(el => el.supplier_id == supplier.id).map(item => item.cost).reduce((prev, next) => prev + next, 0)
            
            supplier.burchase = supplier.bills 
            supplier.payments = supplier.purchasePayments 

            this.items.push(supplier)
          });

          this.items = this.items.filter(el => el.burchase != 0 || el.payments != 0)

          this.items.forEach((item) => {
            this.burchase += parseFloat(item.burchase);
            this.payments += parseFloat(item.payments);
            this.balance  += parseFloat(item.balance);

            if (this.$option.balance_type == 1) {item.balance = item.balance * -1}

            item.burchase = this.$moneyFormat(item.burchase)
            item.payments = this.$moneyFormat(item.payments)
            item.balance  = this.$moneyFormat(item.balance)

          });

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          var supplier = this.$database.suppliers.find((el) => el.id == this.params.supplier_id);
          if (supplier) {this.supplierName = supplier.name;} else {this.supplierName = "";}

          var sectionCustomer = this.$database.sectionsAccounts.find(el => el.id == this.params.sections_account_id)
          if (sectionCustomer) {this.sectionCustomerName = sectionCustomer.name;} else {this.sectionCustomerName = "";}


          this.burchase = this.$moneyFormat(this.burchase)
          this.payments = this.$moneyFormat(this.payments)

          if (this.$option.balance_type == 1) { this.balance = this.balance * -1;}
          this.balance  = this.$moneyFormat(this.balance)
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
    if (typeof this.params.startDate === 'undefined') {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.$updateDatabase(["suppliers"]);
    this.getData();
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

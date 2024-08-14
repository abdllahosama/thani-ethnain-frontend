<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'كشف حساب الخزينة.'"
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
                title="الخزينة"
                plaseholder="اختر الخزينة"
                :show="'name'"
                :refrance="'id'"
                v-model="params.safe_id"
                :value="params.safe_id"
                :values="$database.safes"
              />
              <dateFilter class="col-md-3" />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="كشف حساب الخزينة" 
            :details="[
              {title: 'اسم الخزينة', value : safeName }
            ]"
          />
          <reportTable
            :header="[
              { colspan: 5, value: 'الرصيد الأفتتاحي' },
              { colspan: 2, value: '' },
              { colspan: 1, value: startBalance },
            ]"
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'code',        title: 'الكود',    type: 'reportCode' },
              { column: 'date',        title: 'التاريخ',  type: 'text' },
              { column: 'type',        title: 'العملية',  type: 'reportType' },
              { column: 'client_type', title: 'الحساب',   type: 'accountLink' },
              { column: 'statement',   title: 'البيان',   type: 'statement' },
              { column: 'creditor',    title: 'مدين',     type: 'textOrEmpty' },
              { column: 'debit',       title: 'دائن',     type: 'textOrEmpty' },
              { column: 'new_balance', title: 'الرصيد',   type: 'text' },
            ]"
            :footer="[
              { colspan: 5, value: 'الرصيد النهائي' },
              { colspan: 1, value: debit },
              { colspan: 1, value: creditor },
              { colspan: 1, value: endBalance },
            ]"
            :tafqeet="tafqeet"
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
      path: "/reports/safes/totalAccounts",
      items: [],

      loading: 0,

      startBalance: 0,
      endBalance: 0,

      debit: 0,
      creditor: 0,

      tafqeet: "",

      safeName:"",
      params: {
        safe_id: "",
        dateFilter: "",
        startDate: "",
        endDate: "",
      },
      excel: {
        fileName: 'safe accounts',
        reportData: '[]'
      },
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

          var safe = this.$database.safes.find((el) => el.id == this.params.safe_id);
          var startBalance = safe.opening_balance;
          this.debit    = 0;
          this.creditor = 0;
          if (safe.opening_balance < 0) {
            this.debit += (safe.opening_balance * -1)
          } else if (safe.opening_balance > 0) {
            this.creditor += safe.opening_balance
          }
          
          this.items.forEach((item) => {

            item.old_balance = this.$moneyFormat(startBalance);

            if (item.debit) {
              startBalance = startBalance - item.debit;
              this.debit += item.debit;
              item.debit = this.$moneyFormat(item.debit);
            }
            if (item.creditor) {
              startBalance = startBalance + item.creditor;
              this.creditor += item.creditor;
              item.creditor = this.$moneyFormat(item.creditor);
            }

            item.new_balance = this.$moneyFormat(startBalance);
          });
          var safe = this.$database.safes.find((el) => el.id == this.params.safe_id);
          if(safe){
            this.safeName = safe.name
          }
          this.startBalance = this.items[0].old_balance;
          this.endBalance = this.items[this.items.length - 1].new_balance;


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

            var customer = this.$database.customers.find((el) => el.id == item.customer_id);
            if (customer) {item.customer = customer;}

            var supplier = this.$database.suppliers.find((el) => el.id == item.supplier_id);
            if (supplier) {item.supplier = supplier;}

            var partner = this.$database.partners.find((el) => el.id == item.partner_id);
            if (partner) {item.partner = partner;}

            var account = this.$database.accounts.find((el) => el.id == item.account_id);
            if (account) {item.account = account;}

            var employee = this.$database.employees.find((el) => el.id == item.employee_id);
            if (employee) {item.employee = employee;}

            var safe = this.$database.safes.find((el) => el.id == item.safe_id);
            if (safe) {item.safe = safe;}
          });

          if (this.items[0]) {
            this.startBalance = this.items[0].old_balance;
            this.endBalance = this.items[this.items.length - 1].new_balance;
            this.debit    = this.$moneyFormat(this.debit);
            this.creditor = this.$moneyFormat(this.creditor);
            this.tafqeet = " الحساب " + (!this.endBalance.includes("-") ? "مدين ب" : "دائن ب") + this.$tafqeet(this.endBalance.replace(/,/g, '').replace(/-/g, ''));
          }

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

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
    this.$updateDatabase(["customers"]);
    if (this.$route.params.id) {
      this.customerId = this.$route.params.id;
      this.getData();
    }
  },
  components: {
    reportTable,
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons,
    reportHeader
  },
};
</script>

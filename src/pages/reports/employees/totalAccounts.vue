<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'اجمالي حساب الموظف.'"
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
                title="الموظف"
                plaseholder="اختر موظف"
                :show="'name'"
                :refrance="'id'"
                v-model="params.employee_id"
                :value="params.employee_id"
                :values="$database.employees"
              />
              <dateFilter class="col-md-3" />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="اجمالي حساب الموظف" 
            :details="[
              {title: 'اسم الموظف:', value : employeeName }
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
              { column: 'type', title: 'العملية', type: 'reportType' },
              { column: 'statement', title: 'البيان', type: 'statement' },
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
              { colspan: 4, value: 'الرصيد النهائي' },
              { colspan: 1, value: debit },
              { colspan: 1, value: creditor },
              {
                colspan: 1,
                value: endBalance,
              },
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
      path: "/reports/employees/totalAccounts",
      items: [],

      loading: 0,

      startBalance: 0,
      endBalance: 0,

      debit: 0,
      creditor: 0,

      tafqeet: "",

      employees: [],
      employeeName: "",

      params: {
        employee_id: "",
        startDate:"",
        endDate:"",
      },

      excel: {
        fileName: 'employee total account',
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
          var employee = this.$database.employees.find(
            (el) => el.id == this.params.employee_id
          );
          employee.opening_balance = 0
          var startBalance = employee.opening_balance;
          this.debit    = 0;
          this.creditor = 0;

          if (employee.opening_balance < 0) {
            this.debit += (employee.opening_balance * -1)
          } else if (employee.opening_balance > 0) {
            this.creditor += employee.opening_balance
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

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          if (this.items[0]) {
            this.startBalance = this.items[0].old_balance;
            this.endBalance = this.items[this.items.length - 1].new_balance;
            this.debit    = this.$moneyFormat(this.debit);
            this.creditor = this.$moneyFormat(this.creditor);
            let endBalance = this.$option.balance_type == 0 ? this.endBalance.replace(/,/g, '') : this.endBalance.replace(/,/g, '') * -1;
            this.tafqeet = " الحساب " + (endBalance < 0 ? "مدين ب" : "دائن ب") + this.$tafqeet(this.endBalance.replace(/,/g, '').replace(/-/g, ''));
          }
          var employee = this.employees.find(
            (el) => el.id == this.params.employee_id
          );

          if (employee) {
            this.employeeName = employee.name;
          } else {
            this.employeeName = "";
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
    if (typeof this.params.startDate === 'undefined') {
      this.params.startDate = new Date().toISOString('en-US', { timeZone: 'Africa/Cairo' }).slice(0, 10);
    }
    this.$updateDatabase(["employees"]);
    
    if (this.$route.params.id) {
      this.employeeId = this.$route.params.id;
      this.getData();
    }
  },
  components: {
    reportHeader,
    reportTable,
    indexHeader,
    dateFilter,
    searchInput,
    actionButtons
  },
};
</script>

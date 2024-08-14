<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'الرصيد المتبقي الموظفين.'"
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
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="الرصيد المتبقي الموظفين" 
            :details="[
              {title: 'اسم الموظف:', value : employeeName }
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'name',  link: '/employees',   title:'اسم الموظف' ,type: 'reportMainLink' , sort: true },
              { column: 'balance', title: 'الرصيد', type: 'text', sort: 'true' },
            ]"
            :footer="[
              { colspan: 1, value: 'المجموع' },
              { colspan: 1, value: balance},
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
      path: "/reports/employees/balance",
      items: [],

      loading: 0,

      balance: 0,

      employees: [],
      employeeName:"",

      params: {
        employee_id: "",
      },

      excel: {
        fileName: 'employees balance',
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
      var items = JSON.parse(JSON.stringify(this.$database.employees));
      if (params.orderBy) {
        items = items.sort(this.$dynamicSort(params));
      }
      if (params.employee_id) {
        items = items.filter((el) => el.id == params.employee_id);
      }
      this.items = items;
      this.balance = 0;
      this.items.forEach((item) => {
        this.balance += item.balance;
        item.balance = this.$moneyFormat(item.balance);
      });
      var employee = this.employees.find(
            (el) => el.id == this.params.employee_id
          );
          if (employee) {
            this.employeeName = employee.name;
          } else {
            this.employeeName = "";
          }

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

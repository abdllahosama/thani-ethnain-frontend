<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'سحوبات الموظفين.'"
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
              <searchInput
                class="col-md-3"
                title="اسم المستخدم"
                plaseholder="اختر اسم المستخدم"
                :show="'name'"
                :refrance="'id'"
                v-model="params.user_id"
                :value="params.user_id"
                :values="users"
              />
              <dateFilter class="col-md-3" />
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="سحوبات الموظفين" 
            :details="[
              {title: 'اسم الموظف', value : employeeName },
              {title: 'اسم المستخدم', value : userName }
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'code', title: $t('employeesWithdrawals.Withdraw'), type: 'mainLink', sort: true },
              { column: 'employee_id',  title:$t('employeesDeductions.functionary'),  type: 'link', to:'employee', sort: true, link: true},
              { column: 'user_id', title: $t('mainReport.userName'), type: 'link', to:'user', sort: true, link: false },
              { column: 'date', title: $t('employeesDeductions.date'), type: 'text', sort: true },
              {
                column: 'description',
                title: $t('employeesDeductions.thatsAbout'),
                type: 'text',
                sort: true,
              },
              { column: 'notes', title: $t('employeesDeductions.note'), type: 'text', sort: true },
              {
                column: 'cost',
                title: $t('employeesDeductions.cost'),
                type: 'text',
                sort: true
              },
            ]"
            :footer="[
              { colspan: 6, value: 'المجموع' },
              { colspan: 1, value: cost },
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
      path: "/reports/employeesOperations/employeesWithdrawals",
      items: [],

      loading: 0,

      cost: 0,

      params: {
        employee_id: "",
        user_id: "",
        dateFilter: "",
        startDate: "",
        endDate: "",
      },

      excel: {
        fileName: 'employee total account',
        reportData: '[]'
      },

      users: [],

      employeeName:"",
      userName:"",
      searchStartDate: "",
      searchEndDate: "",
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

          this.searchStartDate = this.params.startDate;
          this.searchEndDate = this.params.endDate;

          this.cost = 0;

          this.items.forEach((item) => {
            this.cost += item.cost;
            item.cost = this.$moneyFormat(item.cost)
            item.date = this.$dateFormat(item.date)

            var user = this.users.find((el) => el.id == item.user_id);
            if (user) {
              item.user = user;
            }

            var employee = this.$database.employees.find((el) => el.id == item.employee_id);
            if (employee) {
              item.employee = employee;
            }

          });
          this.cost = this.$moneyFormat(this.cost);
          this.loading = 0;


          var employee = this.$database.employees.find((el) => el.id == this.params.employee_id);
          if (employee) {
            this.employeeName = employee.name;
          } else{
            this.employeeName =""
          }

          var user = this.users.find((el) => el.id == this.params.user_id);
          if (user) {
            this.userName = user.name;
          } else{
            this.userName =""
          }
        });
    },
    getUsers() {
      axios.get(this.$linkGnirator("/usersItems")).then((response) => {
        this.users = response.data;
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
    this.getData();
    this.getUsers();
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

<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <indexHeader
          :title="'التقارير'"
          :description="'دليل الموظفين.'"
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
                  <label>اسم الموظف</label>
                  <input
                    type="text"
                    v-model="params.name"
                    class="form-control"
                    placeholder="ادخل اسم الموظف"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label> المسمي الوظيفي</label>
                  <input
                    type="text"
                    v-model="params.jop_title"
                    class="form-control"
                    placeholder="ادخل  المسمي الوظيفي"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>الراتب</label>
                  <input
                    type="text"
                    v-model="params.salary"
                    class="form-control"
                    placeholder="ادخل الراتب"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>العمر</label>
                  <input
                    type="text"
                    v-model="params.age"
                    class="form-control"
                    placeholder="ادخل العمر"
                  />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>رقم الهاتف</label>
                  <input
                    type="text"
                    v-model="params.mobile"
                    class="form-control"
                    placeholder="ادخل رقم الهاتف"
                  />
                </div>
              </div>
              <actionButtons class="col-md-3" />
            </div>
          </div>
        </div>
        <div id="reportShow">
          <reportHeader 
            title="دليل الموظفين" 
            :details="[
              {title: 'اسم الموظف', value : employeeName },
              {title: 'المسمي الوظيفي', value : jopTitleNAme },
              {title: 'الراتب', value : salaryName },
              {title: 'العمر', value : age1Name },
              {title: 'رقم الهاتف', value : mobileNum },
              
            ]"
          />
          <reportTable
            :emptyTableText="'لايوجد بيانات حاليا'"
            :emptyTableSubText="'جرب اضافة البعض واعد المحاولة'"
            :cloumns="[
              { column: 'name',   link: '/employees',   title:$t('employees.employeeName') ,type: 'reportMainLink' , sort: true },
              { column: 'job_title', title: 'المسمي الوظيفي', type: 'text', sort: true },
              { column: 'salary', title: 'الراتب', type: 'text', sort: true },
              { column: 'age', title: 'العمر', type: 'text', sort: true },
              { column: 'mobile', title: 'الهاتف', type: 'text', sort: true },
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
      path: "/reports/employees/employeesGuide",
      items: [],
      loading: 0,
      employees: [],
      params: {
        name: "",
        jop_title: "",
        salary: "",
        age: "",
        mobile: "",
      },

      excel: {
        fileName: 'empolyees guide',
        reportData: '[]'
      },
      
      employeeName:"",
      jopTitleName:"",
      salaryName:"",
      ageName:"",
      mobileNum:"",
    };
  },
  methods: {
    getItems() {
      this.$setParams(this.params);
      this.getData();
    },
    getData() {

      this.$setParams(this.params);
      var items = JSON.parse(JSON.stringify(this.$database.employees));

      if (this.params.orderBy) {
        items = items.sort(this.$dynamicSort(params));
      }

      var editName = new RegExp(this.params.name, "i");
      items = items.filter((el) => editName.test(el.name));

      var editJopTitle = new RegExp(this.params.jop_title, "i");
      items = items.filter((el) => editJopTitle.test(el.jop_title));

      var editAge = new RegExp(this.params.age, "i");
      items = items.filter((el) => editAge.test(el.age));

      var editSalary = new RegExp(this.params.salary, "i");
      items = items.filter((el) => editSalary.test(el.salary));

      var editMobile = new RegExp(this.params.mobile, "i");
      items = items.filter((el) => editMobile.test(el.mobile));

      this.items = items;

      this.employeeName = this.params.name;
      this.jopTitleName = this.params.jop_title;
      this.salaryName = this.params.age;
      this.ageName = this.params.salary;
      this.mobileNum = this.params.mobile;
          
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
    this.employees = this.$database.employees;
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
